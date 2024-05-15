"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Icons } from "~/components/ui/icons";
import { authService } from "~/services/authService";
import { signIn } from "next-auth/react";

const formSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Password too short",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords dont match",
  });

export type FormSchema = z.infer<typeof formSchema>;
const initialFormValues: FormSchema = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormValues,
  });

  const onSubmit = async (values: FormSchema) => {
    setIsLoading(true);

    await authService
      .signUp({
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.password,
      })
      .then(async () => {
        form.clearErrors();
        form.reset();
        await signIn("credentials", {
          email: values.email,
          password: values.password,
        });
      })
      .catch((reason) => {
        form.clearErrors();
        form.setValue("firstName", values.firstName);
        form.setValue("lastName", values.lastName);
        form.setValue("email", values.email);
        form.setValue("password", values.password);
        form.setValue("confirmPassword", values.confirmPassword);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (reason?.email) {
          form.setError(
            "email",
            {
              message: "Email is already in use.",
            },
            {
              shouldFocus: true,
            },
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            disabled={isLoading}
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-col items-start justify-center self-stretch">
                <FormLabel className="text-sm font-medium leading-[150%] text-neutral-700">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full grow rounded-lg border border-solid border-[color:var(--neutral-petro-5,#D9DBDD)] bg-white py-6 pl-3.5 pr-5 text-sm leading-[150%] text-neutral-500"
                    placeholder="Odin"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-col items-start justify-center self-stretch">
                <FormLabel className="text-sm font-medium leading-[150%] text-neutral-700">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full grow rounded-lg border border-solid border-[color:var(--neutral-petro-5,#D9DBDD)] bg-white py-6 pl-3.5 pr-5 text-sm leading-[150%] text-neutral-500"
                    placeholder="Allfather"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-col items-start justify-center self-stretch">
                <FormLabel className="text-sm font-medium leading-[150%] text-neutral-700">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full grow rounded-lg border border-solid border-[color:var(--neutral-petro-5,#D9DBDD)] bg-white py-6 pl-3.5 pr-5 text-sm leading-[150%] text-neutral-500"
                    placeholder="odin.allfather@asgard.com"
                    type="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-col items-start justify-center self-stretch">
                <FormLabel className="text-sm font-medium leading-[150%] text-neutral-700">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full grow rounded-lg border border-solid border-[color:var(--neutral-petro-5,#D9DBDD)] bg-white py-6 pl-3.5 pr-5 text-sm leading-[150%] text-neutral-500"
                    placeholder="Password"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-col items-start justify-center self-stretch">
                <FormLabel className="text-sm font-medium leading-[150%] text-neutral-700">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full grow rounded-lg border border-solid border-[color:var(--neutral-petro-5,#D9DBDD)] bg-white py-6 pl-3.5 pr-5 text-sm leading-[150%] text-neutral-500"
                    placeholder="Confirm Password"
                    type="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button type="submit" form="form" disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        <span className="self-center text-center text-sm font-medium leading-[171.429%] text-white">
          Sign Up
        </span>
      </Button>
    </div>
  );
}
