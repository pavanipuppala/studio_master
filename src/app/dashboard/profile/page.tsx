
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Bell, Thermometer, Clock, Activity, LogOut, Trash2, Upload } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from '@/components/ui/separator';

const getInitials = (name: string) => {
    if (!name) return "UF";
    const parts = name.split(' ');
    if (parts.length > 1 && parts[0] && parts[parts.length - 1]) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if(name) return (name.substring(0, 2)).toUpperCase();
    return "UF";
};

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("Farmer");
  const [avatar, setAvatar] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setName(profile.name || "Pavani Puppala");
      setEmail(profile.email || "pavani@example.com");
      setPhone(profile.phone || "+91-9876543210");
      setLocation(profile.location || "Guntur, Andhra Pradesh");
      setRole(profile.role || "Farmer");
      setAvatar(profile.avatar || "https://placehold.co/100x100.png");
    } else {
      // Default values for a new user
      setName("Pavani Puppala");
      setEmail("pavani@example.com");
      setPhone("+91-9876543210");
      setLocation("Guntur, Andhra Pradesh");
      setRole("Farmer");
      setAvatar("https://placehold.co/100x100.png");
    }
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        toast({
            title: "Image Preview Updated",
            description: "Click 'Save Changes' to apply your new profile picture."
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedProfile = { name, email, phone, location, role, avatar };
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('userProfile');
    toast({
        title: "Account Deleted",
        description: "Your account information has been removed from this browser.",
        variant: "destructive"
    });
    router.push('/register');
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            Profile
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>User Information</CardTitle>
                        <CardDescription>View and edit your personal details.</CardDescription>
                    </div>
                     <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={avatar} alt={name} data-ai-hint="female avatar" />
                            <AvatarFallback>{getInitials(name)}</AvatarFallback>
                        </Avatar>
                        <div className="w-full space-y-2">
                          <Label>Profile Picture</Label>
                          <Input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                            ref={fileInputRef}
                            disabled={!isEditing}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={!isEditing}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Choose a new profile picture from your device.
                          </p>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location / District</Label>
                            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={role} onValueChange={setRole} disabled={!isEditing}>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Farmer">Farmer</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Technician">Technician</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     {isEditing && (
                        <div className="flex justify-end">
                            <Button onClick={handleSave}>Save Changes</Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your password and account security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" placeholder="••••••••" />
                    </div>
                    <Button>Update Password</Button>
                </CardContent>
            </Card>

        </div>

        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" /> Activity Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Bell className="h-4 w-4"/> Alerts Received</span>
                        <span className="font-medium">42</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Thermometer className="h-4 w-4"/> Last Reading</span>
                        <span className="font-medium">26.5°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4"/> Last Login</span>
                        <span className="font-medium">2 hours ago</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Button variant="outline" className="w-full justify-start gap-2" onClick={() => router.push('/login')}>
                        <LogOut className="h-4 w-4" /> Logout
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button variant="destructive" className="w-full justify-start gap-2">
                                <Trash2 className="h-4 w-4" /> Delete My Account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account data from this browser.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteAccount}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
      </div>
    </motion.div>
  );
}
