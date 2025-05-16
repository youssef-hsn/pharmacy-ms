"use client"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"

// Mock data for invoice items
const mockItems = [
  { id: 1, name: "Paracetamol", price: 5.99, quantity: 2, vat: true },
  { id: 2, name: "Amoxicillin", price: 12.5, quantity: 1, vat: true },
  { id: 3, name: "Ibuprofen", price: 7.25, quantity: 3, vat: false },
]

export function InvoicePreview({ invoice }) {
  // Use mock items for the preview
  const items = mockItems

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  // Calculate VAT (11%)
  const vat = items.reduce((total, item) => {
    return total + (item.vat ? item.price * item.quantity * 0.11 : 0)
  }, 0)

  // Calculate grand total
  const grandTotal = subtotal + vat

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Invoice {invoice.id}
            {getStatusBadge(invoice.status)}
          </h2>
          <p className="text-muted-foreground">Date: {invoice.date}</p>
        </div>

        <div className="text-right">
          <h3 className="font-semibold">PharmaSys</h3>
          <p className="text-sm text-muted-foreground">123 Pharmacy Street</p>
          <p className="text-sm text-muted-foreground">Beirut, Lebanon</p>
          <p className="text-sm text-muted-foreground">info@pharmasys.com</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 p-4 border rounded-lg bg-muted/50">
        <div>
          <h3 className="font-semibold mb-1">Bill To:</h3>
          <p>{invoice.customer}</p>
          <p className="text-sm text-muted-foreground">customer@example.com</p>
          <p className="text-sm text-muted-foreground">+1 234 567 890</p>
        </div>

        <div className="text-right">
          <h3 className="font-semibold mb-1">Payment Details:</h3>
          <p className="text-sm">Payment Method: Cash</p>
          <p className="text-sm">Due Date: {invoice.date}</p>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">VAT</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const itemTotal = item.price * item.quantity
              const itemVat = item.vat ? itemTotal * 0.11 : 0
              const itemTotalWithVat = itemTotal + itemVat

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.vat ? "$" + (itemTotal * 0.11).toFixed(2) : "-"}</TableCell>
                  <TableCell className="text-right">${itemTotalWithVat.toFixed(2)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-right">
                Subtotal
              </TableCell>
              <TableCell className="text-right">${subtotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className="text-right">
                VAT
              </TableCell>
              <TableCell className="text-right">${vat.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className="text-right font-bold">
                Grand Total
              </TableCell>
              <TableCell className="text-right font-bold">${grandTotal.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Notes:</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for your business. Payment is due within 15 days of invoice date.
        </p>
      </div>
    </div>
  )
}
