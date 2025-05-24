"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Loader2 } from "lucide-react"

export default function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "kartalasaimanoj@gmail.com",
      link: "mailto:kartalasaimanoj@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Location",
      value: "Albany, NY 12203",
      link: "https://maps.google.com/?q=Albany,NY",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "518 941 0211",
      link: "tel:+15189410211",
    },
  ]

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="w-full">
      <section id="contact" className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or want to discuss opportunities? I'd love to hear from you!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <form
                      action="https://formsubmit.co/ksaimanoj3@gmail.com"
                      method="POST"
                      onSubmit={() => setIsSubmitting(true)}
                      className="space-y-6"
                    >
                      {/* Honeypot field to prevent spam */}
                      <input type="text" name="_honey" style={{ display: 'none' }} />
                      
                      {/* Disable captcha */}
                      <input type="hidden" name="_captcha" value="false" />
                      
                      {/* Disable Google Analytics tracking */}
                      <input type="hidden" name="_template" value="basic" />
                      
                      {/* Auto-response email to sender */}
                      <input type="hidden" name="_autoresponse" 
                        value="Thank you for your message! I have received your email and will get back to you as soon as possible." />
                      
                      {/* Subject for auto-response */}
                      <input type="hidden" name="_autoreply.subject" 
                        value="Thank you for contacting Sai Manoj Kartala" />

                      {/* Success page - handle both development and production */}
                      <input 
                        type="hidden" 
                        name="_next" 
                        value={
                          process.env.NEXT_PUBLIC_VERCEL_URL
                            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/?message=success`
                            : typeof window !== 'undefined'
                              ? `${window.location.origin}/?message=success`
                              : '/'
                        }
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" name="name" placeholder="Your name" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="email" name="email" type="email" placeholder="Your email" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" name="subject" placeholder="Subject of your message" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message"
                          className="min-h-[150px]"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">{info.icon}</div>
                      <div>
                        <h3 className="font-medium">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target={info.title === "Location" ? "_blank" : undefined}
                            rel={info.title === "Location" ? "noopener noreferrer" : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}