import { useState } from 'react';
import { ArrowUpRight, Check, Mail, ShieldCheck } from 'lucide-react';
import { Reveal } from './Reveal';
export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [volume, setVolume] = useState('10\u201350 million');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (name.trim().length < 2) {
      setError('Please enter your name so we know who to contact.');
      return;
    }
    if (!emailIsValid) {
      setError('Enter a valid work email address.');
      return;
    }
    if (company.trim().length < 2) {
      setError('Please enter your company name.');
      return;
    }
    setError('');
    setSubmitted(true);
  }
  return (
    <section
      id='contact'
      className='relative overflow-hidden border-b border-white/[0.08] py-20 lg:py-28'
    >
      <div className='pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#4CD7F6]/[0.06] blur-3xl' />
      <div className='relative mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12'>
        <Reveal className='flex flex-col justify-between'>
          <div>
            <p className='section-eyebrow'>
              <span className='eyebrow-dot bg-[#4EDEA3]' />
              Let’s make the hard parts boring
            </p>
            <h2 className='section-heading mt-4'>
              Your next reliable release starts here.
            </h2>
            <p className='mt-5 max-w-lg text-base leading-relaxed text-[#A6B1C7]'>
              Tell us how your app sends customer updates and tracks product
              usage today. We’ll show you what RelayGrid could take off your
              plate.
            </p>
          </div>
          <div className='mt-10 space-y-4'>
            <div className='flex items-center gap-3 text-sm text-[#D4DCEE]'>
              <span className='contact-icon'>
                <ShieldCheck className='h-4 w-4' aria-hidden='true' />
              </span>
              No sales pressure. A practical architecture conversation.
            </div>
            <a
              href='mailto:hello@relaygrid.io'
              className='inline-flex items-center gap-2 text-sm text-[#8D90FF] transition-colors hover:text-white'
            >
              <Mail className='h-4 w-4' aria-hidden='true' />
              hello@relaygrid.io
              <ArrowUpRight className='h-3.5 w-3.5' aria-hidden='true' />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className='rounded-2xl border border-white/[0.1] bg-[#101625]/90 p-5 shadow-[0_32px_100px_-55px_rgba(87,86,255,0.65)] sm:p-8'>
            {submitted ? (
              <div
                role='status'
                aria-live='polite'
                className='flex min-h-[26rem] flex-col justify-center'
              >
                <span className='flex h-12 w-12 items-center justify-center rounded-full border border-[#4EDEA3]/25 bg-[#4EDEA3]/10 text-[#4EDEA3]'>
                  <Check className='h-6 w-6' aria-hidden='true' />
                </span>
                <h3 className='mt-6 font-display text-2xl font-semibold text-white'>
                  Thanks, {name.trim().split(/\s+/)[0]}.
                </h3>
                <p className='mt-3 max-w-md text-sm leading-relaxed text-[#A6B1C7]'>
                  Your local request preview for{' '}
                  <strong className='text-white'>{company}</strong> is ready (
                  {volume} events per month). This assignment build has no
                  connected backend, so your details have not been sent.
                </p>
                {message.trim() && (
                  <p className='mt-4 max-w-md rounded-lg border border-white/[0.08] bg-[#080D17] p-3 text-sm text-[#A6B1C7]'>
                    “{message.trim()}”
                  </p>
                )}
                <button
                  type='button'
                  onClick={() => setSubmitted(false)}
                  className='mt-7 w-fit text-sm font-medium text-[#8D90FF] transition-colors hover:text-white'
                >
                  Back to the form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className='mb-6 flex items-start justify-between gap-4'>
                  <div>
                    <h3 className='font-display text-xl font-semibold text-white'>
                      Request a personal demo
                    </h3>
                    <p className='mt-1 text-sm text-[#8995AD]'>
                      Usually takes about 30 minutes.
                    </p>
                  </div>
                  <span className='hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-[#9BA7BE] sm:inline-flex'>
                    NO COMMITMENT
                  </span>
                </div>

                <div className='grid gap-4 sm:grid-cols-2'>
                  <div>
                    <label className='form-label' htmlFor='demo-name'>
                      Your name
                    </label>
                    <input
                      id='demo-name'
                      autoComplete='name'
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder='Alex Morgan'
                      className='form-input'
                    />
                  </div>
                  <div>
                    <label className='form-label' htmlFor='demo-email'>
                      Work email
                    </label>
                    <input
                      id='demo-email'
                      type='email'
                      autoComplete='email'
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder='alex@company.com'
                      className='form-input'
                    />
                  </div>
                  <div>
                    <label className='form-label' htmlFor='demo-company'>
                      Company
                    </label>
                    <input
                      id='demo-company'
                      autoComplete='organization'
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      placeholder='Company name'
                      className='form-input'
                    />
                  </div>
                  <div>
                    <label className='form-label' htmlFor='demo-volume'>
                      How many product actions each month?
                    </label>
                    <select
                      id='demo-volume'
                      value={volume}
                      onChange={(event) => setVolume(event.target.value)}
                      className='form-input'
                    >
                      <option>Under 10 million</option>
                      <option>10 to 50 million</option>
                      <option>50 to 500 million</option>
                      <option>More than 500 million</option>
                    </select>
                  </div>
                </div>
                <div className='mt-4'>
                  <label className='form-label' htmlFor='demo-message'>
                    What would you like help with?{' '}
                    <span className='text-[#75819A]'>Optional</span>
                  </label>
                  <textarea
                    id='demo-message'
                    rows={3}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder='For example: sending customer updates or checking usage totals…'
                    className='form-input resize-y'
                  />
                </div>

                {error && (
                  <p role='alert' className='mt-4 text-sm text-rose-300'>
                    {error}
                  </p>
                )}
                <button
                  type='submit'
                  className='primary-button mt-5 w-full sm:w-auto'
                >
                  Request my demo
                  <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
                </button>
                <p className='mt-4 text-xs leading-relaxed text-[#75819A]'>
                  Prototype form only. No data leaves this page.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
