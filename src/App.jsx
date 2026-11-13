import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesBento } from './components/CapabilitiesBento';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { ProofAndCustomers } from './components/ProofAndCustomers';
import { PricingSection } from './components/PricingSection';
import { TrialCheckoutModal } from './components/TrialCheckoutModal';
import { Footer } from './components/Footer';
import { HowItWorks } from './components/HowItWorks';
import { ContactSection } from './components/ContactSection';
import { PRICING_TIERS } from './data/platformData';
export default function App() {
  const [cadence, setCadence] = useState('annual');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(PRICING_TIERS[1]);
  function handleOpenTrial(tier = PRICING_TIERS[1]) {
    setSelectedTier(tier);
    setModalOpen(true);
  }
  return (
    <div className='min-h-screen bg-[#0B0F19] text-[#DAE2FD]'>
      <Navbar onOpenTrial={() => handleOpenTrial(PRICING_TIERS[1])} />

      <main>
        <HeroSection onOpenTrial={() => handleOpenTrial(PRICING_TIERS[1])} />
        <CapabilitiesBento />
        <HowItWorks />
        <InteractiveSandbox />
        <ProofAndCustomers />
        <PricingSection
          cadence={cadence}
          onCadenceChange={setCadence}
          onSelectPlan={(tier) => handleOpenTrial(tier)}
        />
        <ContactSection />
      </main>

      <Footer onOpenTrial={() => handleOpenTrial(PRICING_TIERS[1])} />

      {modalOpen && (
        <TrialCheckoutModal
          isOpen={modalOpen}
          initialTier={selectedTier}
          cadence={cadence}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
