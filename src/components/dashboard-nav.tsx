
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
    SidebarContent,
    SidebarMenuItem,
    SidebarMenu,
    SidebarFooter,
    SidebarHeader,
    SidebarTrigger
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { Leaf, LayoutDashboard, AlertTriangle, Settings, User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


export function DashboardNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [userName, setUserName] = useState("User");
    const [userEmail, setUserEmail] = useState("user@example.com");
    const [avatarSrc, setAvatarSrc] = useState("https://placehold.co/40x40.png");

    useEffect(() => {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            const profile = JSON.parse(storedProfile);
            setUserName(profile.name || "Urban Farmer");
            setUserEmail(profile.email || "farmer@uvf.com");
            setAvatarSrc(profile.avatar || "https://placehold.co/40x40.png");
        }
    }, [pathname]); // Rerun when path changes to reflect updates

    const getInitials = (name: string) => {
      if (!name) return "UF";
      const parts = name.split(' ');
      if (parts.length > 1 && parts[0] && parts[parts.length - 1]) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      if(name) return (name.substring(0, 2)).toUpperCase();
      return "UF";
    };

    const menuItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/alerts', label: 'Alerts', icon: AlertTriangle },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
        { href: '/dashboard/profile', label: 'Profile', icon: User },
    ];

    const handleLogout = () => {
        // Mock logout
        router.push('/login');
    }

    return (
        <>
            <SidebarHeader className='p-4 border-b border-sidebar-border'>
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2" prefetch={false}>
                        <Leaf className="h-6 w-6 text-emerald-400" />
                        <span className="text-lg font-semibold font-headline text-sidebar-foreground group-data-[state=collapsed]:hidden">Urban Vertical Farming</span>
                    </Link>
                    <SidebarTrigger className="hidden md:flex text-sidebar-foreground/70" />
                </div>
            </SidebarHeader>
            <SidebarContent className='p-4'>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Button
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className="w-full justify-start gap-2"
                                onClick={() => router.push(item.href)}
                            >
                                <item.icon className="size-5 text-gray-400" />
                                <span className="group-data-[state=collapsed]:hidden">{item.label}</span>
                            </Button>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className='p-4 mt-auto border-t border-sidebar-border'>
                 <div className="flex items-center gap-3 group-data-[state=collapsed]:justify-center">
                    <Avatar>
                        <AvatarImage src={avatarSrc} alt="@farmer" data-ai-hint="male avatar"/>
                        <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col group-data-[state=collapsed]:hidden">
                        <span className="font-semibold text-sm text-sidebar-foreground">{userName}</span>
                        <span className="text-xs text-sidebar-foreground/70">{userEmail}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto text-sidebar-foreground group-data-[state=collapsed]:hidden" onClick={handleLogout}>
                        <LogOut className="size-4" />
                    </Button>
                </div>
            </SidebarFooter>
        </>
    );
}
