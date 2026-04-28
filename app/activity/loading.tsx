import { Skeleton } from "@/components/ui/skeleton"

export default function ActivityLoading() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>

      <Skeleton className="h-16 rounded-xl" />
      <Skeleton className="h-[500px] rounded-xl" />
    </div>
  )
}
