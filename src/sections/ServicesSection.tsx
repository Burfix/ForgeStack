import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingDown, FileText, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  className?: string;
}

const services = [
  {
    icon: TrendingDown,
    label: 'Supplier Intelligence',
    title:
      'Compare and analyze supplier pricing across multiple vendors to optimize procurement costs.',
  },
  {
    icon: FileText,
    label: 'Invoice & Spend Analytics',
    title:
      'Transform raw invoice data into actionable insights for better financial decision-making.',
  },
  {
    icon: ShieldCheck,
    label: 'Compliance Tracking',
    title:
      'Monitor documents, expiry dates, and audit status with automated alerts and reporting.',
  },
];

export default function ServicesSection({ className = '' }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
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
      const cards = cardsRef.current?.querySelectorAll('.service-card') || [];
      cards.forEach((card, i) => {
        const xOffset = i === 0 ? '-10vw' : i === 2 ? '10vw' : '0';
        const rotation = i === 0 ? -2 : i === 2 ? 2 : 0;

        gsap.fromTo(
          card,
          { x: xOffset, rotation, opacity: 0 },
          {
            x: 0,
            rotation: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'top 35%',
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`section-flowing bg-[#0B0C0F] min-h-screen py-24 ${className}`}
    >
      <div className="px-[7vw]">
        {/* Heading Block */}
        <div ref={headingRef} className="mb-16">
          <span className="label-mono block mb-4">What we build</span>
          <h2 className="heading-lg text-white uppercase mb-4">
            Full-Stack BI Solutions
          </h2>
          <button
            onClick={() => scrollToSection('#portfolio')}
            className="inline-flex items-center gap-2 text-[#C8FF2E] hover:gap-3 transition-all duration-300"
          >
            <span className="text-sm">View all services</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, i) => (
            <div
              key={i}
              className={`service-card card-dark p-8 lg:p-10 hover:border-[#C8FF2E]/30 transition-all duration-500 group ${
                i === 1 ? 'md:mt-12' : ''
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#C8FF2E]/10 flex items-center justify-center group-hover:bg-[#C8FF2E]/20 transition-colors">
                  <service.icon size={20} className="text-[#C8FF2E]" />
                </div>
                <span className="label-mono">{service.label}</span>
              </div>
              <p className="text-white text-lg leading-relaxed">{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
