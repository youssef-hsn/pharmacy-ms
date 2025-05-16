"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"

export function AddDrugForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    batch: "",
    expiry: "",
    qty: "",
    unitPrice: "",
    vat: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, vat: checked }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="code" className="text-right">
            Code
          </Label>
          <Input id="code" name="code" value={formData.code} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="batch" className="text-right">
            Batch
          </Label>
          <Input
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="expiry" className="text-right">
            Expiry Date
          </Label>
          <Input
            id="expiry"
            name="expiry"
            type="date"
            value={formData.expiry}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="qty" className="text-right">
            Quantity
          </Label>
          <Input
            id="qty"
            name="qty"
            type="number"
            value={formData.qty}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="unitPrice" className="text-right">
            Unit Price
          </Label>
          <Input
            id="unitPrice"
            name="unitPrice"
            type="number"
            step="0.01"
            value={formData.unitPrice}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="vat" className="text-right">
            VAT Applicable
          </Label>
          <div className="col-span-3 flex items-center space-x-2">
            <Checkbox id="vat" checked={formData.vat} onCheckedChange={handleCheckboxChange} />
            <label
              htmlFor="vat"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apply VAT to this drug
            </label>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Add Drug</Button>
      </DialogFooter>
    </form>
  )
}
