import React from "react";
import { ShieldCheck, UserCheck, Ban, Info, Scale, Copyright, AlertTriangle, MessageSquare, Lock, AlertCircle, Camera } from "lucide-react";
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
          <p className="text-muted-foreground">
            🐾 **LovixPet** — Última atualização: Fevereiro de 2025
          </p>
        </div>

        <div className="space-y-12 text-muted-foreground leading-relaxed">
          
          {/* 1. Aceitação dos Termos */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">1.</span> Aceitação dos Termos
            </h2>
            <p>
              Ao acessar ou utilizar a plataforma LovixPet ("Plataforma"), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize nossos serviços. A LovixPet é uma plataforma digital que conecta tutores de animais de estimação para fins de cruzamento responsável de cães e gatos. Nossos serviços são destinados exclusivamente a maiores de 18 anos.
            </p>
          </section>

          {/* 2. Elegibilidade e Cadastro */}
          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" /> 2. Elegibilidade e Cadastro
            </h2>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">2.1 Requisitos</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Ter 18 anos ou mais de idade; Possuir plena capacidade civil;</li>
                <li>Fornecer informações verdadeiras e atualizadas no cadastro;</li>
                <li>Ser o legítimo tutor ou responsável legal pelo animal cadastrado.</li>
              </ul>
              <h3 className="font-semibold text-foreground">2.2 Conta de Usuário</h3>
              <p className="text-sm">Você é responsável por manter a confidencialidade de suas credenciais de acesso. Notifique-nos imediatamente em caso de uso não autorizado.</p>
            </div>
          </section>

          {/* 3. Uso da Plataforma */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Uso da Plataforma</h2>
            <h3 className="font-semibold text-foreground mb-2">3.1 Uso Permitido</h3>
            <p className="text-sm mb-4">A Plataforma destina-se exclusivamente à conexão de tutores interessados em cruzamento responsável. Você concorda em utilizá-la de forma ética e legal.</p>
            <div className="bg-destructive/5 border-l-4 border-destructive p-5 rounded-r-lg">
              <h3 className="font-bold text-destructive mb-2 flex items-center gap-2 uppercase">
                <Ban className="w-5 h-5" /> 3.2 Uso Proibido
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Venda de filhotes sem autorização; Informações falsas ou enganosas;</li>
                <li>Abuso, maus-tratos ou negligência animal; Cruzamentos consanguíneos;</li>
                <li>Conteúdo ofensivo ou ilegal; Coletar dados de outros usuários sem consentimento.</li>
              </ul>
            </div>
          </section>

          {/* 4. Perfis de Pets */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Perfis de Pets</h2>
            <div className="border border-border p-5 rounded-lg space-y-3 bg-background shadow-sm text-sm">
              <p>Você garante que as informações de saúde e raça são precisas e que o animal está apto para cruzamento.</p>
              <div className="flex items-start gap-2 text-primary font-medium italic">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p>A LovixPet recomenda orientação veterinária e vacinação atualizada.</p>
              </div>
            </div>
          </section>

          {/* 5. Sistema de Match e Comunicação */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Sistema de Match e Comunicação</h2>
            <p className="text-sm">A LovixPet não garante compatibilidade genética ou de saúde. A comunicação ocorre via chat interno e é de responsabilidade integral das partes. A LovixPet não monitora nem se responsabiliza pelo conteúdo das conversas ou acordos firmados.</p>
          </section>

          {/* 6. Segurança Pessoal (IMPORTANTE) */}
          <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-500 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" /> 6. Segurança Pessoal e Responsabilidade
            </h2>
            <div className="space-y-4 text-sm">
              <p><strong>6.1 Isenção:</strong> A LovixPet NÃO se responsabiliza por crimes, golpes, furtos, violência ou descumprimento de acordos em encontros presenciais.</p>
              <p><strong>6.2 Recomendações:</strong> Nunca compartilhe dados sensíveis (endereço/telefone) de imediato. Realize encontros em locais públicos e leve um acompanhante.</p>
              <p><strong>6.3 Chat:</strong> Proibido solicitar CPFs, dados bancários ou enviar links maliciosos.</p>
            </div>
          </section>

          {/* 7. Responsabilidades */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Responsabilidades</h2>
            <p className="text-sm">O usuário é inteiramente responsável pelo bem-estar do animal e por sua própria segurança física. A LovixPet não se responsabiliza por danos à saúde dos animais, furtos ou prejuízos financeiros decorrentes do uso da plataforma.</p>
          </section>

          {/* 8. Propriedade Intelectual */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Copyright className="w-6 h-6 text-primary" /> 8. Propriedade Intelectual
            </h2>
            <p className="text-sm">
              Todos os direitos da marca, logotipo e código LovixPet pertencem à empresa. Ao publicar conteúdo, você concede licença gratuita e global para exibição e distribuição exclusiva para fins de operação do serviço.
            </p>
          </section>

          {/* 12. AUTORIZAÇÃO DE USO DE IMAGEM (NOVA SEÇÃO ELABORADA) */}
          <section className="border-2 border-primary/20 p-6 rounded-xl bg-primary/5">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Camera className="w-6 h-6 text-primary" /> 12. Autorização de Uso de Imagem
            </h2>
            <div className="space-y-4 text-sm text-foreground/80">
              <p>
                Ao realizar o cadastro e publicar fotografias ou vídeos na Plataforma, o usuário <strong>autoriza expressamente</strong> a LovixPet a utilizar tais imagens para:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Divulgação em redes sociais oficiais (Instagram, Facebook, TikTok, etc.);</li>
                <li>Materiais publicitários, banners e campanhas de marketing digital ou impresso;</li>
                <li>Ilustração de depoimentos e casos de sucesso na plataforma.</li>
              </ul>
              <p>
                Esta autorização é concedida a título <strong>gratuito</strong>, abrangendo todo o território nacional e internacional, por prazo indeterminado. O usuário declara possuir os direitos autorais sobre as imagens enviadas, isentando a LovixPet de qualquer responsabilidade perante terceiros.
              </p>
            </div>
          </section>

          {/* 9, 10 e 11. Finalização */}
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-muted/50 p-5 rounded-lg">
              <h3 className="font-bold mb-2">9. Suspensão de Conta</h3>
              <p>Reservamo-nos o direito de encerrar contas em caso de maus-tratos animais ou fraude.</p>
            </div>
            <div className="bg-muted/50 p-5 rounded-lg">
              <h3 className="font-bold mb-2">11. Legislação e Foro</h3>
              <p>Termos regidos pelas leis do Brasil. Foro eleito: Comarca de domicílio do usuário.</p>
            </div>
          </div>

          {/* Rodapé de Contato */}
          <footer className="pt-8 border-t border-border text-center">
            <p className="text-foreground font-semibold">Dúvidas ou denúncias de conteúdo?</p>
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
