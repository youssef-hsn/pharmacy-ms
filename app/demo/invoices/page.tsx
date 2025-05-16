"use client"

import { useState } from "react"
import MainLayout from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Search, FileText, Printer, Download, Plus, Calendar, User } from "lucide-react"
import { InvoiceWizard } from "@/components/invoices/invoice-wizard"
import { InvoicePreview } from "@/components/invoices/invoice-preview"

// Generate mock data for invoices
const invoices = [
  {
    id: "INV-001",
    customer: "John Doe",
    date: "2025-05-15",
    amount: 125.75,
    status: "approved",
  },
  {
    id: "INV-002",
    customer: "Jane Smith",
    date: "2025-05-14",
    amount: 78.5,
    status: "draft",
  },
  {
    id: "INV-003",
    customer: "Robert Johnson",
    date: "2025-05-12",
    amount: 245.0,
    status: "approved",
  },
  {
    id: "INV-004",
    customer: "Emily Davis",
    date: "2025-05-10",
    amount: 56.25,
    status: "returned",
  },
  {
    id: "INV-005",
    customer: "Michael Wilson",
    date: "2025-05-08",
    amount: 189.99,
    status: "approved",
  },
]

export default function InvoicesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [customerFilter, setCustomerFilter] = useState("")
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  const handlePrint = () => {
    toast({
      title: "✔️ Action completed",
      description: "Invoice sent to printer",
    })
  }

  const handleExport = () => {
    toast({
      title: "✔️ Action completed",
      description: "Invoice exported as PDF",
    })
  }

  const handleCreateInvoice = (invoiceData) => {
    toast({
      title: "✔️ Action completed",
      description: "Invoice created successfully",
    })
    setIsWizardOpen(false)
  }

  // Filter invoices based on search term and filters
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = dateFilter ? invoice.date === dateFilter : true
    const matchesCustomer = customerFilter
      ? invoice.customer.toLowerCase().includes(customerFilter.toLowerCase())
      : true

    return matchesSearch && matchesDate && matchesCustomer
  })

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "returned":
        return <Badge variant="destructive">Returned</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <Button className="gap-2" onClick={() => setIsWizardOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices by ID or customer..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                placeholder="Filter by date"
                className="pl-8 w-full md:w-[180px]"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div className="relative">
              <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Filter by customer"
                className="pl-8 w-full md:w-[180px]"
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Invoice List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                            No invoices found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredInvoices.map((invoice) => (
                          <TableRow
                            key={invoice.id}
                            className={
                              selectedInvoice?.id === invoice.id ? "bg-muted" : "cursor-pointer hover:bg-muted/50"
                            }
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.customer}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Invoice Preview</CardTitle>
                {selectedInvoice && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1" onClick={handlePrint}>
                      <Printer className="h-4 w-4" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" onClick={handleExport}>
                      <Download className="h-4 w-4" />
                      Export PDF
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {selectedInvoice ? (
                  <InvoicePreview invoice={selectedInvoice} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <FileText className="h-12 w-12 mb-4" />
                    <h3 className="text-lg font-medium">No Invoice Selected</h3>
                    <p className="max-w-md">
                      Select an invoice from the list to preview it here, or create a new invoice.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {isWizardOpen && (
          <InvoiceWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} onSubmit={handleCreateInvoice} />
        )}
      </div>
    </MainLayout>
  )
}
