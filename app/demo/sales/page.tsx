"use client"

import { useState } from "react"
import MainLayout from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Search, ScanLine, ShoppingCart, Trash2, Plus, Minus, RotateCcw, Calendar, Clock } from "lucide-react"
import { ReturnForm } from "@/components/sales/return-form"

// Generate mock data for drugs
const drugs = [
  { id: 1, name: "Paracetamol", batch: "B001", expiry: "2025-12-31", price: 5.99, vat: true },
  { id: 2, name: "Amoxicillin", batch: "B002", expiry: "2025-10-15", price: 12.5, vat: true },
  { id: 3, name: "Ibuprofen", batch: "B003", expiry: "2025-08-20", price: 7.25, vat: false },
  { id: 4, name: "Aspirin", batch: "B004", expiry: "2025-11-05", price: 4.5, vat: false },
  { id: 5, name: "Omeprazole", batch: "B005", expiry: "2025-09-10", price: 15.75, vat: true },
]

// Generate mock data for sales
const salesHistory = [
  { id: 1, date: "2025-05-15", time: "09:30", total: 45.75, items: 3 },
  { id: 2, date: "2025-05-15", time: "11:15", total: 28.5, items: 2 },
  { id: 3, date: "2025-05-14", time: "14:45", total: 67.25, items: 5 },
  { id: 4, date: "2025-05-14", time: "16:20", total: 12.99, items: 1 },
  { id: 5, date: "2025-05-13", time: "10:05", total: 34.5, items: 3 },
]

export default function SalesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState([])
  const [currency, setCurrency] = useState("USD")
  const [selectedDate, setSelectedDate] = useState("all")

  // VAT rate
  const VAT_RATE = 0.11

  // Exchange rate (1 USD = 15000 LL)
  const EXCHANGE_RATE = 15000

  const handleAddToCart = (drug) => {
    const existingItem = cart.find((item) => item.id === drug.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.id === drug.id ? { ...item, qty: item.qty + 1 } : item)))
    } else {
      setCart([...cart, { ...drug, qty: 1 }])
    }

    toast({
      title: "✔️ Action completed",
      description: `${drug.name} added to cart`,
    })
  }

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id)
      return
    }

    setCart(cart.map((item) => (item.id === id ? { ...item, qty: newQty } : item)))
  }

  const handleCheckout = () => {
    toast({
      title: "✔️ Action completed",
      description: "Checkout completed successfully",
    })
    setCart([])
  }

  const handleReturn = () => {
    toast({
      title: "✔️ Action completed",
      description: "Return processed successfully",
    })
  }

  const handleBarcodeInput = (e) => {
    if (e.target.value) {
      // Simulate finding a drug by barcode
      const randomDrug = drugs[Math.floor(Math.random() * drugs.length)]
      handleAddToCart(randomDrug)
      e.target.value = ""
    }
  }

  const toggleCurrency = () => {
    setCurrency(currency === "USD" ? "LL" : "USD")
  }

  // Filter drugs based on search term
  const filteredDrugs = drugs.filter((drug) => drug.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Filter sales history based on selected date
  const filteredSales = salesHistory.filter((sale) => {
    if (selectedDate === "all") return true
    return sale.date === selectedDate
  })

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.qty
  }, 0)

  // Calculate VAT
  const vat = cart.reduce((total, item) => {
    return total + (item.vat ? item.price * item.qty * VAT_RATE : 0)
  }, 0)

  // Calculate grand total
  const grandTotal = subtotal + vat

  // Format currency
  const formatCurrency = (amount) => {
    if (currency === "USD") {
      return `$${amount.toFixed(2)}`
    } else {
      return `${(amount * EXCHANGE_RATE).toLocaleString()} LL`
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Sales POS</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" onClick={toggleCurrency}>
              {currency === "USD" ? "$" : "LL"}
              Toggle Currency
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Sales Log
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Daily Sales Log</SheetTitle>
                  <SheetDescription>View your recent sales history.</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="mb-4">
                    <Label htmlFor="date-filter">Filter by Date</Label>
                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger id="date-filter">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Dates</SelectItem>
                        <SelectItem value="2025-05-15">May 15, 2025</SelectItem>
                        <SelectItem value="2025-05-14">May 14, 2025</SelectItem>
                        <SelectItem value="2025-05-13">May 13, 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    {filteredSales.map((sale) => (
                      <Card key={sale.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-sm">Sale #{sale.id}</CardTitle>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {sale.date}
                            </div>
                          </div>
                          <CardDescription className="flex justify-between">
                            <span>Items: {sale.items}</span>
                            <span>{sale.time}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-2">
                          <div className="flex justify-between w-full">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold">{formatCurrency(sale.total)}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search drugs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <ScanLine className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Scan barcode..."
                className="pl-8"
                onInput={handleBarcodeInput}
                autoFocus
              />
            </div>

            <div className="rounded-xl border shadow-sm">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Available Drugs</h2>
                <div className="space-y-2">
                  {filteredDrugs.map((drug) => (
                    <Card key={drug.id} className="overflow-hidden">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{drug.name}</h3>
                            <div className="text-sm text-muted-foreground">
                              Batch: {drug.batch} | Exp: {drug.expiry}
                            </div>
                            <div className="font-semibold mt-1">
                              {formatCurrency(drug.price)}
                              {drug.vat && <span className="text-xs ml-1">(+VAT)</span>}
                            </div>
                          </div>
                          <Button size="sm" onClick={() => handleAddToCart(drug)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border shadow-sm">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Cart
                  </h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Return
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Process Return</DialogTitle>
                        <DialogDescription>Enter the details of the items to be returned.</DialogDescription>
                      </DialogHeader>
                      <ReturnForm onSubmit={handleReturn} />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Drug Name</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead>Expiry</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>VAT</TableHead>
                        <TableHead>Line Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            Cart is empty. Add items to proceed.
                          </TableCell>
                        </TableRow>
                      ) : (
                        cart.map((item) => {
                          const lineTotal = item.price * item.qty
                          const lineVat = item.vat ? lineTotal * VAT_RATE : 0
                          const lineTotalWithVat = lineTotal + lineVat

                          return (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>{item.batch}</TableCell>
                              <TableCell>{item.expiry}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleUpdateQuantity(item.id, item.qty - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center">{item.qty}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleUpdateQuantity(item.id, item.qty + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>{formatCurrency(item.price)}</TableCell>
                              <TableCell>{item.vat ? `${(VAT_RATE * 100).toFixed(0)}%` : "-"}</TableCell>
                              <TableCell className="font-semibold">{formatCurrency(lineTotalWithVat)}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => handleRemoveFromCart(item.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={6} className="text-right">
                          Subtotal
                        </TableCell>
                        <TableCell colSpan={2}>{formatCurrency(subtotal)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={6} className="text-right">
                          VAT
                        </TableCell>
                        <TableCell colSpan={2}>{formatCurrency(vat)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={6} className="text-right font-bold">
                          Grand Total
                        </TableCell>
                        <TableCell colSpan={2} className="font-bold">
                          {formatCurrency(grandTotal)}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button size="lg" className="gap-2" disabled={cart.length === 0} onClick={handleCheckout}>
                    <ShoppingCart className="h-4 w-4" />
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
