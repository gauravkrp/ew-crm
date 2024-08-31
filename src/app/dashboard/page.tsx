"use client";

import * as React from "react";
import axios from "axios";
import Header from "@/components/Layout/NewHeader";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Student,
  StudentLeadColumns as columns,
} from "@/components/dashboard/columns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function StudentLeads() {
  const [data, setData] = useState<Student[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("TOKEN");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get("/api/v1/student");
        setData(response.data.students);
      } catch (error) {
        toast("Failed to fetch data");
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

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
    <div className="w-full min-h-[100dvh]">
      <Header isAuthorized={true} />
      <div className="w-full px-12">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Columns definition with an action column

// export const StudentLeadColumns: ColumnDef<Student>[] = [
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const [open, setOpen] = useState(false);

//       const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//           first_name: row.original.first_name,
//           last_name: row.original.last_name,
//           father_name: row.original.father_name,
//           gender: row.original.gender,
//           phone: row.original.phone,
//           dob: row.original.dob,
//           email: row.original.email,
//         },
//       });

//       const onSubmit = async (data: any) => {
//         try {
//           const token = localStorage.getItem("TOKEN");

//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//           const response = await axios.put(
//             `/api/v1/student/${row.original.id}`,
//             data
//           );
//           console.log(response.data);

//           alert("Student information updated successfully!");
//           setOpen(false); // Close the dialog after successful update
//         } catch (error) {
//           console.error("Error updating student information:", error);
//           alert("There was an error updating the student information.");
//         }
//       };

//       return (
//         <div>
//           <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//               <Button variant="outline" size="sm">
//                 <Pencil className="mr-2 h-4 w-4" />
//                 Update
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <h2 className="text-lg font-medium">
//                 Update Student Information
//               </h2>

//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-4 mt-4"
//               >
//                 {/* Email */}
//                 <div>
//                   <label>Email</label>
//                   <Input
//                     {...form.register("email")}
//                     placeholder="john@example.com"
//                   />
//                 </div>

//                 <div className="flex gap-4">
//                   {/* First Name */}
//                   <div className="w-full">
//                     <label>First Name</label>
//                     <Input
//                       {...form.register("first_name")}
//                       placeholder="John"
//                     />
//                   </div>

//                   {/* Last Name */}
//                   <div className="w-full">
//                     <label>Last Name</label>
//                     <Input {...form.register("last_name")} placeholder="Doe" />
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   {/* Father's Name */}
//                   <div className="w-full">
//                     <label>Father's Name</label>
//                     <Input
//                       {...form.register("father_name")}
//                       placeholder="Robert Doe"
//                     />
//                   </div>

//                   {/* Gender */}
//                   <div className="w-full">
//                     <label>Gender</label>
//                     <select {...form.register("gender")} className="input">
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   {/* Phone */}
//                   <div className="w-full">
//                     <label>Phone</label>
//                     <Input
//                       {...form.register("phone")}
//                       placeholder="1234567890"
//                     />
//                   </div>

//                   {/* Date of Birth */}
//                   <div className="w-full">
//                     <label>Date of Birth</label>
//                     <Input type="date" {...form.register("dob")} />
//                   </div>
//                 </div>

//                 <div className="flex justify-end space-x-2">
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button type="submit">Save</Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>
//       );
//     },
//   },
// ];
