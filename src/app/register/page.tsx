import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-950">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
            <Leaf className="h-8 w-8 text-emerald-400" />
            <span className="text-2xl font-semibold font-headline text-gray-50">Urban Vertical Farming</span>
          </Link>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
