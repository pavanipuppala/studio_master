"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LoginForm = dynamic(() => import('@/components/auth/login-form').then(mod => mod.LoginForm), {
  ssr: false,
  loading: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="mt-4 text-center text-sm">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </CardContent>
    </Card>
  )
});


export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-950">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
            <Leaf className="h-8 w-8 text-emerald-400" />
            <span className="text-2xl font-semibold font-headline text-gray-50">Urban Vertical Farming</span>
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
