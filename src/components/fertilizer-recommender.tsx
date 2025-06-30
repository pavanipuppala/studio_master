
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Bot, Loader2, TestTube2 } from "lucide-react";

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
import { FertilizerRecommenderSchema } from "@/lib/schemas";
import { getFertilizerRecommendation } from "@/lib/actions";
import type { RecommendFertilizerOutput } from "@/ai/flows/recommend-fertilizer-flow";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface FertilizerRecommenderProps {
  cropType?: string;
  temperature?: number;
  humidity?: number;
}

const soilTypes = ["Sandy", "Loamy", "Black", "Red", "Clayey"];

export function FertilizerRecommender({ cropType, temperature, humidity }: FertilizerRecommenderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendFertilizerOutput | null>(null);

  const form = useForm<z.infer<typeof FertilizerRecommenderSchema>>({
    resolver: zodResolver(FertilizerRecommenderSchema),
    defaultValues: {
      cropType: "",
      temperature: 0,
      humidity: 0,
      moisture: 50,
      soilType: "",
      nitrogen: 50,
      phosphorous: 50,
      potassium: 50,
    },
  });

  useEffect(() => {
    if (cropType && !form.formState.dirtyFields.cropType) {
      form.setValue('cropType', cropType);
    }
    if (temperature) {
        form.setValue('temperature', parseFloat(temperature.toFixed(1)));
    }
    if (humidity) {
        form.setValue('humidity', Math.round(humidity));
    }
  }, [cropType, temperature, humidity, form]);

  async function onSubmit(values: z.infer<typeof FertilizerRecommenderSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await getFertilizerRecommendation(values);
    if (response.data) {
      setResult(response.data);
      localStorage.setItem('lastValidFertilizerRecommendation', JSON.stringify(response.data));
    } else {
      const cachedDataRaw = localStorage.getItem('lastValidFertilizerRecommendation');
      if (cachedDataRaw) {
        const cachedData = JSON.parse(cachedDataRaw);
        setResult(cachedData);
      }
    }
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <TestTube2 className="h-6 w-6 text-primary" />
            <span>AI Fertilizer Recommender</span>
        </CardTitle>
        <CardDescription>
          Input soil and crop data to get a custom fertilizer recommendation from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                    control={form.control}
                    name="cropType"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Crop Type</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., Rice" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="soilType"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Soil Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select soil" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {soilTypes.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
              />
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperature (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="humidity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Humidity (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                    control={form.control}
                    name="nitrogen"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nitrogen (N)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="kg/ha" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phosphorous"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phosphorous (P)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="kg/ha" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="potassium"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Potassium (K)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="kg/ha" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="moisture"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Soil Moisture (%)</FormLabel>
                        <FormControl>
                        <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get Recommendation"
              )}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6">
          <Alert className="border-primary/50 bg-primary/10 min-h-[140px] flex flex-col">
              <Bot className="h-4 w-4 text-primary" />
              <AlertTitle className="font-headline text-primary">
                  {result ? `Fertilizer Recommendation: ${result.fertilizerName}`: "Fertilizer Recommendation"}
              </AlertTitle>
              <AlertDescription className="flex-grow flex flex-col">
                 {result ? (
                    <>
                        <p className="font-semibold mt-4 mb-2 text-foreground">Reasoning:</p>
                        <p className="text-muted-foreground">{result.reasoning}</p>
                    </>
                 ) : (
                    <div className="flex items-center justify-center flex-grow">
                        <p className="text-muted-foreground">Your AI fertilizer recommendation will appear here.</p>
                    </div>
                 )}
              </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
