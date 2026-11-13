import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
const TAB_CONFIG = {
  routing: {
    label: 'Send updates',
    endpoint: 'Invoice ready \u2192 customer app',
    metricLabel: 'Example delivery time',
    metricValue: '14 ms',
    deltaText: 'A sample event sent to its destination',
    rows: [
      {
        key: 'Invoice update',
        target: 'Northstar Compute',
        value: 'Delivered \xB7 11 ms',
        status: 'Delivered',
      },
      {
        key: 'Plan update',
        target: 'Verve Logistics',
        value: 'Delivered \xB7 16 ms',
        status: 'Delivered',
      },
      {
        key: 'Renewal update',
        target: 'Meridian Health',
        value: 'Trying again soon',
        status: 'Trying again',
      },
    ],
  },
  metering: {
    label: 'Count usage',
    endpoint: 'GPU usage \u2192 monthly total',
    metricLabel: 'Example product actions counted / min',
    metricValue: '1,240,800',
    deltaText: 'Repeated events are recognized and counted once',
    rows: [
      {
        key: 'Northstar Compute',
        target: '142,683 GPU seconds used',
        value: '$4,280.50',
        status: 'Matched',
      },
      {
        key: 'Alder Financial',
        target: '31,283 identity checks',
        value: '$7,820.75',
        status: 'Matched',
      },
      {
        key: 'Solstice CAD',
        target: '35 new seats',
        value: '$3,150.00',
        status: 'Matched',
      },
    ],
  },
  reconciliation: {
    label: 'Check invoices',
    endpoint: 'Usage total \u2194 payment invoice',
    metricLabel: 'Example difference to review',
    metricValue: '$18.15',
    deltaText: 'Spot a difference before the invoice goes out',
    rows: [
      {
        key: 'Northstar Compute',
        target: 'Usage matches invoice',
        value: '$4,280.50',
        status: 'Matched',
      },
      {
        key: 'Alder Financial',
        target: 'Usage matches invoice',
        value: '$7,820.75',
        status: 'Matched',
      },
      {
        key: 'Kestrel Robotics',
        target: '$18.15 difference found',
        value: 'Review',
        status: 'Needs review',
      },
    ],
  },
};
export function HeroSection({ onOpenTrial }) {
  const [activeTab, setActiveTab] = useState('routing');
  const current = TAB_CONFIG[activeTab];
  return (
    <section
      id='top'
      className='relative border-b border-white/[0.08] bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.09),transparent_55%)]'
    >
      <div className='mx-auto max-w-[1280px] px-5 pt-14 pb-16 sm:px-8 lg:px-12 lg:pt-20 lg:pb-20'>
        <div className='grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12'>
          <div className='flex flex-col justify-between lg:col-span-6'>
            <div>
              <p className='section-eyebrow'>
                <span className='eyebrow-dot bg-[#4EDEA3]' />
                Reliable updates and usage billing for software teams
              </p>

              <h1
                className='mt-5 font-display font-semibold text-[#F8FAFC] tracking-[-0.055em] leading-[1.02] [text-wrap:balance]'
                style={{ fontSize: 'clamp(2.75rem, 5.5vw, 5rem)' }}
              >
                Keep customer updates moving.
                <br />
                <span className='hero-gradient-text'>
                  Keep billing accurate.
                </span>
              </h1>

              <p className='mt-6 max-w-[55ch] text-base leading-relaxed text-[#A6B1C7] sm:text-lg'>
                If your software charges customers based on usage, RelayGrid
                helps keep the details in sync: it sends updates to the apps
                your customers use, tries again when one is offline, and checks
                usage against bills.
              </p>

              <div className='mt-8 flex flex-wrap items-center gap-4'>
                <button
                  type='button'
                  onClick={onOpenTrial}
                  className='inline-flex items-center gap-2 rounded-lg bg-[#6366F1] px-6 py-3 text-sm font-medium text-white hover:bg-[#5558E6] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C1FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]'
                >
                  Start Free Trial
                  <ArrowRight className='h-4 w-4' aria-hidden='true' />
                </button>
                <a
                  href='#sandbox'
                  className='inline-flex items-center justify-center rounded-lg border border-white/[0.12] bg-[#111827] px-5 py-3 text-sm font-medium text-[#DAE2FD] hover:bg-[#1E293B] hover:border-[#6366F1]/40 transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]'
                >
                  See a sample update
                </a>
              </div>
            </div>

            <div className='mt-10 border-t border-white/[0.08] pt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#94A3B8]'>
              <span>14-day free trial</span>
              <span aria-hidden='true'>·</span>
              <span>For usage-based software</span>
              <span aria-hidden='true'>·</span>
              <span>No credit card required</span>
            </div>
          </div>

          <div className='lg:col-span-6 flex flex-col'>
            <div className='hero-console specular-sheen flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#101625]'>
              <div className='relative min-h-[12rem] overflow-hidden border-b border-white/[0.08] bg-[radial-gradient(ellipse_at_55%_45%,rgba(101,107,255,0.2),transparent_58%),linear-gradient(145deg,#111a2b,#080d17)] p-5 sm:min-h-[14rem] sm:p-6'>
                <div className='absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(138,148,174,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(138,148,174,.1)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent)]' />
                <div className='relative flex items-center justify-between gap-3'>
                  <div>
                    <p className='font-mono text-[10px] tracking-[0.15em] text-[#8995AD]'>
                      SAMPLE UPDATE
                    </p>
                    <p className='mt-1 text-sm font-medium text-white'>
                      {current.label}
                    </p>
                  </div>
                  <span className='inline-flex items-center gap-2 rounded-full border border-[#4EDEA3]/20 bg-[#4EDEA3]/[0.07] px-2.5 py-1 font-mono text-[10px] text-[#8CF0BD]'>
                    <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#4EDEA3]' />
                    DELIVERY WORKING
                  </span>
                </div>
                <div className='relative mt-7 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:mt-8 sm:gap-3'>
                  <div className='route-node'>
                    <span className='font-mono text-[9px] text-[#8995AD]'>
                      YOUR SOFTWARE
                    </span>
                    <span className='mt-1 truncate font-mono text-[10px] text-[#DAE2FD] sm:text-xs'>
                      Invoice ready
                    </span>
                  </div>
                  <span className='route-line' aria-hidden='true'>
                    <i />
                  </span>
                  <div className='route-node route-node-active'>
                    <span className='font-mono text-[9px] text-[#A4A6FF]'>
                      RELAYGRID
                    </span>
                    <span className='mt-1 truncate font-mono text-[10px] text-white sm:text-xs'>
                      check · send
                    </span>
                  </div>
                  <span
                    className='route-line route-line-cyan'
                    aria-hidden='true'
                  >
                    <i />
                  </span>
                  <div className='route-node'>
                    <span className='font-mono text-[9px] text-[#8995AD]'>
                      CUSTOMER’S APP
                    </span>
                    <span className='mt-1 truncate font-mono text-[10px] text-[#DAE2FD] sm:text-xs'>
                      Update received
                    </span>
                  </div>
                </div>
                <div className='relative mt-3 flex items-center justify-between gap-3 text-[10px] text-[#8995AD]'>
                  <span className='truncate font-mono'>{current.endpoint}</span>
                  <span className='shrink-0 font-mono text-[#4CD7F6]'>
                    {current.metricValue}
                  </span>
                </div>
              </div>

              <div className='flex flex-1 flex-col justify-between p-4 sm:p-5'>
                <div>
                  <div
                    role='tablist'
                    aria-label='Control plane preview modes'
                    className='grid grid-cols-3 gap-1 rounded-lg border border-white/[0.08] bg-[#0B0F19] p-1'
                  >
                    {Object.keys(TAB_CONFIG).map((tabKey) => {
                      const active = activeTab === tabKey;
                      return (
                        <button
                          key={tabKey}
                          type='button'
                          role='tab'
                          aria-selected={active}
                          onClick={() => setActiveTab(tabKey)}
                          className={`rounded-md px-3 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap truncate cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] ${active ? 'bg-[#1E293B] text-white border border-white/[0.08]' : 'text-[#94A3B8] hover:text-[#DAE2FD] border border-transparent'}`}
                        >
                          {TAB_CONFIG[tabKey].label}
                        </button>
                      );
                    })}
                  </div>

                  <div className='mt-4 flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3'>
                    <div>
                      <p className='text-xs text-[#94A3B8]'>
                        {current.metricLabel}
                      </p>
                      <p className='mt-0.5 text-xs text-[#C7C4D7]'>
                        {current.deltaText}
                      </p>
                    </div>
                    <p className='font-mono text-xl font-semibold text-white tabular-nums whitespace-nowrap shrink-0'>
                      {current.metricValue}
                    </p>
                  </div>

                  <div className='mt-3 divide-y divide-white/[0.06]'>
                    {current.rows.map((row) => (
                      <div
                        key={row.key}
                        className='flex items-center justify-between gap-4 py-2.5 text-xs'
                      >
                        <div className='min-w-0'>
                          <p className='font-mono text-[#DAE2FD] truncate'>
                            {row.key}
                          </p>
                          <p className='text-[#94A3B8] truncate'>
                            {row.target}
                          </p>
                        </div>
                        <div className='flex items-center gap-3 shrink-0'>
                          <span className='font-mono text-[#C7C4D7] tabular-nums'>
                            {row.value}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 font-medium whitespace-nowrap ${row.status === 'Trying again' ? 'text-amber-400' : row.status === 'Needs review' ? 'text-rose-300' : 'text-[#4EDEA3]'}`}
                          >
                            {row.status === 'Trying again' ? (
                              <RefreshCw
                                className='h-3.5 w-3.5'
                                aria-hidden='true'
                              />
                            ) : row.status === 'Delivered' ||
                              row.status === 'Matched' ? (
                              <CheckCircle2
                                className='h-3.5 w-3.5'
                                aria-hidden='true'
                              />
                            ) : (
                              <AlertTriangle
                                className='h-3.5 w-3.5'
                                aria-hidden='true'
                              />
                            )}
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4'>
          <div className='bg-[#111827] px-6 py-5'>
            <p className='font-display text-lg font-semibold text-white'>
              Reliable delivery
            </p>
            <p className='mt-1 text-sm text-[#C7C4D7]'>
              Updates retry if a customer app is offline
            </p>
          </div>
          <div className='bg-[#111827] px-6 py-5'>
            <p className='font-display text-lg font-semibold text-[#4CD7F6]'>
              No double counting
            </p>
            <p className='mt-1 text-sm text-[#C7C4D7]'>
              Repeated usage updates are recognized
            </p>
          </div>
          <div className='bg-[#111827] px-6 py-5'>
            <p className='font-display text-lg font-semibold text-[#4EDEA3]'>
              Clear activity history
            </p>
            <p className='mt-1 text-sm text-[#C7C4D7]'>
              See what was sent and what happened
            </p>
          </div>
          <div className='bg-[#111827] px-6 py-5'>
            <p className='font-display text-lg font-semibold text-white'>
              Fewer manual checks
            </p>
            <p className='mt-1 text-sm text-[#C7C4D7]'>
              Compare usage totals with invoices
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
