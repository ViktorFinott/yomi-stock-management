import { DashboardLayout } from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function CodeLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    </DashboardLayout>
  )
}
