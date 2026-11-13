import { PRICING_TIERS } from '../data/platformData';
import { ArrowRight } from 'lucide-react';
export function PricingSection({ cadence, onCadenceChange, onSelectPlan }) {
  return (
    <section
      id='pricing'
      className='border-b border-white/[0.08] py-20 lg:py-24 bg-[#0B0F19]'
    >
      <div className='mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-xl'>
            <p className='text-xs font-medium text-[#C0C1FF]'>
              Straightforward pricing
            </p>
            <h2 className='mt-2 font-display text-3xl font-semibold tracking-[-0.025em] text-[#F8FAFC] sm:text-4xl [text-wrap:balance]'>
              Pay for the number of updates you need.
            </h2>
            <p className='mt-3 text-sm leading-relaxed text-[#A6B1C7]'>
              One update is one message RelayGrid sends between apps. Start
              small and change plans as your customer base grows.
            </p>
          </div>

          <div
            role='group'
            aria-label='Billing cadence'
            className='inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#111827] p-1 w-fit shrink-0'
          >
            <button
              type='button'
              onClick={() => onCadenceChange('monthly')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${cadence === 'monthly' ? 'bg-[#1E293B] text-white' : 'text-[#94A3B8] hover:text-[#DAE2FD]'}`}
            >
              Monthly Billing
            </button>
            <button
              type='button'
              onClick={() => onCadenceChange('annual')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${cadence === 'annual' ? 'bg-[#6366F1] text-white' : 'text-[#94A3B8] hover:text-[#DAE2FD]'}`}
            >
              Annual · Save 20%
            </button>
          </div>
        </div>

        <div className='mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {PRICING_TIERS.map((tier) => {
            const price =
              cadence === 'annual'
                ? tier.annualMonthlyPrice
                : tier.monthlyPrice;
            return (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-xl border bg-[#111827] p-6 sm:p-8 ${tier.recommended ? 'specular-sheen border-[#6366F1]/50' : 'border-white/[0.08]'}`}
              >
                <div>
                  <div className='flex items-center justify-between gap-2 text-xs'>
                    <span className='text-[#94A3B8]'>{tier.audience}</span>
                    {tier.recommended && (
                      <span className='font-medium text-[#4CD7F6]'>
                        Most popular
                      </span>
                    )}
                  </div>

                  <h3 className='mt-2 font-display text-2xl font-semibold text-white'>
                    {tier.name}
                  </h3>
                  <p className='mt-2 text-sm text-[#C7C4D7] leading-relaxed'>
                    {tier.summary}
                  </p>

                  <div className='mt-6 flex items-baseline gap-2 border-b border-white/[0.08] pb-6'>
                    {price !== null ? (
                      <>
                        <span className='font-mono text-3xl font-bold text-white tabular-nums'>
                          ${price}
                        </span>
                        <span className='text-xs text-[#94A3B8]'>
                          / month{' '}
                          {cadence === 'annual' ? '\xB7 billed annually' : ''}
                        </span>
                      </>
                    ) : (
                      <span className='font-display text-2xl font-bold text-white'>
                        Custom Volume
                      </span>
                    )}
                  </div>

                  <dl className='mt-6 space-y-3 text-xs'>
                    <div className='flex items-center justify-between gap-4'>
                      <dt className='text-[#94A3B8]'>Updates per month</dt>
                      <dd className='font-mono font-medium text-[#DAE2FD] tabular-nums'>
                        {tier.limits.eventsPerMonth}
                      </dd>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                      <dt className='text-[#94A3B8]'>Activity history</dt>
                      <dd className='font-medium text-[#DAE2FD]'>
                        {tier.limits.retention}
                      </dd>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                      <dt className='text-[#94A3B8]'>Data region</dt>
                      <dd className='font-medium text-[#DAE2FD]'>
                        {tier.limits.regions}
                      </dd>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                      <dt className='text-[#94A3B8]'>Time to retry</dt>
                      <dd className='font-medium text-[#DAE2FD]'>
                        {tier.limits.replayWindow}
                      </dd>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                      <dt className='text-[#94A3B8]'>Uptime goal</dt>
                      <dd className='font-mono font-medium text-[#4EDEA3] tabular-nums'>
                        {tier.limits.sla}
                      </dd>
                    </div>
                  </dl>
                </div>

                <button
                  type='button'
                  onClick={() => onSelectPlan(tier)}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${tier.recommended ? 'bg-[#6366F1] text-white hover:bg-[#5558E6]' : 'border border-white/[0.12] bg-[#1E293B] text-white hover:border-[#6366F1]/50'}`}
                >
                  {tier.ctaLabel}
                  <ArrowRight className='h-4 w-4' aria-hidden='true' />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
