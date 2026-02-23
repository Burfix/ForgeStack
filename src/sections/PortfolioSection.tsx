import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Layers, Zap, Shield } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioSectionProps {
  className?: string;
}

interface SystemDetails {
  features: string[];
  tech: string[];
  timeline: string;
  link?: string;
}

interface System {
  image: string;
  title: string;
  description: string;
  details: SystemDetails;
}

const systems: System[] = [
  {
    image: '/portfolio_supplier_tool.jpg',
    title: 'Supplier Pricing Intelligence Tool',
    description:
      'Upload invoices/price lists, normalize line items, compare supplier pricing, flag best price per item.',
    details: {
      features: [
        'CSV and Excel ingestion',
        'Automatic line item matching',
        'Price normalization across suppliers',
        'Best price flagging per item',
        'Historical price tracking',
        'Export to PDF/Excel',
      ],
      tech: ['Python', 'Pandas', 'FastAPI', 'PostgreSQL', 'Streamlit'],
      timeline: '3-4 weeks',
    },
  },
  {
    image: '/portfolio_compliance_tracker.jpg',
    title: 'Compliance Tracker',
    description:
      'Track documents, expiry dates, audit status, and generate compliance reports with automated alerts.',
    details: {
      features: [
        'Document upload and storage',
        'Expiry date tracking',
        'Automated email alerts',
        'Audit trail logging',
        'Compliance reporting',
        'Role-based access control',
      ],
      tech: ['Python', 'Django', 'PostgreSQL', 'Celery', 'Redis'],
      timeline: '4-5 weeks',
    },
  },
  {
    image: '/portfolio_operations_dashboard.jpg',
    title: 'Operations Dashboard Pack',
    description:
      'Executive view of sales, costs, margins, and supplier performance with automated data refresh.',
    details: {
      features: [
        'Real-time KPI monitoring',
        'Sales and cost analytics',
        'Margin analysis by product',
        'Supplier performance scores',
        'Automated data refresh',
        'Custom report builder',
      ],
      tech: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
      timeline: '5-6 weeks',
    },
  },
  {
    image: '/dashboard_q4_overview.jpg',
    title: 'Preschool Management App',
    description:
      'Complete preschool administration platform with student management, attendance tracking, and parent communication.',
    details: {
      features: [
        'Student enrollment and profiles',
        'Daily attendance tracking',
        'Parent portal and notifications',
        'Class scheduling and management',
        'Fee collection and invoicing',
        'Progress reports and assessments',
      ],
      tech: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
      timeline: '6-8 weeks',
      link: 'https://www.projectgumpo.space',
    },
  },
];

export default function PortfolioSection({ className = '' }: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<System | null>(null);

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
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      const cards = cardsRef.current?.querySelectorAll('.portfolio-card') || [];
      cards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { y: '80vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05 + i * 0.03
        );
        // Image scale animation
        const img = card.querySelector('img');
        if (img) {
          scrollTl.fromTo(
            img,
            { scale: 1.06 },
            { scale: 1, ease: 'none' },
            0.05 + i * 0.03
          );
        }
      });

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cards,
        { y: 0, opacity: 1 },
        { y: '-30vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        headingRef.current,
        { x: 0, opacity: 1 },
        { x: '-6vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSeeDetails = (system: System) => {
    setSelectedSystem(system);
    setDialogOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className={`section-pinned bg-[#0B0C0F] ${className}`}
    >
      {/* Heading Block */}
      <div
        ref={headingRef}
        className="absolute left-[7vw] top-[14vh] w-[30vw]"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="label-mono block mb-4">Featured Systems</span>
        <h2 className="heading-lg text-white uppercase">Portfolio Highlights</h2>
      </div>

      {/* Portfolio Cards */}
      <div
        ref={cardsRef}
        className="absolute left-[7vw] right-[7vw] top-[36vh] flex gap-6"
      >
        {systems.map((system, i) => (
          <div
            key={i}
            className="portfolio-card card-dark flex-1 h-[46vh] overflow-hidden group hover:border-[#C8FF2E]/30 transition-all duration-500"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Image */}
            <div className="h-[60%] overflow-hidden">
              <img
                src={system.image}
                alt={system.title}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>
            {/* Content */}
            <div className="h-[40%] p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-['Space_Grotesk'] font-bold text-white text-lg mb-2">
                  {system.title}
                </h3>
                <p className="text-sm text-[#A6ACB8] line-clamp-2">
                  {system.description}
                </p>
              </div>
              <button
                onClick={() => handleSeeDetails(system)}
                className="inline-flex items-center gap-2 text-[#C8FF2E] text-sm group-hover:gap-3 transition-all w-fit"
              >
                <span>See details</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#111318] border border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSystem && (
            <>
              <DialogHeader>
                <DialogTitle className="font-['Space_Grotesk'] text-2xl flex items-center gap-3">
                  <Layers className="text-[#C8FF2E]" size={24} />
                  {selectedSystem.title}
                </DialogTitle>
                <DialogDescription className="text-[#A6ACB8] text-base">
                  {selectedSystem.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Features */}
                <div>
                  <h4 className="font-['Space_Grotesk'] font-semibold text-white mb-3 flex items-center gap-2">
                    <Check className="text-[#C8FF2E]" size={18} />
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedSystem.details.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-sm text-[#A6ACB8] flex items-start gap-2"
                      >
                        <span className="text-[#C8FF2E] mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-['Space_Grotesk'] font-semibold text-white mb-3 flex items-center gap-2">
                    <Zap className="text-[#C8FF2E]" size={18} />
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSystem.details.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-white/10 text-sm text-[#A6ACB8] rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Shield className="text-[#C8FF2E]" size={18} />
                    <span className="text-sm text-[#A6ACB8]">Typical timeline:</span>
                    <span className="text-sm text-white font-semibold">
                      {selectedSystem.details.timeline}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 space-y-3">
                  {selectedSystem.details.link && (
                    <a
                      href={selectedSystem.details.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      View Live Site
                      <ArrowRight size={18} />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setDialogOpen(false);
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`btn-secondary w-full flex items-center justify-center gap-2 ${
                      !selectedSystem.details.link ? 'btn-primary' : ''
                    }`}
                  >
                    Discuss This Project
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
