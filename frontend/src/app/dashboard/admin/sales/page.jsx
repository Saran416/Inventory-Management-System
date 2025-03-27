'use client'
import { useEffect, useState } from "react";

import { fetchSales } from "@/api/sales-call";

import { debounce } from "lodash";

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { toast } from "sonner";





export const columns = [
  {
    accessorKey: "sale_ID",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sales ID
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("sale_ID")}</div>,
  },
  {
    accessorKey: "sale_time",
    header: "Time",
    cell: ({ row }) => {
      const rawDate = row.getValue("sale_time");
      const date = new Date(rawDate);
      const formattedDate = date.toISOString().split("T")[0];
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return (
        <div className="capitalize">
          {formattedDate} {formattedTime}
        </div>
      );
    },
  },
  
  {
    accessorKey: "facility_location",
    header: "Location",
    cell: ({ row }) => <div className="capitalize">{row.getValue("facility_location")}</div>,
  },
  {
    accessorKey: "employee_name",
    header: "Employee name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("employee_name")}</div>,
  },
  {
    accessorKey: "customer_name",
    header: "Customer name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("customer_name")}</div>,
  },
  {
    accessorKey: "product_name",
    header: "Product name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("product_name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("quantity")}</div>,
  },
];

export default function SalesPage() {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalesman, setSelectedSalesman] = useState("");
  const [selectedProductName, setSelectedProductName] = useState([]);


  const [salesData, setSalesData] = useState([]);
  
  const fetchSalesWrapper = async (start_date, end_date, location, salesman_name, product_name) => {
    let start_date_query = start_date || "";
    let end_date_query = end_date || "";
    let location_query = location || "";
    let salesman_name_query = salesman_name || "";
    let product_name_query = product_name || "";
    
    const salesResponse = await fetchSales(start_date_query, end_date_query, location_query, salesman_name_query, product_name_query);

    if (!salesResponse.success) {
      console.error("Error fetching sales data:", salesResponse.message);
      return;
    }
    return salesResponse.sales;
  }

  const applyFilter = async () => {

    if (
      (selectedStartDate && !/^\d{4}-\d{2}-\d{2}$/.test(selectedStartDate)) ||
      (selectedEndDate && !/^\d{4}-\d{2}-\d{2}$/.test(selectedEndDate))
    ) {
      toast.error("Invalid date format. Please use YYYY-MM-DD");
      return;
    }

    const salesDdad = await fetchSalesWrapper(
      selectedStartDate,
      selectedEndDate,
      selectedLocation,
      selectedSalesman,
      selectedProductName
    );
    setSalesData(salesDdad);
  }

  useEffect(() => {
    const fetchData = debounce(async () => {
      const salesDdad = await fetchSalesWrapper(
        selectedStartDate,
        selectedEndDate,
        selectedLocation,
        selectedSalesman,
        selectedProductName
      );
  
      // console.log("salesDdad", salesDdad);
      setSalesData(salesDdad);
    }, 300); // 300ms delay to prevent excessive API calls
  
    fetchData();
  
    return () => fetchData.cancel(); // Cleanup on unmount
  }, [
    // selectedStartDate, selectedEndDate, selectedLocation, selectedSalesman, selectedProductName
  ]);
  


  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: salesData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });



  return (
    <div className="w-full px-5">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() || ""}
          onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        /> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Filter</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter</DialogTitle>
              {/* <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription> */}
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Start Date
                </Label>
                <Input id="selectedStartDate" value={selectedStartDate} placeholder="YYYY-MM-DD" onChange={(e) => setSelectedStartDate(e.target.value)}  className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  End Date
                </Label>
                <Input id="selectedEndDate" value={selectedEndDate} placeholder="YYYY-MM-DD" onChange={(e) => setSelectedEndDate(e.target.value)}  className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" value={selectedLocation} className="col-span-3" onChange={(e) => setSelectedLocation(e.target.value)} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Salesman
                </Label>
                <Input id="name" value={selectedSalesman} placeholder="Name" className="col-span-3" onChange={(e) => setSelectedSalesman(e.target.value)}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Product
                </Label>
                <Input id="name" value={selectedProductName} placeholder="Name" className="col-span-3" onChange={(e) => setSelectedProductName(e.target.value)}/>
              </div>
              
            </div>
            <DialogFooter>
              <Button type="submit" onClick={applyFilter}>Apply Filter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border p-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}










