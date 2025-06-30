import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import { BarChart, Bot, Layers, Leaf, Lightbulb, Smartphone, Sun, Thermometer, Droplets, ShieldAlert, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Layers className="size-8 text-emerald-400" />,
    title: "Vertical Farming",
    description: "State-of-the-art hydroponic and aeroponic systems for maximum space efficiency.",
  },
  {
    icon: <Lightbulb className="size-8 text-emerald-400" />,
    title: "Optimized LED Lighting",
    description: "Full-spectrum, tunable LEDs that mimic natural sunlight for optimal plant growth.",
  },
  {
    icon: <Thermometer className="size-8 text-emerald-400" />,
    title: "IoT Sensor Grid",
    description: "Precise, real-time monitoring of all critical environmental variables.",
  },
  {
    icon: <Bot className="size-8 text-emerald-400" />,
    title: "AI-Driven Automation",
    description: "Intelligent systems that automate climate control, irrigation, and nutrient delivery.",
  },
  {
    icon: <BarChart className="size-8 text-emerald-400" />,
    title: "Predictive Analytics",
    description: "Our AI analyzes data to forecast yields, predict issues, and suggest optimizations.",
  },
  {
    icon: <Smartphone className="size-8 text-emerald-400" />,
    title: "Remote Farm Management",
    description: "A comprehensive dashboard to monitor and control your farm from anywhere.",
  },
];

const benefits = [
    {
        icon: <Leaf className="h-10 w-10 text-emerald-400" />,
        title: "Maximized Crop Yield",
        description: "Produce more food per square foot, making agriculture viable even in dense urban areas.",
    },
    {
        icon: <Droplets className="h-10 w-10 text-emerald-400" />,
        title: "95% Less Water Usage",
        description: "Recirculating water systems dramatically reduce consumption compared to traditional farming.",
    },
    {
        icon: <Sun className="h-10 w-10 text-emerald-400" />,
        title: "Year-Round Harvests",
        description: "Controlled environments mean no off-seasons. Grow fresh produce 365 days a year.",
    },
    {
        icon: <ShieldAlert className="h-10 w-10 text-emerald-400" />,
        title: "Sustainable & Pesticide-Free",
        description: "Eliminate the need for chemical pesticides, ensuring healthier produce and a cleaner environment.",
    },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-50">
      <PageHeader />
      <main className="flex-1">
        <section className="w-full pt-20 pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 relative">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-top [mask-image:linear-gradient(0deg,transparent,black)]"></div>
          <div className="container px-4 md:px-6 z-10 relative">
            <div className="grid gap-6 lg:grid-cols-1 text-center lg:gap-12 xl:gap-24">
              <div className="flex flex-col justify-center items-center space-y-4">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl xl:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Smart Farming for Urban Future
                  </h1>
                  <p className="max-w-2xl mx-auto text-gray-400 md:text-xl">
                    Pioneering the future of urban farming with our AI-driven, IoT-integrated vertical farming platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    <Link href="/register">Register Your Farm <ArrowRight className="ml-2"/></Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg" className="bg-gray-800 text-gray-50 hover:bg-gray-700">
                     <Link href="/login">View Demo Dashboard</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm text-emerald-400">Key Features</div>
                        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl">Technology at the Root</h2>
                        <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform integrates cutting-edge technology to give you unprecedented control and insight into your vertical farm.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 pt-12">
                    {features.map((feature) => (
                      <Card key={feature.title} className="text-center p-6 bg-gray-900 border-gray-800 hover:border-emerald-500/50 hover:shadow-emerald-500/10 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <CardContent className="p-0">
                          <div className="flex justify-center items-center mb-4">{feature.icon}</div>
                          <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                          <p className="text-sm text-gray-400 mt-2">{feature.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid items-center gap-12">
                    <div className="flex flex-col justify-center items-center text-center space-y-4">
                         <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm text-emerald-400 self-center">Benefits</div>
                        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">The Urban Farming Advantage</h2>
                        <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                          Embrace a sustainable, efficient, and profitable solution to modern agricultural challenges.
                        </p>
                        <div className="grid gap-6 pt-6 w-full max-w-2xl">
                            {benefits.map((benefit) => (
                                <div key={benefit.title} className="flex items-start gap-4 text-left">
                                    <div className="bg-gray-900 rounded-full p-3 flex items-center justify-center border border-gray-800">
                                      {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold font-headline">{benefit.title}</h3>
                                        <p className="text-gray-400">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <PageFooter />
    </div>
  );
}
