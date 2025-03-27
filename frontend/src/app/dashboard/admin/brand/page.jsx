'use client'
import { useEffect, useState } from "react";

import { fetchFacilities } from "@/api/facility-calls";
import { deleteFacility } from "@/api/facility-calls";

import { fetchBrands, deleteBrand } from "@/api/brand-calls";

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


const facility_types = [
  ["all", "All"],
  ["store", "Store"],
  ["warehouse", "Warehouse"],
];




export default function BrandPage() {
  const [selectedFacilityType, setSelectedFacilityType] = useState("all");
  const [selectedFacilityLocation, setSelectedFacilityLocation] = useState("");

  const [selectedBrandName, setSelectedBrandName] = useState("");
  const [selectedBrandContactInfo, setSelectedBrandContactInfo] = useState("");
  const [brandData, setBrandData] = useState([]);

  const fetchBrandsWrapper = async (brand_name) => {
    let brand_name_query = brand_name || "";

    const fetchBrandsResponse = await fetchBrands(brand_name_query);
    if (!fetchBrandsResponse.success) {
      console.error("Error fetching brands:", fetchBrandsResponse.message);
      return;
    }
    return fetchBrandsResponse.brands;

  }



  useEffect(() => {
    const fetchData = debounce(async () => {
      const brandDdad = await fetchBrandsWrapper(selectedBrandName);
      console.log("Brand Data: ", brandDdad);

      setBrandData(brandDdad);
      
    }, 400);
  
    fetchData();
  
    return () => fetchData.cancel(); 
  }, [
    selectedBrandName
  ]);


  const deleteBrandWrapper = async (brand_name) => {
    console.log("Deleted brand! ", brand_name);

    const deleteBrandResponse = await deleteBrand(brand_name);
    if (!deleteBrandResponse.success) {
      console.error("Error deleting brand:", deleteBrandResponse.message);
      return;
    }

    toast.success("Brand deleted successfully!");
    
    const brandDdad = await fetchBrandsWrapper(selectedBrandName);
    setBrandData(brandDdad);
  }
  

  // TABLE CODE ###########################################################################

  const columns = [
    {
      accessorKey: "brand_name",
      header: "Brand name",
      cell: ({ row }) => <div className="capitalize">{row.getValue("brand_name")}</div>,
    },
    {
      accessorKey: "contact_info",
      header: "Contact info",
      cell: ({ row }) => <div className="capitalize">{row.getValue("contact_info")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
   
        return (
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
                  This action cannot be undone. This will permanently delete the brand from the servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500" onClick={() => deleteBrandWrapper(row.original.brand_name)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      },
    },
  ];

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: brandData,
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
                <Label htmlFor="brandName" className="text-right">
                  Name
                </Label>
                <Input id="brandName" value={selectedBrandName} placeholder="Brand Name" className="col-span-3" onChange={(e) => setSelectedBrandName(e.target.value)} />
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










