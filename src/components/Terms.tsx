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
            <div className="space-y-4">
              <p>
                Ao acessar ou utilizar a plataforma LovixPet ("Plataforma"), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize nossos serviços.
              </p>
              <p>
                A LovixPet é uma plataforma digital que conecta tutores de animais de estimação para fins de cruzamento responsável de cães e gatos. Nossos serviços são destinados exclusivamente a maiores de 18 anos.
              </p>
            </div>
          </section>

          {/* 2. Elegibilidade e Cadastro */}
          <section className="bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" /> 2. Elegibilidade e Cadastro
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">2.1 Requisitos</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Ter 18 anos ou mais de idade</li>
                  <li>Possuir plena capacidade civil</li>
                  <li>Fornecer informações verdadeiras e atualizadas no cadastro</li>
                  <li>Ser o legítimo tutor ou responsável legal pelo animal cadastrado</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">2.2 Conta de Usuário</h3>
                <p className="text-sm">
                  Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta. Notifique-nos imediatamente em caso de uso não autorizado.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Uso da Plataforma */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Uso da Plataforma</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">3.1 Uso Permitido</h3>
                <p className="text-sm">
                  A Plataforma destina-se exclusivamente à conexão de tutores interessados em cruzamento responsável de seus animais de estimação. Você concorda em utilizar a Plataforma de forma ética, responsável e em conformidade com a legislação vigente.
                </p>
              </div>
              <div className="bg-destructive/5 border-l-4 border-destructive p-5 rounded-r-lg">
                <h3 className="font-bold text-destructive mb-3 flex items-center gap-2 uppercase">
                  <Ban className="w-5 h-5" /> 3.2 Uso Proibido
                </h3>
                <p className="text-sm mb-2 font-semibold text-destructive">É expressamente proibido:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Utilizar a Plataforma para fins comerciais de venda de filhotes sem autorização expressa</li>
                  <li>Cadastrar animais com informações falsas, adulteradas ou enganosas</li>
                  <li>Praticar qualquer forma de abuso, maus-tratos ou negligência animal</li>
                  <li>Publicar conteúdo ofensivo, discriminatório, obsceno ou ilegal</li>
                  <li>Realizar cruzamentos consanguíneos ou que prejudiquem a saúde dos animais</li>
                  <li>Usar a Plataforma para atividades fraudulentas ou criminosas</li>
                  <li>Coletar dados de outros usuários sem consentimento</li>
                  <li>Interferir no funcionamento técnico da Plataforma</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Perfis de Pets */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Perfis de Pets</h2>
            <div className="border border-border p-6 rounded-lg space-y-4 bg-background shadow-sm">
              <p className="text-sm font-semibold text-foreground">Ao criar um perfil para seu animal, você declara e garante que:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>As informações fornecidas (raça, idade, saúde, vacinação) são verdadeiras e precisas</li>
                <li>O animal está em boas condições de saúde e apto para cruzamento</li>
                <li>Você possui autorização veterinária ou acompanhamento profissional adequado</li>
                <li>As fotos publicadas pertencem ao seu animal e não violam direitos de terceiros</li>
              </ul>
              <div className="flex items-start gap-2 text-primary font-medium italic border-t pt-4">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">A LovixPet recomenda enfaticamente que cruzamentos sejam realizados com orientação veterinária e que ambos os animais possuam carteira de vacinação atualizada.</p>
              </div>
            </div>
          </section>

          {/* 5. Sistema de Match e Comunicação */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" /> 5. Sistema de Match e Comunicação
            </h2>
            <div className="space-y-4 text-sm">
              <p>O sistema de match conecta perfis compatíveis com base em informações cadastradas. A LovixPet não garante a compatibilidade genética, comportamental ou de saúde dos animais conectados pela Plataforma.</p>
              <p>A comunicação entre usuários ocorre exclusivamente por meio do chat interno da Plataforma e é de responsabilidade integral das partes envolvidas. A LovixPet não monitora, não modera e não se responsabiliza pelo conteúdo das conversas trocadas entre usuários.</p>
              <p>A LovixPet não é parte dos acordos firmados entre tutores e não se responsabiliza por qualquer promessa, combinação, transação financeira ou encontro decorrente dessas conversas.</p>
            </div>
          </section>

          {/* 6. Segurança Pessoal e Responsabilidade */}
          <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-500 mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6" /> 6. Segurança Pessoal e Responsabilidade nas Interações
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-3">6.1 Isenção de Responsabilidade por Condutas de Terceiros</h3>
                <p className="text-sm mb-2 italic font-semibold">A LovixPet é uma plataforma de intermediação digital e NÃO se responsabiliza, em nenhuma hipótese, por:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Crimes, golpes, fraudes, estelionato ou quaisquer atos ilícitos praticados por outros usuários</li>
                  <li>Roubos, furtos, extorsões ou qualquer forma de violência ocorrida em encontros combinados pela Plataforma</li>
                  <li>Enganos, promessas não cumpridas, acordos descumpridos ou desentendimentos entre usuários</li>
                  <li>Conteúdo falso, enganoso ou malicioso compartilhado por terceiros no chat ou nos perfis</li>
                  <li>Danos morais, materiais ou físicos sofridos em decorrência de interações realizadas fora da Plataforma</li>
                  <li>Qualquer prejuízo resultante de encontros presenciais organizados entre usuários</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-3">6.2 Recomendações de Segurança — Dados Pessoais Sensíveis</h3>
                <p className="text-sm mb-2 font-semibold">Para sua proteção, a LovixPet RECOMENDA FORTEMENTE que os usuários:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Nunca compartilhem número de telefone, endereço residencial ou de trabalho no chat antes de estabelecer confiança com o outro usuário</li>
                  <li>Nunca realizem pagamentos antecipados ou transferências financeiras a outros usuários pela Plataforma</li>
                  <li>Realizem os primeiros encontros com os pets em locais públicos, movimentados e seguros</li>
                  <li>Levem um acompanhante ao primeiro encontro presencial</li>
                  <li>Desconfiem de perfis que peçam dados pessoais, dinheiro ou favores logo nos primeiros contatos</li>
                  <li>Denunciem imediatamente à LovixPet qualquer usuário suspeito, abusivo ou com comportamento inadequado</li>
                </ul>
                <p className="mt-4 text-xs italic">A LovixPet disponibiliza ferramenta de denúncia em todos os perfis e conversas. Utilize-a sem hesitar. Condutas suspeitas também podem ser reportadas às autoridades competentes.</p>
              </div>

              <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-3">6.3 Uso do Chat Interno — Proibições</h3>
                <p className="text-sm mb-2">É expressamente proibido utilizar o sistema de mensagens da Plataforma para:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Solicitar ou compartilhar dados pessoais sensíveis (CPF, dados bancários, senhas)</li>
                  <li>Enviar links suspeitos, malware, phishing ou conteúdo malicioso</li>
                  <li>Assediar, ameaçar, chantagear ou praticar qualquer forma de violência verbal</li>
                  <li>Realizar negociações financeiras de qualquer natureza</li>
                  <li>Combinar atividades ilegais ou contrárias a estes Termos</li>
                </ul>
                <p className="mt-4 text-xs">A violação dessas regras resultará no encerramento imediato da conta e, quando aplicável, comunicação às autoridades.</p>
              </div>
            </div>
          </section>

          {/* 7. Responsabilidades */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" /> 7. Responsabilidades
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-3">
                <h3 className="font-bold text-foreground">7.1 Responsabilidade do Usuário</h3>
                <p>O usuário é inteiramente responsável pelo bem-estar do seu animal, pelas decisões de cruzamento, por sua própria segurança pessoal e por quaisquer acordos firmados com outros usuários por meio da Plataforma. Ao optar por se encontrar com outro usuário, o faz por sua conta e risco.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-foreground">7.2 Limitação de Responsabilidade da LovixPet</h3>
                <p className="mb-2">A LovixPet não se responsabiliza por:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Danos à saúde dos animais decorrentes de cruzamentos realizados pela Plataforma</li>
                  <li>Disputas, desentendimentos, litígios, crimes ou quaisquer ilícitos entre usuários</li>
                  <li>Informações falsas, enganosas ou mal-intencionadas fornecidas por outros usuários</li>
                  <li>Roubos, fraudes, golpes ou qualquer ato criminoso praticado por usuários da Plataforma</li>
                  <li>Consequências de encontros presenciais organizados entre usuários</li>
                  <li>Danos decorrentes do compartilhamento voluntário de dados pessoais no chat</li>
                  <li>Interrupções temporárias no serviço por manutenção ou força maior</li>
                  <li>Perdas financeiras de qualquer natureza decorrentes do uso da Plataforma</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 8. Propriedade Intelectual */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Copyright className="w-6 h-6 text-primary" /> 8. Propriedade Intelectual
            </h2>
            <p className="text-sm">
              Todos os direitos de propriedade intelectual relativos à Plataforma LovixPet — incluindo marca, logotipo, design, código-fonte e conteúdo — pertencem exclusivamente à LovixPet.
              Ao publicar conteúdo na Plataforma (fotos, descrições, etc.), você concede à LovixPet licença não exclusiva, gratuita e global para uso, exibição e distribuição desse conteúdo exclusivamente para fins de operação da Plataforma.
            </p>
          </section>

          {/* 9. Suspensão e Encerramento */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-destructive" /> 9. Suspensão e Encerramento de Conta
            </h2>
            <p className="text-sm mb-3">A LovixPet reserva-se o direito de suspender ou encerrar sua conta, sem aviso prévio, em caso de:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Violação destes Termos de Uso</li>
              <li>Suspeita de fraude ou atividade ilícita</li>
              <li>Denúncias fundamentadas de maus-tratos animais</li>
              <li>Fornecimento de informações falsas</li>
            </ul>
            <p className="mt-4 text-sm">Você pode encerrar sua conta a qualquer momento por meio das configurações da Plataforma ou via e-mail para contato@lovixpet.com.br.</p>
          </section>

          {/* 10. Alterações nos Termos */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Alterações nos Termos</h2>
            <p className="text-sm">A LovixPet pode modificar estes Termos a qualquer momento. Alterações relevantes serão comunicadas com antecedência mínima de 15 dias por e-mail ou notificação na Plataforma. O uso continuado após a vigência das alterações implica concordância com os novos termos.</p>
          </section>

          {/* 11. Legislação Aplicável e Foro */}
          <section className="bg-muted/50 p-6 rounded-xl border border-border">
            <h2 className="text-xl font-bold text-foreground mb-2">11. Legislação Aplicável e Foro</h2>
            <p className="text-sm">
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de domicílio do usuário para dirimir quaisquer controvérsias, salvo disposição legal em contrário.
            </p>
          </section>

          {/* 12. AUTORIZAÇÃO DE USO DE IMAGEM */}
          <section className="border-2 border-primary/20 p-6 rounded-xl bg-primary/5">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Camera className="w-6 h-6 text-primary" /> 12. Autorização de Uso de Imagem
            </h2>
            <div className="space-y-4 text-sm">
              <p>
                Ao utilizar a Plataforma e realizar o upload de fotos ou vídeos de seus animais de estimação, o usuário <strong>autoriza expressamente</strong> a LovixPet a utilizar tais imagens para fins de:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Divulgação em redes sociais oficiais da plataforma (Instagram, Facebook, TikTok e outros);</li>
                <li>Materiais publicitários e campanhas de marketing digital ou impresso;</li>
                <li>Ilustração de depoimentos, casos de sucesso e funcionalidades do site/app.</li>
              </ul>
              <p>
                Esta autorização é concedida de forma gratuita, sem qualquer ônus para a LovixPet, abrangendo o uso da imagem em território nacional e internacional por prazo indeterminado. O usuário declara ser o titular dos direitos sobre as imagens publicadas, responsabilizando-se integralmente por sua veracidade e autoria.
              </p>
            </div>
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
