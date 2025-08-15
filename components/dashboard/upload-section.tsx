"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileAudio, X, CheckCircle, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface UploadedFile {
  id: string
  file: File
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  downloadUrl?: string
}

export function UploadSection() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "uploading" as const,
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload and processing
    newFiles.forEach((uploadedFile) => {
      simulateProcessing(uploadedFile.id)
    })
  }, [])

  const simulateProcessing = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "uploading") {
            const newProgress = Math.min(file.progress + 10, 100)
            if (newProgress === 100) {
              clearInterval(uploadInterval)
              setTimeout(() => {
                setUploadedFiles((prev) =>
                  prev.map((f) => (f.id === fileId ? { ...f, status: "processing", progress: 0 } : f)),
                )
                simulateAudioProcessing(fileId)
              }, 500)
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 200)
  }

  const simulateAudioProcessing = (fileId: string) => {
    const processingInterval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "processing") {
            const newProgress = Math.min(file.progress + 15, 100)
            if (newProgress === 100) {
              clearInterval(processingInterval)
              setTimeout(() => {
                setUploadedFiles((prev) =>
                  prev.map((f) =>
                    f.id === fileId
                      ? {
                          ...f,
                          status: "completed",
                          progress: 100,
                          downloadUrl: "#",
                        }
                      : f,
                  ),
                )
              }, 500)
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 300)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a", ".aac"],
      "video/*": [".mp4", ".avi", ".mov", ".mkv"],
    },
    maxSize: 500 * 1024 * 1024, // 500MB
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? "Drop files here" : "Upload your audio or video files"}
            </h3>
            <p className="text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
            <p className="text-sm text-muted-foreground">Supports MP3, WAV, MP4, AVI, MOV (up to 500MB)</p>
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Processing Files</h3>
            <div className="space-y-4">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <FileAudio className="w-8 h-8 text-primary flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{uploadedFile.file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>

                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="capitalize text-muted-foreground">
                          {uploadedFile.status === "uploading" && "Uploading..."}
                          {uploadedFile.status === "processing" && "Converting to stereo..."}
                          {uploadedFile.status === "completed" && "Completed"}
                          {uploadedFile.status === "error" && "Error"}
                        </span>
                        <span className="text-muted-foreground">{uploadedFile.progress}%</span>
                      </div>
                      <Progress value={uploadedFile.progress} className="h-2" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {uploadedFile.status === "completed" && (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <Button size="sm" asChild>
                          <a href={uploadedFile.downloadUrl} download>
                            Download
                          </a>
                        </Button>
                      </>
                    )}
                    {uploadedFile.status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
                    <Button variant="ghost" size="sm" onClick={() => removeFile(uploadedFile.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
