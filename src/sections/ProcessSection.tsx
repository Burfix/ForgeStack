import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  className?: string;
}

const steps = [
  {
    number: '01',
    title: 'Discovery & KPI Mapping',
    description:
      'We understand your operations, define key metrics, and map data sources.',
  },
  {
    number: '02',
    title: 'Data Ingestion + Model Design',
    description:
      'Build pipelines to ingest your data and design clean data models.',
  },
  {
    number: '03',
    title: 'Build API + Dashboard',
    description:
      'Develop RESTful APIs and interactive dashboards tailored to your needs.',
  },
  {
    number: '04',
    title: 'Deploy + Support',
    description:
      'Launch to production with documentation, training, and ongoing support.',
  },
];

export default function ProcessSection({ className = '' }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
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
      scrollTl.fromTo(
        headingRef.current,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      const cards = cardsRef.current?.querySelectorAll('.step-card') || [];
      cards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { y: '70vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05 + i * 0.04
        );
        // Step number animation
        const num = card.querySelector('.step-number');
        if (num) {
          scrollTl.fromTo(
            num,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'none' },
            0.05 + i * 0.04
          );
        }
      });

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cards,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, stagger: 0.02, ease: 'power2.in' },
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
      id="process"
      className={`section-pinned bg-[#0B0C0F] ${className}`}
    >
      {/* Heading Block */}
      <div
        ref={headingRef}
        className="absolute left-[7vw] top-[14vh] w-[28vw]"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="label-mono block mb-4">How it works</span>
        <h2 className="heading-lg text-white uppercase mb-4">Our Process</h2>
        <p className="text-sm text-[#A6ACB8]">
          Typical timeline: 2–6 weeks depending on scope
        </p>
      </div>

      {/* Step Cards */}
      <div
        ref={cardsRef}
        className="absolute left-[7vw] right-[7vw] top-[38vh] flex gap-4"
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className="step-card flex-1 h-[46vh] card-dark p-6 flex flex-col relative overflow-hidden group hover:border-[#C8FF2E]/30 transition-all duration-500"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Step Number */}
            <span className="step-number font-mono text-5xl font-bold text-white/10 group-hover:text-[#C8FF2E]/20 transition-colors">
              {step.number}
            </span>

            {/* Content */}
            <div className="mt-auto">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-lg mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[#A6ACB8] leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Accent Border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8FF2E]/0 group-hover:bg-[#C8FF2E] transition-colors duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
