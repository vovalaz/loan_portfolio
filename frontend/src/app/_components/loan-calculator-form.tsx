"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { useEffect, useState } from "react";
import type { CreditType } from "~/types";

const formSchema = z.object({
  type: z.string(),
  amount: z.number(),
  term: z
    .number()
    .min(1, {
      message: "Term must be between 1 and 60 months",
    })
    .max(60, {
      message: "Term must be between 1 and 60 months",
    }),
  months: z.array(z.number()),
  purpose: z.string().nullable(),
});

export type FormSchema = z.infer<typeof formSchema>;

type LoanCalculatorFormProps = {
  className?: string;
  onSubmit: (values: FormSchema) => void;
  creditTypes?: CreditType[];
};

export default function LoanCalculatorForm({
  className,
  onSubmit,
  creditTypes,
}: LoanCalculatorFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      term: 0,
    },
  });

  const [additionalFields, setAdditionalFields] = useState(
    form.getValues("term") - 1,
  );

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "term" && type === "change") {
        const term = Number(value.term) || 0;
        Array.from({ length: additionalFields }, (_, index) => index).forEach(
          (index) => {
            form.unregister(`months.${index}`);
          },
        );

        const newFields = Math.max(0, Math.min(59, term - 1));
        setAdditionalFields(newFields);
      }
    });
    return () => subscription.unsubscribe();
  }, [additionalFields, form, form.watch]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-row items-start gap-10", className)}
      >
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Loan types</SelectLabel>
                        {creditTypes?.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select loan type</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={() => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter loan amount"
                    {...form.register("amount", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>Enter loan amount</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="term"
            render={() => (
              <FormItem>
                <FormLabel>Term</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter loan term in months"
                    {...form.register("term", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>Enter loan term in months</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purpose"
            render={() => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter loan purpose"
                    {...form.register("purpose")}
                  />
                </FormControl>
                <FormDescription>Enter loan purpose</FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: additionalFields }, (_, index) => (
              <Controller
                key={index}
                name={`months.${index}`}
                control={form.control}
                defaultValue={0}
                render={() => (
                  <FormItem>
                    <FormLabel>{`Month ${index + 1}`}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={0.01}
                        placeholder="Enter loan amount"
                        {...form.register(`months.${index}`, {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                    {/* <FormDescription>Enter loan amount</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
}
