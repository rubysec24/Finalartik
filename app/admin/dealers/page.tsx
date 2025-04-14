"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash, Loader2 } from "lucide-react"
import DealerForm from "../components/DealerForm"

type Dealer = {
  id: number
  name: string
  address: string
  phone: string
  email: string
  city: string
  district: string
  publications: string[]
}

export default function DealersPage() {
  const router = useRouter()
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingDealer, setEditingDealer] = useState<Dealer | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [activeTab, setActiveTab] = useState("list")
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  
  // Bayileri yükle
  useEffect(() => {
    fetchDealers()
  }, [])
  
  // Bayileri API'den çek
  const fetchDealers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/db?type=dealers")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setDealers(data)
      setError(null)
    } catch (err) {
      console.error("Bayi verisi çekme hatası:", err)
      setError("Bayiler yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }
  
  // Yeni bayi ekleme veya bayi düzenleme işlemini sonlandır
  const handleFormSubmit = (data: any) => {
    if (data === null) {
      // Kullanıcı iptal etti
      setIsAdding(false)
      setEditingDealer(null)
      setActiveTab("list")
      return
    }
    
    if (editingDealer) {
      // Güncelleme sonrası bayileri yenile
      fetchDealers()
      setEditingDealer(null)
    } else {
      // Yeni bayi ekleme sonrası bayileri yenile
      fetchDealers()
      setIsAdding(false)
    }
    
    setActiveTab("list")
  }
  
  // Bayi silme
  const handleDeleteDealer = async (id: number) => {
    if (!confirm("Bu bayiyi silmek istediğinizden emin misiniz?")) {
      return
    }
    
    try {
      setIsDeleting(id)
      const response = await fetch(`/api/db?type=dealers&id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // Bayi başarıyla silindi, listeyi güncelle
      setDealers(dealers.filter(dealer => dealer.id !== id))
    } catch (err) {
      console.error("Bayi silme hatası:", err)
      alert("Bayi silinirken bir hata oluştu.")
    } finally {
      setIsDeleting(null)
    }
  }
  
  // Bayi düzenleme moduna geç
  const handleEditDealer = (dealer: Dealer) => {
    setEditingDealer(dealer)
    setActiveTab("edit")
  }
  
  // Yeni bayi ekleme moduna geç
  const handleAddDealer = () => {
    setIsAdding(true)
    setActiveTab("add")
  }
  
  return (
    <div className="container mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Bayiler</h1>
          <div className="flex gap-2">
            <TabsList>
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="add" disabled={isAdding || editingDealer !== null}>
                Yeni Ekle
              </TabsTrigger>
              {editingDealer && <TabsTrigger value="edit">Düzenle</TabsTrigger>}
            </TabsList>
            {activeTab === "list" && (
              <Button onClick={handleAddDealer}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Yeni Bayi
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Bayi Listesi</CardTitle>
              <CardDescription>
                Sistemde kayıtlı tüm bayileri görüntüle, düzenle veya sil.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}
              
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : dealers.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  Henüz kayıtlı bayi bulunmamaktadır.
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Ad</TableHead>
                        <TableHead>Şehir</TableHead>
                        <TableHead>İlçe</TableHead>
                        <TableHead>Telefon</TableHead>
                        <TableHead>İşlem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dealers.map((dealer) => (
                        <TableRow key={dealer.id}>
                          <TableCell className="font-medium">{dealer.id}</TableCell>
                          <TableCell>{dealer.name}</TableCell>
                          <TableCell>{dealer.city}</TableCell>
                          <TableCell>{dealer.district}</TableCell>
                          <TableCell>{dealer.phone}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditDealer(dealer)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteDealer(dealer.id)}
                                disabled={isDeleting === dealer.id}
                              >
                                {isDeleting === dealer.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <DealerForm onSubmit={handleFormSubmit} />
        </TabsContent>
        
        <TabsContent value="edit">
          {editingDealer && <DealerForm initialData={editingDealer} onSubmit={handleFormSubmit} />}
        </TabsContent>
      </Tabs>
    </div>
  )
} 