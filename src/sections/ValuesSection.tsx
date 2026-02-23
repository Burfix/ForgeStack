import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Layers, FileCheck, Lock, Puzzle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ValuesSectionProps {
  className?: string;
}

const values = [
  {
    icon: Lightbulb,
    title: 'Business-first logic',
    description: 'Not just dashboards — systems built around your operations.',
  },
  {
    icon: Layers,
    title: 'Full-stack delivery',
    description: 'API + UI + data pipeline, all production-ready.',
  },
  {
    icon: FileCheck,
    title: 'Clean documentation',
    description: 'Complete handover with docs and training.',
  },
  {
    icon: Lock,
    title: 'Secure by default',
    description: 'Built with security and data protection in mind.',
  },
  {
    icon: Puzzle,
    title: 'Built to be extended',
    description: 'Modular architecture that grows with you.',
  },
];

export default function ValuesSection({ className = '' }: ValuesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      // Maroon panel wipe
      scrollTl.fromTo(
        panelRef.current,
        { x: '100vw' },
        { x: 0, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        headingRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      const cards = cardsRef.current?.querySelectorAll('.value-card') || [];
      cards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1 + i * 0.03
        );
      });

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        panelRef.current,
        { x: 0 },
        { x: '-40vw', ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        cards,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        headingRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="values"
      className={`section-pinned bg-[#0B0C0F] overflow-hidden ${className}`}
    >
      {/* Maroon Panel */}
      <div
        ref={panelRef}
        className="absolute inset-0 bg-[#6B2A2A]"
        style={{ willChange: 'transform' }}
      />

      {/* Heading Block */}
      <div
        ref={headingRef}
        className="absolute left-[7vw] top-[14vh] w-[34vw]"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="label-mono block mb-4 text-white/70">
          Why ForgeStack Africa
        </span>
        <h2 className="heading-lg text-white uppercase mb-6">
          What Sets Us Apart
        </h2>
        <p className="text-white/80 leading-relaxed">
          We don't just build dashboards. We build complete business intelligence
          systems that integrate with your operations and scale with your business.
        </p>
      </div>

      {/* Value Cards */}
      <div
        ref={cardsRef}
        className="absolute left-[46vw] right-[7vw] top-[18vh] grid grid-cols-2 gap-4"
      >
        {values.map((value, i) => (
          <div
            key={i}
            className={`value-card bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 ${
              i === 4 ? 'col-span-1' : ''
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                <value.icon size={16} className="text-white" />
              </div>
            </div>
            <h3 className="font-['Space_Grotesk'] font-bold text-white text-base mb-2">
              {value.title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
