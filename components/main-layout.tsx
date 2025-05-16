"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { redirect, usePathname } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Navbar } from "@/components/navbar"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Truck,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { toast } = useToast()
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const navItems = [
    { name: "Dashboard", path: "/demo/dashboard", icon: LayoutDashboard },
    { name: "Inventory", path: "/demo/inventory", icon: Package, badge: "12" },
    { name: "Sales POS", path: "/demo/sales", icon: ShoppingCart },
    { name: "Invoices", path: "/demo/invoices", icon: FileText },
    { name: "Purchasing & Suppliers", path: "/demo/purchasing", icon: Truck, badge: "3" },
    { name: "Reports", path: "/demo/reports", icon: BarChart3 },
    { name: "Users & Roles", path: "/demo/users", icon: Users },
    { name: "Settings", path: "/demo/settings", icon: Settings },
  ]

  const handleLogout = () => {
    redirect("/")
  }

  return (
    <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PharmaSys</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={pathname === item.path} tooltip={item.name}>
                    <Link href={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground">
                      {item.badge}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 md:p-6">
            {isOffline && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Offline Mode</AlertTitle>
                <AlertDescription>You are currently offline. Some features may be limited.</AlertDescription>
              </Alert>
            )}
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
