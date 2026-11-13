import { Activity, ArrowUpRight, CreditCard, ReceiptText } from 'lucide-react';
const USE_CASES = [
  {
    icon: CreditCard,
    title: 'A customer pays',
    description:
      'Send a confirmation to the customer\u2019s app when a payment goes through. If the app is unavailable, try again later.',
    result: 'Payment update delivered',
    color: 'text-[#4EDEA3]',
  },
  {
    icon: Activity,
    title: 'A customer uses your product',
    description:
      'Keep a running total of billable actions for each customer, without counting the same update twice.',
    result: 'Usage total stays current',
    color: 'text-[#4CD7F6]',
  },
  {
    icon: ReceiptText,
    title: 'It\u2019s time to send an invoice',
    description:
      'Compare what the customer used with what you plan to charge. Review differences before the invoice goes out.',
    result: 'Differences are easy to spot',
    color: 'text-[#A4A6FF]',
  },
];
export function ProofAndCustomers() {
  return (
    <section
      id='customers'
      className='border-b border-white/[0.08] py-20 lg:py-24'
    >
      <div className='mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12'>
        <div className='max-w-2xl'>
          <p className='text-xs font-medium text-[#4EDEA3]'>
            Everyday examples
          </p>
          <h2 className='mt-2 font-display text-3xl font-semibold tracking-[-0.025em] text-[#F8FAFC] sm:text-4xl [text-wrap:balance]'>
            Built for the moments your customers notice.
          </h2>
          <p className='mt-3 text-base text-[#C7C4D7]'>
            When a payment, product update, or bill matters, RelayGrid helps
            make sure it reaches the right place and is easy to check.
          </p>
        </div>

        <div className='mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {USE_CASES.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <article
                key={useCase.title}
                className='group flex flex-col rounded-2xl border border-white/[0.08] bg-[#111827] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16] sm:p-7'
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] ${useCase.color}`}
                >
                  <Icon className='h-5 w-5' aria-hidden='true' />
                </span>
                <p className='mt-7 text-xs font-medium text-[#8995AD]'>WHEN</p>
                <h3 className='mt-1 font-display text-xl font-semibold text-white'>
                  {useCase.title}
                </h3>
                <p className='mt-3 flex-1 text-sm leading-relaxed text-[#A6B1C7]'>
                  {useCase.description}
                </p>
                <div className='mt-7 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs'>
                  <span className={useCase.color}>{useCase.result}</span>
                  <ArrowUpRight
                    className='h-4 w-4 text-[#75819A] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
                    aria-hidden='true'
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
