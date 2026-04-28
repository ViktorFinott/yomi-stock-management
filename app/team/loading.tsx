import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TeamLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-48 bg-primary/10 rounded-lg animate-pulse" />
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-2 border-primary/30">
            <CardHeader className="pb-3">
              <div className="h-5 w-32 bg-primary/10 rounded-lg animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-primary/10 rounded-lg animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
