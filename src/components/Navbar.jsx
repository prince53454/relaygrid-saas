import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Live demo', href: '#sandbox' },
  { label: 'Use cases', href: '#customers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];
export function Navbar({ onOpenTrial }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href),
    ).filter((section) => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <header className='sticky top-0 z-40 border-b border-white/[0.08] bg-[#0B0F19]/85 backdrop-blur-md'>
      <div className='mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-5 py-3.5 sm:px-8 lg:px-12'>
        <a
          href='#top'
          className='inline-flex items-center gap-2.5 rounded font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]'
        >
          <span className='brand-mark' aria-hidden='true'>
            <i />
            <i />
            <i />
            <i />
          </span>
          RelayGrid
        </a>

        <nav aria-label='Primary' className='hidden md:flex items-center gap-8'>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? 'location' : undefined}
              className={`nav-link rounded text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] ${activeHref === link.href ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className='flex items-center gap-3 shrink-0'>
          <button
            type='button'
            onClick={onOpenTrial}
            className='hidden sm:inline-flex items-center justify-center rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:bg-[#5558E6] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C1FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]'
          >
            Start Free Trial
          </button>
          <button
            type='button'
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={
              mobileOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileOpen}
            className='inline-flex md:hidden items-center justify-center rounded-lg border border-white/[0.1] bg-[#111827] p-2 text-[#DAE2FD] hover:bg-[#1E293B] transition-colors cursor-pointer'
          >
            {mobileOpen ? (
              <X className='h-5 w-5' />
            ) : (
              <Menu className='h-5 w-5' />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className='border-t border-white/[0.08] bg-[#111827] px-5 py-4 md:hidden'>
          <nav aria-label='Mobile' className='flex flex-col gap-3'>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={activeHref === link.href ? 'location' : undefined}
                className={`py-1.5 text-sm font-medium transition-colors ${activeHref === link.href ? 'text-white' : 'text-[#A6B1C7] hover:text-white'}`}
              >
                {link.label}
              </a>
            ))}
            <button
              type='button'
              onClick={() => {
                setMobileOpen(false);
                onOpenTrial();
              }}
              className='mt-2 inline-flex items-center justify-center rounded-lg bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5558E6] transition-colors cursor-pointer'
            >
              Start Free Trial
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
