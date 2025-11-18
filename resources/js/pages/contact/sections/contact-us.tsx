"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Mail, User, BookText, Send, Pencil } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  name: z.string().min(2, "Name is too short"),
  subject: z.string().min(2, "Subject is too short"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactUs() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=info@pandawarent.com&su=${encodeURIComponent(
      values.subject
    )}&body=${encodeURIComponent(
      `From: ${values.name} (${values.email})\n\nMessage:\n${values.message}`
    )}`;

    window.open(gmailURL, "_blank");
  }

  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto">
        
        <h2 className="text-4xl font-black text-shadow-black mb-2">
          Contact Us
        </h2>
        <div className="h-1 w-20 bg-orange mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-4 top-4 text-gray" />
                        <Input
                          placeholder="Email"
                          className="bg-white-background pl-10 h-12"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-4 top-4 text-gray" />
                        <Input
                          placeholder="Name"
                          className="bg-white-background pl-10 h-12"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subject */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <BookText className="w-4 h-4 absolute left-4 top-4 text-gray" />
                        <Input
                          placeholder="Subject"
                          className="bg-white-background pl-10 h-12"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Button */}
              <Button
                type="submit"
                className="bg-orange border-1 border-orange hover:bg-white-background hover:text-orange h-12 w-24 text-white rounded-md flex items-center gap-2"
              >
                <Send size={16} />
                Send
              </Button>
            </form>
          </Form>

          {/* Message Field */}
          <Form {...form}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative h-full">
                      <Pencil className="w-4 h-4 absolute left-3.5 top-3.5 text-gray" />
                      <Textarea
                        placeholder="Write Message..."
                        className="bg-white-background pl-10 pt-3 h-full min-h-[220px] resize-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>

        </div>

      </div>
    </section>
  );
}
