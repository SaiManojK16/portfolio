"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import Hero from "@/components/hero"

export default function Home() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const message = searchParams.get('message')
    if (message === 'success') {
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
    }
  }, [searchParams])

  return (
    <div className="w-full">
      <Hero />
    </div>
  )
}
