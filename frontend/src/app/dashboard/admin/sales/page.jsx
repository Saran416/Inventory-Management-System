'use client'
import { useEffect, useState } from "react";

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




// export default function SalesPage() {
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     // TODOL use api call to fetch sales data
//     const fakeSalesData = [
//       {
//       sales_id: 1,
//       time: "2023-10-01T10:00:00Z",
//       quantity: 2,
//       salesman_id: 101,
//       customer_id: 201,
//       product_id: 301,
//       store_id: 401,
//       },
//       {
//       sales_id: 2,
//       time: "2023-10-02T11:00:00Z",
//       quantity: 1,
//       salesman_id: 102,
//       customer_id: 202,
//       product_id: 302,
//       store_id: 402,
//       },
      
//       // Add more fake data as needed
//     ];
//     setSalesData(fakeSalesData);
//   }, []);

//   return (
//     <div className="p-10">
//       <div className="font-semibold tracking-tight text-3xl">Sales details</div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Sales ID</TableHead>
//             <TableHead>Time</TableHead>
//             <TableHead>Quantity</TableHead>
//             <TableHead>Salesman ID</TableHead>
//             <TableHead>Customer ID</TableHead>
//             <TableHead>Product ID</TableHead>
//             <TableHead className="text">Store ID</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//             {salesData.map((sale) => (
//               <TableRow key={sale.sales_id}>
//                 <TableCell>{sale.sales_id}</TableCell>
//                 <TableCell>{new Date(sale.time).toLocaleString()}</TableCell>
//                 <TableCell>{sale.quantity}</TableCell>
//                 <TableCell>{sale.salesman_id}</TableCell>
//                 <TableCell>{sale.customer_id}</TableCell>
//                 <TableCell>{sale.product_id}</TableCell>
//                 <TableCell className="text">{sale.store_id}</TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>

      
//     </div>
//   );
// };



const daddta = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
    test_val: 10,
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
    test_val: 11,
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
    test_val: 12,
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
    test_val: 13,
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
    test_val: 14,
  },
];

const data = [
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
  {
    sales_id: 3,
    time: "2023-10-03T12:00:00Z",
    quantity: 3,
    salesman_id: 103,
    customer_id: 203,
    product_id: 303,
    store_id: 403,
  },
  {
    sales_id: 4,
    time: "2023-10-04T13:00:00Z",
    quantity: 4,
    salesman_id: 104,
    customer_id: 204,
    product_id: 304,
    store_id: 404,
  },
  {
    sales_id: 5,
    time: "2023-10-05T14:00:00Z",
    quantity: 5,
    salesman_id: 105,
    customer_id: 205,
    product_id: 305,
    store_id: 405,
  },
  {
    sales_id: 6,
    time: "2023-10-06T15:00:00Z",
    quantity: 6,
    salesman_id: 106,
    customer_id: 206,
    product_id: 306,
    store_id: 406,
  },
  {
    sales_id: 7,
    time: "2023-10-07T16:00:00Z",
    quantity: 7,
    salesman_id: 107,
    customer_id: 207,
    product_id: 307,
    store_id: 407,
  },
  {
    sales_id: 8,
    time: "2023-10-08T17:00:00Z",
    quantity: 8,
    salesman_id: 108,
    customer_id: 208,
    product_id: 308,
    store_id: 408,
  },
  {
    sales_id: 9,
    time: "2023-10-09T18:00:00Z",
    quantity: 9,
    salesman_id: 109,
    customer_id: 209,
    product_id: 309,
    store_id: 409,
  },
  {
    sales_id: 10,
    time: "2023-10-10T19:00:00Z",
    quantity: 10,
    salesman_id: 110,
    customer_id: 210,
    product_id: 310,
    store_id: 410,
  },
  {
    sales_id: 11,
    time: "2023-10-11T20:00:00Z",
    quantity: 11,
    salesman_id: 111,
    customer_id: 211,
    product_id: 311,
    store_id: 411,
  },
  {
    sales_id: 12,
    time: "2023-10-12T21:00:00Z",
    quantity: 12,
    salesman_id: 112,
    customer_id: 212,
    product_id: 312,
    store_id: 412,
  },
  {
    sales_id: 13,
    time: "2023-10-13T22:00:00Z",
    quantity: 13,
    salesman_id: 113,
    customer_id: 213,
    product_id: 313,
    store_id: 413,
  },
  {
    sales_id: 14,
    time: "2023-10-14T23:00:00Z",
    quantity: 14,
    salesman_id: 114,
    customer_id: 214,
    product_id: 314,
    store_id: 414,
  },
  {
    sales_id: 15,
    time: "2023-10-15T00:00:00Z",
    quantity: 15,
    salesman_id: 115,
    customer_id: 215,
    product_id: 315,
    store_id: 415,
  },
  {
    sales_id: 16,
    time: "2023-10-16T01:00:00Z",
    quantity: 16,
    salesman_id: 116,
    customer_id: 216,
    product_id: 316,
    store_id: 416,
  },
  {
    sales_id: 17,
    time: "2023-10-17T02:00:00Z",
    quantity: 17,
    salesman_id: 117,
    customer_id: 217,
    product_id: 317,
    store_id: 417,
  },
  {
    sales_id: 18,
    time: "2023-10-18T03:00:00Z",
    quantity: 18,
    salesman_id: 118,
    customer_id: 218,
    product_id: 318,
    store_id: 418,
  },
  {
    sales_id: 19,
    time: "2023-10-19T04:00:00Z",
    quantity: 19,
    salesman_id: 119,
    customer_id: 219,
    product_id: 319,
    store_id: 419,
  },
  {
    sales_id: 20,
    time: "2023-10-20T05:00:00Z",
    quantity: 20,
    salesman_id: 120,
    customer_id: 220,
    product_id: 320,
    store_id: 420,
  },
  {
    sales_id: 21,
    time: "2023-10-21T06:00:00Z",
    quantity: 21,
    salesman_id: 121,
    customer_id: 221,
    product_id: 321,
    store_id: 421,
  },
  {
    sales_id: 22,
    time: "2023-10-22T07:00:00Z",
    quantity: 22,
    salesman_id: 122,
    customer_id: 222,
    product_id: 322,
    store_id: 422,
  },
  {
    sales_id: 23,
    time: "2023-10-23T08:00:00Z",
    quantity: 23,
    salesman_id: 123,
    customer_id: 223,
    product_id: 323,
    store_id: 423,
  },
  {
    sales_id: 24,
    time: "2023-10-24T09:00:00Z",
    quantity: 24,
    salesman_id: 124,
    customer_id: 224,
    product_id: 324,
    store_id: 424,
  },
  {
    sales_id: 25,
    time: "2023-10-25T10:00:00Z",
    quantity: 25,
    salesman_id: 125,
    customer_id: 225,
    product_id: 325,
    store_id: 425,
  },
  {
    sales_id: 26,
    time: "2023-10-26T11:00:00Z",
    quantity: 26,
    salesman_id: 126,
    customer_id: 226,
    product_id: 326,
    store_id: 426,
  },
  {
    sales_id: 27,
    time: "2023-10-27T12:00:00Z",
    quantity: 27,
    salesman_id: 127,
    customer_id: 227,
    product_id: 327,
    store_id: 427,
  },
  {
    sales_id: 28,
    time: "2023-10-28T13:00:00Z",
    quantity: 28,
    salesman_id: 128,
    customer_id: 228,
    product_id: 328,
    store_id: 428,
  },
  {
    sales_id: 29,
    time: "2023-10-29T14:00:00Z",
    quantity: 29,
    salesman_id: 129,
    customer_id: 229,
    product_id: 329,
    store_id: 429,
  },
  {
    sales_id: 30,
    time: "2023-10-30T15:00:00Z",
    quantity: 30,
    salesman_id: 130,
    customer_id: 230,
    product_id: 330,
    store_id: 430,
  },
  {
    sales_id: 31,
    time: "2023-10-31T16:00:00Z",
    quantity: 31,
    salesman_id: 131,
    customer_id: 231,
    product_id: 331,
    store_id: 431,
  },
  {
    sales_id: 32,
    time: "2023-11-01T17:00:00Z",
    quantity: 32,
    salesman_id: 132,
    customer_id: 232,
    product_id: 332,
    store_id: 432,
  },
  {
    sales_id: 33,
    time: "2023-11-02T18:00:00Z",
    quantity: 33,
    salesman_id: 133,
    customer_id: 233,
    product_id: 333,
    store_id: 433,
  },
  {
    sales_id: 34,
    time: "2023-11-03T19:00:00Z",
    quantity: 34,
    salesman_id: 134,
    customer_id: 234,
    product_id: 334,
    store_id: 434,
  },
  {
    sales_id: 35,
    time: "2023-11-04T20:00:00Z",
    quantity: 35,
    salesman_id: 135,
    customer_id: 235,
    product_id: 335,
    store_id: 435,
  },
  {
    sales_id: 36,
    time: "2023-11-05T21:00:00Z",
    quantity: 36,
    salesman_id: 136,
    customer_id: 236,
    product_id: 336,
    store_id: 436,
  },
  {
    sales_id: 37,
    time: "2023-11-06T22:00:00Z",
    quantity: 37,
    salesman_id: 137,
    customer_id: 237,
    product_id: 337,
    store_id: 437,
  },
  {
    sales_id: 38,
    time: "2023-11-07T23:00:00Z",
    quantity: 38,
    salesman_id: 138,
    customer_id: 238,
    product_id: 338,
    store_id: 438,
  },
  {
    sales_id: 39,
    time: "2023-11-08T00:00:00Z",
    quantity: 39,
    salesman_id: 139,
    customer_id: 239,
    product_id: 339,
    store_id: 439,
  },
  {
    sales_id: 40,
    time: "2023-11-09T01:00:00Z",
    quantity: 40,
    salesman_id: 140,
    customer_id: 240,
    product_id: 340,
    store_id: 440,
  },
  {
    sales_id: 41,
    time: "2023-11-10T02:00:00Z",
    quantity: 41,
    salesman_id: 141,
    customer_id: 241,
    product_id: 341,
    store_id: 441,
  },
  {
    sales_id: 42,
    time: "2023-11-11T03:00:00Z",
    quantity: 42,
    salesman_id: 142,
    customer_id: 242,
    product_id: 342,
    store_id: 442,
  },
  {
    sales_id: 43,
    time: "2023-11-12T04:00:00Z",
    quantity: 43,
    salesman_id: 143,
    customer_id: 243,
    product_id: 343,
    store_id: 443,
  },
  {
    sales_id: 44,
    time: "2023-11-13T05:00:00Z",
    quantity: 44,
    salesman_id: 144,
    customer_id: 244,
    product_id: 344,
    store_id: 444,
  },
  {
    sales_id: 45,
    time: "2023-11-14T06:00:00Z",
    quantity: 45,
    salesman_id: 145,
    customer_id: 245,
    product_id: 345,
    store_id: 445,
  },
  {
    sales_id: 46,
    time: "2023-11-15T07:00:00Z",
    quantity: 46,
    salesman_id: 146,
    customer_id: 246,
    product_id: 346,
    store_id: 446,
  },
  {
    sales_id: 47,
    time: "2023-11-16T08:00:00Z",
    quantity: 47,
    salesman_id: 147,
    customer_id: 247,
    product_id: 347,
    store_id: 447,
  },
  {
    sales_id: 48,
    time: "2023-11-17T09:00:00Z",
    quantity: 48,
    salesman_id: 148,
    customer_id: 248,
    product_id: 348,
    store_id: 448,
  },
  {
    sales_id: 49,
    time: "2023-11-18T10:00:00Z",
    quantity: 49,
    salesman_id: 149,
    customer_id: 249,
    product_id: 349,
    store_id: 449,
  },
  {
    sales_id: 50,
    time: "2023-11-19T11:00:00Z",
    quantity: 50,
    salesman_id: 150,
    customer_id: 250,
    product_id: 350,
    store_id: 450,
  }
]

export const columns = [
  {
    accessorKey: "sales_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sales ID
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("sales_id")}</div>,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <div className="capitalize">{row.getValue("time")}</div>,
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
    accessorKey: "salesman_id",
    header: "Salesman ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("salesman_id")}</div>,
  },
  {
    accessorKey: "customer_id",
    header: "Customer ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("customer_id")}</div>,
  },
  {
    accessorKey: "product_id",
    header: "Product ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("product_id")}</div>,
  },
  {
    accessorKey: "store_id",
    header: "Store ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("store_id")}</div>,
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  // },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Email
  //       <ArrowUpDown />
  //     </Button>
  //   ),
  //   cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  // },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));

  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "INR",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  // {
  //   accessorKey: "test_val",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Test val
  //       <ArrowUpDown />
  //     </Button>
  //   ),
  //   cell: ({ row }) => <div className="lowercase">{row.getValue("test_val")}</div>,
  // },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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










