import { Github, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Supplier Intelligence', href: '#services' },
    { label: 'Invoice Analytics', href: '#services' },
    { label: 'Compliance Tracking', href: '#services' },
    { label: 'Executive Dashboards', href: '#services' },
  ],
  company: [
    { label: 'About Us', href: '#values' },
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Support', href: '#' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B0C0F] border-t border-white/10 py-16">
      <div className="px-[7vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="font-['Space_Grotesk'] font-bold text-xl text-white tracking-tight inline-block mb-4"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              ForgeStack Africa
            </a>
            <p className="text-[#A6ACB8] text-sm leading-relaxed max-w-sm mb-6">
              Full-stack business intelligence systems for African businesses. We turn
              your operational data into clear, actionable insights.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-[#A6ACB8] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Space_Grotesk'] font-semibold text-white mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-[#A6ACB8] hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-['Space_Grotesk'] font-semibold text-white mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-[#A6ACB8] hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-['Space_Grotesk'] font-semibold text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-[#A6ACB8] hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#A6ACB8]">
            © 2026 ForgeStack Africa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-sm text-[#A6ACB8] hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button className="text-sm text-[#A6ACB8] hover:text-white transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
