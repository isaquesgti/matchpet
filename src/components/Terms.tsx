import React from "react";
import { ShieldCheck, Info, AlertTriangle, Scale } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <main className="container mx-auto px-4 max-w-4xl">
        {/* Cabeçalho da Página */}
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

        {/* Conteúdo Principal */}
        <div className="space-y-10 text-muted-foreground leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary text-lg">1.</span> Aceitação dos Termos
            </h2>
            <p className="mb-4">
              Ao acessar ou utilizar a plataforma **LovixPet** ("Plataforma"), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize nossos serviços.
            </p>
            <p>
              A LovixPet é uma plataforma digital que conecta tutores de animais de estimação para fins de cruzamento responsável de cães e gatos. Nossos serviços são destinados exclusivamente a maiores de 18 anos.
            </p>
          </section>

          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Elegibilidade e Cadastro</h2>
            <h3 className="font-semibold text-foreground mb-2">2.1 Requisitos</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ter 18 anos ou mais de idade;</li>
              <li>Possuir plena capacidade civil;</li>
              <li>Fornecer informações verdadeiras e atualizadas no cadastro;</li>
              <li>Ser o legítimo tutor ou responsável legal pelo animal cadastrado.</li>
            </ul>
            <h3 className="font-semibold text-foreground mt-4 mb-2">2.2 Conta de Usuário</h3>
            <p>
              Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary text-lg">3.</span> Uso da Plataforma
            </h2>
            <p className="mb-4">
              A Plataforma destina-se exclusivamente à conexão de tutores interessados em cruzamento responsável.
            </p>
            <div className="bg-destructive/5 border-l-4 border-destructive p-4 rounded-r-lg">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" /> Uso Proibido:
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Fins comerciais de venda de filhotes sem autorização;</li>
                <li>Praticar qualquer forma de abuso ou negligência animal;</li>
                <li>Realizar cruzamentos consanguíneos;</li>
                <li>Publicar conteúdo ofensivo ou ilegal.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Perfis de Pets</h2>
            <p className="mb-4">Ao criar um perfil, você garante que as informações de saúde e vacinação são precisas.</p>
            <blockquote className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg italic">
              "A LovixPet recomenda enfaticamente que cruzamentos sejam realizados com orientação veterinária."
            </blockquote>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="border border-border p-5 rounded-lg">
              <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" /> 5. Match e Comunicação
              </h2>
              <p className="text-sm">
                A LovixPet não garante a compatibilidade genética ou de saúde. A comunicação e acordos são de responsabilidade exclusiva dos tutores.
              </p>
            </div>
            <div className="border border-border p-5 rounded-lg">
              <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" /> 6. Responsabilidades
              </h2>
              <p className="text-sm">
                Não nos responsabilizamos por danos à saúde dos animais decorrentes de cruzamentos ou desentendimentos entre usuários.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Suspensão e Encerramento</h2>
            <p>
              Reservamo-nos o direito de encerrar contas em caso de denúncias fundamentadas de maus-tratos ou violação destes termos.
            </p>
          </section>

          {/* Rodapé dos Termos */}
          <div className="pt-8 border-t border-border mt-12 text-center">
            <p className="text-foreground font-medium">Dúvidas ou sugestões?</p>
            <a href="mailto:contato@lovixpet.com.br" className="text-primary hover:underline font-bold text-lg">
              contato@lovixpet.com.br
            </a>
          </div>

        </div>
      </main>
    </div>
  );
};

export default TermsPage;
