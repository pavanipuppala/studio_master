import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-50">
      <PageHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Documentation</CardTitle>
              <CardDescription className="text-gray-400">A guide to using the Urban Vertical Farming prototype.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 prose max-w-none dark:prose-invert prose-p:text-gray-300 prose-headings:text-gray-100 prose-a:text-emerald-400">
              <section>
                <h2 className="font-headline text-2xl">Introduction</h2>
                <p>
                  Welcome to the Urban Vertical Farming Portal. This prototype demonstrates the power of integrating IoT and AI into urban vertical farming. This document will guide you through the features and functionalities of the application.
                </p>
              </section>

              <section>
                <h2 className="font-headline text-2xl">Getting Started</h2>
                <ol>
                  <li><strong>Registration:</strong> Start by creating an account on the <a href="/register">Register</a> page.</li>
                  <li><strong>Login:</strong> Once registered, you can log in through the <a href="/login">Login</a> page.</li>
                  <li><strong>Farm Address:</strong> After your first login, you will be prompted to enter your farm's address. This is a one-time setup to help us provide location-specific data in the future.</li>
                </ol>
              </section>

              <section>
                <h2 className="font-headline text-2xl">Dashboard Features</h2>
                <ul>
                  <li><strong>Metric Cards:</strong> At the top of the dashboard, you'll find real-time metrics for Temperature, Humidity, and Light Levels. These cards provide a quick snapshot of your farm's current conditions.</li>
                  <li><strong>Weekly Overview:</strong> This chart visualizes the trends of key metrics over the past week, helping you understand patterns and performance.</li>
                  <li><strong>AI-Powered Optimization:</strong> This is the core of our smart farming solution. Input your current sensor readings, and our AI will provide actionable recommendations to optimize your crop yield. You can accept or reject these suggestions.</li>
                  <li><strong>Recent Alerts:</strong> This section shows the most recent critical alerts from your farm. For a full history, visit the Alerts page.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-headline text-2xl">Navigation</h2>
                <p>
                  The sidebar on the left provides navigation to all key areas of your dashboard:
                </p>
                <ul>
                  <li><strong>Dashboard:</strong> The main overview page.</li>
                  <li><strong>Alerts:</strong> A detailed log of all system-generated alerts.</li>
                  <li><strong>Settings:</strong> (Coming Soon) Manage your notification preferences and other application settings.</li>
                  <li><strong>Profile:</strong> (Coming Soon) Manage your personal account details.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-headline text-2xl">Providing Feedback</h2>
                <p>
                  This is a prototype, and your feedback is invaluable. Please use the "Provide Feedback" link in the footer to report bugs, suggest improvements, or share your thoughts.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
