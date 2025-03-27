'use client'
import { useEffect, useState } from "react";

import { fetchAllEmployees } from "@/api/employee-call";
import { deleteEmployee } from "@/api/employee-call";

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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
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

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";


const positions = [
  ["admin", "Admin"],
  ["auditor", "Auditor"],
  ["warehouse_manager", "Warehouse Manager"],
  ["warehouse_employee", "Warehouse Employee"],
  ["store_manager", "Store Manager"],
  ["store_employee", "Store Employee"],
  ["all", "All"],
];




export default function EmployeePage() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");

  const [employeeData, setEmployeeData] = useState([]);

  const fetchEmployeesWrapper = async (employee_name, position, location) => {
    let employee_name_query = employee_name || "";
    let position_query = (position === "all") ? "" : position;
    position_query = position_query || "";
    let location_query = location || "";

    const fetchAllEmployeesResponse = await fetchAllEmployees(employee_name_query, position_query, location_query);
    if (!fetchAllEmployeesResponse.success) {
      console.error("Error fetching sales data:", fetchAllEmployeesResponse.message);
      return;
    }
    return fetchAllEmployeesResponse.employees;
  }

  useEffect(() => {
    const fetchData = debounce(async () => {
      const employeesDdad = await fetchEmployeesWrapper(
        selectedEmployeeName,
        selectedPosition,
        selectedLocation
      );

      setEmployeeData(employeesDdad);
    }, 400);
  
    fetchData();
  
    return () => fetchData.cancel(); 
  }, [
    selectedEmployeeName, selectedPosition, selectedPosition
  ]);

  const deleteEmployeeWrapper = async (employee_ID) => {
    console.log("Deleted employee! ID= ", employee_ID);
    
    const deleteEmployeeResponse = await deleteEmployee(employee_ID);
    if (!deleteEmployeeResponse.success) {
      console.error("Error deleting employee:", deleteEmployeeResponse.message);
      return;
    }

    toast.success("Employee deleted successfully!");

    const employeesDdad = await fetchEmployeesWrapper(
      selectedEmployeeName,
      selectedPosition,
      selectedLocation
    );
    setEmployeeData(employeesDdad);
  }
  

  // TABLE CODE ###########################################################################

  const columns = [
    {
      accessorKey: "employee_ID",
      header: "Employee ID",
      cell: ({ row }) => <div className="capitalize">{row.getValue("employee_ID")}</div>,
    },
    {
      accessorKey: "employee_name",
      header: "Employee Name",
      cell: ({ row }) => <div className="capitalize">{row.getValue("employee_name")}</div>,
    },
    {
      accessorKey: "position",
      header: "Employee Position",
      cell: ({ row }) => {
        const positionKey = row.getValue("position");
        const position = positions.find((p) => p[0] === positionKey); 
        return <div className="capitalize">{position ? position[1] : "Unknown"}</div>;
      },
    },
    {
      accessorKey: "facility_location",
      header: "Place of work",
      cell: ({ row }) => <div className="capitalize">{row.getValue("facility_location")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
   
        return (
          row.getValue("position") !== "admin" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 hover:text-red-500">
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the employee from the servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500" onClick={() => deleteEmployeeWrapper(row.original.employee_ID)}>Delete</AlertDialogAction>
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
    data: employeeData,
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
                <Label htmlFor="location" className="text-right">
                  Name
                </Label>
                <Input id="name" value={selectedEmployeeName} placeholder="Name" className="col-span-3" onChange={(e) => setSelectedEmployeeName(e.target.value)}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" value={selectedLocation} className="col-span-3" onChange={(e) => setSelectedLocation(e.target.value)} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Position
                </Label>
                <Select onValueChange={setSelectedPosition} value={selectedPosition}>
                  <SelectTrigger className="col-span-3 w-full">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      positions.map((position) => (
                        <SelectItem key={position[0]} value={position[0]}>
                          {position[1]}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              
            </div>
            {/* <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter> */}
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










