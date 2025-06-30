"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { motion } from 'framer-motion';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  trendData: { x: number, y: number }[];
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export function MetricCard({ icon, title, value, change, changeType, trendData }: MetricCardProps) {
  const isIncrease = changeType === 'increase';

  return (
    <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between">
                <div>
                    <div className="text-2xl font-bold">{value}</div>
                    <p className={cn(
                    "text-xs text-muted-foreground",
                    isIncrease ? 'text-green-500' : 'text-red-500'
                    )}>
                    {change} from last hour
                    </p>
                </div>
                <div className="h-12 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                        data={trendData}
                        margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id={isIncrease ? "colorIncrease" : "colorDecrease"} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={isIncrease ? "hsl(var(--primary))" : "hsl(var(--destructive))"} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={isIncrease ? "hsl(var(--primary))" : "hsl(var(--destructive))"} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area 
                            type="monotone" 
                            dataKey="y" 
                            stroke={isIncrease ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill={`url(#${isIncrease ? 'colorIncrease' : 'colorDecrease'})`}
                        />
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
  );
}
