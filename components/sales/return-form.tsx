"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"

export function ReturnForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    reason: "",
    drug: "",
    quantity: "",
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="invoiceNumber" className="text-right">
            Invoice #
          </Label>
          <Input
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="reason" className="text-right">
            Reason
          </Label>
          <Select value={formData.reason} onValueChange={(value) => handleSelectChange("reason", value)} required>
            <SelectTrigger id="reason" className="col-span-3">
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="defective">Defective Product</SelectItem>
              <SelectItem value="wrong">Wrong Product</SelectItem>
              <SelectItem value="expired">Expired Product</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="drug" className="text-right">
            Drug
          </Label>
          <Select value={formData.drug} onValueChange={(value) => handleSelectChange("drug", value)} required>
            <SelectTrigger id="drug" className="col-span-3">
              <SelectValue placeholder="Select drug" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paracetamol">Paracetamol</SelectItem>
              <SelectItem value="amoxicillin">Amoxicillin</SelectItem>
              <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
              <SelectItem value="aspirin">Aspirin</SelectItem>
              <SelectItem value="omeprazole">Omeprazole</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantity
          </Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            className="col-span-3"
            required
          />
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
