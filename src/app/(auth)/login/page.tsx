"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneFormValues, phoneSchema } from "./_schema/login.schema";
import { loginAction } from "@/actions/auth/login-action";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const { login } = useAuth();

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  async function onSubmit(values: PhoneFormValues) {
    startTransition(async () => {
      const response = await loginAction(values.phone);

      if (response.success && response.data) {
        const userData = response.data;
        login(userData);
      } else {
        form.setError("phone", {
          type: "manual",
          message: response.error || "Login failed, please try again",
        });
        console.error("Login failed:", response.error);
      }
    });
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Iranian Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="09xxxxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
