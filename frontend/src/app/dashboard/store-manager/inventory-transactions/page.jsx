'use client'
import { useEffect, useState } from "react";

import { fetchSales } from "@/api/sales-call";

import { fetchInventoryTransactions } from "@/api/transactions-calls";

import { fetchInventoryTransactionsByStoreManagerID } from "@/api/transactions-calls";
import { fetchEmployeeID } from "@/api/employee-call";

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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { CheckCheck } from "lucide-react"

import { markTransactionAsCompleted } from "@/api/transactions-calls";



export default function InventoryTransactionsPage() {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedFromLocation, setSelectedFromLocation] = useState("");
  const [selectedProductName, setSelectedProductName] = useState([]);


  const [inventoryTransactionsData, setinventoryTransactionsData] = useState([]);
  
  const fetchInventoryTransactionsWrapper = async (start_date, end_date, from_location, product_name) => {
    let start_date_query = start_date || "";
    let end_date_query = end_date || "";
    let from_location_query = from_location || "";
    let product_name_query = product_name || "";

    const storedUser = JSON.parse(localStorage.getItem("user"));
        const employeeIDResponse = await fetchEmployeeID(storedUser.username);
        if (!employeeIDResponse.success) {
          toast.error("Error", {
            description: employeeIDResponse.message,
          });
          return;
        }
        const manager_ID = employeeIDResponse.employee_ID;
    
    const inventoryTransactionsResponse = await fetchInventoryTransactionsByStoreManagerID(
      start_date_query,
      end_date_query,
      from_location_query,
      product_name_query,
      manager_ID
    );
    if (!inventoryTransactionsResponse.success) {
      console.error("Error fetching inventory transactions data:", inventoryTransactionsResponse.message);
      return;
    }
    return inventoryTransactionsResponse.inventory_transactions;
  }


  const applyFilter = async () => {

    if (
      (selectedStartDate && !/^\d{4}-\d{2}-\d{2}$/.test(selectedStartDate)) ||
      (selectedEndDate && !/^\d{4}-\d{2}-\d{2}$/.test(selectedEndDate))
    ) {
      toast.error("Invalid date format. Please use YYYY-MM-DD");
      return;
    }

    const inventoryTransactionsDdad = await fetchInventoryTransactionsWrapper(
      selectedStartDate,
      selectedEndDate,
      selectedFromLocation,
      selectedProductName
    );
    setinventoryTransactionsData(inventoryTransactionsDdad);
  }

  useEffect(() => {
    const fetchData = debounce(async () => {
      const inventoryTransactionsDdad = await fetchInventoryTransactionsWrapper(
        selectedStartDate,
        selectedEndDate,
        selectedFromLocation,
        selectedProductName
      );
      console.log(inventoryTransactionsDdad);
      setinventoryTransactionsData(inventoryTransactionsDdad);

    }, 300);
  
    fetchData();
  
    return () => fetchData.cancel();
  }, [ ]);
  
  const acceptTransactionHandler = async (transaction_ID) => {
    const acceptTransactionResponse = await markTransactionAsCompleted(transaction_ID);
    if (!acceptTransactionResponse.success) {
      toast.error("Error", {
        description: acceptTransactionResponse.message,
      });
      return;
    }
    toast.success("Transaction accepted successfully");
    applyFilter();
  };
  
  
  
  const columns = [
    {
      accessorKey: "transaction_ID",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction ID
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.getValue("transaction_ID")}</div>,
    },
    {
      accessorKey: "transaction_time",
      header: "Transaction time",
      cell: ({ row }) => {
        const rawDate = row.getValue("transaction_time");
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
            {/* {row.getValue("transaction_time")} */}
          </div>
        );
      },
    },
    {
      accessorKey: "product_name",
      header: "Product name",
      cell: ({ row }) => <div className="capitalize">{row.getValue("product_name")}</div>,
    },
    {
      accessorKey: "requested_to_location",
      header: "Requested from location",
      cell: ({ row }) => <div className="capitalize">{row.getValue("requested_to_location")}</div>,
    },
    {
      accessorKey: "requested_by_employee",
      header: "Employee name",
      cell: ({ row }) => <div className="capitalize">{row.getValue("requested_by_employee")}</div>,
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
    {
      accessorKey: "processed",
      header: "Processed (sent/accepted/completed)",
      cell: ({ row }) => <div className="capitalize">{row.getValue("processed")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
   
        return (
          row.getValue("processed") === "accepted" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 hover:text-green-500">
                  <CheckCheck />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently accept the stock transaction from the warehouse.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {acceptTransactionHandler(row.original.transaction_ID)}}>Accept</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )
  
         
        )
      },
    },
  ];

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: inventoryTransactionsData,
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
                <Input id="location" value={selectedFromLocation} placeholder="Requested from" className="col-span-3" onChange={(e) => setSelectedFromLocation(e.target.value)} />
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










