// src/components/Contact.tsx
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageSquare, Send, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We’ll get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2 text-sm text-emerald-700 mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>Need help?</span>
          </div>
          <h2 className="text-headline mb-4 text-emerald-800">Get in Touch</h2>
          <p className="text-subtitle text-emerald-700/80 max-w-2xl mx-auto">
            Facing any issues or have a question? Send us a message and our team
            will reach out as soon as possible.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Form */}
          <Card className="md:col-span-3 border border-emerald-200 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.01] animate-fadeInUp">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-emerald-900 mb-2">
                      Your Name
                    </label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      className="pl-3 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                      required
                      aria-label="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-900 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                        required
                        aria-label="Your email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-900 mb-2">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={handleChange}
                    className="pl-3 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                    aria-label="Subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-900 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Describe your issue or question..."
                    value={form.message}
                    onChange={handleChange}
                    className="min-h-[140px] border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-gray-400 text-black"
                    required
                    aria-label="Message"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info / Sidebar */}
          <Card className="md:col-span-2 border border-emerald-200 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg animate-fadeInUp">
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-emerald-800">
                  Contact Information
                </h3>
                <p className="text-sm text-emerald-700/80 mt-1">
                  We typically reply within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-emerald-900">
                      Email
                    </p>
                    <p className="text-sm text-emerald-700/80">
                      support@contractvault.app
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-emerald-900">
                      Phone
                    </p>
                    <p className="text-sm text-emerald-700/80">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-emerald-900">
                      Address
                    </p>
                    <p className="text-sm text-emerald-700/80">
                      123 Vault Street, Suite 400, SF, CA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-emerald-900">
                      Hours
                    </p>
                    <p className="text-sm text-emerald-700/80">
                      Mon–Fri · 9:00 AM – 6:00 PM (PT)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
