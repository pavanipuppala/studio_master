
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Thermometer, Droplets, Lightbulb, HardDrive, BatteryWarning, Wrench, CheckCircle, LightbulbIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export type Alert = {
  id: string;
  severity: "Critical" | "Warning" | "Info";
  type: "Temperature" | "Moisture" | "Nutrients" | "Light" | "Hardware" | "Power";
  component: string;
  message: string;
  timestamp: string;
  status: "Active" | "Resolved";
  suggestion: string;
};

interface AlertCardProps {
  alert: Alert;
  onResolve: (id: string) => void;
}

const alertConfig = {
  Critical: {
    icon: AlertCircle,
    color: "border-red-500/50 bg-red-500/10 text-red-500",
    badge: "destructive",
  },
  Warning: {
    icon: AlertCircle,
    color: "border-yellow-500/50 bg-yellow-500/10 text-yellow-500",
    badge: "secondary",
  },
  Info: {
    icon: AlertCircle,
    color: "border-blue-500/50 bg-blue-500/10 text-blue-500",
    badge: "outline",
  },
};

const typeIcons = {
    Temperature: Thermometer,
    Moisture: Droplets,
    Nutrients: Wrench,
    Light: Lightbulb,
    Hardware: HardDrive,
    Power: BatteryWarning,
}

export function AlertCard({ alert, onResolve }: AlertCardProps) {
  const config = alertConfig[alert.severity];
  const TypeIcon = typeIcons[alert.type];

  return (
    <Card className={cn("flex flex-col h-full transition-all duration-300", alert.status === 'Active' ? config.color : "border-muted/50 bg-muted/20")}>
      <CardHeader className="flex-row items-start gap-4 space-y-0">
        <div className="flex-shrink-0">
          <TypeIcon className={cn("h-6 w-6", alert.status === 'Active' ? 'text-primary' : 'text-muted-foreground')} />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold">{alert.component}</CardTitle>
          <CardDescription className={cn("text-sm", alert.status === 'Resolved' && 'text-muted-foreground')}>{alert.message}</CardDescription>
        </div>
        <div className="flex-shrink-0">
            <Badge variant={alert.status === 'Active' ? config.badge as any : 'outline'}>{alert.severity}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="text-xs text-muted-foreground flex items-center justify-between">
           <span>{alert.timestamp}</span>
           <Badge variant="outline" className={cn(alert.status === 'Resolved' && 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30')}>
                {alert.status === 'Resolved' && <CheckCircle className="h-3 w-3 mr-1" />}
                {alert.status}
           </Badge>
        </div>
        
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="p-3 rounded-md bg-background/50 border border-dashed flex items-start gap-3">
                        <LightbulbIcon className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-foreground">AI Suggestion</p>
                            <p className="text-xs text-muted-foreground">{alert.suggestion}</p>
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>AI-powered resolution tip</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

      </CardContent>
      <CardFooter>
        {alert.status === 'Active' && (
          <Button className="w-full" size="sm" onClick={() => onResolve(alert.id)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Resolved
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

    