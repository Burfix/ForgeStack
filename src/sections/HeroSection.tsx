import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        photoRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 }
      )
        .fromTo(
          labelsRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.5'
        )
        .fromTo(
          textRef.current?.querySelectorAll('.word') || [],
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
          '-=0.3'
        )
        .fromTo(
          ctaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([photoRef.current, textRef.current, ctaRef.current, labelsRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        textRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        photoRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-18vw', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        labelsRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = 'Full-Stack Business Intelligence Systems'.split(' ');

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned bg-[#0B0C0F] ${className}`}
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none" />

      {/* Left Photo Frame */}
      <div
        ref={photoRef}
        className="absolute left-[6vw] top-[14vh] w-[40vw] h-[72vh] border border-white/10 overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/hero_team_collab.jpg"
          alt="Team collaboration"
          className="w-full h-full object-cover grayscale-[30%] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F]/40 to-transparent" />
      </div>

      {/* Tech Badges */}
      <div
        ref={labelsRef}
        className="absolute left-[54vw] top-[16vh]"
        style={{ willChange: 'opacity' }}
      >
        <span className="label-mono">
          FastAPI • Streamlit • Postgres • Docker • Cloud
        </span>
      </div>

      {/* Right Text Block */}
      <div
        ref={textRef}
        className="absolute left-[54vw] top-[22vh] w-[38vw]"
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="heading-xl text-white uppercase mb-6">
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h1>
        <p className="text-lg text-[#A6ACB8] leading-relaxed max-w-xl mb-8">
          We build production-ready systems that ingest invoices, CSVs, and scanned
          documents via OCR — compare suppliers, track compliance, and deliver
          decision dashboards — fast.
        </p>
      </div>

      {/* CTA Row */}
      <div
        ref={ctaRef}
        className="absolute left-[54vw] top-[84vh] w-[38vw] flex items-center gap-4"
        style={{ willChange: 'transform, opacity' }}
      >
        <button
          onClick={() => scrollToSection('#contact')}
          className="btn-primary flex items-center gap-2"
        >
          Book a Discovery Call
          <ArrowRight size={18} />
        </button>
        <button
          onClick={() => scrollToSection('#portfolio')}
          className="btn-secondary"
        >
          View Case Studies
        </button>
      </div>
    </section>
  );
}
