"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface SubscribeFormProps {
  eventId: string;
}

// Zod schema for email validation
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function SubscribeForm({ eventId }: SubscribeFormProps) {

  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, eventId }),
      });

      const data = await res.json();
      setMessage(data.message || "Subscribed successfully!");
      form.reset();
      router.push(data.link);
    } catch (error) {
      console.error("Subscription Error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>We&apos;ll notify you when the event starts.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Get Tickets
        </Button>
      </form>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </Form>
  );
}
