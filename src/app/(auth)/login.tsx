"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

// ✅ Zod Schema for Iranian phone numbers
const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^(09\d{9}|\+989\d{9}|00989\d{9})$/, {
      message: "Invalid Iranian mobile number format",
    }),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  async function onSubmit(values: PhoneFormValues) {
    try {
      setLoading(true);
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await res.json();
      console.log("Response:", data);
      // Later we’ll handle navigation to dashboard
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
