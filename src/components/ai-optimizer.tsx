"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Wand2, Loader2, Lightbulb, Bot, Check, X } from "lucide-react";

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
import { AiOptimizerSchema } from "@/lib/schemas";
import { getAiOptimization } from "@/lib/actions";
import type { OptimizeCropYieldOutput } from "@/ai/flows/optimize-crop-yield";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface AiOptimizerProps {
  cropType?: string;
  temperature?: number;
  humidity?: number;
  lightLevel?: number;
}

export function AiOptimizer({ cropType, temperature, humidity, lightLevel }: AiOptimizerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizeCropYieldOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AiOptimizerSchema>>({
    resolver: zodResolver(AiOptimizerSchema),
    defaultValues: {
      cropType: "",
      temperature: 0,
      humidity: 0,
      lightLevel: 0,
    },
  });

  useEffect(() => {
    const { dirtyFields } = form.formState;

    // Only update cropType from prop if the user hasn't manually edited it.
    if (cropType && !dirtyFields.cropType) {
      form.setValue('cropType', cropType);
    }
    
    // Always update live metrics from props.
    if (temperature) {
        form.setValue('temperature', parseFloat(temperature.toFixed(1)));
    }
    if (humidity) {
        form.setValue('humidity', Math.round(humidity));
    }
    if (lightLevel) {
        form.setValue('lightLevel', Math.round(lightLevel));
    }
    
  }, [cropType, temperature, humidity, lightLevel, form]);


  async function onSubmit(values: z.infer<typeof AiOptimizerSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await getAiOptimization(values);
    
    if (response.data) {
      setResult(response.data);
      localStorage.setItem('lastValidOptimization', JSON.stringify(response.data));
    } else {
      const cachedDataRaw = localStorage.getItem('lastValidOptimization');
      if (cachedDataRaw) {
        const cachedData = JSON.parse(cachedDataRaw);
        setResult(cachedData);
      }
    }
    setIsLoading(false);
  }
  
  const handleRecommendationAction = (action: 'Accepted' | 'Rejected') => {
    toast({
        title: `Recommendation ${action}`,
        description: `The AI's suggestion has been marked as ${action.toLowerCase()}.`,
    });
    setResult(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <span>AI-Powered Optimization</span>
        </CardTitle>
        <CardDescription>
          Enter your current farm data to get AI-powered recommendations for optimizing crop yield.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lettuce" {...field} />
                    </FormControl>
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
              <FormField
                control={form.control}
                name="lightLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Light Level (Lux)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="bg-primary/90 hover:bg-primary">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                "Get Recommendations"
              )}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6">
          <Alert className="border-primary/50 bg-primary/10 min-h-[220px] flex flex-col">
              <Bot className="h-4 w-4 text-primary" />
              <AlertTitle className="font-headline flex items-center justify-between text-primary">
                  <span>AI Recommendation</span>
              </AlertTitle>
              <AlertDescription className="flex-grow flex flex-col">
                 {result ? (
                    <>
                        <p className="font-semibold mt-4 mb-2 text-foreground">Summary:</p>
                        <p className="mb-4 text-muted-foreground">{result.summary}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <Card className="p-4 bg-card/80">
                                <p className="text-sm font-medium text-muted-foreground">Temperature</p>
                                <p className="font-semibold text-foreground">{result.temperatureAdjustment}</p>
                            </Card>
                            <Card className="p-4 bg-card/80">
                                <p className="text-sm font-medium text-muted-foreground">Humidity</p>
                                <p className="font-semibold text-foreground">{result.humidityAdjustment}</p>
                            </Card>
                            <Card className="p-4 bg-card/80">
                                <p className="text-sm font-medium text-muted-foreground">Light Level</p>
                                <p className="font-semibold text-foreground">{result.lightLevelAdjustment}</p>
                            </Card>
                        </div>
                        <div className="flex gap-2 justify-end mt-auto">
                            <Button variant="outline" size="sm" onClick={() => handleRecommendationAction('Rejected')}>
                                <X className="mr-2 h-4 w-4" /> Reject
                            </Button>
                            <Button size="sm" onClick={() => handleRecommendationAction('Accepted')} className="bg-green-600 hover:bg-green-700 text-white">
                                <Check className="mr-2 h-4 w-4" /> Accept
                            </Button>
                        </div>
                    </>
                 ) : (
                    <div className="flex items-center justify-center flex-grow">
                      <p className="text-muted-foreground">Your AI optimization suggestions will appear here.</p>
                    </div>
                 )}
              </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
