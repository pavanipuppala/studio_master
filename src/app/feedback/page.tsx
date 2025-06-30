"use client";

import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageSquareQuote } from "lucide-react";
import { useState } from "react";

export default function FeedbackPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Mock submission
    setTimeout(() => {
      toast({
        title: "Feedback Sent!",
        description: "Thank you for your valuable input. We appreciate you helping us improve.",
      });
      (event.target as HTMLFormElement).reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline flex items-center gap-2">
                <MessageSquareQuote className="h-8 w-8 text-primary"/>
                Submit Feedback
            </CardTitle>
            <CardDescription>
              Have a bug to report or an idea for a new feature? We'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Feedback Type</Label>
                 <Select required>
                    <SelectTrigger id="feedback-type">
                        <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="general">General Feedback</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Please describe your feedback in detail..." className="min-h-[120px]" required/>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <PageFooter />
    </div>
  );
}
