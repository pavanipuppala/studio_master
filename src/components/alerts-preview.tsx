import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Thermometer, Droplets } from "lucide-react";
import { Badge } from "./ui/badge";

type Alert = {
  icon: JSX.Element;
  title: string;
  description: string;
  time: string;
  severity: "High" | "Medium" | "Low";
};

interface AlertsPreviewProps {
    alerts: Alert[];
}

export function AlertsPreview({ alerts }: AlertsPreviewProps) {
  if (!alerts || alerts.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                    <span>Recent Alerts</span>
                </CardTitle>
                <CardDescription>Immediate issues that may require your attention.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">No recent alerts.</p>
            </CardContent>
             <CardFooter>
                <Button asChild variant="outline" className="w-full">
                    <Link href="/dashboard/alerts">View All Alerts</Link>
                </Button>
            </CardFooter>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <span>Recent Alerts</span>
        </CardTitle>
        <CardDescription>Immediate issues that may require your attention.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 text-muted-foreground">{alert.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{alert.title}</p>
                <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'secondary' : 'outline'}>{alert.severity}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
              <p className="text-xs text-muted-foreground pt-1">{alert.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/alerts">View All Alerts</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
