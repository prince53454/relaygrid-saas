export function Footer({ onOpenTrial }) {
  return (
    <footer className='bg-[#0B0F19] py-14'>
      <div className='mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12'>
          <div className='lg:col-span-5'>
            <a
              href='#top'
              className='font-display text-lg font-bold tracking-tight text-white'
            >
              RelayGrid
            </a>
            <p className='mt-3 max-w-sm text-sm text-[#94A3B8] leading-relaxed'>
              RelayGrid helps software businesses send customer updates, keep
              product-usage totals straight, and spot billing differences.
            </p>
            <p className='mt-4 text-xs text-[#94A3B8]'>
              Sample product preview · No account or payment required
            </p>
          </div>

          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3 text-sm'>
            <div>
              <h4 className='font-medium text-white'>Platform</h4>
              <ul className='mt-3 space-y-2 text-xs text-[#94A3B8]'>
                <li>
                  <a
                    href='#platform'
                    className='hover:text-white transition-colors'
                  >
                    Customer updates
                  </a>
                </li>
                <li>
                  <a
                    href='#platform'
                    className='hover:text-white transition-colors'
                  >
                    Usage tracking
                  </a>
                </li>
                <li>
                  <a
                    href='#how-it-works'
                    className='hover:text-white transition-colors'
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <a
                    href='#sandbox'
                    className='hover:text-white transition-colors'
                  >
                    Live demo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-medium text-white'>Company</h4>
              <ul className='mt-3 space-y-2 text-xs text-[#94A3B8]'>
                <li>
                  <a
                    href='#contact'
                    className='hover:text-white transition-colors'
                  >
                    Request a demo
                  </a>
                </li>
                <li>
                  <a
                    href='#pricing'
                    className='hover:text-white transition-colors'
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <button
                    type='button'
                    onClick={onOpenTrial}
                    className='hover:text-white transition-colors cursor-pointer text-left'
                  >
                    Start Free Trial
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className='lg:col-span-4'>
            <h4 className='text-sm font-medium text-white'>
              Keep every customer in sync.
            </h4>
            <p className='mt-2 text-xs text-[#94A3B8]'>
              Send payment and plan updates, track product use, and check bills
              in one place.
            </p>
            <a href='#contact' className='primary-button mt-5'>
              Talk to an engineer
              <span aria-hidden='true'>→</span>
            </a>
          </div>
        </div>

        <div className='mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-[#94A3B8]'>
          <p>
            © {new Date().getFullYear()} RelayGrid Systems Inc. All rights
            reserved.
          </p>
          <div className='flex items-center gap-6'>
            <a
              href='mailto:security@relaygrid.io'
              className='hover:text-white transition-colors'
            >
              Security contact
            </a>
            <a href='#contact' className='hover:text-white transition-colors'>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
