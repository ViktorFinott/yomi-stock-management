"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnalyticsChart } from "@/components/analytics-chart"
import { CategoryPieChart } from "@/components/category-pie-chart"
import { TopItemsTable } from "@/components/top-items-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Package, DollarSign, Activity } from "lucide-react"
import {
  getWeeklyData,
  getMonthlyData,
  getYearlyData,
  getCategoryDistribution,
  getMonthlyActivity,
  getTopItems,
} from "@/lib/analytics-data"

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "yearly">("monthly")

  const weeklyData = getWeeklyData()
  const monthlyData = getMonthlyData()
  const yearlyData = getYearlyData()
  const categoryData = getCategoryDistribution()
  const activityData = getMonthlyActivity()
  const topItems = getTopItems()

  const getCurrentData = () => {
    switch (period) {
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      case "yearly":
        return yearlyData
    }
  }

  const handleExportReport = () => {
    alert("Report export functionality - would generate PDF/Excel report")
  }

  const totalValue = categoryData.reduce((sum, cat) => sum + cat.value, 0)
  const totalItems = categoryData.reduce((sum, cat) => sum + cat.count, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Analytics & Reports</h1>
            <p className="text-muted-foreground mt-2">Comprehensive insights into your inventory performance</p>
          </div>
          <Button onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-green-500 mt-1">+12% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-green-500 mt-1">+8% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Item Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(totalValue / totalItems).toLocaleString()}</div>
              <p className="text-xs text-green-500 mt-1">+5% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Activity Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-green-500 mt-1">+3% from last period</p>
            </CardContent>
          </Card>
        </div>

        {/* Time Period Tabs */}
        <Tabs value={period} onValueChange={(v) => setPeriod(v as any)} className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>

          <TabsContent value={period} className="space-y-4">
            {/* Inventory Trends */}
            <AnalyticsChart
              title="Inventory Trends"
              description={`${period.charAt(0).toUpperCase() + period.slice(1)} overview of inventory status`}
              data={getCurrentData()}
              type="line"
              dataKeys={[
                { key: "total", color: "hsl(var(--primary))", name: "Total Items" },
                { key: "inStock", color: "hsl(var(--chart-1))", name: "In Stock" },
                { key: "lowStock", color: "hsl(var(--chart-4))", name: "Low Stock" },
                { key: "outOfStock", color: "hsl(var(--destructive))", name: "Out of Stock" },
              ]}
            />

            {/* Activity Chart */}
            <AnalyticsChart
              title="Inventory Activity"
              description="Items added, removed, and updated"
              data={activityData}
              type="bar"
              dataKeys={[
                { key: "added", color: "hsl(var(--chart-1))", name: "Added" },
                { key: "removed", color: "hsl(var(--destructive))", name: "Removed" },
                { key: "updated", color: "hsl(var(--chart-3))", name: "Updated" },
              ]}
            />
          </TabsContent>
        </Tabs>

        {/* Category Distribution and Top Items */}
        <div className="grid gap-4 md:grid-cols-2">
          <CategoryPieChart data={categoryData} />
          <TopItemsTable items={topItems} />
        </div>
      </div>
    </DashboardLayout>
  )
}
