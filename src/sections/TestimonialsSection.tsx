import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsSectionProps {
  className?: string;
}

const testimonials = [
  {
    quote:
      'Reduced manual price comparisons from hours to minutes. The ROI was visible within the first month.',
    author: 'Sarah Mensah',
    role: 'Procurement Lead',
    company: 'Manufacturing Co.',
  },
  {
    quote:
      'Improved audit readiness with centralized compliance evidence. Our auditors love the transparency.',
    author: 'David Osei',
    role: 'Compliance Manager',
    company: 'Logistics Ltd.',
  },
  {
    quote:
      'Leadership gained clarity with standardized KPIs. Finally, everyone is looking at the same numbers.',
    author: 'Amara Nwosu',
    role: 'CFO',
    company: 'Retail Group',
  },
];

const clientLogos = [
  'Acme Corp',
  'GlobalTech',
  'AfriLogistics',
  'NexusRetail',
  'PrimeManufacturing',
  'SwiftFinance',
];

export default function TestimonialsSection({
  className = '',
}: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.4,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card') || [];
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: '8vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${70 - i * 5}%`,
              end: `top ${40 - i * 5}%`,
              scrub: 0.6,
            },
          }
        );
      });

      // Logos animation
      gsap.fromTo(
        logosRef.current,
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: logosRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`section-flowing bg-[#0B0C0F] py-24 ${className}`}
    >
      <div className="px-[7vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="label-mono block mb-4">Client Proof</span>
          <h2 className="heading-lg text-white uppercase">
            Trusted by Operations Teams
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="testimonial-card card-dark p-8 relative"
              style={{ willChange: 'transform, opacity' }}
            >
              <Quote
                size={32}
                className="text-[#C8FF2E]/30 absolute top-6 right-6"
              />
              <p className="text-white text-lg leading-relaxed mb-8 relative z-10">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-['Space_Grotesk'] font-semibold text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-[#A6ACB8]">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div ref={logosRef} className="border-t border-white/10 pt-12">
          <p className="text-center text-sm text-[#A6ACB8] mb-8">
            Trusted by leading companies across Africa
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {clientLogos.map((logo, i) => (
              <div
                key={i}
                className="text-white/30 font-['Space_Grotesk'] font-semibold text-lg lg:text-xl hover:text-white/60 transition-colors cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
