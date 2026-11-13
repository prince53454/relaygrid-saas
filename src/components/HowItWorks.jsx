import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Code2,
  Radio,
  Route,
} from 'lucide-react';
import { Reveal } from './Reveal';
const STEPS = [
  {
    number: '01',
    title: 'Your app tells RelayGrid what happened',
    description:
      'That could be a payment, a plan change, or a customer using your product. Connect your app once; RelayGrid receives each update.',
    icon: Code2,
    detail: 'Example: a customer changes plan',
    tone: 'violet',
  },
  {
    number: '02',
    title: 'RelayGrid sends the update',
    description:
      'Choose which customer app should get each update. If that app is temporarily unavailable, RelayGrid waits and tries again.',
    icon: Route,
    detail: 'Right app \xB7 right order \xB7 safe retry',
    tone: 'cyan',
  },
  {
    number: '03',
    title: 'See what happened\u2014and what to bill',
    description:
      'Check whether an update arrived, see usage add up, and compare the total with the invoice. If something fails, send it again without double-counting.',
    icon: Radio,
    detail: 'Delivery status \xB7 usage total \xB7 invoice check',
    tone: 'green',
  },
];
export function HowItWorks() {
  return (
    <section
      id='how-it-works'
      className='relative overflow-hidden border-b border-white/[0.08] py-20 lg:py-28'
    >
      <div className='pointer-events-none absolute -right-32 top-16 h-80 w-80 rounded-full bg-[#6366F1]/[0.08] blur-3xl' />
      <div className='relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12'>
        <Reveal>
          <div className='grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end'>
            <div className='max-w-2xl'>
              <p className='section-eyebrow'>
                <span className='eyebrow-dot bg-[#4CD7F6]' />
                How RelayGrid works
              </p>
              <h2 className='section-heading mt-4'>
                One update, from your app
                <span className='text-[#8D90FF]'> to the right place.</span>
              </h2>
            </div>
            <p className='max-w-xl text-base leading-relaxed text-[#A6B1C7] lg:justify-self-end'>
              A webhook is simply an automatic message between apps—like telling
              a customer’s system that a payment went through. RelayGrid takes
              care of sending and tracking those messages for you.
            </p>
          </div>
        </Reveal>

        <div className='relative mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5'>
          <div className='pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-px bg-gradient-to-r from-[#7775FF]/10 via-[#7775FF]/60 to-[#4CD7F6]/10 lg:block' />
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delay={index * 0.1}>
                <article className='step-card group relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101625] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.17] sm:p-7'>
                  <div className='flex items-center justify-between'>
                    <span className='font-mono text-xs tracking-[0.18em] text-[#75819A]'>
                      STEP {step.number}
                    </span>
                    <span className={`step-icon step-icon-${step.tone}`}>
                      <Icon className='h-4 w-4' aria-hidden='true' />
                    </span>
                  </div>
                  <h3 className='mt-8 font-display text-xl font-semibold tracking-tight text-white'>
                    {step.title}
                  </h3>
                  <p className='mt-3 min-h-[5.5rem] text-sm leading-relaxed text-[#A6B1C7]'>
                    {step.description}
                  </p>
                  <div className='mt-7 flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#080D17] px-4 py-3'>
                    <span className='truncate font-mono text-[11px] text-[#B9C3D7]'>
                      {step.detail}
                    </span>
                    {index < STEPS.length - 1 ? (
                      <ArrowRight
                        className='h-4 w-4 shrink-0 text-[#7775FF]'
                        aria-hidden='true'
                      />
                    ) : (
                      <Check
                        className='h-4 w-4 shrink-0 text-[#4EDEA3]'
                        aria-hidden='true'
                      />
                    )}
                  </div>
                  {index === 1 && (
                    <ArrowDownRight
                      className='absolute -bottom-5 -right-5 h-24 w-24 rotate-12 text-white/[0.025] transition-transform duration-500 group-hover:rotate-0'
                      aria-hidden='true'
                    />
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
