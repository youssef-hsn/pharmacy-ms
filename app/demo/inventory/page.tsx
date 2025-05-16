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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Search, ScanLine } from "lucide-react"
import { AddDrugForm } from "@/components/inventory/add-drug-form"
import { EditDrugForm } from "@/components/inventory/edit-drug-form"

// Generate mock data
const generateMockData = () => {
  const drugs = []
  const names = [
    "Paracetamol",
    "Amoxicillin",
    "Ibuprofen",
    "Aspirin",
    "Omeprazole",
    "Metformin",
    "Atorvastatin",
    "Lisinopril",
    "Amlodipine",
    "Simvastatin",
  ]

  for (let i = 0; i < 100; i++) {
    const name = names[Math.floor(Math.random() * names.length)]
    const code = `MED${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`
    const batch = `B${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`

    // Random date between now and 2 years from now
    const today = new Date()
    const futureDate = new Date()
    futureDate.setFullYear(today.getFullYear() + 2)
    const randomDate = new Date(today.getTime() + Math.random() * (futureDate.getTime() - today.getTime()))

    // Format date as YYYY-MM-DD
    const expiry = randomDate.toISOString().split("T")[0]

    const qty = Math.floor(Math.random() * 100)
    const unitPrice = (Math.random() * 50 + 5).toFixed(2)
    const vat = Math.random() > 0.5

    drugs.push({
      id: i + 1,
      name,
      code,
      batch,
      expiry,
      qty,
      unitPrice,
      vat,
    })
  }

  return drugs
}

const drugs = generateMockData()

export default function InventoryPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [showVatOnly, setShowVatOnly] = useState(false)
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [showNearExpiryOnly, setShowNearExpiryOnly] = useState(false)
  const [selectedDrug, setSelectedDrug] = useState(null)
  const [isAddDrugOpen, setIsAddDrugOpen] = useState(false)
  const [isEditDrugOpen, setIsEditDrugOpen] = useState(false)

  const handleAddDrug = () => {
    toast({
      title: "✔️ Action completed",
      description: "Drug added successfully",
    })
    setIsAddDrugOpen(false)
  }

  const handleEditDrug = () => {
    toast({
      title: "✔️ Action completed",
      description: "Drug updated successfully",
    })
    setIsEditDrugOpen(false)
  }

  const handleRemoveExpired = () => {
    toast({
      title: "✔️ Action completed",
      description: "Expired drugs removed successfully",
    })
  }

  const handleBarcodeInput = (e) => {
    if (e.target.value) {
      toast({
        title: "✔️ Action completed",
        description: `Barcode ${e.target.value} scanned successfully`,
      })
      e.target.value = ""
    }
  }

  // Filter drugs based on search term and filters
  const filteredDrugs = drugs.filter((drug) => {
    const matchesSearch =
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVat = showVatOnly ? drug.vat : true
    const matchesInStock = showInStockOnly ? drug.qty > 0 : true

    // Check if expiry is within 30 days
    const expiryDate = new Date(drug.expiry)
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)
    const isNearExpiry = expiryDate <= thirtyDaysFromNow && expiryDate >= today
    const matchesNearExpiry = showNearExpiryOnly ? isNearExpiry : true

    return matchesSearch && matchesVat && matchesInStock && matchesNearExpiry
  })

  // Check if drug is near expiry or low stock
  const getDrugRowClass = (drug) => {
    const expiryDate = new Date(drug.expiry)
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)

    if (expiryDate <= thirtyDaysFromNow && expiryDate >= today) {
      return "bg-red-100 dark:bg-red-900/20"
    } else if (drug.qty < 10) {
      return "bg-amber-100 dark:bg-amber-900/20"
    }

    return ""
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Inventory</h1>
          <div className="flex items-center gap-2">
            <Dialog open={isAddDrugOpen} onOpenChange={setIsAddDrugOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Drug
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Drug</DialogTitle>
                  <DialogDescription>Enter the details of the new drug to add to inventory.</DialogDescription>
                </DialogHeader>
                <AddDrugForm onSubmit={handleAddDrug} />
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Remove Expired
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Expired Drugs</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will remove all expired drugs from inventory. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRemoveExpired}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search drugs by name or code..."
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
              className="pl-8 w-full sm:w-[200px]"
              onInput={handleBarcodeInput}
              autoFocus
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={showVatOnly ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setShowVatOnly(!showVatOnly)}
          >
            VAT Only
          </Badge>
          <Badge
            variant={showInStockOnly ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setShowInStockOnly(!showInStockOnly)}
          >
            In Stock
          </Badge>
          <Badge
            variant={showNearExpiryOnly ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setShowNearExpiryOnly(!showNearExpiryOnly)}
          >
            Near Expiry
          </Badge>
        </div>

        <div className="rounded-xl border shadow-sm">
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead>Drug Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>VAT</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrugs.slice(0, 10).map((drug) => (
                  <TableRow key={drug.id} className={getDrugRowClass(drug)}>
                    <TableCell className="font-medium">{drug.name}</TableCell>
                    <TableCell>{drug.code}</TableCell>
                    <TableCell>{drug.batch}</TableCell>
                    <TableCell>{drug.expiry}</TableCell>
                    <TableCell>{drug.qty}</TableCell>
                    <TableCell>${drug.unitPrice}</TableCell>
                    <TableCell>{drug.vat ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <Dialog open={isEditDrugOpen} onOpenChange={setIsEditDrugOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedDrug(drug)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Drug</DialogTitle>
                            <DialogDescription>Update the details of the selected drug.</DialogDescription>
                          </DialogHeader>
                          {selectedDrug && <EditDrugForm drug={selectedDrug} onSubmit={handleEditDrug} />}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
