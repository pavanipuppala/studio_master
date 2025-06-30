"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressSchema } from "@/lib/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { indianStates } from "@/lib/indian-states";

export function AddressForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      addressLine1: "",
      city: "",
      state: "",
      pincode: "",
      experience: "",
      farmType: "",
    },
  });

  function onSubmit(values: z.infer<typeof AddressSchema>) {
    setIsSubmitting(true);
    // Mock saving address
    setTimeout(() => {
      console.log(values);
      localStorage.setItem('farm_address', JSON.stringify(values));
      router.push("/dashboard");
    }, 1000);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Farm Location</CardTitle>
        <CardDescription>
          Please provide your farm's address and experience to get location-specific guidance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="H.No, Street, Area" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>City / Town</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Mumbai" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. 400001" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State / Union Territory</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {indianStates.map(state => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farming Experience</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="beginner">Beginner (0-2 years experience)</SelectItem>
                            <SelectItem value="moderator">Moderator (3-5 years experience)</SelectItem>
                            <SelectItem value="experienced">Experienced (5+ years experience)</SelectItem>
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="farmType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your farm type" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="hydroponic">Hydroponic</SelectItem>
                            <SelectItem value="aeroponic">Aeroponic</SelectItem>
                            <SelectItem value="aquaponic">Aquaponic</SelectItem>
                            <SelectItem value="traditional">Traditional Vertical</SelectItem>
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue to Dashboard
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
