/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { AdminPanel } from './components/AdminPanel';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

function PortfolioContent() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#141019] text-neutral-800 font-sans selection:bg-[#ec5a80]/20 selection:text-[#b02251]">
      {/* Top Navbar */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero onOpenContact={() => setIsContactModalOpen(true)} />

        {/* Sobre Mim */}
        <About />

        {/* Minhas Habilidades */}
        <Skills />

        {/* Meus Projetos */}
        <Projects />

        {/* Serviços */}
        <Services onOpenContact={() => setIsContactModalOpen(true)} />

        {/* Entre em Contato */}
        <Contact onOpenModal={() => setIsContactModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Painel Administrativo Protegido */}
      <AdminPanel />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
