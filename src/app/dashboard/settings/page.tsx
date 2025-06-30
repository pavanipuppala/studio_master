
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Palette, Globe, Thermometer, Database, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from "next-themes";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Skeleton } from '@/components/ui/skeleton';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const defaultSettings = {
    notifications: {
      email: true,
      highSeverity: true,
      mediumSeverity: false,
    },
    thresholds: {
      temperature: [18, 28],
      humidity: [50, 70],
    },
    language: "en",
    timezone: "ist",
};

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] = useState(defaultSettings);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedSettings = localStorage.getItem('farmSettings');
    if (savedSettings) {
      // Merge saved settings with defaults to avoid errors if the structure changed
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(prev => ({
          ...prev,
          ...parsedSettings,
          notifications: {...prev.notifications, ...parsedSettings.notifications},
          thresholds: {...prev.thresholds, ...parsedSettings.thresholds},
      }));
    }
  }, []);

  const handleSettingsChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };
  
  const handleThresholdChange = (key: 'temperature' | 'humidity', value: number[]) => {
      setSettings(prev => ({
        ...prev,
        thresholds: {
            ...prev.thresholds,
            [key]: value
        }
      }));
  }
  
  const handleSimpleValueChange = (key: 'language' | 'timezone', value: string) => {
    setSettings(prev => ({...prev, [key]: value}));
  }

  const handleSave = () => {
    localStorage.setItem('farmSettings', JSON.stringify(settings));
    // Old notification settings are migrated/removed here
    localStorage.removeItem('notificationSettings'); 
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };
  
  const handleFactoryReset = () => {
    localStorage.removeItem('farmSettings');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('farm_address');
    localStorage.removeItem('registeredUsers');
    setSettings(defaultSettings);
    toast({
      title: "Factory Reset Complete",
      description: "All application data has been cleared.",
    });
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-primary" />
            Settings
        </h1>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell /> Notifications</CardTitle>
            <CardDescription>Manage how you receive notifications from the system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <div className='space-y-1'>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className='text-sm text-muted-foreground'>Receive important alerts and summaries via email.</p>
              </div>
              {isClient ? (
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleSettingsChange('notifications', 'email', checked)}
                  />
              ) : (
                  <Skeleton className="h-6 w-11 rounded-full" />
              )}
            </div>
            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <div className='space-y-1'>
                <Label htmlFor="high-severity-alerts">Notify on Critical Alerts</Label>
                 <p className='text-sm text-muted-foreground'>Issues requiring immediate attention.</p>
              </div>
              {isClient ? (
                <Switch
                  id="high-severity-alerts"
                  checked={settings.notifications.highSeverity}
                  onCheckedChange={(checked) => handleSettingsChange('notifications', 'highSeverity', checked)}
                />
              ) : (
                  <Skeleton className="h-6 w-11 rounded-full" />
              )}
            </div>
             <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <div className='space-y-1'>
                <Label htmlFor="medium-severity-alerts">Notify on Warning Alerts</Label>
                 <p className='text-sm text-muted-foreground'>Notifications about potential issues.</p>
              </div>
              {isClient ? (
                <Switch
                  id="medium-severity-alerts"
                  checked={settings.notifications.mediumSeverity}
                  onCheckedChange={(checked) => handleSettingsChange('notifications', 'mediumSeverity', checked)}
                />
              ) : (
                <Skeleton className="h-6 w-11 rounded-full" />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Thermometer /> Farm Thresholds</CardTitle>
            <CardDescription>Set the ideal operating ranges for your farm environment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-4">
              <div className='space-y-3'>
                  <Label>Temperature Range (°C)</Label>
                  <div className='flex items-center gap-4'>
                      <span className='text-sm text-muted-foreground w-12 text-center'>{settings.thresholds.temperature[0]}°C</span>
                       {isClient ? <Slider
                            min={0}
                            max={40}
                            step={1}
                            value={settings.thresholds.temperature}
                            onValueChange={(value) => handleThresholdChange('temperature', value)}
                        /> : <Skeleton className="h-2 flex-1" />}
                       <span className='text-sm text-muted-foreground w-12 text-center'>{settings.thresholds.temperature[1]}°C</span>
                  </div>
              </div>
              <div className='space-y-3'>
                  <Label>Humidity Range (%)</Label>
                   <div className='flex items-center gap-4'>
                      <span className='text-sm text-muted-foreground w-12 text-center'>{settings.thresholds.humidity[0]}%</span>
                      {isClient ? <Slider
                          min={20}
                          max={90}
                          step={1}
                          value={settings.thresholds.humidity}
                          onValueChange={(value) => handleThresholdChange('humidity', value)}
                      /> : <Skeleton className="h-2 flex-1" />}
                      <span className='text-sm text-muted-foreground w-12 text-center'>{settings.thresholds.humidity[1]}%</span>
                  </div>
              </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette /> Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Theme</Label>
             {isClient ? (
                <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  <div>
                    <RadioGroupItem value="light" id="light" className="peer sr-only" />
                    <Label htmlFor="light" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      Light
                    </Label>
                  </div>
                   <div>
                    <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                    <Label htmlFor="dark" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      Dark
                    </Label>
                  </div>
                   <div>
                    <RadioGroupItem value="system" id="system" className="peer sr-only" />
                    <Label htmlFor="system" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      System
                    </Label>
                  </div>
                </RadioGroup>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    <Skeleton className="h-[72px] rounded-md" />
                    <Skeleton className="h-[72px] rounded-md" />
                    <Skeleton className="h-[72px] rounded-md" />
                </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe /> Language & Region</CardTitle>
                <CardDescription>Set your preferred language and region.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSimpleValueChange('language', value)}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English (United States)</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => handleSimpleValueChange('timezone', value)}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="ist">Indian Standard Time (IST)</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
            </CardContent>
        </Card>
      </motion.div>
      
       <motion.div variants={itemVariants}>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Database /> Data & Maintenance</CardTitle>
                <CardDescription>Manage application data and system settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-destructive/50">
                    <div className='space-y-1'>
                        <Label htmlFor="factory-reset">Factory Reset</Label>
                        <p className='text-sm text-muted-foreground'>Permanently delete all data, including profiles and settings.</p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4"/>Reset</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete all your data, including your profile, farm address, and settings from this browser.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleFactoryReset}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-end">
          <Button onClick={handleSave}>Save Preferences</Button>
      </motion.div>

    </motion.div>
  );
}
