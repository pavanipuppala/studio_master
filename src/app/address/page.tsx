import { AddressForm } from "@/components/address-form";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function AddressPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 p-4">
        <div className="absolute top-6 left-6">
            <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
            <Leaf className="h-6 w-6 text-emerald-400" />
            <span className="text-lg font-semibold font-headline text-gray-50">Urban Vertical Farming</span>
            </Link>
        </div>
        <AddressForm />
    </div>
  );
}
