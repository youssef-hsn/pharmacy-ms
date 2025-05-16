"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { DialogFooter } from "@/components/ui/dialog"
import { Plus, Trash2 } from "lucide-react"

// Mock data for drugs
const drugs = [
  { id: 1, name: "Paracetamol", price: 3.5 },
  { id: 2, name: "Amoxicillin", price: 8.75 },
  { id: 3, name: "Ibuprofen", price: 4.25 },
  { id: 4, name: "Aspirin", price: 2.5 },
  { id: 5, name: "Omeprazole", price: 10.25 },
]

export function NewPurchaseForm({ suppliers, onSubmit }) {
  const [selectedSupplier, setSelectedSupplier] = useState("")
  const [batches, setBatches] = useState([])
  const [newBatch, setNewBatch] = useState({
    drug: "",
    batchId: "",
    expiry: "",
    quantity: "",
    unitPrice: "",
    discount: "0",
  })

  const handleSupplierChange = (value) => {
    setSelectedSupplier(value)
  }

  const handleNewBatchChange = (e) => {
    const { name, value } = e.target
    setNewBatch((prev) => ({ ...prev, [name]: value }))
  }

  const handleDrugChange = (value) => {
    const drug = drugs.find((d) => d.id.toString() === value)
    setNewBatch((prev) => ({
      ...prev,
      drug: value,
      unitPrice: drug ? drug.price.toString() : "",
    }))
  }

  const handleAddBatch = () => {
    if (!newBatch.drug || !newBatch.batchId || !newBatch.expiry || !newBatch.quantity || !newBatch.unitPrice) {
      return
    }

    const drug = drugs.find((d) => d.id.toString() === newBatch.drug)

    const batch = {
      id: Date.now(),
      drugId: Number.parseInt(newBatch.drug),
      drugName: drug ? drug.name : "",
      batchId: newBatch.batchId,
      expiry: newBatch.expiry,
      quantity: Number.parseInt(newBatch.quantity),
      unitPrice: Number.parseFloat(newBatch.unitPrice),
      discount: Number.parseFloat(newBatch.discount) || 0,
    }

    setBatches([...batches, batch])

    setNewBatch({
      drug: "",
      batchId: "",
      expiry: "",
      quantity: "",
      unitPrice: "",
      discount: "0",
    })
  }

  const handleRemoveBatch = (id) => {
    setBatches(batches.filter((batch) => batch.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedSupplier || batches.length === 0) {
      return
    }

    const formData = {
      supplier: selectedSupplier,
      batches,
    }

    onSubmit(formData)
  }

  // Calculate subtotal
  const subtotal = batches.reduce((total, batch) => {
    return total + batch.unitPrice * batch.quantity
  }, 0)

  // Calculate total discount
  const totalDiscount = batches.reduce((total, batch) => {
    return total + batch.unitPrice * batch.quantity * (batch.discount / 100)
  }, 0)

  // Calculate grand total
  const grandTotal = subtotal - totalDiscount

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="supplier" className="text-right">
            Supplier
          </Label>
          <div className="col-span-3">
            <Select value={selectedSupplier} onValueChange={handleSupplierChange} required>
              <SelectTrigger id="supplier">
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id.toString()}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">Add Batches</h3>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
            <div className="col-span-2">
              <Label htmlFor="drug" className="mb-2 block">
                Drug
              </Label>
              <Select value={newBatch.drug} onValueChange={handleDrugChange}>
                <SelectTrigger id="drug">
                  <SelectValue placeholder="Select drug" />
                </SelectTrigger>
                <SelectContent>
                  {drugs.map((drug) => (
                    <SelectItem key={drug.id} value={drug.id.toString()}>
                      {drug.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="batchId" className="mb-2 block">
                Batch ID
              </Label>
              <Input id="batchId" name="batchId" value={newBatch.batchId} onChange={handleNewBatchChange} />
            </div>

            <div>
              <Label htmlFor="expiry" className="mb-2 block">
                Expiry
              </Label>
              <Input id="expiry" name="expiry" type="date" value={newBatch.expiry} onChange={handleNewBatchChange} />
            </div>

            <div>
              <Label htmlFor="quantity" className="mb-2 block">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={newBatch.quantity}
                onChange={handleNewBatchChange}
              />
            </div>

            <div>
              <Label htmlFor="unitPrice" className="mb-2 block">
                Unit Price
              </Label>
              <Input
                id="unitPrice"
                name="unitPrice"
                type="number"
                step="0.01"
                min="0"
                value={newBatch.unitPrice}
                onChange={handleNewBatchChange}
              />
            </div>

            <div>
              <Label htmlFor="discount" className="mb-2 block">
                Discount %
              </Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={newBatch.discount}
                onChange={handleNewBatchChange}
              />
            </div>

            <div className="col-span-2 md:col-span-6 flex justify-end">
              <Button
                type="button"
                onClick={handleAddBatch}
                disabled={
                  !newBatch.drug || !newBatch.batchId || !newBatch.expiry || !newBatch.quantity || !newBatch.unitPrice
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Batch
              </Button>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Drug</TableHead>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No batches added yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  batches.map((batch) => {
                    const total = batch.unitPrice * batch.quantity
                    const discountAmount = total * (batch.discount / 100)
                    const totalAfterDiscount = total - discountAmount

                    return (
                      <TableRow key={batch.id}>
                        <TableCell className="font-medium">{batch.drugName}</TableCell>
                        <TableCell>{batch.batchId}</TableCell>
                        <TableCell>{batch.expiry}</TableCell>
                        <TableCell>{batch.quantity}</TableCell>
                        <TableCell>${batch.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>{batch.discount}%</TableCell>
                        <TableCell>${totalAfterDiscount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveBatch(batch.id)}>
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
                  <TableCell colSpan={2}>${subtotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} className="text-right">
                    Total Discount
                  </TableCell>
                  <TableCell colSpan={2}>${totalDiscount.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} className="text-right font-bold">
                    Grand Total
                  </TableCell>
                  <TableCell colSpan={2} className="font-bold">
                    ${grandTotal.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={!selectedSupplier || batches.length === 0}>
          Create Purchase Order
        </Button>
      </DialogFooter>
    </form>
  )
}
