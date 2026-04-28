"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { TopItem } from "@/lib/analytics-data"

interface TopItemsTableProps {
  items: TopItem[]
}

export function TopItemsTable({ items }: TopItemsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Items by Value</CardTitle>
        <CardDescription>Highest value inventory items</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Total Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right font-semibold text-primary">{formatCurrency(item.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
