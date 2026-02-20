import React from "react";
import { Lock, ShieldCheck, Eye, Database } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-16 max-w-4xl">
        <div className="mb-12 border-b border-border pb-8">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Lock className="w-8 h-8" />
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Política de Privacidade
            </h1>
          </div>
          <p className="text-muted-foreground italic">
            🐾 LovixPet — Última atualização: Fevereiro de 2026
          </p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> 1. Controlador
            </h2>
            <p>A LovixPet é a controladora dos seus dados. Contato: <span className="font-semibold italic">privacidade@lovixpet.com.br</span></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 text-primary">
              <Database className="w-6 h-6" /> 2. Coleta de Dados
            </h2>
            <p>Coletamos seu nome, e-mail, localização aproximada e dados do pet (raça, fotos e saúde) para possibilitar o sistema de match.</p>
          </section>

          <section className="border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2">3. Segurança</h2>
            <p>Usamos criptografia SSL/TLS e não vendemos seus dados para terceiros sob nenhuma circunstância.</p>
          </section>

          <footer className="pt-12 border-t border-border text-center">
            <p className="text-sm font-medium">
              Acesse seus direitos via: <span className="text-primary underline">privacidade@lovixpet.com.br</span>
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
