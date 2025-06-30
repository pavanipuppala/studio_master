"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, Target, Thermometer, Droplets, Sun } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { IdealConditionsSchema } from "@/lib/schemas";
import { getIdealConditions } from "@/lib/actions";
import type { IdealConditionsOutput } from "@/ai/flows/get-ideal-conditions-flow";

export function IdealConditions() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IdealConditionsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof IdealConditionsSchema>>({
    resolver: zodResolver(IdealConditionsSchema),
    defaultValues: {
      cropName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof IdealConditionsSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await getIdealConditions(values);
    if (response.data) {
      setResult(response.data);
    } else if (response.error) {
      setError(response.error);
    }
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          <span>Ideal Crop Conditions</span>
        </CardTitle>
        <CardDescription>
          Enter a crop name to get its ideal growing conditions from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2 mb-4">
            <FormField
              control={form.control}
              name="cropName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="e.g., Strawberry, Basil..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get"}
            </Button>
          </form>
        </Form>
        
        {isLoading && (
            <div className="space-y-4 mt-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-1/5" />
                <Skeleton className="h-8 w-full" />
            </div>
        )}

        {error && (
            <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        
        {result && (
          <div className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">{result.description}</p>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                <Thermometer className="h-5 w-5 text-red-500"/>
                <div>
                    <p className="text-xs font-medium text-muted-foreground">Temperature</p>
                    <p className="font-semibold text-sm">{result.temperatureRange}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                <Droplets className="h-5 w-5 text-blue-500"/>
                <div>
                    <p className="text-xs font-medium text-muted-foreground">Humidity</p>
                    <p className="font-semibold text-sm">{result.humidityRange}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                <Sun className="h-5 w-5 text-yellow-500"/>
                <div>
                    <p className="text-xs font-medium text-muted-foreground">Light</p>
                    <p className="font-semibold text-sm">{result.lightInfo}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
