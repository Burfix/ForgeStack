import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, TrendingUp, FileSpreadsheet, Shield, BarChart3, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DashboardSectionProps {
  className?: string;
}

const features = [
  { icon: FileSpreadsheet, text: 'CSV ingestion → analytics in minutes' },
  { icon: Shield, text: 'Audit-friendly tracking' },
  { icon: Activity, text: 'Realtime dashboards' },
  { icon: BarChart3, text: 'Automated comparisons' },
  { icon: Zap, text: 'Built for scale' },
];

export default function DashboardSection({ className = '' }: DashboardSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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
        dashboardRef.current,
        { y: '100vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        badgeRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        metricRef.current,
        { x: '12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        captionRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );
      scrollTl.fromTo(
        featuresRef.current?.querySelectorAll('.feature-item') || [],
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.1
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        dashboardRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-40vh', scale: 0.95, opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        badgeRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        metricRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        captionRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        featuresRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dashboard"
      className={`section-pinned bg-[#0B0C0F] ${className}`}
    >
      {/* Dashboard Image */}
      <div
        ref={dashboardRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[86vw] h-[64vh] border border-white/10 overflow-hidden shadow-2xl"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/dashboard_q4_overview.jpg"
          alt="Operations Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0C0F]/30" />
      </div>

      {/* Live Badge */}
      <div
        ref={badgeRef}
        className="absolute left-[7vw] top-[14vh] flex items-center gap-2 bg-[#C8FF2E]/10 border border-[#C8FF2E]/30 px-4 py-2 rounded-sm"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="w-2 h-2 bg-[#C8FF2E] rounded-full animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-wider text-[#C8FF2E]">
          Live
        </span>
      </div>

      {/* Metric Card */}
      <div
        ref={metricRef}
        className="absolute right-[7vw] top-[14vh] w-[18vw] min-w-[200px] card-dark p-5"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="label-mono block mb-2">Total Spend</span>
        <div className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-1">
          $124.5K
        </div>
        <div className="flex items-center gap-1 text-sm text-[#C8FF2E]">
          <TrendingUp size={14} />
          <span>12% vs last quarter</span>
        </div>
      </div>

      {/* Caption Block */}
      <div
        ref={captionRef}
        className="absolute left-[7vw] bottom-[10vh] w-[34vw] min-w-[300px]"
        style={{ willChange: 'transform, opacity' }}
      >
        <h3 className="heading-md text-white mb-2">Operations Dashboard</h3>
        <p className="text-[#A6ACB8] text-sm leading-relaxed">
          Q4 Overview — realtime ingestion, audit-friendly tracking, and automated
          comparisons.
        </p>
      </div>

      {/* Feature List */}
      <div
        ref={featuresRef}
        className="absolute right-[7vw] bottom-[10vh] w-[26vw] min-w-[250px]"
        style={{ willChange: 'transform, opacity' }}
      >
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li
              key={i}
              className="feature-item flex items-center gap-3 text-sm text-[#A6ACB8]"
            >
              <feature.icon size={16} className="text-[#C8FF2E]" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
