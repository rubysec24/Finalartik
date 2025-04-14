"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, Bell, BookOpen, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

const NewsletterSignup = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1500)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full"></div>

                {!submitted ? (
                  <div>
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      Yeniliklerden Haberdar Olun
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Yeni yayınlarımız, dijital içeriklerimiz ve eğitim dünyasındaki gelişmelerden haberdar olmak için
                      bültenimize abone olun.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="E-posta adresiniz"
                        className="w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        disabled={loading}
                      >
                        {loading ? "Gönderiliyor..." : "Abone Ol"}
                      </Button>
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        Abone olarak, gizlilik politikamızı kabul etmiş olursunuz.
                      </p>
                    </form>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Teşekkürler!</h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Bültenimize başarıyla abone oldunuz. En kısa sürede sizinle iletişime geçeceğiz.
                    </p>

                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => setSubmitted(false)}
                    >
                      Geri Dön
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Bültenimizle Neler Sunuyoruz?</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                      <Bell className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Güncel Haberler</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Eğitim dünyasındaki son gelişmeler ve yenilikler hakkında bilgi alın.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Yeni Yayınlar</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      En yeni kitaplarımız ve yayınlarımız hakkında ilk siz haberdar olun.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                      <Smartphone className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Özel Teklifler</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Abonelerimize özel indirimler ve kampanyalardan yararlanın.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Neden Abone Olmalısınız?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Eğitim dünyasındaki son gelişmelerden haberdar olun
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Yeni yayınlarımız hakkında ilk siz bilgi alın
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Özel indirim ve kampanyalardan yararlanın
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Eğitim içeriklerimiz hakkında özel ipuçları alın
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup

