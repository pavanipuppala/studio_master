import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export function PageHeader() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
      <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
        <Leaf className="h-6 w-6 text-emerald-400" />
        <span className="text-lg font-semibold font-headline">Urban Vertical Farming</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link href="/#features" className="text-sm font-medium text-gray-400 hover:text-gray-50 transition-colors" prefetch={false}>
          Features
        </Link>
        <Link href="/documentation" className="text-sm font-medium text-gray-400 hover:text-gray-50 transition-colors" prefetch={false}>
          Documentation
        </Link>
        <Link href="/contact" className="text-sm font-medium text-gray-400 hover:text-gray-50 transition-colors" prefetch={false}>
          Contact
        </Link>
        <Link href="/feedback" className="text-sm font-medium text-gray-400 hover:text-gray-50 transition-colors" prefetch={false}>
          Feedback
        </Link>
        <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Link href="/login">Login</Link>
        </Button>
      </nav>
    </header>
  );
}
