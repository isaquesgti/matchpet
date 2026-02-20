import React from "react";
import { ShieldCheck, AlertTriangle, Info, Scale } from "lucide-react";
import Navbar from "./Navbar"; // Ajuste o caminho se necessário
import Footer from "./Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* pt-24 garante que o texto não fique embaixo da navbar fixa */}
      <main className="flex-grow container mx-auto px-4 pt-28 pb-16 max-w-4xl">
        <div className="mb-12 border-b border-border pb-8">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <ShieldCheck className="w-8 h-8" />
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Termos de Uso
            </h1>
          </div>
          <p className="text-muted-foreground italic">
            Última atualização: Fevereiro de 2026
          </p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary text-lg">1.</span> Aceitação dos Termos
            </h2>
            <p className="mb-4">
              Ao acessar ou utilizar a plataforma **LovixPet**, você concorda em cumprir estes Termos de Uso. A plataforma conecta tutores para cruzamento responsável de cães e gatos, destinada a maiores de 18 anos.
            </p>
          </section>

          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Elegibilidade</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
              <li>Ter 18 anos ou mais;</li>
              <li>Fornecer informações verdadeiras;</li>
              <li>Ser o legítimo responsável pelo animal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary text-lg">3.</span> Uso Proibido
            </h2>
            <div className="bg-destructive/5 border-l-4 border-destructive p-4 rounded-r-lg">
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Venda de filhotes sem autorização;</li>
                <li>Maus-tratos ou negligência animal;</li>
                <li>Cruzamentos consanguíneos;</li>
                <li>Informações falsas ou enganosas.</li>
              </ul>
            </div>
          </section>

          <section className="pt-8 border-t border-border text-center">
            <p className="text-foreground font-medium">Dúvidas?</p>
            <a href="mailto:contato@lovixpet.com.br" className="text-primary hover:underline font-bold">
              contato@lovixpet.com.br
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
