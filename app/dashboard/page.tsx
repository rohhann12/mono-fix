"use client"

import { useState } from "react"
import { DashboardHeader } from "../../components/dashboard/dashboard-header"
import { UploadSection } from "../../components/dashboard/upload-section"
import { FilesTab } from "../../components/dashboard/files-tab"
import { UsageStats } from "../../components/dashboard/usage-stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upload")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Upload and manage your audio files, track your usage</p>
        </div>

        <UsageStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="upload">Upload New File</TabsTrigger>
            <TabsTrigger value="files">My Files</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <UploadSection />
          </TabsContent>

          <TabsContent value="files" className="mt-6">
            <FilesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
