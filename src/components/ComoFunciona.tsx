import React from "react";
import {
  UserPlus,
  Heart,
  MessageCircle,
  Handshake,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Stethoscope,
  Syringe,
  ClipboardList,
  Star,
  Zap,
  PawPrint,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ── Subcomponente: Card de Passo ─────────────────────────────────────────────
const StepCard = ({
  number,
  icon: Icon,
  title,
  description,
  tip,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
  tip: string;
}) => (
  <div className="relative bg-muted/20 rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors">
    {/* Número de fundo */}
    <span className="absolute top-4 right-5 text-6xl font-black text-primary/5 select-none leading-none">
      {number}
    </span>

    {/* Ícone */}
    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>

    <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>

    {/* Dica */}
    <div className="flex items-start gap-2 bg-primary/5 rounded-xl px-4 py-3 border border-primary/10">
      <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
      <p className="text-xs text-primary font-medium leading-relaxed">{tip}</p>
    </div>
  </div>
);

// ── Subcomponente: Card de Diferencial ───────────────────────────────────────
const DiffCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="bg-muted/20 rounded-2xl p-5 border border-border hover:border-primary/30 transition-colors">
    <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg mb-3">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h3 className="text-sm font-bold text-foreground mb-1">{title}</h3>
    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

// ── Subcomponente: Item do Checklist ─────────────────────────────────────────
const CheckItem = ({
  label,
  sublabel,
}: {
  label: string;
  sublabel: string;
}) => (
  <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
    <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-primary flex items-center justify-center">
      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
    </div>
    <div>
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
    </div>
  </div>
);

// ── Página Principal ─────────────────────────────────────────────────────────
const ComoFunciona = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 pt-28 pb-16 max-w-3xl">

        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <PawPrint className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">
            Como Funciona?
          </h1>
          <p className="text-muted-foreground">
            Do cadastro ao match em poucos passos — simples, seguro e responsável.
          </p>
        </div>

        <div className="space-y-10">

          {/* Seção: Passo a Passo */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-primary" /> Passo a Passo
            </h2>
            <div className="space-y-4">
              <StepCard
                number={1}
                icon={UserPlus}
                title="Crie o Perfil do seu Pet"
                description="Monte o perfil completo em menos de 5 minutos. Adicione fotos reais e atuais, informe a raça, idade, sexo, porte e temperamento do seu animal. Quanto mais completo, maiores as chances de encontrar o match ideal."
                tip="Perfis com 3 ou mais fotos recebem até 4× mais matches!"
              />
              <StepCard
                number={2}
                icon={Heart}
                title="Deslize e Dê Match"
                description="Navegue pelos perfis de pets compatíveis na sua região. Deslize para a direita se curtiu, para a esquerda se não for o momento. Use filtros de raça, porte e localização para encontrar o parceiro ideal mais rápido."
                tip="Priorizamos pets próximos de você para facilitar o encontro."
              />
              <StepCard
                number={3}
                icon={MessageCircle}
                title="É um Match! Converse com Segurança"
                description="Quando dois tutores dão like um no pet do outro, é um match e o chat é liberado automaticamente. Converse diretamente com o outro tutor para tirar dúvidas e combinar os detalhes — tudo dentro da plataforma."
                tip="Nunca compartilhe telefone, endereço ou dados bancários no chat."
              />
              <StepCard
                number={4}
                icon={Handshake}
                title="Combine os Detalhes e Encontre"
                description="Alinhe local do encontro, exames necessários, vacinas e expectativas sobre a ninhada. Recomendamos formalizar um acordo simples por escrito e marcar o primeiro encontro dos pets em local público, como um parque ou clínica veterinária."
                tip="Crie um acordo simples e registre em cartório"
              />
            </div>
          </section>

          {/* Seção: Por que o LovixPet */}
          <section className="bg-muted/20 rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" /> Por que o LovixPet?
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <DiffCard
                icon={Zap}
                title="Compatibilidade Inteligente"
                description="Mostramos pets compatíveis por raça, porte e localização. Sem perder tempo com perfis irrelevantes."
              />
              <DiffCard
                icon={ShieldCheck}
                title="Segurança em 1º Lugar"
                description="Sistema de denúncia em todos os chats e perfis. Suas informações pessoais ficam protegidas."
              />
              <DiffCard
                icon={PawPrint}
                title="Cruzamento Responsável"
                description="Focado em cruzamento ético com exames veterinários e acordos claros entre tutores."
              />
              <DiffCard
                icon={MessageCircle}
                title="Chat Direto e Seguro"
                description="Comunicação direta entre tutores dentro de um ambiente monitorado e seguro."
              />
              <DiffCard
                icon={MapPin}
                title="Pets da Sua Região"
                description="Priorizamos pets próximos para facilitar o encontro e reduzir o estresse dos animais."
              />
              <DiffCard
                icon={Heart}
                title="100% Gratuito"
                description="Cadastro e uso básico completamente gratuitos. Sem taxas ou repasses entre usuários."
              />
            </div>
          </section>

          {/* Seção: Checklist do Tutor */}
          <section className="bg-muted/20 rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-primary" /> Checklist do Tutor Responsável
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Antes do encontro, certifique-se que tudo está em ordem.
            </p>

            <CheckItem
              label="Consulta veterinária prévia"
              sublabel="Confirme que seu pet está apto para cruzamento — recomendado para todos."
            />
            <CheckItem
              label="Vacinas em dia"
              sublabel="V8/V10 para cães · Quádrupla para gatos."
            />
            <CheckItem
              label="Exame de brucelose (cães)"
              sublabel="Fundamental para a saúde de ambos os animais antes do cruzamento."
            />
            <CheckItem
              label="Vermifugação recente"
              sublabel="Idealmente realizada até 15 dias antes do encontro."
            />
            <CheckItem
              label="Expectativas alinhadas com o outro tutor"
              sublabel="Converse sobre o que acontece com a ninhada antes de confirmar o encontro."
            />
            <CheckItem
              label="Acordo escrito entre os tutores"
              sublabel="Simples, mas importante para proteger ambas as partes."
            />
          </section>

          {/* Seção: Dicas de Segurança */}
          <section className="bg-muted/20 rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> Dicas de Segurança
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Sua segurança é nossa prioridade. Siga estas recomendações.
            </p>

            <CheckItem
              label="Nunca compartilhe dados pessoais no chat"
              sublabel="Telefone, endereço, CPF e dados bancários devem ser mantidos em sigilo."
            />
            <CheckItem
              label="Primeiro encontro em local público"
              sublabel="Parques, clínicas veterinárias ou pet shops são ótimas opções."
            />
            <CheckItem
              label="Leve um acompanhante"
              sublabel="Especialmente no primeiro encontro com um tutor desconhecido."
            />
            <CheckItem
              label="Desconfie de quem pede dinheiro antecipado"
              sublabel="A LovixPet não intermedia pagamentos. Golpes envolvendo dinheiro são comuns."
            />
            <CheckItem
              label="Denuncie perfis suspeitos"
              sublabel="Clique em '...' no perfil e selecione 'Denunciar'. Analisamos em até 48h."
            />
          </section>

        </div>

        {/* CTA Final */}
        <div className="mt-16 p-8 bg-primary rounded-2xl text-center text-white">
          <h3 className="text-xl font-bold mb-2">Pronto para encontrar o match perfeito? 🐾</h3>
          <p className="text-primary-foreground/80 mb-6">
            Milhares de pets esperam por um parceiro ideal. Cadastre-se grátis e comece agora.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/register"
              className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-muted transition-colors"
            >
              Criar Perfil do meu Pet
            </a>
            <a
              href="/faq"
              className="inline-block bg-white/10 text-white font-semibold px-8 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-colors"
            >
              Ver perguntas frequentes
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ComoFunciona;
