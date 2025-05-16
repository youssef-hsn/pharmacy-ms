"use client"

import { useState } from "react"
import MainLayout from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Truck, Calendar, CheckCircle, RotateCcw } from "lucide-react"
import { NewPurchaseForm } from "@/components/purchasing/new-purchase-form"
import { ReturnPurchaseForm } from "@/components/purchasing/return-purchase-form"

// Generate mock data for suppliers
const suppliers = [
  {
    id: 1,
    name: "MediSupply Inc.",
    contact: "John Smith",
    email: "john@medisupply.com",
    phone: "+1 234 567 890",
    balance: 1250.75,
  },
  {
    id: 2,
    name: "PharmaCorp",
    contact: "Sarah Johnson",
    email: "sarah@pharmacorp.com",
    phone: "+1 345 678 901",
    balance: 875.5,
  },
  {
    id: 3,
    name: "Global Meds",
    contact: "Michael Brown",
    email: "michael@globalmeds.com",
    phone: "+1 456 789 012",
    balance: 2100.25,
  },
  {
    id: 4,
    name: "HealthDrugs",
    contact: "Emily Davis",
    email: "emily@healthdrugs.com",
    phone: "+1 567 890 123",
    balance: 450.0,
  },
  {
    id: 5,
    name: "MediPharma",
    contact: "Robert Wilson",
    email: "robert@medipharma.com",
    phone: "+1 678 901 234",
    balance: 1800.5,
  },
]

// Generate mock data for pending deliveries
const pendingDeliveries = [
  {
    id: 1,
    supplier: "MediSupply Inc.",
    orderDate: "2025-05-10",
    expectedDate: "2025-05-18",
    items: 5,
    total: 750.25,
  },
  {
    id: 2,
    supplier: "PharmaCorp",
    orderDate: "2025-05-12",
    expectedDate: "2025-05-19",
    items: 3,
    total: 425.5,
  },
  {
    id: 3,
    supplier: "Global Meds",
    orderDate: "2025-05-14",
    expectedDate: "2025-05-21",
    items: 7,
    total: 1200.75,
  },
]

export default function PurchasingPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewPurchaseOpen, setIsNewPurchaseOpen] = useState(false)
  const [isReturnPurchaseOpen, setIsReturnPurchaseOpen] = useState(false)

  const handleNewPurchase = () => {
    toast({
      title: "✔️ Action completed",
      description: "Purchase order created successfully",
    })
    setIsNewPurchaseOpen(false)
  }

  const handleReturnPurchase = () => {
    toast({
      title: "✔️ Action completed",
      description: "Purchase return processed successfully",
    })
    setIsReturnPurchaseOpen(false)
  }

  const handleMarkReceived = (id) => {
    toast({
      title: "✔️ Action completed",
      description: `Delivery #${id} marked as received`,
    })
  }

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Purchasing & Suppliers</h1>
          <div className="flex items-center gap-2">
            <Dialog open={isNewPurchaseOpen} onOpenChange={setIsNewPurchaseOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Purchase
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>New Purchase Order</DialogTitle>
                  <DialogDescription>Create a new purchase order for a supplier.</DialogDescription>
                </DialogHeader>
                <NewPurchaseForm suppliers={suppliers} onSubmit={handleNewPurchase} />
              </DialogContent>
            </Dialog>

            <Dialog open={isReturnPurchaseOpen} onOpenChange={setIsReturnPurchaseOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Return
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Purchase Return</DialogTitle>
                  <DialogDescription>Process a return for a purchase order.</DialogDescription>
                </DialogHeader>
                <ReturnPurchaseForm suppliers={suppliers} onSubmit={handleReturnPurchase} />
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Truck className="h-4 w-4" />
                  Pending Deliveries
                  <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground">
                    {pendingDeliveries.length}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Pending Deliveries</SheetTitle>
                  <SheetDescription>View and manage your pending deliveries.</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    {pendingDeliveries.map((delivery) => (
                      <Card key={delivery.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-sm">Order #{delivery.id}</CardTitle>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {delivery.orderDate}
                            </div>
                          </div>
                          <CardDescription>Supplier: {delivery.supplier}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between text-sm">
                            <span>Items: {delivery.items}</span>
                            <span>Expected: {delivery.expectedDate}</span>
                          </div>
                          <div className="mt-1 font-medium">Total: ${delivery.total.toFixed(2)}</div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button className="w-full gap-2" onClick={() => handleMarkReceived(delivery.id)}>
                            <CheckCircle className="h-4 w-4" />
                            Mark as Received
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search suppliers by name or contact..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-xl border shadow-sm">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Supplier List</h2>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No suppliers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.contact}</TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>{supplier.phone}</TableCell>
                        <TableCell className="text-right">${supplier.balance.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
