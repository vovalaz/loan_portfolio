"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { Credit, Grade } from "~/types";

type GradeDialogProps = {
  open: boolean;
  onOpenChange: (show: boolean) => void;
  credits: Credit[] | null;
  grades: Grade[] | null;
  creditAmount: number;
};

export default function GradeDialog({
  onOpenChange,
  open,
  credits,
  grades,
  creditAmount,
}: GradeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Grade</AlertDialogTitle>
          <AlertDialogDescription>
            Credit Amount: {creditAmount}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Term Months</TableHead>
              <TableHead>Net Comprehended Income</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {credits?.map((credit) => {
              const grade = grades?.find((g) => g.credit_id === credit.id);
              return (
                <TableRow
                  key={credit.id}
                  className={
                    grade?.recommended_to_approve
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  <TableCell>{credit.amount}</TableCell>
                  <TableCell>{credit.purpose}</TableCell>
                  <TableCell>{credit.term_months}</TableCell>
                  <TableCell>{credit.net_comprehended_income}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
