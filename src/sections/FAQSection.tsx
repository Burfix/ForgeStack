import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQSectionProps {
  className?: string;
}

const faqs = [
  {
    question: 'How long does a typical build take?',
    answer:
      'Most projects are delivered within 2–6 weeks depending on scope and complexity. We follow an agile approach with weekly demos to ensure alignment.',
  },
  {
    question: 'Can you integrate with our existing ERP?',
    answer:
      'Yes, we integrate with most major ERP systems including SAP, Oracle, Sage, and custom platforms. We use REST APIs and secure data pipelines.',
  },
  {
    question: 'Do you provide training and documentation?',
    answer:
      'Absolutely. Every project includes comprehensive documentation, user guides, and hands-on training sessions for your team.',
  },
  {
    question: 'Is hosting included?',
    answer:
      'We offer flexible hosting options: cloud-hosted on AWS/Azure, on-premise deployment, or hybrid setups based on your security requirements.',
  },
  {
    question: "What's the pricing model?",
    answer:
      'We offer fixed-price projects for well-defined scopes, or monthly retainers for ongoing development and support. Contact us for a custom quote.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Book a free discovery call. We\'ll discuss your needs, map out potential solutions, and provide a detailed proposal within 48 hours.',
  },
];

export default function FAQSection({ className = '' }: FAQSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      // Columns animation
      gsap.fromTo(
        columnsRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const leftFAQs = faqs.filter((_, i) => i % 2 === 0);
  const rightFAQs = faqs.filter((_, i) => i % 2 === 1);

  const FAQItem = ({
    faq,
    index,
  }: {
    faq: (typeof faqs)[0];
    index: number;
  }) => {
    const isOpen = openIndex === index;
    return (
      <div className="border-b border-white/10">
        <button
          className="w-full py-5 flex items-center justify-between text-left group"
          onClick={() => setOpenIndex(isOpen ? null : index)}
        >
          <span className="font-['Space_Grotesk'] font-semibold text-white pr-4 group-hover:text-[#C8FF2E] transition-colors">
            {faq.question}
          </span>
          <ChevronDown
            size={20}
            className={`text-[#A6ACB8] flex-shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-48 pb-5' : 'max-h-0'
          }`}
        >
          <p className="text-sm text-[#A6ACB8] leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className={`section-flowing bg-[#0B0C0F] py-24 ${className}`}
    >
      <div className="px-[7vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="label-mono block mb-4">FAQ</span>
          <h2 className="heading-lg text-white uppercase">Common Questions</h2>
        </div>

        {/* FAQ Columns */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          <div className="space-y-0">
            {leftFAQs.map((faq, i) => (
              <FAQItem key={i * 2} faq={faq} index={i * 2} />
            ))}
          </div>
          <div className="space-y-0">
            {rightFAQs.map((faq, i) => (
              <FAQItem key={i * 2 + 1} faq={faq} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
