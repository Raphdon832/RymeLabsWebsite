"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ScrollToTopBall from "@/components/ScrollToTopBall";

export default function Footer() {
  return (
    <footer className="px-6 py-20 border-t border-border bg-background/80 backdrop-blur-md relative">
      <ScrollToTopBall />
      <FadeIn className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1">
          <div className="text-3xl font-bold tracking-tighter mb-6 text-foreground">RymeLabs</div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Pioneering the digital frontier with code, creativity, and cutting-edge technology.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-6">Company</h4>
          <ul className="space-y-4 text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-6">Legal</h4>
          <ul className="space-y-4 text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-6">Contact</h4>
          <ul className="space-y-4 text-muted-foreground">
            <li className="leading-relaxed">11C Dream City Estate,<br/>Abuja, Nigeria</li>
            <li><a href="tel:+234706010242" className="hover:text-foreground transition-colors">+234 706 010 242</a></li>
          </ul>
        </div>
      </FadeIn>
      <FadeIn className="max-w-7xl mx-auto pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm" delay={0.2}>
        <p>© 2025 RymeLabs Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-foreground transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
        </div>
      </FadeIn>
    </footer>
  );
}
