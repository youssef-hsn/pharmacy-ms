"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2 } from "lucide-react"

// Mock data for drugs
const drugs = [
  { id: 1, name: "Paracetamol", price: 5.99, vat: true },
  { id: 2, name: "Amoxicillin", price: 12.5, vat: true },
  { id: 3, name: "Ibuprofen", price: 7.25, vat: false },
  { id: 4, name: "Aspirin", price: 4.5, vat: false },
  { id: 5, name: "Omeprazole", price: 15.75, vat: true },
]

export function InvoiceWizard({ isOpen, onClose, onSubmit }) {
  const [activeTab, setActiveTab] = useState("customer")
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    items: [],
    notes: "",
  })

  const [selectedDrug, setSelectedDrug] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleCustomerChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [name]: value,
      },
    }))
  }

  const handleAddItem = () => {
    if (!selectedDrug) return

    const drug = drugs.find((d) => d.id.toString() === selectedDrug)
    if (!drug) return

    const newItem = {
      id: Date.now(),
      drugId: drug.id,
      name: drug.name,
      price: drug.price,
      quantity: Number.parseInt(quantity),
      vat: drug.vat,
    }

    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))

    setSelectedDrug("")
    setQuantity(1)
  }

  const handleRemoveItem = (id) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const handleNotesChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      notes: e.target.value,
    }))
  }

  const handleNext = () => {
    if (activeTab === "customer") {
      setActiveTab("items")
    } else if (activeTab === "items") {
      setActiveTab("review")
    }
  }

  const handleBack = () => {
    if (activeTab === "items") {
      setActiveTab("customer")
    } else if (activeTab === "review") {
      setActiveTab("items")
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  // Calculate subtotal
  const subtotal = formData.items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  // Calculate VAT (11%)
  const vat = formData.items.reduce((total, item) => {
    return total + (item.vat ? item.price * item.quantity * 0.11 : 0)
  }, 0)

  // Calculate grand total
  const grandTotal = subtotal + vat

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>Create a new invoice by following the steps below.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customer">Customer Info</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.customer.name}
                onChange={handleCustomerChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.customer.email}
                onChange={handleCustomerChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.customer.phone}
                onChange={handleCustomerChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Textarea
                id="address"
                name="address"
                value={formData.customer.address}
                onChange={handleCustomerChange}
                className="col-span-3"
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="items" className="space-y-4 py-4">
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <Label htmlFor="drug" className="mb-2 block">
                  Drug
                </Label>
                <Select value={selectedDrug} onValueChange={setSelectedDrug}>
                  <SelectTrigger id="drug">
                    <SelectValue placeholder="Select drug" />
                  </SelectTrigger>
                  <SelectContent>
                    {drugs.map((drug) => (
                      <SelectItem key={drug.id} value={drug.id.toString()}>
                        {drug.name} - ${drug.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-24">
                <Label htmlFor="quantity" className="mb-2 block">
                  Qty
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="flex items-end">
                <Button onClick={handleAddItem} disabled={!selectedDrug}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Drug</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>VAT</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No items added yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    formData.items.map((item) => {
                      const itemTotal = item.price * item.quantity
                      const itemVat = item.vat ? itemTotal * 0.11 : 0
                      const itemTotalWithVat = itemTotal + itemVat

                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.vat ? "11%" : "-"}</TableCell>
                          <TableCell>${itemTotalWithVat.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
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
                    <TableCell colSpan={4} className="text-right">
                      Subtotal
                    </TableCell>
                    <TableCell colSpan={2}>${subtotal.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} className="text-right">
                      VAT
                    </TableCell>
                    <TableCell colSpan={2}>${vat.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} className="text-right font-bold">
                      Grand Total
                    </TableCell>
                    <TableCell colSpan={2} className="font-bold">
                      ${grandTotal.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <div>
              <Label htmlFor="notes" className="mb-2 block">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={handleNotesChange}
                rows={3}
                placeholder="Add any additional notes here..."
              />
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-4 py-4">
            <div className="rounded-lg border p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Name:</p>
                    <p>{formData.customer.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email:</p>
                    <p>{formData.customer.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone:</p>
                    <p>{formData.customer.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Address:</p>
                    <p>{formData.customer.address || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Items</h3>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Drug</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>VAT</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.items.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            No items added.
                          </TableCell>
                        </TableRow>
                      ) : (
                        formData.items.map((item) => {
                          const itemTotal = item.price * item.quantity
                          const itemVat = item.vat ? itemTotal * 0.11 : 0
                          const itemTotalWithVat = itemTotal + itemVat

                          return (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>${item.price.toFixed(2)}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.vat ? "11%" : "-"}</TableCell>
                              <TableCell>${itemTotalWithVat.toFixed(2)}</TableCell>
                            </TableRow>
                          )
                        })
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={4} className="text-right">
                          Subtotal
                        </TableCell>
                        <TableCell>${subtotal.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4} className="text-right">
                          VAT
                        </TableCell>
                        <TableCell>${vat.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-bold">
                          Grand Total
                        </TableCell>
                        <TableCell className="font-bold">${grandTotal.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>

              {formData.notes && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Notes</h3>
                  <p className="p-2 bg-muted rounded-md">{formData.notes}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          {activeTab !== "customer" && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <div>
            {activeTab !== "review" ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit}>Create Invoice</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
