import { Skeleton } from "@/components/ui/skeleton"

export default function BackupLoading() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-96 mt-2" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>

      <Skeleton className="h-12 w-96" />
      <Skeleton className="h-[400px] rounded-xl" />
    </div>
  )
}
