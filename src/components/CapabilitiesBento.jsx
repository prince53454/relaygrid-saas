import { useState } from 'react';
import { PRICING_TIERS, REGION_PROFILES } from '../data/platformData';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import infraClusterImg from '../assets/images/case_study_infrastructure_1794561114743.jpg';
const RETRY_DATA = {
  exponential: {
    p99Ms: '42 ms',
    successRate: '99.994%',
    bars: [96, 98, 94, 99, 97, 100, 99, 98, 100, 97, 99, 100],
    description:
      'Wait a little longer between tries so an unavailable app has time to recover.',
  },
  linear: {
    p99Ms: '68 ms',
    successRate: '99.910%',
    bars: [88, 91, 86, 92, 90, 93, 91, 89, 94, 92, 90, 93],
    description:
      'Try again at the same interval for steady, predictable delivery.',
  },
  immediate: {
    p99Ms: '19 ms',
    successRate: '99.420%',
    bars: [74, 82, 79, 85, 77, 88, 84, 80, 86, 83, 81, 87],
    description: 'Try again quickly when a brief connection problem happens.',
  },
};
const LEDGER_ROWS = [
  {
    id: 'INV-44918',
    account: 'Northstar Compute',
    delta: '$0.00',
    status: 'Matched',
  },
  {
    id: 'INV-44919',
    account: 'Alder Financial',
    delta: '$0.00',
    status: 'Matched',
  },
  {
    id: 'INV-44920',
    account: 'Kestrel Robotics',
    delta: '-$18.15',
    status: 'Flagged',
  },
];
export function CapabilitiesBento() {
  const [retryPolicy, setRetryPolicy] = useState('exponential');
  const [monthlyEventsM, setMonthlyEventsM] = useState(12);
  const [ledgerFilter, setLedgerFilter] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('us-east-1');
  const [infraImgError, setInfraImgError] = useState(false);
  const policy = RETRY_DATA[retryPolicy];
  const activeRegion =
    REGION_PROFILES.find((r) => r.id === selectedRegion) ?? REGION_PROFILES[0];
  const estimatedTier =
    monthlyEventsM <= 5 ? PRICING_TIERS[0] : PRICING_TIERS[1];
  const filteredLedger = LEDGER_ROWS.filter((row) => {
    if (ledgerFilter === 'all') return true;
    if (ledgerFilter === 'matched') return row.status === 'Matched';
    return row.status === 'Flagged';
  });
  return (
    <section
      id='platform'
      className='border-b border-white/[0.08] py-20 lg:py-24'
    >
      <div className='mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12'>
        <div className='max-w-2xl'>
          <p className='text-xs font-medium text-[#4CD7F6]'>
            What RelayGrid takes care of
          </p>
          <h2 className='mt-2 font-display text-3xl font-semibold tracking-[-0.025em] text-[#F8FAFC] sm:text-4xl [text-wrap:balance]'>
            The important updates, the usage, and the invoice—all in one place.
          </h2>
          <p className='mt-3 text-base text-[#C7C4D7]'>
            Stop building custom tools to deliver customer updates and
            double-check usage-based bills.
          </p>
        </div>

        <div className='mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='specular-sheen lg:col-span-2 rounded-xl border border-white/[0.08] bg-[#111827] p-6 sm:p-8 flex flex-col justify-between'>
            <div className='flex flex-wrap items-start justify-between gap-4'>
              <div className='max-w-lg'>
                <h3 className='font-display text-xl font-semibold text-white'>
                  01. Get customer updates where they need to go
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-[#C7C4D7]'>
                  A webhook is an automatic message sent from one app to another
                  when something changes. RelayGrid sends those messages
                  securely, in order, and tries again if a connected app is
                  down.
                </p>
              </div>

              <div className='flex w-full max-w-full flex-wrap items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0B0F19] p-1 sm:w-auto sm:flex-nowrap'>
                {[
                  { id: 'exponential', label: 'Wait longer each time' },
                  { id: 'linear', label: 'Try at set intervals' },
                  { id: 'immediate', label: 'Try again quickly' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    type='button'
                    onClick={() => setRetryPolicy(id)}
                    className={`rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors cursor-pointer sm:px-3 ${retryPolicy === id ? 'bg-[#1E293B] text-white' : 'text-[#94A3B8] hover:text-[#DAE2FD]'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className='mt-8 rounded-lg border border-white/[0.06] bg-[#0B0F19] p-5'>
              <div className='flex flex-wrap items-baseline justify-between gap-4'>
                <p className='text-xs text-[#94A3B8]'>{policy.description}</p>
                <div className='flex w-full min-w-0 flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tabular-nums sm:w-auto'>
                  <span className='text-[#C7C4D7]'>
                    Typical time:{' '}
                    <strong className='text-white'>{policy.p99Ms}</strong>
                  </span>
                  <span className='text-[#4EDEA3]'>
                    Reached its destination:{' '}
                    <strong>{policy.successRate}</strong>
                  </span>
                </div>
              </div>

              <div
                className='mt-5 flex h-24 items-end gap-2'
                aria-hidden='true'
              >
                {policy.bars.map((val, idx) => (
                  <div
                    key={idx}
                    className='flex-1 flex flex-col items-center gap-1.5'
                  >
                    <div
                      className='w-full rounded-t bg-[#6366F1]/80 transition-all duration-200'
                      style={{ height: `${Math.max(24, val - 10)}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className='mt-2 flex justify-between font-mono text-[11px] text-[#94A3B8] tabular-nums'>
                <span>00:00 UTC</span>
                <span>Example delivery history</span>
                <span>12:00 UTC</span>
              </div>
            </div>
          </div>

          <div className='rounded-xl border border-white/[0.08] bg-[#111827] p-6 sm:p-8 flex flex-col justify-between'>
            <div>
              <h3 className='font-display text-xl font-semibold text-white'>
                02. Count product usage automatically
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-[#C7C4D7]'>
                Track how much of your product each customer uses, ignore
                repeated updates, and estimate the monthly charge.
              </p>
            </div>

            <div className='mt-6 rounded-lg border border-white/[0.06] bg-[#0B0F19] p-4'>
              <div className='flex items-center justify-between text-xs'>
                <label htmlFor='volume-slider' className='text-[#94A3B8]'>
                  Example updates per month
                </label>
                <span className='font-mono font-medium text-[#4CD7F6] tabular-nums'>
                  {monthlyEventsM}M updates
                </span>
              </div>
              <input
                id='volume-slider'
                type='range'
                min={1}
                max={50}
                value={monthlyEventsM}
                onChange={(e) => setMonthlyEventsM(Number(e.target.value))}
                className='mt-3 w-full accent-[#6366F1] cursor-pointer'
              />
              <div className='mt-4 border-t border-white/[0.06] pt-3 flex items-baseline justify-between gap-3'>
                <span className='text-xs text-[#94A3B8]'>
                  Plan for this amount
                </span>
                <span className='font-mono text-sm font-semibold text-white tabular-nums'>
                  {estimatedTier.name} · ${estimatedTier.monthlyPrice}/mo
                </span>
              </div>
            </div>
          </div>

          <div className='rounded-xl border border-white/[0.08] bg-[#111827] p-6 sm:p-8 flex flex-col justify-between'>
            <div>
              <h3 className='font-display text-xl font-semibold text-white'>
                03. Catch invoice mismatches
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-[#C7C4D7]'>
                Compare what a customer used with what they were charged. Review
                differences before they become month-end surprises.
              </p>
            </div>

            <div className='mt-6'>
              <div className='flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0B0F19] p-1'>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'matched', label: 'Matches' },
                  { id: 'flagged', label: 'Review' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    type='button'
                    onClick={() => setLedgerFilter(id)}
                    className={`flex-1 rounded-md px-2.5 py-1.5 text-xs font-medium capitalize transition-colors cursor-pointer whitespace-nowrap ${ledgerFilter === id ? 'bg-[#1E293B] text-white' : 'text-[#94A3B8] hover:text-[#DAE2FD]'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className='mt-3 divide-y divide-white/[0.06] rounded-lg border border-white/[0.06] bg-[#0B0F19] px-3'>
                {filteredLedger.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between py-2.5 text-xs'
                  >
                    <div className='min-w-0'>
                      <p className='font-mono text-[#DAE2FD]'>{item.id}</p>
                      <p className='text-[#94A3B8] truncate'>{item.account}</p>
                    </div>
                    <div className='flex items-center gap-2.5 shrink-0'>
                      <span className='font-mono text-[#C7C4D7] tabular-nums'>
                        {item.delta}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 font-medium ${item.status === 'Matched' ? 'text-[#4EDEA3]' : 'text-amber-400'}`}
                      >
                        {item.status === 'Matched' ? (
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
                        {item.status === 'Matched' ? 'Match' : 'Review'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='lg:col-span-2 rounded-xl border border-white/[0.08] bg-[#111827] overflow-hidden grid grid-cols-1 md:grid-cols-12'>
            <div className='p-6 sm:p-8 md:col-span-7 flex flex-col justify-between'>
              <div>
                <h3 className='font-display text-xl font-semibold text-white'>
                  04. Keep customer data in the right region
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-[#C7C4D7]'>
                  Choose where customer updates are handled. For example, keep
                  European customer data in Frankfurt while serving customers in
                  other regions nearby.
                </p>

                <div className='mt-5 flex flex-wrap gap-1.5 rounded-lg border border-white/[0.08] bg-[#0B0F19] p-1 w-fit'>
                  {REGION_PROFILES.map((region) => (
                    <button
                      key={region.id}
                      type='button'
                      onClick={() => setSelectedRegion(region.id)}
                      className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer whitespace-nowrap ${selectedRegion === region.id ? 'bg-[#6366F1] text-white' : 'text-[#94A3B8] hover:text-white'}`}
                    >
                      {region.city.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className='mt-6 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-4'>
                <div>
                  <p className='text-xs text-[#94A3B8]'>
                    Customer data location
                  </p>
                  <p className='mt-1 text-sm font-medium text-white'>
                    {activeRegion.city}
                  </p>
                  <p className='mt-0.5 text-xs text-[#4EDEA3]'>
                    {activeRegion.failoverState}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-[#94A3B8]'>Updates each second</p>
                  <p className='mt-1 font-mono text-sm font-medium text-white tabular-nums'>
                    {activeRegion.throughputRps}
                  </p>
                  <p className='mt-0.5 font-mono text-xs text-[#4CD7F6] tabular-nums'>
                    Typical response: {activeRegion.p99Ms}
                  </p>
                </div>
              </div>
            </div>

            <div className='relative min-h-[220px] md:col-span-5 border-t md:border-t-0 md:border-l border-white/[0.08] bg-[#060E20]'>
              {!infraImgError ? (
                <img
                  src={infraClusterImg}
                  alt='RelayGrid regional server cluster infrastructure'
                  referrerPolicy='no-referrer'
                  onError={() => setInfraImgError(true)}
                  className='h-full w-full object-cover object-center'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center bg-[#0B1326]'>
                  <span className='font-mono text-xs text-[#94A3B8]'>
                    {activeRegion.city}
                  </span>
                </div>
              )}
              <div className='absolute inset-0 bg-gradient-to-t from-[#111827]/85 via-transparent to-transparent' />
              <div className='absolute bottom-4 left-4 right-4 font-mono text-xs text-[#DAE2FD]'>
                Updates handled in {activeRegion.city}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
