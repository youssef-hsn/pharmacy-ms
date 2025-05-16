"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"

// Mock data for purchase orders
const purchaseOrders = [
  { id: "PO-001", supplier: 1 },
  { id: "PO-002", supplier: 2 },
  { id: "PO-003", supplier: 3 },
  { id: "PO-004", supplier: 1 },
  { id: "PO-005", supplier: 2 },
]

// Mock data for drugs
const drugs = [
  { id: 1, name: "Paracetamol" },
  { id: 2, name: "Amoxicillin" },
  { id: 3, name: "Ibuprofen" },
  { id: 4, name: "Aspirin" },
  { id: 5, name: "Omeprazole" },
]

export function ReturnPurchaseForm({ suppliers, onSubmit }) {
  const [formData, setFormData] = useState({
    supplier: "",
    purchaseOrder: "",
    drug: "",
    batchId: "",
    quantity: "",
    reason: "",
    notes: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  // Filter purchase orders based on selected supplier
  const filteredPurchaseOrders = purchaseOrders.filter(
    (po) => !formData.supplier || po.supplier.toString() === formData.supplier,
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="supplier" className="text-right">
            Supplier
          </Label>
          <div className="col-span-3">
            <Select value={formData.supplier} onValueChange={(value) => handleSelectChange("supplier", value)} required>
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

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="purchaseOrder" className="text-right">
            Purchase Order
          </Label>
          <div className="col-span-3">
            <Select
              value={formData.purchaseOrder}
              onValueChange={(value) => handleSelectChange("purchaseOrder", value)}
              required
              disabled={!formData.supplier}
            >
              <SelectTrigger id="purchaseOrder">
                <SelectValue placeholder="Select purchase order" />
              </SelectTrigger>
              <SelectContent>
                {filteredPurchaseOrders.map((po) => (
                  <SelectItem key={po.id} value={po.id}>
                    {po.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="drug" className="text-right">
            Drug
          </Label>
          <div className="col-span-3">
            <Select value={formData.drug} onValueChange={(value) => handleSelectChange("drug", value)} required>
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
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="batchId" className="text-right">
            Batch ID
          </Label>
          <Input
            id="batchId"
            name="batchId"
            value={formData.batchId}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantity
          </Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="reason" className="text-right">
            Reason
          </Label>
          <div className="col-span-3">
            <Select value={formData.reason} onValueChange={(value) => handleSelectChange("reason", value)} required>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="damaged">Damaged Products</SelectItem>
                <SelectItem value="expired">Expired Products</SelectItem>
                <SelectItem value="wrong">Wrong Products</SelectItem>
                <SelectItem value="quality">Quality Issues</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="col-span-3"
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Process Return</Button>
      </DialogFooter>
    </form>
  )
}
