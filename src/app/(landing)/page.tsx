"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe2, Lightbulb, MapPin, Calendar, CheckCircle2, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  const ctaLink = "/register";
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HOME / HERO */}
      <section id="home" className="w-full py-20 lg:py-32 xl:py-40 flex justify-center bg-gradient-to-b from-background to-muted/50 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
                Version 1.0 is now live - Launching August 1st
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter sm:text-5xl max-w-4xl mx-auto text-balance">
                The Future Belongs to the <span className="text-primary">YOUNG INDIAN CABINET</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-balance">
                Join the largest nationwide platform empowering youth leadership. Register now for the upcoming assembly and shape the nation's future.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button size="lg" className="w-full sm:w-auto rounded-full text-lg h-14 px-8 shadow-lg shadow-primary/20" asChild>
                <Link href={ctaLink}>
                  Join Youth Assembly <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT & OBJECTIVES */}
      <section id="about" className="w-full py-20 md:py-32 flex justify-center bg-background border-y">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">About the Assembly</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The Young Indian Cabinet is a non-partisan platform that brings together the brightest young minds from across the country. Our objective is to simulate a real-world governance model where youth can draft policies, debate national issues, and develop leadership skills.
              </p>
              <ul className="space-y-3">
                {[
                  "Fostering democratic values in the youth",
                  "Creating a network of future leaders",
                  "Providing a platform for policy advocacy",
                  "Encouraging civic engagement"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <Button className="mt-4 rounded-full" asChild>
                <Link href={ctaLink}>Join Youth Assembly</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-muted flex items-center justify-center border shadow-xl">
              <Users className="h-24 w-24 text-muted-foreground/30" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section id="vision" className="w-full py-20 flex justify-center bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-card p-8 rounded-2xl border shadow-sm space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Globe2 className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed relative z-10">
                To build a generation of informed, ethical, and proactive young leaders who are equipped to navigate complex global and national challenges and drive sustainable progress.
              </p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-card p-8 rounded-2xl border shadow-sm space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Lightbulb className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed relative z-10">
                To provide a structured, accessible, and highly engaging digital and physical platform that democratizes leadership training and civic participation for every young Indian.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. UPCOMING EVENT & TIMELINE */}
      <section id="events" className="w-full py-20 flex justify-center bg-background border-y relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Upcoming Event Timeline</h2>
            <p className="text-muted-foreground max-w-[600px]">Mark your calendars for the defining youth event of the year.</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { date: "June 15, 2026", title: "Registrations Open", desc: "The portal officially opens for applications nationwide." },
              { date: "July 25, 2026", title: "Registrations Close", desc: "Last date to submit your multi-step application." },
              { date: "August 1, 2026", title: "Application Results", desc: "Approved delegates will receive their Digital ID and QR Passes." },
              { date: "August 15, 2026", title: "The Grand Assembly", desc: "The main event begins. Check-in using your QR Pass." }
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold">{item.title}</h4>
                    <span className="text-xs font-semibold text-primary">{item.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
            <Button size="lg" className="rounded-full" asChild>
              <Link href={ctaLink}>Join Youth Assembly</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. MEDIA & GALLERY (Placeholder) */}
      <section id="gallery" className="w-full py-20 flex justify-center bg-muted/30">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">Media & Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-background border flex items-center justify-center text-muted-foreground/30 hover:bg-primary/5 transition-colors cursor-pointer">
                Gallery Image {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section id="faqs" className="w-full py-20 flex justify-center bg-background border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "Who can apply for the Youth Assembly?", a: "Any Indian citizen between the ages of 16 and 30 is eligible to apply for the assembly." },
              { q: "Is there any registration fee?", a: "No, the initial registration and application process is completely free." },
              { q: "What documents are required?", a: "You will need a passport-size photo and optionally a Government ID or College ID." },
              { q: "When will I get my Digital ID?", a: "Once your application is reviewed and approved by the administrators, your Digital Membership Card will be available on your dashboard." }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl border bg-card">
                <h4 className="font-bold mb-2">{faq.q}</h4>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT & CTA */}
      <section id="contact" className="w-full py-24 flex justify-center bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Ready to Lead?</h2>
          <p className="max-w-[600px] mx-auto text-primary-foreground/80 text-lg">
            The nation is waiting for your voice. Apply today, secure your digital pass, and join thousands of youth leaders.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full h-14 px-8 text-lg font-bold shadow-2xl" asChild>
            <Link href={ctaLink}>Join Youth Assembly Now</Link>
          </Button>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-primary-foreground/20 text-sm text-primary-foreground/70">
            <div className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> New Delhi, India</div>
            <div className="flex items-center"><Mail className="mr-2 h-4 w-4" /> contact@youngindiancabinet.org</div>
            <div className="flex items-center"><Phone className="mr-2 h-4 w-4" /> +91 (800) 123-4567</div>
          </div>
        </div>
      </section>
    </div>
  );
}

