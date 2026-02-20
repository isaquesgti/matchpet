import React from "react";
import { ShieldCheck, UserCheck, Ban, Info, Scale, Copyright, AlertTriangle } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* pt-28 para compensar a Navbar fixa */}
      <main className="flex-grow container mx-auto px-4 pt-28 pb-16 max-w-4xl">
        
        {/* Cabeçalho */}
        <div className="mb-12 border-b border-border pb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4 text-primary">
            <ShieldCheck className="w-8 h-8" />
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Termos de Uso
            </h1>
          </div>
          <p className="text-muted-foreground">
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
              Ao acessar ou utilizar a plataforma **LovixPet** ("Plataforma"), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize nossos serviços.
            </p>
            <p className="mt-4">
              A LovixPet é uma plataforma digital que conecta tutores de animais de estimação para fins de cruzamento responsável de cães e gatos. Nossos serviços são destinados exclusivamente a maiores de 18 anos.
            </p>
          </section>

          {/* 2. Elegibilidade */}
          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" /> 2. Elegibilidade e Cadastro
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">2.1 Requisitos</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Ter 18 anos ou mais de idade;</li>
                  <li>Possuir plena capacidade civil;</li>
                  <li>Fornecer informações verdadeiras e atualizadas no cadastro;</li>
                  <li>Ser o legítimo tutor ou responsável legal pelo animal cadastrado.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">2.2 Conta de Usuário</h3>
                <p className="text-sm">
                  Você é responsável por manter a confidencialidade de suas credenciais de acesso. Notifique-nos imediatamente em caso de uso não autorizado.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Uso da Plataforma */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Uso da Plataforma</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2 italic">3.1 Uso Permitido</h3>
                <p className="text-sm">
                  A Plataforma destina-se exclusivamente à conexão de tutores interessados em cruzamento responsável. Você concorda em utilizá-la de forma ética e em conformidade com a legislação vigente.
                </p>
              </div>
              <div className="bg-destructive/5 border-l-4 border-destructive p-4 rounded-r-lg">
                <h3 className="font-bold text-destructive mb-2 flex items-center gap-2 uppercase tracking-tighter">
                  <Ban className="w-5 h-5" /> 3.2 Uso Proibido
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm">
                  <li>Venda de filhotes sem autorização expressa;</li>
                  <li>Cadastrar animais com informações falsas ou enganosas;</li>
                  <li>Praticar qualquer forma de abuso ou negligência animal;</li>
                  <li>Publicar conteúdo ofensivo, discriminatório ou ilegal;</li>
                  <li>Realizar cruzamentos consanguíneos;</li>
                  <li>Coletar dados de outros usuários sem consentimento.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Perfis de Pets */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Perfis de Pets</h2>
            <div className="border border-border p-5 rounded-lg space-y-3 bg-background shadow-sm text-sm">
              <p>Ao criar um perfil, você garante que as informações (raça, saúde, vacinação) são precisas e que o animal está apto para cruzamento.</p>
              <div className="flex items-start gap-2 text-primary font-medium italic">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p>A LovixPet recomenda enfaticamente que cruzamentos sejam realizados com orientação veterinária e vacinação atualizada.</p>
              </div>
            </div>
          </section>

          {/* 5 e 6. Match e Responsabilidades */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" /> 5. Match
              </h2>
              <p className="text-sm">
                Não garantimos a compatibilidade genética ou de saúde. A comunicação e os resultados dos cruzamentos são de responsabilidade exclusiva dos tutores.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" /> 6. Responsabilidades
              </h2>
              <p className="text-sm">
                A LovixPet não se responsabiliza por danos à saúde dos animais, disputas entre usuários ou informações falsas fornecidas por terceiros.
              </p>
            </div>
          </section>

          {/* 7. Propriedade Intelectual */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Copyright className="w-6 h-6 text-primary" /> 7. Propriedade Intelectual
            </h2>
            <p className="text-sm">
              Todos os direitos relativos à Plataforma — marca, design e código — pertencem exclusivamente à LovixPet. Ao postar fotos, você nos concede licença gratuita para exibi-las na operação do serviço.
            </p>
          </section>

          {/* 10. Legislação */}
          <section className="bg-muted/50 p-6 rounded-xl border border-border text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">10. Legislação Aplicável</h2>
            <p className="text-sm">
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de domicílio do usuário.
            </p>
          </section>

          {/* Rodapé de Contato */}
          <footer className="pt-8 border-t border-border text-center">
            <p className="text-foreground font-semibold">Dúvidas ou sugestões?</p>
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
