
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Filter, Loader2 } from "lucide-react";

import { getGeneratedAlerts, getRecommendedCrop } from "@/lib/actions";
import type { RecommendCropOutput } from "@/ai/flows/recommend-crop-flow";
import { AlertCard, type Alert } from "@/components/alert-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Filter states
  const [statusFilter, setStatusFilter] = useState('Active');
  const [severityFilter, setSeverityFilter] = useState('All');

  const fetchAlerts = useCallback(async () => {
    const storedAddress = localStorage.getItem('farm_address');
    if (!storedAddress) {
      setLoading(false);
      return;
    }
    const address = JSON.parse(storedAddress);
    const { city, state } = address;

    if (!city || !state) {
      setLoading(false);
      return;
    }

    let farmContext: RecommendCropOutput | null = null;
    const cropResponse = await getRecommendedCrop({ city, state });

    if (cropResponse.data) {
      farmContext = cropResponse.data;
      localStorage.setItem('lastValidCropRecommendation', JSON.stringify(cropResponse.data));
    } else {
      const cachedCropRaw = localStorage.getItem('lastValidCropRecommendation');
      if (cachedCropRaw) {
        farmContext = JSON.parse(cachedCropRaw);
      } else {
        setLoading(false);
        return; // No live data, no cache, can't generate alerts.
      }
    }

    const { cropName, predictedFarmType } = farmContext;

    const alertsResponse = await getGeneratedAlerts({ city, state, cropName, farmType: predictedFarmType });

    let latestAlerts: Alert[] = [];

    if (alertsResponse.data) {
      latestAlerts = alertsResponse.data.alerts;
      localStorage.setItem('lastValidGeneratedAlerts', JSON.stringify(alertsResponse.data));
    } else {
        const cachedAlertsRaw = localStorage.getItem('lastValidGeneratedAlerts');
        if (cachedAlertsRaw) {
            const cachedData = JSON.parse(cachedAlertsRaw);
            latestAlerts = cachedData.alerts;
        }
    }

    if (latestAlerts.length > 0) {
        setAlerts(latestAlerts);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      await fetchAlerts();
    }
    initialFetch();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  const handleResolve = (alertId: string) => {
    setAlerts(currentAlerts =>
      currentAlerts.map(alert =>
        alert.id === alertId ? { ...alert, status: 'Resolved' } : alert
      )
    );
  };

  const filteredAlerts = useMemo(() => {
    return alerts
      .filter(alert => {
        if (statusFilter !== 'All' && alert.status !== statusFilter) return false;
        if (severityFilter !== 'All' && alert.severity !== severityFilter) return false;
        return true;
      })
      .sort((a, b) => {
        const severityOrder = { Critical: 0, Warning: 1, Info: 2 };
        if (a.status === 'Active' && b.status !== 'Active') return -1;
        if (a.status !== 'Active' && b.status === 'Active') return 1;
        return severityOrder[a.severity] - severityOrder[b.severity];
      });
  }, [alerts, statusFilter, severityFilter]);

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index}><CardContent className="p-6"><Skeleton className="h-48" /></CardContent></Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-primary" />
            System Alerts
        </h1>
        <p className="text-muted-foreground">
          Live feed of system notifications, generated based on your farm's context.
        </p>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 font-medium">
                <Filter className="h-4 w-4" />
                <span>Filter by:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 flex-1">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Severities</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="Warning">Warning</SelectItem>
                        <SelectItem value="Info">Info</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>
      
      {loading ? (
        renderLoadingSkeleton()
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
                {filteredAlerts.length > 0 ? (
                    filteredAlerts.map(alert => (
                        <motion.div
                            key={alert.id}
                            layout
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        >
                            <AlertCard alert={alert} onResolve={handleResolve} />
                        </motion.div>
                    ))
                ) : (
                    <motion.div className="col-span-full text-center py-12 text-muted-foreground">
                        <p>No alerts to display.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
