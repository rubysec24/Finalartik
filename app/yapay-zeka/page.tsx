"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Play, PauseCircle, Volume2, Loader2, BrainCircuit, SendHorizonal, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

export default function AIAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [userMessage, setUserMessage] = useState("")
  const [inputMessage, setInputMessage] = useState("")
  const [response, setResponse] = useState("")
  const [conversation, setConversation] = useState<{role: string, content: string}[]>([
    {
      role: "assistant",
      content: "Merhaba! Ben Kurmay'ın yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?"
    }
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null
  
  // Sayfa yüklendiğinde Web Speech API'nin kullanılabilirliğini kontrol et
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Tarayıcınız konuşma tanıma özelliğini desteklemiyor.")
    }
    
    // Speech recognition nesnesini başlat (sadece bir kere)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition && !recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'tr-TR'
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('')
        
        setUserMessage(transcript)
      }
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Konuşma tanıma hatası:', event.error)
        toast.error("Konuşma tanıma sırasında bir hata oluştu.")
        setIsListening(false)
      }
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start()
        }
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synth) {
        synth.cancel()
      }
    }
  }, [isListening])
  
  // Mesajların en sonuna otomatik kaydırma
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation])
  
  // Dinleme durumunu değiştir
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop()
      // Eğer bir mesaj algılandıysa, gönder
      if (userMessage.trim().length > 0) {
        handleSendMessage(userMessage)
      }
    } else {
      try {
        recognitionRef.current.start()
        setUserMessage("")
      } catch (error) {
        console.error("Dinleme başlatılamadı:", error)
        toast.error("Dinleme başlatılamadı, lütfen tekrar deneyin.")
      }
    }
    setIsListening(!isListening)
  }
  
  // Mesajı gönder
  const handleSendMessage = async (message: string = userMessage) => {
    if (!message.trim()) {
      if (inputMessage.trim()) {
        message = inputMessage.trim()
      } else {
        return
      }
    }
    
    // Kullanıcı mesajını konuşmaya ekle
    const updatedConversation = [
      ...conversation,
      { role: "user", content: message }
    ]
    setConversation(updatedConversation)
    setUserMessage("")
    setInputMessage("")
    setIsProcessing(true)
    
    try {
      // Yapay zeka API'sine istek gönder
      const aiResponse = await simulateAIResponse(message)
      
      // Asistan yanıtını konuşmaya ekle
      setConversation([
        ...updatedConversation,
        { role: "assistant", content: aiResponse }
      ])
      
      setResponse(aiResponse)
      
      // Yanıtı seslendir
      speakResponse(aiResponse)
    } catch (error) {
      console.error("API hatası:", error)
      toast.error("Yanıt alınamadı, lütfen tekrar deneyin.")
    } finally {
      setIsProcessing(false)
    }
  }
  
  // Yanıtı seslendir
  const speakResponse = (text: string) => {
    if (synth) {
      // Önceki konuşmayı durdur
      synth.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'tr-TR'
      utterance.rate = 0.9 // Daha yavaş ve anlaşılır bir hız
      utterance.pitch = 1.0 // Normal ses tonu
      utterance.volume = 1.0 // Tam ses
      
      // Daha doğal duraklamalar ekleme
      // Nokta ve virgüllerde duraklamalar ekleme
      const textWithPauses = text
        .replace(/\./g, '.<break time="500ms"/>')
        .replace(/,/g, ',<break time="300ms"/>')
        .replace(/\?/g, '?<break time="500ms"/>')
        .replace(/:/g, ':<break time="300ms"/>')
      
      // Voices API bazen hemen yüklenmiyor, bu yüzden sesleri yüklüyoruz
      if (synth.getVoices().length === 0) {
        // Sesler henüz yüklenmemiş
        window.speechSynthesis.onvoiceschanged = () => {
          setupVoice(utterance, text)
        }
      } else {
        setupVoice(utterance, text)
      }
    }
  }
  
  // Ses özelliklerini yapılandırma ve konuşmayı başlatma
  const setupVoice = (utterance: SpeechSynthesisUtterance, text: string) => {
    // Türkçe sesi bul
    const voices = synth!.getVoices()
    console.log("Kullanılabilir sesler:", voices.map(v => `${v.name} (${v.lang})`))
    
    // Önce tam Türkçe ses arayalım
    let turkishVoice = voices.find(voice => voice.lang === 'tr-TR')
    
    // Bulamazsak, 'tr' içeren herhangi bir ses arayalım
    if (!turkishVoice) {
      turkishVoice = voices.find(voice => 
        voice.lang.includes('tr') || voice.name.toLowerCase().includes('turkish')
      )
    }
    
    // Hala bulamazsak, daha genel bir ses kullanalım
    if (!turkishVoice && voices.length > 0) {
      // En azından bir ses olsun
      turkishVoice = voices.find(v => v.lang.includes('en')) || voices[0]
    }
    
    // Sesi ayarla
    if (turkishVoice) {
      console.log("Seçilen ses:", turkishVoice.name)
      utterance.voice = turkishVoice
    }
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = (e) => {
      console.error("Konuşma hatası:", e)
      setIsSpeaking(false)
    }
    
    synth!.speak(utterance)
  }
  
  // Konuşmayı duraklat/devam ettir
  const toggleSpeaking = () => {
    if (synth) {
      if (isSpeaking) {
        synth.pause()
      } else if (synth.paused) {
        synth.resume()
      } else if (response) {
        speakResponse(response)
      }
      setIsSpeaking(!isSpeaking)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 bg-white/20 rounded-full backdrop-blur-lg flex items-center justify-center mx-auto mb-8">
                <BrainCircuit className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Sesli Yapay Zeka Asistanı
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Sorularınızı sesli olarak sorun, yapay zeka asistanımız anında cevaplasın
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-xl">
            <CardContent className="p-0">
              {/* Sohbet Ekranı */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-t-xl h-[500px] overflow-y-auto">
                <div className="space-y-4">
                  {conversation.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-4 rounded-lg ${
                          msg.role === 'user' 
                          ? 'bg-purple-600 text-white rounded-br-none' 
                          : 'bg-white dark:bg-gray-800 shadow rounded-bl-none'
                        }`}
                      >
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-4 rounded-lg bg-white dark:bg-gray-800 shadow rounded-bl-none">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Kontrol Paneli */}
              <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-b-xl border-t dark:border-gray-700">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Dinleme butonu */}
                  <Button
                    onClick={toggleListening}
                    className={`p-6 flex-shrink-0 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isListening ? 'listening' : 'not-listening'}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center"
                      >
                        {isListening ? (
                          <>
                            <MicOff className="h-6 w-6 mr-2" />
                            <span>Dinlemeyi Durdur</span>
                          </>
                        ) : (
                          <>
                            <Mic className="h-6 w-6 mr-2" />
                            <span>Konuşmaya Başla</span>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                  
                  {/* Konuşma butonu */}
                  <Button
                    onClick={toggleSpeaking}
                    variant="outline"
                    className="p-6 flex-shrink-0 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950"
                    disabled={!response}
                  >
                    {isSpeaking ? (
                      <>
                        <PauseCircle className="h-6 w-6 mr-2" />
                        <span>Duraklat</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-6 w-6 mr-2" />
                        <span>Son Yanıtı Seslendir</span>
                      </>
                    )}
                  </Button>
                  
                  {/* Metin giriş alanı ve gönder butonu */}
                  <div className="flex-grow flex gap-2">
                    <div className="relative flex-grow">
                      {isListening && (
                        <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-lg flex items-center px-4 border dark:border-gray-700">
                          <div className="w-full truncate">{userMessage || "Dinleniyor..."}</div>
                          <div className="flex-shrink-0 ml-2">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75"></div>
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <input
                        type="text"
                        placeholder="Mesajınızı yazın veya sesli olarak sorun..."
                        className="w-full p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        disabled={isListening}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !isProcessing) {
                            handleSendMessage(inputMessage)
                          }
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => handleSendMessage(inputMessage)}
                      className="bg-purple-600 hover:bg-purple-700 p-3"
                      disabled={isProcessing || (!inputMessage && !userMessage)}
                    >
                      {isProcessing ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <SendHorizonal className="h-6 w-6" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Özellikler */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Yapay Zeka Asistanımızın Özellikleri</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-purple-600" />}
              title="Doğal Dil Anlama"
              description="Türkçe dilinde doğal konuşma dilinizi anlar ve anlamlı yanıtlar üretir."
            />
            <FeatureCard
              icon={<Volume2 className="h-10 w-10 text-purple-600" />}
              title="Sesli Yanıtlar"
              description="Yazılı yanıtların yanı sıra akıcı Türkçe sesli yanıtlar ile sorunlarınızı hızlıca çözer."
            />
            <FeatureCard
              icon={<BrainCircuit className="h-10 w-10 text-purple-600" />}
              title="Sürekli Öğrenme"
              description="Her etkileşim ile daha da akıllanan yapay zeka, sorularınıza daha doğru yanıtlar verir."
            />
          </div>
        </div>
      </section>
      
      {/* Desteklenen Konular */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Asistanımızın Yardımcı Olabileceği Konular</h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Yapay zeka asistanımız aşağıdaki konularda size yardımcı olmak için eğitilmiştir
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TopicCard title="Eğitim Materyalleri" color="bg-purple-100 dark:bg-purple-900/20" />
            <TopicCard title="Sınav Hazırlık" color="bg-indigo-100 dark:bg-indigo-900/20" />
            <TopicCard title="Dijital İçerikler" color="bg-blue-100 dark:bg-blue-900/20" />
            <TopicCard title="Kurumsal Bilgiler" color="bg-cyan-100 dark:bg-cyan-900/20" />
            <TopicCard title="Akıllı Tahta Ürünleri" color="bg-teal-100 dark:bg-teal-900/20" />
            <TopicCard title="Yayın Bilgileri" color="bg-emerald-100 dark:bg-emerald-900/20" />
            <TopicCard title="Online Satış" color="bg-green-100 dark:bg-green-900/20" />
            <TopicCard title="Bayi İşlemleri" color="bg-lime-100 dark:bg-lime-900/20" />
          </div>
        </div>
      </section>
    </div>
  )
}

// Özellik Kartı Bileşeni
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="mb-5">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  )
}

// Konu Kartı Bileşeni
const TopicCard = ({ title, color }: { title: string, color: string }) => {
  return (
    <div className={`p-4 rounded-lg ${color}`}>
      <p className="font-medium text-center">{title}</p>
    </div>
  )
}

// Test amaçlı AI yanıtını simüle et (gerçekte bir API'ye istek göndereceğiz)
const simulateAIResponse = async (message: string): Promise<string> => {
  // API entegrasyonu burada olacak
  // Şimdilik genişletilmiş yanıtlar üretiyoruz
  return new Promise(resolve => {
    setTimeout(() => {
      const lowerMessage = message.toLowerCase().trim()
      
      // Daha kapsamlı yanıt haritası
      const detailedResponses: Record<string, string[]> = {
        "merhaba": [
          "Merhaba! Size nasıl yardımcı olabilirim? Kurmay Yayınları'nın ürünleri, eğitim materyalleri veya diğer konularda bilgi almak ister misiniz?",
          "Merhaba! Ben Kurmay Yayınları'nın sesli asistanıyım. Eğitim materyalleri, yayınlar veya diğer ürünlerimiz hakkında bilgi vermekten memnuniyet duyarım.",
          "Merhaba! Bugün size hangi konuda yardımcı olabilirim? Eğitim setleri, dijital içerikler veya akıllı tahta uygulamaları hakkında bilgi verebilirim."
        ],
        "nasılsın": [
          "Teşekkür ederim, ben bir yapay zeka asistanı olarak her zaman hizmetinizdeyim. Size eğitim materyalleri ve Kurmay Yayınları'nın ürünleri hakkında bilgi vermekten memnuniyet duyarım.",
          "Ben bir yapay zeka olarak her zaman çalışır durumdayım ve size yardımcı olmak için buradayım. Bugün size nasıl yardımcı olabilirim?"
        ],
        "kurmay": [
          "Kurmay Yayınları, 1998 yılından beri eğitim alanında hizmet veren, kaliteli ve güvenilir içerikler üreten bir yayınevidir. İlkokuldan üniversiteye kadar tüm seviyelerde eğitim materyalleri sunmaktadır. Size özel olarak hangi eğitim seviyesi veya ürün grubu hakkında bilgi vermemi istersiniz?",
          "Kurmay Yayınları, eğitim sektöründeki köklü deneyimiyle öğrencilerin akademik başarısına katkıda bulunmayı amaçlayan bir yayınevidir. Fenomen, More&More, KOZ, Orjin ve WoW English gibi birçok markaya sahiptir. Hangi marka veya ürün grubu hakkında bilgi almak istersiniz?"
        ],
        "kitap": [
          "Kurmay Yayınları'nın farklı sınıf düzeyleri için hazırlanmış geniş bir kitap yelpazesi bulunmaktadır. İlkokul, ortaokul, lise ve üniversite hazırlık alanlarında test kitapları, soru bankaları, yaprak testler ve konu anlatım kitapları mevcuttur. Hangi sınıf düzeyi veya ders için kitap önerileri almak istersiniz?",
          "Kurmay'ın kitapları arasında Fenomen serisi, Orjin yayınları, KOZ Yayınları ve More&More gibi farklı markalar altında sunulan çeşitli eğitim materyalleri bulunmaktadır. Size özel bir sınıf veya ders için önerilerimiz olabilir. Hangi alanda bilgi almak istersiniz?"
        ],
        "fenomen": [
          "Fenomen serisi, Kurmay Yayınları'nın Türkçe eğitim materyalleri alanında öncü markasıdır. Özellikle Türkçe, Matematik, Fen Bilimleri ve Sosyal Bilgiler derslerini kapsayan, farklı sınıf seviyelerine yönelik hazırlanmış kapsamlı kitaplar sunmaktadır. Fenomen Okul, Fenomen Soru Bankaları ve Fenomen Konu Anlatımları ile öğrencilerin akademik başarısına katkıda bulunur."
        ],
        "more&more": [
          "More&More, Kurmay Yayınları'nın İngilizce dil eğitimi alanındaki uzman markasıdır. İlkokuldan liseye kadar tüm seviyelerde İngilizce dil becerilerini geliştirmeye yönelik kitaplar, alıştırma setleri ve dijital içerikler sunmaktadır. More&More ürünleri, öğrencilerin İngilizce okuma, yazma, dinleme ve konuşma becerilerini dengeli bir şekilde geliştirmeyi amaçlar."
        ],
        "dijital": [
          "Kurmay Yayınları, eğitimde dijital dönüşümü desteklemek amacıyla birçok dijital içerik ve uygulama sunmaktadır. Akıllı tahta uygulamaları, etkileşimli kitaplar, video çözümler ve online sınavlar gibi ürünler ile öğrencilerin öğrenme deneyimini zenginleştirmektedir. Hangi dijital içerik hakkında daha detaylı bilgi almak istersiniz?"
        ],
        "akıllı tahta": [
          "Kurmay Yayınları'nın akıllı tahta uygulamaları, öğretmenlerin ders anlatımını daha etkileşimli ve görsel hale getiren dijital içeriklerdir. Bu uygulamalar, kitapların dijital versiyonlarını, interaktif alıştırmaları, video çözümleri ve zengin görsel materyalleri içermektedir. Akıllı tahta uygulamaları, öğrencilerin derse katılımını artırarak öğrenme sürecini daha verimli hale getirir."
        ],
        "sınav": [
          "Kurmay Yayınları, LGS, TYT, AYT ve KPSS gibi merkezi sınavlara hazırlık için kapsamlı eğitim materyalleri sunmaktadır. Soru bankaları, deneme sınavları, konu anlatım kitapları ve video çözümler ile öğrencilerin sınavlara en iyi şekilde hazırlanmasını amaçlar. Hangi sınav için hazırlık materyali arıyorsunuz?"
        ],
        "lgs": [
          "LGS sınavına hazırlık için Kurmay Yayınları'nın Fenomen serisi altında çeşitli kaynaklar bulunmaktadır. Konu anlatımlı kitaplar, soru bankaları, denemeler ve video çözümler ile öğrenciler tüm konuları kapsamlı şekilde çalışabilirler. Özellikle Türkçe, Matematik, Fen Bilimleri ve Sosyal Bilgiler dersleri için özel olarak hazırlanmış materyaller mevcuttur."
        ],
        "tyt": [
          "TYT sınavına hazırlık için Kurmay Yayınları, tüm dersler için kapsamlı kaynak setleri sunmaktadır. Konu anlatımları, soru bankaları, yaprak testler ve deneme sınavları ile öğrenciler sınava sistematik şekilde hazırlanabilirler. Ayrıca, video çözümler ve dijital içerikler ile öğrenme süreci desteklenmektedir."
        ],
        "video çözüm": [
          "Kurmay Yayınları'nın video çözümleri, kitaplardaki soruların detaylı açıklamalarını içeren eğitici videolardır. Bu videolar, öğrencilerin zorlandıkları konuları daha iyi anlamalarına yardımcı olur. Video çözümler, web sitesi üzerinden veya QR kodlar aracılığıyla erişilebilir durumdadır. Fenomen ve More&More markalarına ait kitapların video çözümlerine ulaşabilirsiniz."
        ],
        "bayi": [
          "Kurmay Yayınları'nın bayilik sistemi hakkında bilgi almak için web sitemizdeki bayi başvuru formunu doldurabilirsiniz. Bayilerimize özel indirimler, promosyonlar ve satış destekleri sunmaktayız. Bayilik şartları ve süreçleri hakkında detaylı bilgi için kurumsal iletişim kanallarımızı kullanabilirsiniz."
        ],
        "iletişim": [
          "Kurmay Yayınları ile iletişim kurmak için web sitemizdeki iletişim formunu kullanabilir, info@kurmay.com.tr adresine e-posta gönderebilir veya 0312 XXX XX XX numaralı telefondan bizimle iletişime geçebilirsiniz. Ayrıca sosyal medya hesaplarımız üzerinden de bize ulaşabilirsiniz."
        ],
        "fiyat": [
          "Kurmay Yayınları'nın ürünlerinin güncel fiyatları için web sitemizi ziyaret edebilir veya online satış platformlarımızdan bilgi alabilirsiniz. Ürün fiyatları, kitap türüne, sayfa sayısına ve içeriğine göre değişiklik gösterebilmektedir. Ayrıca, dönemsel kampanyalar ve indirimler hakkında bilgi almak için web sitemizi düzenli olarak takip edebilirsiniz."
        ],
        "yardım": [
          "Size eğitim materyalleri, kitaplar, dijital içerikler, akıllı tahta uygulamaları, sınav hazırlık kaynakları, bayilik sistemi veya iletişim bilgileri konularında yardımcı olabilirim. Lütfen hangi konuda daha detaylı bilgi almak istediğinizi belirtin."
        ]
      }
      
      // Öğrenci seviyelerine göre öneriler
      const levelResponses: Record<string, string> = {
        "ilkokul": "İlkokul öğrencileri için Kurmay Yayınları'nın Fenomen serisi altında Türkçe, Matematik, Hayat Bilgisi ve İngilizce kitapları bulunmaktadır. More&More Young Learners serisi ile de İngilizce dil eğitimini destekleyebilirsiniz. Ayrıca, Akıllı Tahta uygulamaları ve dijital içerikler ile çocuğunuzun eğitimini zenginleştirebilirsiniz.",
        "ortaokul": "Ortaokul öğrencileri için Fenomen test kitapları, Orjin soru bankaları ve KOZ konu anlatım kitapları önerilmektedir. LGS hazırlık için özel olarak tasarlanmış kaynaklar da mevcuttur. More&More serisi ile İngilizce dil becerilerini geliştirebilir, dijital içerikler ve video çözümler ile öğrenme sürecini destekleyebilirsiniz.",
        "lise": "Lise öğrencileri için TYT ve AYT sınavlarına yönelik Fenomen ve Orjin serileri altında konu anlatımları, soru bankaları ve deneme sınavları sunulmaktadır. Yabancı dil eğitimi için More&More Advanced serisini inceleyebilirsiniz. Ayrıca, digitürk ürünleri ile online sınav çözümleri ve video derslerden faydalanabilirsiniz.",
        "üniversite": "Üniversite sınavlarına hazırlık için Kurmay Yayınları'nın TYT ve AYT serileri, tüm dersler için kapsamlı kaynak setleri sunmaktadır. Özellikle Fenomen serisi soru bankaları ve Orjin serisi konu anlatımları ile sınavlara sistematik şekilde hazırlanabilirsiniz. Video çözümler ve online deneme sınavları ile de performansınızı ölçebilirsiniz."
      }
      
      // Önemli anahtar kelimelere yanıt verme
      for (const levelKey in levelResponses) {
        if (lowerMessage.includes(levelKey)) {
          return resolve(levelResponses[levelKey])
        }
      }
      
      // Daha spesifik yanıtları kontrol etme
      for (const key in detailedResponses) {
        if (lowerMessage.includes(key)) {
          const responses = detailedResponses[key]
          // Rastgele bir yanıt seçme
          const randomIndex = Math.floor(Math.random() * responses.length)
          return resolve(responses[randomIndex])
        }
      }
      
      // Genel sorulara yanıt verme
      if (lowerMessage.includes("ne yapabilirsin") || lowerMessage.includes("neler yapabilirsin")) {
        return resolve("Size Kurmay Yayınları'nın ürünleri, eğitim materyalleri, dijital içerikler, akıllı tahta uygulamaları, sınav hazırlık kaynakları ve bayilik sistemi hakkında bilgi verebilirim. Ayrıca, farklı eğitim seviyeleri için özel kitap önerileri sunabilirim. Hangi konuda daha detaylı bilgi almak istersiniz?")
      }
      
      if (lowerMessage.includes("öner") || lowerMessage.includes("tavsiye")) {
        return resolve("Kurmay Yayınları'nın en çok tercih edilen ürünleri arasında Fenomen serisi soru bankaları, More&More İngilizce eğitim setleri ve Akıllı Tahta uygulamaları yer almaktadır. Size özel bir öneri sunmam için hangi sınıf düzeyinde veya hangi ders için kaynak aradığınızı belirtebilir misiniz?")
      }
      
      // Varsayılan yanıt
      return resolve("Kurmay Yayınları hakkında size yardımcı olmak isterim. Ürünlerimiz, eğitim materyallerimiz, dijital içeriklerimiz veya diğer konular hakkında daha spesifik sorular sorarsanız size daha detaylı bilgi verebilirim. Örneğin; 'Fenomen serisi hakkında bilgi verir misin?' veya 'İlkokul öğrencileri için hangi kitapları önerirsiniz?' gibi sorular sorabilirsiniz.")
      
    }, 1000) // Gerçekçi bir gecikme ekle
  })
} 