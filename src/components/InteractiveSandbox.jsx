import { useState } from 'react';
import { PIPELINE_EVENTS } from '../data/platformData';
import {
  Search,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Activity,
  FileSpreadsheet,
  Layers,
} from 'lucide-react';
function getEventTitle(event) {
  const titles = {
    'usage.meter.aggregated': 'Customer usage recorded',
    'webhook.invoice.dispatched': 'Invoice update delivered',
    'webhook.subscription.renewed': 'Subscription renewal update',
    'ledger.variance.detected': 'Invoice amount needs review',
    'checkout.seat.upgraded': 'Customer added seats',
  };
  return titles[event.eventType] ?? 'Customer update';
}
function getEventSummary(event) {
  switch (event.eventType) {
    case 'usage.meter.aggregated':
      return `${event.customer} used ${String(event.payload.quantity ?? 'new')} ${event.payload.meter === 'gpu_seconds_h100' ? 'GPU seconds' : 'identity checks'}. This can be added to their bill.`;
    case 'webhook.invoice.dispatched':
      return `RelayGrid sent an invoice update to ${event.customer}.`;
    case 'webhook.subscription.renewed':
      return `${event.customer}'s subscription update is waiting for its app to respond.`;
    case 'ledger.variance.detected':
      return `${event.customer}'s invoice is $18.15 different from the recorded usage total.`;
    case 'checkout.seat.upgraded':
      return `${event.customer} added ${String(event.payload.seats_added ?? 'new')} seats to its plan.`;
    default:
      return `A new update for ${event.customer} was received.`;
  }
}
function getStatusLabel(status) {
  if (status === 'Settled') return 'Delivered';
  if (status === 'Flagged') return 'Needs review';
  if (status === 'All') return 'All updates';
  return 'Retrying';
}
function isUsageUpdate(event) {
  return (
    event.eventType === 'usage.meter.aggregated' ||
    event.eventType === 'checkout.seat.upgraded'
  );
}
function getUsageDescription(event) {
  if (event.eventType === 'checkout.seat.upgraded') {
    return `${String(event.payload.seats_added ?? 0)} seats added`;
  }
  const quantity = Number(event.payload.quantity ?? 0).toLocaleString('en-US');
  const unit =
    event.payload.meter === 'gpu_seconds_h100'
      ? 'GPU seconds'
      : 'identity checks';
  return `${quantity} ${unit}`;
}
export function InteractiveSandbox() {
  const [view, setView] = useState('events');
  const [events, setEvents] = useState(PIPELINE_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEventId, setSelectedEventId] = useState(PIPELINE_EVENTS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [replayedIds, setReplayedIds] = useState({});
  const [reviewedIds, setReviewedIds] = useState({});
  const [workspaceMessage, setWorkspaceMessage] = useState(null);
  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.eventType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || evt.status === statusFilter;
    if (view === 'retries') {
      return (
        matchesSearch &&
        (evt.status === 'Retrying' ||
          (evt.status === 'Flagged' && !reviewedIds[evt.id]))
      );
    }
    return matchesSearch && matchesStatus;
  });
  const visibleEvents =
    view === 'ledgers' ? filteredEvents.filter(isUsageUpdate) : filteredEvents;
  const attentionCount = events.filter(
    (evt) =>
      evt.status === 'Retrying' ||
      (evt.status === 'Flagged' && !reviewedIds[evt.id]),
  ).length;
  const selectedEvent =
    visibleEvents.find((e) => e.id === selectedEventId) ??
    visibleEvents[0] ??
    null;
  const usageTotal = visibleEvents.reduce(
    (total, evt) => total + evt.amountUsd,
    0,
  );
  const destination =
    selectedEvent && typeof selectedEvent.payload.endpoint === 'string'
      ? selectedEvent.payload.endpoint.replace(/^https?:\/\//, '').split('/')[0]
      : 'RelayGrid billing records';
  const responseLabel =
    selectedEvent?.status === 'Retrying'
      ? 'Waiting for the app to respond'
      : selectedEvent?.status === 'Flagged'
        ? 'Needs a quick review'
        : 'Delivered successfully';
  function handleRefresh() {
    setIsLoading(true);
    setWorkspaceMessage(
      'Examples refreshed. The sample workspace is back to its starting state.',
    );
    setEvents(PIPELINE_EVENTS);
    setSearchQuery('');
    setStatusFilter('All');
    setSelectedEventId(PIPELINE_EVENTS[0].id);
    setView('events');
    setReplayedIds({});
    setReviewedIds({});
    window.setTimeout(() => {
      setIsLoading(false);
    }, 350);
  }
  function handleResetFilters() {
    setSearchQuery('');
    setStatusFilter('All');
    setView('events');
    setWorkspaceMessage(null);
  }
  function handleReplayEvent(evtId) {
    setEvents((prev) =>
      prev.map((item) =>
        item.id === evtId
          ? {
              ...item,
              status: 'Settled',
              attempt: item.attempt + 1,
              latencyMs: 12,
            }
          : item,
      ),
    );
    setReplayedIds((prev) => ({ ...prev, [evtId]: true }));
    setWorkspaceMessage('Update delivered successfully.');
  }
  const sidebarItems = [
    { id: 'events', label: 'Customer updates', icon: Activity },
    { id: 'ledgers', label: 'Usage totals', icon: FileSpreadsheet },
    { id: 'retries', label: 'Needs attention', icon: Layers },
  ];
  return (
    <section
      id='sandbox'
      className='border-b border-white/[0.08] py-20 lg:py-24 bg-[#0B0F19]'
    >
      <div className='mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-2xl'>
            <p className='text-xs font-medium text-[#C0C1FF]'>
              Try the interactive demo
            </p>
            <h2 className='mt-2 font-display text-3xl font-semibold tracking-[-0.025em] text-[#F8FAFC] sm:text-4xl [text-wrap:balance]'>
              See what happens when an app sends an update.
            </h2>
          </div>
          <p className='text-sm text-[#94A3B8] max-w-sm'>
            A webhook is an automatic message from one app to another. These
            sample messages show how RelayGrid delivers updates, tracks usage,
            and handles a problem.
          </p>
        </div>

        <div className='mt-10 overflow-hidden rounded-xl border border-white/[0.08] bg-[#111827]'>
          <div className='flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-3.5 bg-[#0E1422]'>
            <div className='flex items-center gap-2 text-xs text-[#94A3B8]'>
              <span className='text-[#DAE2FD] font-medium'>Demo workspace</span>
              <span aria-hidden='true'>/</span>
              <span>Sample customer activity</span>
              <span aria-hidden='true'>/</span>
              <span className='text-[#4CD7F6]'>
                {sidebarItems.find((s) => s.id === view)?.label}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={handleRefresh}
                className='inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#1E293B] px-3 py-1.5 text-xs font-medium text-[#DAE2FD] hover:border-[#6366F1]/40 transition-colors cursor-pointer whitespace-nowrap'
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`}
                  aria-hidden='true'
                />
                Refresh examples
              </button>
            </div>
          </div>

          {workspaceMessage && (
            <p
              role='status'
              aria-live='polite'
              className='border-b border-white/[0.08] bg-[#10251F] px-5 py-2.5 text-xs text-[#8FE6BE]'
            >
              {workspaceMessage}
            </p>
          )}

          <div className='grid grid-cols-1 lg:grid-cols-12'>
            <aside
              aria-label='Workspace sections'
              className='border-b border-white/[0.08] lg:border-b-0 lg:border-r lg:col-span-2 bg-[#0E1422]/60 p-3'
            >
              <div className='flex lg:flex-col gap-1 overflow-x-auto'>
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const active = view === item.id;
                  return (
                    <button
                      key={item.id}
                      type='button'
                      onClick={() => {
                        setView(item.id);
                        setWorkspaceMessage(null);
                      }}
                      aria-label={
                        item.id === 'retries'
                          ? `${item.label}, ${attentionCount} updates`
                          : item.label
                      }
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${active ? 'bg-[#1E293B] text-white border border-white/[0.08]' : 'text-[#94A3B8] hover:text-[#DAE2FD] hover:bg-white/[0.03] border border-transparent'}`}
                    >
                      <Icon
                        className='h-3.5 w-3.5 shrink-0'
                        aria-hidden='true'
                      />
                      {item.label}
                      {item.id === 'retries' && (
                        <span className='rounded-full bg-rose-400/15 px-1.5 py-0.5 text-[10px] text-rose-200'>
                          {attentionCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className='min-w-0 lg:col-span-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col'>
              <div className='flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3'>
                <div className='relative flex-1 min-w-[180px]'>
                  <Search
                    className='pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94A3B8]'
                    aria-hidden='true'
                  />
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setWorkspaceMessage(null);
                    }}
                    placeholder='Search customer or update...'
                    aria-label='Search updates'
                    className='w-full rounded-lg border border-white/[0.08] bg-[#0B0F19] py-1.5 pl-8 pr-3 text-xs text-[#DAE2FD] placeholder:text-[#64748B] focus:border-[#6366F1] focus:outline-none'
                  />
                </div>

                {view !== 'retries' && (
                  <div className='flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0B0F19] p-0.5'>
                    {['All', 'Settled', 'Retrying', 'Flagged'].map((status) => (
                      <button
                        key={status}
                        type='button'
                        onClick={() => {
                          setStatusFilter(status);
                          setWorkspaceMessage(null);
                        }}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${statusFilter === status ? 'bg-[#1E293B] text-white' : 'text-[#94A3B8] hover:text-[#DAE2FD]'}`}
                      >
                        {getStatusLabel(status)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {view === 'ledgers' && (
                <div className='flex items-center justify-between gap-3 border-b border-white/[0.06] bg-[#0E1422]/50 px-4 py-3'>
                  <div>
                    <p className='text-[10px] font-medium uppercase tracking-wide text-[#8995AD]'>
                      Sample usage this month
                    </p>
                    <p className='mt-1 text-xs text-[#A6B1C7]'>
                      {visibleEvents.length} customer{' '}
                      {visibleEvents.length === 1 ? 'account' : 'accounts'} with
                      usage
                    </p>
                  </div>
                  <p className='font-mono text-sm font-semibold text-white tabular-nums'>
                    $
                    {usageTotal.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              )}

              <div className='overflow-x-auto flex-1'>
                {isLoading ? (
                  <div className='divide-y divide-white/[0.06]'>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div
                        key={n}
                        className='flex items-center justify-between px-4 h-[42px]'
                      >
                        <div className='h-3 w-36 rounded bg-white/[0.06] animate-pulse' />
                        <div className='h-3 w-20 rounded bg-white/[0.06] animate-pulse' />
                        <div className='h-3 w-14 rounded bg-white/[0.06] animate-pulse' />
                      </div>
                    ))}
                  </div>
                ) : visibleEvents.length === 0 ? (
                  <div className='flex flex-col items-center justify-center px-6 py-14 text-center'>
                    <p className='text-sm font-medium text-white'>
                      {view === 'retries'
                        ? 'You\u2019re all caught up'
                        : view === 'ledgers'
                          ? 'No matching usage'
                          : 'No matching updates'}
                    </p>
                    <p className='mt-1 text-xs text-[#94A3B8]'>
                      {view === 'retries'
                        ? 'Updates that need a retry or review will appear here.'
                        : view === 'ledgers'
                          ? 'Try another customer name or choose a different status.'
                          : 'Try another customer name or show all updates.'}
                    </p>
                    <button
                      type='button'
                      onClick={handleResetFilters}
                      className='mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-[#1E293B] px-3.5 py-1.5 text-xs font-medium text-white hover:border-[#6366F1]/50 transition-colors cursor-pointer'
                    >
                      <RotateCcw className='h-3.5 w-3.5' aria-hidden='true' />
                      {view === 'retries'
                        ? 'Show all updates'
                        : 'Reset filters'}
                    </button>
                  </div>
                ) : (
                  <table className='w-full text-left border-collapse'>
                    <thead>
                      <tr className='border-b border-white/[0.06] text-[11px] font-medium text-[#94A3B8]'>
                        <th className='py-2.5 pl-4 pr-3'>
                          {view === 'ledgers'
                            ? 'Customer'
                            : 'Update / Customer'}
                        </th>
                        <th className='py-2.5 px-3'>Status</th>
                        <th className='py-2.5 px-3 text-right'>
                          {view === 'ledgers' ? 'Product usage' : 'Time'}
                        </th>
                        <th className='py-2.5 pl-3 pr-4 text-right'>
                          {view === 'ledgers' ? 'Bill amount' : 'Amount'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-white/[0.06] text-xs'>
                      {visibleEvents.map((evt) => {
                        const isSelected = selectedEvent?.id === evt.id;
                        return (
                          <tr
                            key={evt.id}
                            onClick={() => {
                              setSelectedEventId(evt.id);
                            }}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                setSelectedEventId(evt.id);
                              }
                            }}
                            tabIndex={0}
                            aria-selected={isSelected}
                            className={`h-[44px] cursor-pointer transition-colors ${isSelected ? 'bg-[#1E293B]/90' : 'hover:bg-white/[0.03]'}`}
                          >
                            <td className='py-2 pl-4 pr-3'>
                              <div className='font-medium text-[#DAE2FD] truncate max-w-[190px]'>
                                {view === 'ledgers'
                                  ? evt.customer
                                  : getEventTitle(evt)}
                              </div>
                              <div className='text-[11px] text-[#94A3B8] truncate'>
                                {view === 'ledgers'
                                  ? 'Usage added to monthly bill'
                                  : evt.customer}
                              </div>
                            </td>
                            <td className='py-2 px-3 whitespace-nowrap'>
                              <span
                                className={`inline-flex items-center gap-1 font-medium ${evt.status === 'Settled' ? 'text-[#4EDEA3]' : evt.status === 'Retrying' ? 'text-amber-400' : 'text-rose-400'}`}
                              >
                                {evt.status === 'Settled' ? (
                                  <CheckCircle2
                                    className='h-3.5 w-3.5'
                                    aria-hidden='true'
                                  />
                                ) : evt.status === 'Retrying' ? (
                                  <RefreshCw
                                    className='h-3.5 w-3.5'
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <AlertTriangle
                                    className='h-3.5 w-3.5'
                                    aria-hidden='true'
                                  />
                                )}
                                {getStatusLabel(evt.status)}
                              </span>
                            </td>
                            <td className='py-2 px-3 text-right font-mono text-[#C7C4D7] tabular-nums whitespace-nowrap'>
                              {view === 'ledgers'
                                ? getUsageDescription(evt)
                                : `${evt.latencyMs} ms`}
                            </td>
                            <td className='py-2 pl-3 pr-4 text-right font-mono text-white tabular-nums whitespace-nowrap'>
                              $
                              {evt.amountUsd.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <aside
              aria-label='Selected update details'
              className='min-w-0 lg:col-span-4 bg-[#0B0F19]/60 p-4 sm:p-5 flex flex-col'
            >
              {selectedEvent ? (
                <>
                  <div className='flex items-center justify-between gap-3'>
                    <div>
                      <p className='text-[10px] font-medium uppercase tracking-[0.14em] text-[#8995AD]'>
                        {view === 'ledgers'
                          ? 'Usage details'
                          : 'Update details'}
                      </p>
                      <p className='mt-1 font-mono text-[10px] text-[#75819A]'>
                        {selectedEvent.timestamp}
                      </p>
                    </div>
                  </div>

                  <div className='mt-5 rounded-xl border border-white/[0.08] bg-[#101625] p-4'>
                    <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-[#8995AD]'>
                      What happened
                    </p>
                    <h3 className='mt-2 font-display text-lg font-semibold text-white'>
                      {getEventTitle(selectedEvent)}
                    </h3>
                    <p className='mt-2 text-sm leading-relaxed text-[#A6B1C7]'>
                      {getEventSummary(selectedEvent)}
                    </p>
                  </div>

                  <div className='mt-4 grid grid-cols-2 gap-2'>
                    <div className='rounded-lg border border-white/[0.06] bg-[#101625] p-3'>
                      <p className='text-[10px] uppercase tracking-wide text-[#75819A]'>
                        Sent to
                      </p>
                      <p
                        className='mt-1 truncate text-xs text-[#C9D5EA]'
                        title={destination}
                      >
                        {destination}
                      </p>
                    </div>
                    <div className='rounded-lg border border-white/[0.06] bg-[#101625] p-3'>
                      <p className='text-[10px] uppercase tracking-wide text-[#75819A]'>
                        Result
                      </p>
                      <p
                        className={`mt-1 truncate text-xs ${selectedEvent.status === 'Settled' ? 'text-[#4EDEA3]' : selectedEvent.status === 'Retrying' ? 'text-amber-300' : 'text-rose-300'}`}
                      >
                        {responseLabel}
                      </p>
                    </div>
                  </div>

                  <div className='mt-4 rounded-lg border border-white/[0.06] bg-[#101625]/70 px-3.5 py-3'>
                    <div className='flex items-center justify-between text-[10px]'>
                      <span className='font-medium text-[#A6B1C7]'>
                        What RelayGrid did
                      </span>
                      <span className='font-mono text-[#75819A]'>
                        {selectedEvent.latencyMs} ms
                      </span>
                    </div>
                    <div className='mt-3 grid grid-cols-3 gap-2'>
                      {[
                        { label: 'Received', complete: true },
                        { label: 'Checked', complete: true },
                        {
                          label:
                            selectedEvent.status === 'Retrying'
                              ? 'Trying again'
                              : selectedEvent.status === 'Flagged'
                                ? 'Needs review'
                                : 'Delivered',
                          complete: selectedEvent.status === 'Settled',
                        },
                      ].map((step) => (
                        <div
                          key={step.label}
                          className='flex items-center gap-1.5'
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${step.complete ? 'bg-[#4EDEA3]' : selectedEvent.status === 'Retrying' ? 'bg-amber-300 animate-pulse' : 'bg-rose-300'}`}
                          />
                          <span className='truncate text-[10px] text-[#A6B1C7]'>
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='mt-4 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4'>
                    <span className='text-[11px] leading-relaxed text-[#94A3B8]'>
                      {replayedIds[selectedEvent.id]
                        ? 'This update has been sent again.'
                        : reviewedIds[selectedEvent.id]
                          ? 'You\u2019ve reviewed this invoice difference.'
                          : selectedEvent.status === 'Retrying'
                            ? 'Try again without adding a duplicate.'
                            : selectedEvent.status === 'Flagged'
                              ? 'Check the difference before sending a bill.'
                              : 'This update reached its destination.'}
                    </span>

                    {selectedEvent.status === 'Retrying' && (
                      <button
                        type='button'
                        onClick={() => handleReplayEvent(selectedEvent.id)}
                        className='rounded-lg bg-[#6366F1] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#5558E6] transition-colors cursor-pointer whitespace-nowrap shrink-0'
                      >
                        Try delivery again
                      </button>
                    )}
                    {view === 'retries' &&
                      selectedEvent.status === 'Flagged' &&
                      !reviewedIds[selectedEvent.id] && (
                        <button
                          type='button'
                          onClick={() => {
                            setReviewedIds((prev) => ({
                              ...prev,
                              [selectedEvent.id]: true,
                            }));
                            setWorkspaceMessage(
                              'Invoice difference marked as reviewed and removed from this queue.',
                            );
                          }}
                          className='rounded-lg bg-[#6366F1] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#5558E6] transition-colors cursor-pointer whitespace-nowrap shrink-0'
                        >
                          Mark reviewed
                        </button>
                      )}
                  </div>
                </>
              ) : (
                <div className='flex h-full items-center justify-center text-xs text-[#94A3B8] py-12'>
                  Select an update to see its summary.
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
