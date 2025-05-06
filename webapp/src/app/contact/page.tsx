"use client";

import Link from "next/link"
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field based on input name
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Have questions about Alfina? We're here to help. Reach out to our team and we'll get back to you as soon as
          possible.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">Send us a message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange} 
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange} 
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
                <div>
                  <h3 className="text-base font-medium">Our Office</h3>
                  <p className="mt-1 text-gray-600">
                    48 Wall Street, Financial District
                    <br />
                    New York, NY 10004
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
                <div>
                  <h3 className="text-base font-medium">Phone</h3>
                  <p className="mt-1 text-gray-600">
                    <a href="tel:+12125551234" className="hover:text-blue-600">
                      +1 (647) 877-3886
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
                <div>
                  <h3 className="text-base font-medium">Email</h3>
                  <p className="mt-1 text-gray-600">
                    <a href="mailto:support@alfina.com" className="hover:text-blue-600">
                      support@alfina.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
                <div>
                  <h3 className="text-base font-medium">Business Hours</h3>
                  <p className="mt-1 text-gray-600">
                    Monday - Friday: 9:00 AM - 5:00 PM
                    <br />
                    Saturday & Sunday: Closed
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-base font-medium">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/company/quantitative-finance-lab/"
                    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/quantfinance.uoft/"
                    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                  >
                    <span className="sr-only">Instagram</span>
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.01369368400567!3d40.71774447933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a165bedccab%3A0x2cb2ddf003b5ae01!2sWall%20Street%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1647625393520!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Alfina Office Location"
          ></iframe>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-2 text-gray-600">Find quick answers to common questions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-medium">How quickly can I expect a response?</h3>
            <p className="text-gray-600">
              We typically respond to all inquiries within 24 business hours. For urgent matters, please call our
              support line.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-medium">Do you offer technical support?</h3>
            <p className="text-gray-600">
              Yes, our technical support team is available during business hours to assist with any platform-related
              issues.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-medium">Can I schedule a demo?</h3>
            <p className="text-gray-600">
              You can request a personalized demo by filling out the contact form or calling our sales team directly.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-medium">Where can I find documentation?</h3>
            <p className="text-gray-600">
              Comprehensive documentation is available in our{" "}
              <Link href="/help" className="text-blue-600 hover:underline">
                Help Center
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
