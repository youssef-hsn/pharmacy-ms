"use client"

import { useState } from "react"
import MainLayout from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Upload, Database, CloudCog, CloudOff, Info } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [backupType, setBackupType] = useState("local")
  const [backupProgress, setBackupProgress] = useState(0)
  const [isBackingUp, setIsBackingUp] = useState(false)

  const handleBackupNow = () => {
    setIsBackingUp(true)
    setBackupProgress(0)

    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsBackingUp(false)

          toast({
            title: "✔️ Action completed",
            description: "Backup completed successfully",
          })

          return 100
        }
        return prev + 10
      })
    }, 1000)
  }

  const handleRestore = () => {
    toast({
      title: "✔️ Action completed",
      description: "Data restored successfully",
    })
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="backup">
          <TabsList>
            <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
            <TabsTrigger value="offline">Offline Mode</TabsTrigger>
          </TabsList>

          <TabsContent value="backup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Backup Settings</CardTitle>
                <CardDescription>Configure how your data is backed up and restored.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Backup Location</h3>
                  <RadioGroup value={backupType} onValueChange={setBackupType} className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="local" id="local" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="local" className="font-medium">
                          Local Backup
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Store backups on your local device. Faster but less secure.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="cloud" id="cloud" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="cloud" className="font-medium">
                          Cloud Backup
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Store backups in the cloud. More secure and accessible from anywhere.
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Manual Backup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a manual backup of your data. This may take up to 10 minutes.
                  </p>

                  {isBackingUp && (
                    <div className="mb-4">
                      <Progress value={backupProgress} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">Backing up... {backupProgress}%</p>
                    </div>
                  )}

                  <Button onClick={handleBackupNow} disabled={isBackingUp} className="gap-2">
                    <Database className="h-4 w-4" />
                    Backup Now
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Restore Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Restore your data from a backup file. This will replace all current data.
                  </p>

                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop a backup file, or click to browse
                    </p>
                    <Button variant="outline" onClick={handleRestore}>
                      Select Backup File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Offline Mode</CardTitle>
                <CardDescription>Configure how the system behaves when offline.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                  <Info className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1">About Offline Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      When your internet connection is lost, the system will automatically switch to offline mode. In
                      offline mode, you can continue to process sales and manage inventory, but some features may be
                      limited.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg border">
                    <CloudCog className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium mb-1">Available in Offline Mode</h3>
                      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                        <li>Process sales</li>
                        <li>View inventory</li>
                        <li>View customer information</li>
                        <li>Create draft invoices</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border">
                    <CloudOff className="h-5 w-5 mt-0.5 text-destructive" />
                    <div>
                      <h3 className="font-medium mb-1">Not Available in Offline Mode</h3>
                      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                        <li>Sync with cloud</li>
                        <li>Process returns</li>
                        <li>Generate reports</li>
                        <li>Create purchase orders</li>
                        <li>User management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Data created in offline mode will be automatically synced when your connection is restored.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
