"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";
import { Layers } from "lucide-react";

export function FarmingMethods() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Layers className="h-6 w-6 text-primary" />
                <span>Vertical Farming Methods</span>
            </CardTitle>
            <CardDescription>
                Learn about the soil-free techniques used in modern vertical farming.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="hydroponics">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="hydroponics">Hydroponics</TabsTrigger>
                    <TabsTrigger value="aeroponics">Aeroponics</TabsTrigger>
                </TabsList>
                <TabsContent value="hydroponics">
                   <div className="grid md:grid-cols-2 gap-6 items-center mt-4">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Hydroponics</h3>
                            <p className="text-sm text-muted-foreground">
                                Hydroponics is a method of growing plants without soil, using mineral nutrient solutions in a water solvent. Plant roots are suspended in a static, continuously flowing, or misted nutrient solution. This method allows for faster growth and higher yields as nutrients are delivered directly to the roots.
                            </p>
                        </div>
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                           <Image src="https://placehold.co/600x400.png" alt="Hydroponics setup" layout="fill" objectFit="cover" data-ai-hint="hydroponics system" />
                        </div>
                   </div>
                </TabsContent>
                <TabsContent value="aeroponics">
                     <div className="grid md:grid-cols-2 gap-6 items-center mt-4">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Aeroponics</h3>
                            <p className="text-sm text-muted-foreground">
                                Aeroponics is an advanced form of hydroponics where plant roots are suspended in the air and misted with a nutrient-rich solution. This process provides roots with maximum oxygen exposure, which can lead to even faster growth rates and greater water efficiency compared to traditional hydroponics. It is considered one of the most sustainable farming methods.
                            </p>
                        </div>
                         <div className="relative aspect-video rounded-lg overflow-hidden">
                           <Image src="https://placehold.co/600x400.png" alt="Aeroponics setup" layout="fill" objectFit="cover" data-ai-hint="aeroponics system" />
                        </div>
                   </div>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  )
}
