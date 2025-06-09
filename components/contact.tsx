"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { IconMapPin, IconMail, IconPhone } from "@tabler/icons-react"
import { toast } from "sonner"

// Use current origin for API URL
const getApiUrl = () => {
  if (typeof window === 'undefined') return '/api/contact';
  return `${window.location.origin}/api/contact`;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const contactInfo = [
    {
      title: "Email",
      value: "kartalasaimanoj@gmail.com",
      link: "mailto:kartalasaimanoj@gmail.com",
      icon: <IconMail className="w-5 h-5" />,
    },
    {
      title: "Location",
      value: "Albany, NY 12203",
      link: "https://maps.google.com/?q=Albany,NY",
      icon: <IconMapPin className="w-5 h-5" />,
    },
    {
      title: "Phone",
      value: "518 941 0211",
      link: "tel:+15189410211",
      icon: <IconPhone className="w-5 h-5" />,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = getApiUrl();
      console.log('Sending request to:', url);
      console.log('Form data:', formData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Clone the response so we can read it multiple times if needed
      const responseClone = response.clone();

      // Try to parse response as JSON first
      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        // If JSON parsing fails, try to get the text content
        const text = await responseClone.text();
        console.log('Response text:', text);
        throw new Error(
          response.status === 404 
            ? 'API endpoint not found. Please check if the server is running.'
            : `Server error: ${text.slice(0, 200)}...`
        );
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      toast.success('Message sent successfully!', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: 'var(--background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        },
        description: 'Thank you for your message. I will get back to you as soon as possible.'
      })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Failed to send message', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: 'var(--background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        },
        description: error instanceof Error ? error.message : 'Please try again later or contact me directly via email.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 items-start">
          {/* Contact Form */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="h-11 bg-background/50"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="h-11 bg-background/50"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  className="min-h-[200px] bg-background/50"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background h-11 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="block bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary transition-colors"
                target={info.link.startsWith('http') ? '_blank' : undefined}
                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-background/50">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{info.title}</h3>
                    <p className="text-sm text-muted-foreground">{info.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}