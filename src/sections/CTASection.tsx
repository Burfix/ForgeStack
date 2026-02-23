import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  className?: string;
}

export default function CTASection({ className = '' }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    description: '',
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        photoRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        textRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );
      scrollTl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );
      scrollTl.fromTo(
        barRef.current,
        { y: '6vh' },
        { y: 0, ease: 'none' },
        0.1
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        [textRef.current, photoRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDiscoveryClick = () => {
    setDialogContent({
      title: 'Book a Discovery Call',
      description:
        'Thank you for your interest! Our team will contact you within 24 hours to schedule your free discovery call.',
    });
    setDialogOpen(true);
  };

  const handleEmailClick = () => {
    setDialogContent({
      title: 'Email Us',
      description:
        'You can reach us at hello@forgestackafrica.dev. We typically respond within 24 hours.',
    });
    setDialogOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`section-pinned bg-[#0B0C0F] ${className}`}
    >
      {/* Left Photo */}
      <div
        ref={photoRef}
        className="absolute left-[7vw] top-[18vh] w-[44vw] h-[64vh] border border-white/10 overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/closing_workspace.jpg"
          alt="Modern workspace"
          className="w-full h-full object-cover grayscale-[30%] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B0C0F]/40" />
      </div>

      {/* Right Text Block */}
      <div
        ref={textRef}
        className="absolute left-[56vw] top-[26vh] w-[36vw]"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2 className="heading-lg text-white uppercase mb-6">
          Ready to build your BI system?
        </h2>
        <p className="text-lg text-[#A6ACB8] leading-relaxed">
          Let's turn your operational data into clear, actionable insights.
        </p>
      </div>

      {/* CTA Row */}
      <div
        ref={ctaRef}
        className="absolute left-[56vw] top-[62vh] flex items-center gap-4"
        style={{ willChange: 'transform, opacity' }}
      >
        <button onClick={handleDiscoveryClick} className="btn-primary flex items-center gap-2">
          Book a Discovery Call
          <ArrowRight size={18} />
        </button>
        <button onClick={handleEmailClick} className="btn-secondary flex items-center gap-2">
          <Mail size={18} />
          Email Us
        </button>
      </div>

      {/* Accent Bar */}
      <div
        ref={barRef}
        className="absolute left-0 bottom-0 w-full h-[3.5vh] bg-[#C8FF2E]"
        style={{ willChange: 'transform' }}
      />

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#111318] border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="font-['Space_Grotesk'] text-xl flex items-center gap-2">
              <Check className="text-[#C8FF2E]" size={20} />
              {dialogContent.title}
            </DialogTitle>
            <DialogDescription className="text-[#A6ACB8]">
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
