"use client"

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
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "../ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import {  groupedStatOptions } from "../../../src/constants"
import { ChampionListData } from "@/src/types/chamption-list"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../ui/tooltip"
  


export function DataTableDemo({data, latestVersion, selectedIdx}: {data: ChampionListData[], latestVersion: string, selectedIdx: number}) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    

    const columns: ColumnDef<ChampionListData>[] = [
    {
        id: "#",
        header: "#",
        cell: ({row}) => <div>{+row.id + 1}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "championName",
        header: "Name",
        cell: ({row}) => (
            <div className="flex gap-2 items-center min-w-max relative">
                <img 
                    src={`http://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${row.getValue("championName")}.png`} 
                    alt={row.getValue("championName")} 
                    className="size-14"
                    loading="lazy"
                />
                {row.getValue("championName")}
            </div>
            )
    },
    {
        accessorKey: "win_ratio",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Win Ratio
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        cell: ({row}) =>( <div className="text-left">
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
            {row.getValue("win_ratio")} %
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="text-sm">{row.original.sample_size} Games</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>),
    },
    ...(groupedStatOptions[selectedIdx]?.stats?.map((stat) => ({
        accessorKey: stat.value,
        header: ({ column }: any) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                {stat.name}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({row}: any) => <div> {row.getValue(stat.value)}</div>,
    })) || []),
    ];
        

  const table = useReactTable({
    data: data,
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
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter champions..."
          value={(table.getColumn("championName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("championName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
         <div className="space-x-2 ml-auto h-full">
          <Button
            variant="outline"
            className="h-10"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="h-10"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
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

                    {column.id.replace(/_/g, " ").replace(/([A-Z])/g, ' $1')}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border bg-background">
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
                  )
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
       
      </div>
    </div>
  )
}
