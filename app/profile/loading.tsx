import { DashboardLayout } from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-96 mt-2" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Skeleton className="h-[300px] w-full" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-[500px] w-full" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
