"use client"

import { useState } from "react"
import MainLayout from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Download, Printer, BarChart3, LineChart, PieChart, TrendingUp, TrendingDown } from "lucide-react"
import { ProfitLossChart } from "@/components/reports/profit-loss-chart"
import { BestSellingChart } from "@/components/reports/best-selling-chart"
import { MoversChart } from "@/components/reports/movers-chart"
import { VatChart } from "@/components/reports/vat-chart"

export default function ReportsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profit-loss")

  const handleExport = () => {
    toast({
      title: "✔️ Action completed",
      description: "Report exported as CSV",
    })
  }

  const handlePrint = () => {
    toast({
      title: "✔️ Action completed",
      description: "Report sent to printer",
    })
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Reports</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" className="gap-2" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="profit-loss" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Profit/Loss</span>
            </TabsTrigger>
            <TabsTrigger value="best-selling" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Best-Selling</span>
            </TabsTrigger>
            <TabsTrigger value="movers" className="gap-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Fast/Slow Movers</span>
            </TabsTrigger>
            <TabsTrigger value="vat" className="gap-2">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Quarterly VAT</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profit-loss" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-6">
                  <ProfitLossChart />
                </div>

                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">Expenses</TableHead>
                        <TableHead className="text-right">Profit/Loss</TableHead>
                        <TableHead className="text-right">Margin %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>January</TableCell>
                        <TableCell className="text-right">$12,500.00</TableCell>
                        <TableCell className="text-right">$8,750.00</TableCell>
                        <TableCell className="text-right text-green-500">$3,750.00</TableCell>
                        <TableCell className="text-right">30.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>February</TableCell>
                        <TableCell className="text-right">$15,200.00</TableCell>
                        <TableCell className="text-right">$9,120.00</TableCell>
                        <TableCell className="text-right text-green-500">$6,080.00</TableCell>
                        <TableCell className="text-right">40.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>March</TableCell>
                        <TableCell className="text-right">$11,800.00</TableCell>
                        <TableCell className="text-right">$9,440.00</TableCell>
                        <TableCell className="text-right text-green-500">$2,360.00</TableCell>
                        <TableCell className="text-right">20.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April</TableCell>
                        <TableCell className="text-right">$10,500.00</TableCell>
                        <TableCell className="text-right">$11,550.00</TableCell>
                        <TableCell className="text-right text-red-500">-$1,050.00</TableCell>
                        <TableCell className="text-right">-10.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May</TableCell>
                        <TableCell className="text-right">$14,200.00</TableCell>
                        <TableCell className="text-right">$9,940.00</TableCell>
                        <TableCell className="text-right text-green-500">$4,260.00</TableCell>
                        <TableCell className="text-right">30.0%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="best-selling" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Best-Selling Drugs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-6">
                  <BestSellingChart />
                </div>

                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Drug Name</TableHead>
                        <TableHead className="text-right">Units Sold</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">Profit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell className="font-medium">Paracetamol</TableCell>
                        <TableCell className="text-right">1,250</TableCell>
                        <TableCell className="text-right">$6,250.00</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell className="font-medium">Amoxicillin</TableCell>
                        <TableCell className="text-right">980</TableCell>
                        <TableCell className="text-right">$12,250.00</TableCell>
                        <TableCell className="text-right">$4,900.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell className="font-medium">Ibuprofen</TableCell>
                        <TableCell className="text-right">875</TableCell>
                        <TableCell className="text-right">$4,375.00</TableCell>
                        <TableCell className="text-right">$1,750.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>4</TableCell>
                        <TableCell className="font-medium">Aspirin</TableCell>
                        <TableCell className="text-right">750</TableCell>
                        <TableCell className="text-right">$3,000.00</TableCell>
                        <TableCell className="text-right">$1,125.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>5</TableCell>
                        <TableCell className="font-medium">Omeprazole</TableCell>
                        <TableCell className="text-right">620</TableCell>
                        <TableCell className="text-right">$9,300.00</TableCell>
                        <TableCell className="text-right">$3,720.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fast & Slow Movers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-6">
                  <MoversChart />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={3} className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <TrendingUp className="h-4 w-4 text-green-500" />
                              Fast Movers
                            </div>
                          </TableHead>
                        </TableRow>
                        <TableRow>
                          <TableHead>Drug Name</TableHead>
                          <TableHead className="text-right">Turnover Rate</TableHead>
                          <TableHead className="text-right">Days in Stock</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Paracetamol</TableCell>
                          <TableCell className="text-right">12.5</TableCell>
                          <TableCell className="text-right">7</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Amoxicillin</TableCell>
                          <TableCell className="text-right">10.2</TableCell>
                          <TableCell className="text-right">9</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Ibuprofen</TableCell>
                          <TableCell className="text-right">9.8</TableCell>
                          <TableCell className="text-right">10</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={3} className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <TrendingDown className="h-4 w-4 text-red-500" />
                              Slow Movers
                            </div>
                          </TableHead>
                        </TableRow>
                        <TableRow>
                          <TableHead>Drug Name</TableHead>
                          <TableHead className="text-right">Turnover Rate</TableHead>
                          <TableHead className="text-right">Days in Stock</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Metformin</TableCell>
                          <TableCell className="text-right">0.8</TableCell>
                          <TableCell className="text-right">45</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Atorvastatin</TableCell>
                          <TableCell className="text-right">1.2</TableCell>
                          <TableCell className="text-right">38</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Lisinopril</TableCell>
                          <TableCell className="text-right">1.5</TableCell>
                          <TableCell className="text-right">30</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vat" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly VAT Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-6">
                  <VatChart />
                </div>

                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Quarter</TableHead>
                        <TableHead className="text-right">Total Sales</TableHead>
                        <TableHead className="text-right">VAT Sales</TableHead>
                        <TableHead className="text-right">Non-VAT Sales</TableHead>
                        <TableHead className="text-right">VAT Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Q1 2025</TableCell>
                        <TableCell className="text-right">$39,500.00</TableCell>
                        <TableCell className="text-right">$28,500.00</TableCell>
                        <TableCell className="text-right">$11,000.00</TableCell>
                        <TableCell className="text-right">$3,135.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Q2 2025</TableCell>
                        <TableCell className="text-right">$42,800.00</TableCell>
                        <TableCell className="text-right">$32,100.00</TableCell>
                        <TableCell className="text-right">$10,700.00</TableCell>
                        <TableCell className="text-right">$3,531.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Q3 2024</TableCell>
                        <TableCell className="text-right">$38,200.00</TableCell>
                        <TableCell className="text-right">$26,740.00</TableCell>
                        <TableCell className="text-right">$11,460.00</TableCell>
                        <TableCell className="text-right">$2,941.40</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Q4 2024</TableCell>
                        <TableCell className="text-right">$45,600.00</TableCell>
                        <TableCell className="text-right">$34,200.00</TableCell>
                        <TableCell className="text-right">$11,400.00</TableCell>
                        <TableCell className="text-right">$3,762.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
