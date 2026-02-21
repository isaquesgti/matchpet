import React from "react";
import { ShieldCheck, UserCheck, Ban, Info, Scale, Copyright, AlertTriangle, MessageSquare, Lock } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-16 max-w-4xl">
        
        {/* Cabeçalho */}
        <div className="mb-12 border-b border-border pb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4 text-primary">
            <ShieldCheck className="w-8 h-8" />
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Termos de Uso
            </h1>
          </div>
          <p className="text-muted-foreground italic">
            🐾 **LovixPet** — Última atualização: Fevereiro de 2026
          </p>
        </div>

        <div className="space-y-12 text-muted-foreground leading-relaxed">
          
          {/* 1. Aceitação */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">1.</span> Aceitação dos Termos
            </h2>
            <p className="text-lg">
              Ao acessar ou utilizar a plataforma **LovixPet** ("Plataforma"), você concorda em cumprir estes Termos de Uso. A LovixPet é uma plataforma que conecta tutores para fins de cruzamento responsável de cães e gatos.
            </p>
          </section>

          {/* 2. Elegibilidade */}
          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" /> 2. Elegibilidade e Cadastro
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">2.1 Requisitos</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Ter 18 anos ou mais;</li>
                  <li>Capacidade civil plena;</li>
                  <li>Informações verdadeiras;</li>
                  <li>Ser o tutor legítimo do animal.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">2.2 Conta</h3>
                <p className="text-sm">
                  Você é o único responsável pela segurança da sua senha e por todas as atividades em sua conta.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Uso Proibido */}
          <section>
            <div className="bg-destructive/5 border-l-4 border-destructive p-6 rounded-r-lg">
              <h3 className="font-bold text-destructive mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Ban className="w-6 h-6" /> 3. Condutas Proibidas
              </h3>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5 text-sm">
                <li>Venda de filhotes sem autorização;</li>
                <li>Maus-tratos ou negligência animal;</li>
                <li>Cruzamentos consanguíneos;</li>
                <li>Uso de informações falsas ou fakes;</li>
                <li>Coleta de dados de terceiros;</li>
                <li>Atividades fraudulentas ou criminosas.</li>
              </ul>
            </div>
          </section>

          {/* 4. Perfis de Pets */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Perfis de Pets</h2>
            <div className="border border-border p-5 rounded-lg space-y-3 bg-background shadow-sm">
              <p className="text-sm italic">Você garante que o animal está saudável e apto para cruzamento.</p>
              <div className="flex items-start gap-2 text-primary font-medium">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">Recomendamos orientação veterinária e vacinação rigorosamente em dia.</p>
              </div>
            </div>
          </section>

          {/* 5. Match e Comunicação */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" /> 5. Match e Chat
            </h2>
            <p className="text-sm mb-4">
              A LovixPet fornece a tecnologia de conexão, mas <strong>não monitora</strong> o conteúdo das conversas. A comunicação é de responsabilidade integral dos usuários. Não garantimos compatibilidade genética ou saúde dos animais.
            </p>
          </section>

          {/* 6. SEGURANÇA PESSOAL - ESSENCIAL */}
          <section className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-amber-700 dark:text-amber-500 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" /> 6. Segurança e Responsabilidade
            </h2>
            <div className="space-y-4 text-sm text-amber-900/80 dark:text-amber-200/80">
              <p><strong>Isenção:</strong> A LovixPet NÃO se responsabiliza por crimes, golpes, furtos ou violência ocorridos em encontros presenciais. Você interage por sua conta e risco.</p>
              <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg">
                <p className="font-bold mb-2 text-amber-800 dark:text-amber-400">Recomendações de Ouro:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Nunca compartilhe endereço ou telefone logo de início;</li>
                  <li>Realize encontros em locais públicos e movimentados;</li>
                  <li>Leve um acompanhante;</li>
                  <li>Nunca faça pagamentos ou transferências para outros usuários.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 7. Responsabilidades e Limitação */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" /> 7. Limitação de Responsabilidade
            </h2>
            <p className="text-sm">
              A LovixPet é uma intermediadora. Não nos responsabilizamos por brigas entre tutores, danos à saúde dos pets pós-cruzamento ou informações enganosas inseridas por usuários.
            </p>
          </section>

          {/* 8. Propriedade Intelectual */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Copyright className="w-6 h-6 text-primary" /> 8. Propriedade Intelectual
            </h2>
            <p className="text-sm">
              A marca e o design LovixPet são protegidos. Ao postar fotos do seu pet, você nos autoriza a exibi-las dentro das funcionalidades da plataforma.
            </p>
          </section>

          {/* 10. Legislação */}
          <section className="bg-muted/50 p-6 rounded-xl border border-border text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">10. Legislação Aplicável</h2>
            <p className="text-sm">
              Termos regidos pelas leis do Brasil. Foro eleito: Comarca de domicílio do usuário.
            </p>
          </section>

          {/* Rodapé de Contato */}
          <footer className="pt-8 border-t border-border text-center">
            <p className="text-foreground font-semibold">Dúvidas ou denúncias?</p>
            <a href="mailto:contato@lovixpet.com.br" className="text-primary hover:underline font-bold text-lg block mt-2">
              contato@lovixpet.com.br
            </a>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
