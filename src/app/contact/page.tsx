//! File: src/app/contact/page.tsx
"use client";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  MessageSquare,
  Send,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you for your message! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Sorry, there was an error sending your message. Please try again.",
      });
    }
  };

  return (
    <section>
      <PageHeader
        title="Get in Touch"
        description="Have a question or want to collaborate? We'd love to hear from you."
        showSearch={false}
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-accent/10 rounded-2xl">
            <MessageCircle className="w-8 h-8 text-theme-accent" />
          </div>
        }
      />
      <aside className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-theme-secondary-bg border-theme-border">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-theme-text flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-theme-accent" />
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {status.type === "error" && (
                <div className="mb-6 p-4 bg-theme-error/10 border border-theme-error/20 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-theme-error flex-shrink-0" />
                  <p className="text-theme-error">{status.message}</p>
                </div>
              )}
              {status.type === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-theme-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-theme-success mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-theme-muted">{`Thank you for reaching out. We'll get back to you soon.`}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-theme-text mb-2"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-theme-bg border-theme-border text-theme-text placeholder:text-theme-muted"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-theme-text mb-2"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-theme-bg border-theme-border text-theme-text placeholder:text-theme-muted"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-theme-text mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-theme-bg border-theme-border text-theme-text placeholder:text-theme-muted"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-theme-text mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-theme-bg border-theme-border text-theme-text placeholder:text-theme-muted resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status.type === "loading"}
                    size="lg"
                    className="w-full bg-theme-accent text-theme-accent-text hover:bg-theme-highlight hover:text-theme-highlight-text"
                  >
                    {status.type === "loading" ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-theme-muted">
              You can also reach us directly at{" "}
              <a
                href="mailto:hello@devpulse.com"
                className="text-theme-accent hover:underline"
              >
                hello@devpulse.com
              </a>
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
}
