"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { cn } from "~/lib/utils";
import type { Credit, Grade } from "~/types";

type GradeDialogProps = {
  open: boolean;
  onOpenChange: (show: boolean) => void;
  credits: Credit[] | null;
  grades: Grade[] | null;
};

export default function GradeDialog({
  onOpenChange,
  open,
  credits,
  grades,
}: GradeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Grade</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="grid">
          {credits?.map((credit) => {
            const grade = grades?.find((g) => g.credit_id === credit.id);
            return (
              <div
                key={credit.id}
                className={cn(
                  "flex justify-between p-2",
                  grade?.recommended_to_approve
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                )}
              >
                <div>{credit.amount}</div>
                <div>{credit.purpose}</div>
                <div>{credit.term_months}</div>
                <div>{credit.net_comprehended_income}</div>
              </div>
            );
          })}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
