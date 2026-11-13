import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { PRICING_TIERS } from '../data/platformData';
export function TrialCheckoutModal({ isOpen, initialTier, cadence, onClose }) {
  const [selectedTierId, setSelectedTierId] = useState(initialTier.id);
  const [selectedCadence, setSelectedCadence] = useState(cadence);
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [region, setRegion] = useState('us-east-1');
  const [errorMessage, setErrorMessage] = useState(null);
  const [submittedWorkspace, setSubmittedWorkspace] = useState(null);
  if (!isOpen) return null;
  const activeTier =
    PRICING_TIERS.find((t) => t.id === selectedTierId) ?? initialTier;
  const price =
    selectedCadence === 'annual'
      ? activeTier.annualMonthlyPrice
      : activeTier.monthlyPrice;
  const derivedSlug =
    companyName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'acme-corp';
  function handleSubmit(e) {
    e.preventDefault();
    const trimmedEmail = workEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Enter a valid email address to preview your trial.');
      return;
    }
    if (companyName.trim().length < 2) {
      setErrorMessage(
        'Enter your organization or workspace name (at least 2 characters).',
      );
      return;
    }
    setErrorMessage(null);
    setSubmittedWorkspace(derivedSlug);
  }
  function handleResetAndClose() {
    setSubmittedWorkspace(null);
    setErrorMessage(null);
    onClose();
  }
  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='trial-modal-title'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'
    >
      <div className='specular-sheen relative w-full max-w-lg rounded-xl border border-white/[0.12] bg-[#111827]/95 backdrop-blur-md p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.65)]'>
        <button
          type='button'
          onClick={handleResetAndClose}
          aria-label='Close modal'
          className='absolute right-4 top-4 rounded-lg p-1.5 text-[#94A3B8] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer'
        >
          <X className='h-5 w-5' />
        </button>

        {submittedWorkspace ? (
          <div className='py-4'>
            <div className='flex items-center gap-2.5 text-[#4EDEA3]'>
              <CheckCircle2 className='h-6 w-6 shrink-0' aria-hidden='true' />
              <h3
                id='trial-modal-title'
                className='font-display text-xl font-semibold text-white'
              >
                Your trial preview is ready
              </h3>
            </div>
            <p className='mt-3 text-sm text-[#C7C4D7] leading-relaxed'>
              This is a preview only—no account was created and no email was
              sent. In the full product, this is where your 14-day{' '}
              <strong className='text-white'>{activeTier.name}</strong> trial
              details would be sent to{' '}
              <span className='text-white'>{workEmail}</span>.
            </p>

            <div className='mt-5 rounded-lg border border-white/[0.08] bg-[#0B0F19] p-4 space-y-2 text-xs'>
              <div className='flex justify-between'>
                <span className='text-[#94A3B8]'>Example account name</span>
                <span className='font-mono text-[#DAE2FD]'>
                  {submittedWorkspace}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#94A3B8]'>Monthly updates</span>
                <span className='font-mono text-[#DAE2FD]'>
                  {activeTier.limits.eventsPerMonth}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#94A3B8]'>Trial price</span>
                <span className='text-[#4EDEA3]'>No charge for 14 days</span>
              </div>
            </div>

            <button
              type='button'
              onClick={handleResetAndClose}
              className='mt-6 w-full rounded-lg bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5558E6] transition-colors cursor-pointer'
            >
              Back to RelayGrid
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h3
              id='trial-modal-title'
              className='font-display text-xl font-semibold text-white'
            >
              Start your free 14-day trial
            </h3>
            <p className='mt-1.5 text-sm text-[#C7C4D7]'>
              Choose a plan to preview your setup. This demo does not create an
              account or send your details.
            </p>

            <div className='mt-5 grid grid-cols-3 gap-1.5 rounded-lg border border-white/[0.08] bg-[#0B0F19] p-1'>
              {PRICING_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type='button'
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${selectedTierId === tier.id ? 'bg-[#1E293B] text-white' : 'text-[#94A3B8] hover:text-[#DAE2FD]'}`}
                >
                  {tier.name}
                </button>
              ))}
            </div>

            <div className='mt-4 flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#0B0F19] px-4 py-3 text-xs'>
              <div>
                <p className='font-medium text-white'>
                  {activeTier.name} · {activeTier.limits.eventsPerMonth}
                </p>
                <button
                  type='button'
                  onClick={() =>
                    setSelectedCadence((c) =>
                      c === 'annual' ? 'monthly' : 'annual',
                    )
                  }
                  className='mt-0.5 text-[#4CD7F6] hover:underline cursor-pointer'
                >
                  Switch to{' '}
                  {selectedCadence === 'annual'
                    ? 'monthly payments'
                    : 'yearly payments (save 20%)'}
                </button>
              </div>
              <span className='font-mono text-base font-semibold text-white tabular-nums'>
                {price !== null ? `$${price}/mo` : 'Custom'}
              </span>
            </div>

            <div className='mt-5 space-y-4'>
              <div>
                <label
                  htmlFor='trial-email'
                  className='block text-xs font-medium text-[#C7C4D7]'
                >
                  Your email
                </label>
                <input
                  id='trial-email'
                  type='email'
                  required
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder='engineering@company.com'
                  className='mt-1.5 w-full rounded-lg border border-white/[0.1] bg-[#0B0F19] px-3.5 py-2 text-sm text-white placeholder:text-[#64748B] focus:border-[#6366F1] focus:outline-none'
                />
              </div>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='trial-company'
                    className='block text-xs font-medium text-[#C7C4D7]'
                  >
                    Company name
                  </label>
                  <input
                    id='trial-company'
                    type='text'
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder='Acme Systems'
                    className='mt-1.5 w-full rounded-lg border border-white/[0.1] bg-[#0B0F19] px-3.5 py-2 text-sm text-white placeholder:text-[#64748B] focus:border-[#6366F1] focus:outline-none'
                  />
                </div>

                <div>
                  <label
                    htmlFor='trial-region'
                    className='block text-xs font-medium text-[#C7C4D7]'
                  >
                    Where are most of your customers?
                  </label>
                  <select
                    id='trial-region'
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className='mt-1.5 w-full rounded-lg border border-white/[0.1] bg-[#0B0F19] px-3 py-2 text-sm text-white focus:border-[#6366F1] focus:outline-none'
                  >
                    <option value='us-east-1'>United States (Virginia)</option>
                    <option value='eu-central-1'>Europe (Frankfurt)</option>
                  </select>
                </div>
              </div>

              <p className='font-mono text-[11px] text-[#94A3B8]'>
                Example account name: {derivedSlug}
              </p>
            </div>

            {errorMessage && (
              <p
                role='alert'
                className='mt-3 text-xs font-medium text-rose-400'
              >
                {errorMessage}
              </p>
            )}

            <button
              type='submit'
              className='mt-6 w-full rounded-lg bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5558E6] active:scale-[0.99] transition-all cursor-pointer'
            >
              {activeTier.id === 'enterprise'
                ? 'Request Architecture Review'
                : 'Start 14-Day Free Trial'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
