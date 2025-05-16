"use client"

import { useState } from "react"
import MainLayout from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { UserPlus } from "lucide-react"
import { InviteUserForm } from "@/components/users/invite-user-form"

// Generate mock data for roles and permissions
const roles = [
  { id: 1, name: "Cashier" },
  { id: 2, name: "Manager" },
  { id: 3, name: "Auditor" },
]

const permissions = [
  { id: 1, name: "View Dashboard", description: "Access to view dashboard" },
  { id: 2, name: "Manage Inventory", description: "Add, edit, and remove drugs" },
  { id: 3, name: "Process Sales", description: "Process sales and returns" },
  { id: 4, name: "View Invoices", description: "View invoice details" },
  { id: 5, name: "Create Invoices", description: "Create new invoices" },
  { id: 6, name: "Manage Purchases", description: "Create purchase orders" },
  { id: 7, name: "View Reports", description: "Access to view reports" },
  { id: 8, name: "Manage Users", description: "Add and manage user accounts" },
  { id: 9, name: "System Settings", description: "Change system settings" },
]

// Generate mock role permissions
const rolePermissions = {
  1: [1, 3, 4], // Cashier
  2: [1, 2, 3, 4, 5, 6, 7], // Manager
  3: [1, 4, 7], // Auditor
}

export default function UsersPage() {
  const { toast } = useToast()
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false)
  const [rolePermissionsState, setRolePermissionsState] = useState(rolePermissions)

  const handleInviteUser = () => {
    toast({
      title: "✔️ Action completed",
      description: "User invitation sent successfully",
    })
    setIsInviteUserOpen(false)
  }

  const handlePermissionChange = (roleId, permissionId, checked) => {
    setRolePermissionsState((prev) => {
      const newPermissions = { ...prev }

      if (checked) {
        if (!newPermissions[roleId].includes(permissionId)) {
          newPermissions[roleId] = [...newPermissions[roleId], permissionId]
        }
      } else {
        newPermissions[roleId] = newPermissions[roleId].filter((id) => id !== permissionId)
      }

      toast({
        title: "✔️ Action completed",
        description: "Permission updated successfully",
      })

      return newPermissions
    })
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Users & Roles</h1>
          <Dialog open={isInviteUserOpen} onOpenChange={setIsInviteUserOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Invite User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite New User</DialogTitle>
                <DialogDescription>Send an invitation to a new user to join the system.</DialogDescription>
              </DialogHeader>
              <InviteUserForm roles={roles} onSubmit={handleInviteUser} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Role-Based Access Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permission</TableHead>
                    <TableHead>Description</TableHead>
                    {roles.map((role) => (
                      <TableHead key={role.id} className="text-center">
                        {role.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell className="font-medium">{permission.name}</TableCell>
                      <TableCell>{permission.description}</TableCell>
                      {roles.map((role) => (
                        <TableCell key={role.id} className="text-center">
                          <Checkbox
                            checked={rolePermissionsState[role.id].includes(permission.id)}
                            onCheckedChange={(checked) => handlePermissionChange(role.id, permission.id, checked)}
                            aria-label={`${role.name} ${permission.name} permission`}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
