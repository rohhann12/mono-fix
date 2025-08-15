"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileAudio, Download, Trash2, Search, Calendar } from "lucide-react"

interface ProcessedFile {
  id: string
  name: string
  originalSize: string
  processedSize: string
  status: "completed" | "processing" | "failed"
  createdAt: string
  downloadUrl: string
}

export function FilesTab() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in real app this would come from API
  const [files] = useState<ProcessedFile[]>([
    {
      id: "1",
      name: "podcast_episode_01.mp3",
      originalSize: "45.2 MB",
      processedSize: "46.1 MB",
      status: "completed",
      createdAt: "2024-01-15T10:30:00Z",
      downloadUrl: "#",
    },
    {
      id: "2",
      name: "interview_recording.wav",
      originalSize: "128.5 MB",
      processedSize: "129.8 MB",
      status: "completed",
      createdAt: "2024-01-14T15:45:00Z",
      downloadUrl: "#",
    },
    {
      id: "3",
      name: "video_call_recording.mp4",
      originalSize: "256.7 MB",
      processedSize: "258.1 MB",
      status: "processing",
      createdAt: "2024-01-14T09:20:00Z",
      downloadUrl: "#",
    },
    {
      id: "4",
      name: "music_demo.m4a",
      originalSize: "12.3 MB",
      processedSize: "12.4 MB",
      status: "completed",
      createdAt: "2024-01-13T14:15:00Z",
      downloadUrl: "#",
    },
    {
      id: "5",
      name: "webinar_audio.mp3",
      originalSize: "89.1 MB",
      processedSize: "90.2 MB",
      status: "failed",
      createdAt: "2024-01-12T11:00:00Z",
      downloadUrl: "#",
    },
  ])

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My Files ({filteredFiles.length})</span>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <FileAudio className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No files found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms" : "Upload your first file to get started"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <FileAudio className="w-8 h-8 text-primary flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{file.name}</p>
                      <Badge className={getStatusColor(file.status)}>{file.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        {file.originalSize} → {file.processedSize}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(file.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {file.status === "completed" && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={file.downloadUrl} download>
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </a>
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
