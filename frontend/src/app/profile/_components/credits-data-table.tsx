"use client";

import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { DataTablePagination } from "./pagination-controls";
import { useCreditService } from "~/hooks/useCreditService";
import { useSession } from "next-auth/react";
import type { Credit, Grade } from "~/types";
import GradeDialog from "./grade-dialog";
import CreditAmountDialog from "./credit-amout-dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

const defaultCreditAmount = 100000;

export function CreditsDataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const session = useSession();
  const { useGetGrade } = useCreditService();
  const getGrade = useGetGrade();

  const [openGradeDialog, setOpenGradeDialog] = useState(false);
  const [openCreditAmountDialog, setOpenCreditAmountDialog] = useState(false);

  const [creditAmount, setCreditAmount] = useState(defaultCreditAmount);
  const [selectedCredits, setSelectedCredits] = useState<Credit[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);

  const handleShowGradeClick = () => {
    const data = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original as Credit);

    if (!data?.length) return;

    setOpenCreditAmountDialog(true);
  };

  const handleShowGrade = async () => {
    const data = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original as Credit);

    if (!data?.length) return;

    const gradeResult = await getGrade.mutateAsync({
      ids: data.map((d) => d.id),
      creditAmount: creditAmount,
      token: session.data!.user.token,
    });

    console.log(gradeResult);

    setSelectedCredits(data);
    setGrades(gradeResult.grades);
    setOpenGradeDialog(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter by status..."
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("status")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {session.data?.user.isStaff && (
          <Button onClick={handleShowGradeClick}>Show Grade</Button>
        )}
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
                            header.getContext(),
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
                        cell.getContext(),
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
                  {isLoading ? "Loading..." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <GradeDialog
        open={openGradeDialog}
        onOpenChange={setOpenGradeDialog}
        credits={selectedCredits}
        grades={grades}
        creditAmount={creditAmount}
      />
      <CreditAmountDialog
        open={openCreditAmountDialog}
        onOpenChange={setOpenCreditAmountDialog}
        creditAmount={creditAmount}
        setCreditAmount={setCreditAmount}
        handleConfirmClick={handleShowGrade}
      />
    </div>
  );
}
