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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';



import { useComparisonList } from "../../Utils/hooks/useComparionList"

export function DataTableDemo({data, latestVersion, selectedIdx}: {data: ChampionListData[], latestVersion: string, selectedIdx: number}) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { state, dispatch } = useComparisonList();
    

    const columns: ColumnDef<ChampionListData>[] = [
    {
        id: "#",
        header: "#",
        cell: ({row}) => <div>{row.id}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "championName",

        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({row}) => {
          
          
          return (
            <div className="flex gap-2 items-center min-w-max relative">
                <img 
                    src={`http://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${row.getValue("championName")}.png`} 
                    alt={row.getValue("championName")} 
                    className="size-14"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null
                      target.src = '/no_champion.png'
                      return
                    }}
                />
                {row.original.displayName}
                
            </div>
            )}
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
                      {row.getValue("win_ratio")} {row.original.win_ratio && "%"} 
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
      // add a column that has a button in the cell to add the champion to a comparison list
      {
        id: "compare",
        header: "Compare",
        cell: ({ row }) =>   {
          return (
            <Button
              variant="outline"
              className="h-10"
              onClick={() => dispatch({ type: 'ADD_CHAMPION', payload: row.original })}
              disabled={state.some((champion) => champion.id === row.original.id) || state.length >= 5}
            >
              Compare
            </Button>
          )
        },
        enableSorting: false,
        enableHiding: false,
      },
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
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter champions..."
          value={(table.getColumn("championName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("championName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

    <Select
      onValueChange={(e) => {
        table.setPageSize(Number(e))
      }}
    >
      <SelectTrigger className="bg-background smin-w-0 w-max h-10 ">
        <SelectValue placeholder={table.getState().pagination.pageSize} />
      </SelectTrigger>
      <SelectContent>
        {[10, 25, 50, 100, data?.length].map((pageSize) => (
            <SelectItem key={pageSize}
              value={pageSize.toString()}
            >
             {pageSize}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>

         
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="h-10" >
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
      <section className="flex gap-4 items-center mt-4">

      
      <span className="flex justify-end ml-auto gap-1 text-sm">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <div className="space-x-2  h-full">
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
    
      </section>

    </div>
  )
}
