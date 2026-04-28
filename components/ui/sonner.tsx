"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-zinc-900 group-[.toaster]:text-white group-[.toaster]:border-zinc-800 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-zinc-400",
          actionButton: "group-[.toast]:bg-purple-500 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-400",
          success: "group-[.toaster]:border-green-500/50",
          error: "group-[.toaster]:border-red-500/50",
          warning: "group-[.toaster]:border-yellow-500/50",
          info: "group-[.toaster]:border-blue-500/50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
