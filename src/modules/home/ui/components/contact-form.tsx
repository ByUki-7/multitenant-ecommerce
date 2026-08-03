"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Demo submission — wired for a real endpoint later.
    setTimeout(() => {
      setIsSubmitting(false);
      (event.target as HTMLFormElement).reset();
      toast.success("Thanks! We'll get back to you shortly.");
    }, 700);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-2xl bg-white dark:bg-zantora-dark p-6 lg:p-8 flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Jane Doe"
            className="h-11 rounded-md border bg-transparent px-3 outline-none focus-visible:border-zantora-blue"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="h-11 rounded-md border bg-transparent px-3 outline-none focus-visible:border-zantora-blue"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          placeholder="How can we help?"
          className="h-11 rounded-md border bg-transparent px-3 outline-none focus-visible:border-zantora-blue"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us a bit about your project..."
          className="rounded-md border bg-transparent px-3 py-2 outline-none focus-visible:border-zantora-blue resize-y"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full w-fit px-8 bg-black text-white hover:bg-zantora-blue hover:text-black dark:bg-white dark:text-black dark:hover:bg-zantora-blue dark:hover:text-white transition-colors"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
};
