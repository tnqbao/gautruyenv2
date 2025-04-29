"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FirstVisitNotice() {
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore")
    if (!hasVisited) {
      setShowNotice(true)
      localStorage.setItem("hasVisitedBefore", "true")
    }
  }, [])

  if (!showNotice) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <span className="mr-2 text-2xl">🐼</span>
            <div>
              <h3 className="font-medium">Chào mừng đến với OTruyen!</h3>
              <p className="text-sm text-muted-foreground">
                Trang web này sử dụng cookie để cải thiện trải nghiệm của bạn. Tiếp tục sử dụng trang web đồng nghĩa với
                việc bạn đồng ý với chính sách cookie của chúng tôi.
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowNotice(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Đóng</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
