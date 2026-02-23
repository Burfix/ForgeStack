import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MetricsSectionProps {
  className?: string;
}

const metrics = [
  {
    label: 'Invoices Processed',
    value: '12,400+',
    context: 'Automated ingestion and categorization',
  },
  {
    label: 'Supplier Comparisons',
    value: '3,200+',
    context: 'Price checks across vendors',
  },
];

export default function MetricsSection({ className = '' }: MetricsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

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
      const cards = cardsRef.current?.querySelectorAll('.metric-card') || [];
      cards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          i * 0.05
        );
        // Number animation
        const num = card.querySelector('.metric-value');
        if (num) {
          scrollTl.fromTo(
            num,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            i * 0.05 + 0.1
          );
        }
      });

      scrollTl.fromTo(
        photoRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        captionRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        photoRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        cards,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        captionRef.current,
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
      id="metrics"
      className={`section-pinned bg-[#0B0C0F] ${className}`}
    >
      {/* Left Metric Cards */}
      <div ref={cardsRef} className="absolute left-[7vw] top-[18vh] w-[26vw] space-y-6">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="metric-card card-dark p-8"
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="label-mono block mb-4">{metric.label}</span>
            <div className="metric-value font-['Space_Grotesk'] font-bold text-5xl text-[#C8FF2E] mb-3">
              {metric.value}
            </div>
            <p className="text-sm text-[#A6ACB8]">{metric.context}</p>
          </div>
        ))}
      </div>

      {/* Caption */}
      <div
        ref={captionRef}
        className="absolute left-[7vw] top-[74vh] w-[26vw]"
        style={{ willChange: 'opacity' }}
      >
        <p className="text-sm text-[#A6ACB8] leading-relaxed">
          Systems built for finance, operations, and compliance teams—hosted in
          the cloud or on-premise.
        </p>
      </div>

      {/* Right Photo */}
      <div
        ref={photoRef}
        className="absolute left-[38vw] top-[18vh] w-[55vw] h-[64vh] border border-white/10 overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/numbers_meeting_room.jpg"
          alt="Team meeting"
          className="w-full h-full object-cover grayscale-[30%] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0B0C0F]/30" />
      </div>
    </section>
  );
}
