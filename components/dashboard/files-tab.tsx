"use client"

import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Trash2, Download, Loader2 } from "lucide-react"

type FileItem = {
  id: string
  name: string
  status: "processed" | "processing" | "failed" | "removed"
  downloadUrl?: string
}

export function FilesTab() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(false)

  // fetch files from backend (Prisma)
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/files")
        if (!res.ok) throw new Error("Failed to fetch files")
        const data = await res.json()
        setFiles(data.files)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchFiles()
  }, [])

  const handleDelete = async (fileId: string) => {
    try {
      const res = await fetch(`/api/files/${fileId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete file")
      setFiles((prev) => prev.filter((f) => f.id !== fileId))
    } catch (err) {
      console.error(err)
      alert("Error deleting file")
    }
  }

  const handlePop = async (fileId: string) => {
  try {
    const res = await fetch("/api/spitout", { method: "POST" })
    if (!res.ok) throw new Error("Failed to pop file from queue")

    // Optimistic update
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: "removed" } : f
      )
    )
  } catch (err) {
    console.error(err)
    alert("Error popping file from queue")
  }
}

  return (
    <div className="grid gap-4 text-white font-white">
      {loading && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && files.length === 0 && (
        <p className="text-muted-foreground text-center">No files found</p>
      )}

      {files.map((file) => (
        <Card key={file.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
            <span
              className={`px-2 py-1 rounded text-xs ${file.status === "processed"
                  ? "bg-green-100 text-green-700"
                  : file.status === "processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : file.status === "failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                }`}
            >
              {file.status}
            </span>
          </CardHeader>
          <CardContent className="flex gap-2">
            {file.status === "processed" && file.downloadUrl && (
              <Button
                size="sm"
                variant="default"
                onClick={() => window.open(file.downloadUrl, "_blank")}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            )}

            {file.status === "processing" && (
              <Button size="sm" variant="secondary" onClick={() => handlePop(file.id)}>
                Pop from Queue
              </Button>
            )}

            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(file.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
