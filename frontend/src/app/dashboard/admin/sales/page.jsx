'use client'
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"






export default function SalesPage() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // TODOL use api call to fetch sales data
    const fakeSalesData = [
      {
      sales_id: 1,
      time: "2023-10-01T10:00:00Z",
      quantity: 2,
      salesman_id: 101,
      customer_id: 201,
      product_id: 301,
      store_id: 401,
      },
      {
      sales_id: 2,
      time: "2023-10-02T11:00:00Z",
      quantity: 1,
      salesman_id: 102,
      customer_id: 202,
      product_id: 302,
      store_id: 402,
      },
      
      // Add more fake data as needed
    ];
    setSalesData(fakeSalesData);
  }, []);

  return (
    <div className="p-10">
      <div className="font-semibold tracking-tight text-3xl">Sales details</div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sales ID</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Salesman ID</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead className="text">Store ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {salesData.map((sale) => (
              <TableRow key={sale.sales_id}>
                <TableCell>{sale.sales_id}</TableCell>
                <TableCell>{new Date(sale.time).toLocaleString()}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>{sale.salesman_id}</TableCell>
                <TableCell>{sale.customer_id}</TableCell>
                <TableCell>{sale.product_id}</TableCell>
                <TableCell className="text">{sale.store_id}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      
    </div>
  );
};
















