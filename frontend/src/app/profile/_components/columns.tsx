"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Credit } from "~/types";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Checkbox } from "~/components/ui/checkbox";

const StatusColorMap = {
  ["ongoing"]: "bg-green-100 text-green-800",
  ["rejected"]: "bg-red-100 text-red-800",
  ["waiting"]: "bg-blue-100 text-blue-800",
};

export const getColumns = ({
  onApproveClick,
  onRejectClick,
  isAdmin,
}: {
  onApproveClick: (credit: Credit) => void | Promise<void>;
  onRejectClick: (credit: Credit) => void | Promise<void>;
  isAdmin: boolean;
}): ColumnDef<Credit>[] => {
  const result: ColumnDef<Credit>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.original.status;
        const color = StatusColorMap[status as keyof typeof StatusColorMap];
        return <span className={color}>{status}</span>;
      },
    },
    {
      accessorKey: "purpose",
      header: "Purpose",
    },
    {
      accessorKey: "term_months",
      header: "Term months",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
  ];

  if (isAdmin) {
    const actions: ColumnDef<Credit> = {
      id: "actions",
      cell: ({ row }) => {
        const credit = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onApproveClick(credit)}>
                Approve credit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onRejectClick(credit)}>
                Reject credit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    };
    const netComprehendedIncome: ColumnDef<Credit> = {
      accessorKey: "net_comprehended_income",
      header: "Net Comprehended Income",
    };

    result.push(actions, netComprehendedIncome);
  }

  return result;
};
