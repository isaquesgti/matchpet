import React, { useState } from "react";
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  ChevronDown, 
  PawPrint, 
  UserPlus, 
  Heart, 
  Lock, 
  Handshake 
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-primary transition-colors focus:outline-none"
      >
        <span className="font-semibold text-foreground">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-primary flex-shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">
            ❓ Página de FAQ
          </h1>
          <p className="text-muted-foreground">
            Tudo o que você precisa saber sobre o LovixPet em um só lugar.
          </p>
        </div>

        <div className="space-y-10">
          
          {/* Categoria: Sobre a Plataforma */}
          <section className="bg-muted/20 rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <PawPrint className="w-6 h-6 text-primary" /> 🐾 Sobre a Plataforma
            </h2>
            <div className="space-y-1">
              <FAQItem 
                question="O LovixPet é gratuito?" 
                answer="Sim, o cadastro e uso básico da plataforma são gratuitos." 
              />
              <FAQItem 
                question="Para quais animais funciona?" 
                answer="Atualmente para cães e gatos. Novas espécies podem ser adicionadas futuramente." 
              />
              <FAQItem 
                question="Preciso criar uma conta para ver os pets?" 
                answer="Sim, é necessário cadastro para garantir a segurança de todos os usuários." 
              />
            </div>
          </section>

          {/* Categoria: Cadastro de Pets */}
          <section className="bg-muted/20 rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-primary" /> 🐶 Cadastro de Pets
            </h2>
            <div className="space-y-1">
              <FAQItem 
                question="Quantos pets posso cadastrar?" 
                answer="Você pode cadastrar todos os pets que tiver sob sua tutela." 
              />
              <FAQItem 
                question="Quais informações preciso ter em mãos?" 
                answer="Nome, raça, idade, sexo, status de vacinação e fotos recentes do pet." 
              />
              <FAQItem 
                question="Posso cadastrar um pet sem pedigree?" 
                answer="Sim! Aceitamos pets com e sem pedigree." 
              />
              <FAQItem 
                question="Meu pet precisa de exame antes de cruzar?" 
                answer="Recomendamos fortemente uma consulta veterinária prévia, mas não é obrigatório para usar a plataforma." 
              />
            </div>
          </section>

          {/* Categoria: Matches e Conversas */}
          <section className="bg-muted/20 rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" /> 💞 Matches e Conversas
            </h2>
            <div className="space-y-1">
              <FAQItem 
                question="Como funciona o match?" 
                answer="Você desliza os perfis. Quando dois tutores dão like um no perfil do outro, é um match e o chat é liberado." 
              />
              <FAQItem 
                question="O outro tutor vê quem deu like nele?" 
                answer="Não, enquanto não houver match mútuo nenhum dos dois é notificado." 
              />
              <FAQItem 
                question="Posso desfazer um match?" 
                answer="Sim, você pode desfazer e bloquear um match a qualquer momento." 
              />
              <FAQItem 
                question="A LovixPet lê minhas mensagens?" 
                answer="Não monitoramos o conteúdo das conversas em tempo real, mas podemos analisar denúncias quando acionados." 
              />
            </div>
          </section>

          {/* Categoria: Segurança e Privacidade */}
          <section className="bg-muted/20 rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary" /> 🔐 Segurança e Privacidade
            </h2>
            <div className="space-y-1">
              <FAQItem 
                question="Como denuncio um perfil suspeito?" 
                answer="Acesse o perfil do usuário, clique em '...' e selecione 'Denunciar'. Nossa equipe analisa em até 48h." 
              />
              <FAQItem 
                question="O LovixPet garante a segurança dos encontros?" 
                answer="A plataforma conecta tutores, mas não se responsabiliza por encontros presenciais. Sempre siga nossas dicas de segurança." 
              />
              <FAQItem 
                question="Meus dados são compartilhados com terceiros?" 
                answer="Não vendemos seus dados. Veja nossa Política de Privacidade para detalhes completos." 
              />
            </div>
          </section>

          {/* Categoria: Após o Match */}
          <section className="bg-muted/20 rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Handshake className="w-6 h-6 text-primary" /> 🤝 Após o Match
            </h2>
            <div className="space-y-1">
              <FAQItem 
                question="O LovixPet acompanha o cruzamento?" 
                answer="Não. Após o match, os tutores combinam todos os detalhes diretamente. Recomendamos formalizar um acordo simples por escrito." 
              />
              <FAQItem 
                question="E se o outro tutor não cumprir o combinado?" 
                answer="A LovixPet não intermedia acordos entre usuários. Em casos de fraude, recomendamos registro de ocorrência policial e denúncia na plataforma." 
              />
              <FAQItem 
                question="Posso avaliar o outro tutor após o cruzamento?" 
                answer="Sim! Estamos implementando o sistema de avaliações para que você possa compartilhar sua experiência e ajudar outros tutores na comunidade." 
              />
            </div>
          </section>

        </div>

        {/* Call to Action Final */}
        <div className="mt-16 p-8 bg-primary rounded-2xl text-center text-white">
          <h3 className="text-xl font-bold mb-2">Ainda tem dúvidas?</h3>
          <p className="text-primary-foreground mb-4">Nossa equipe de suporte está pronta para ajudar.</p>
          <a 
            href="mailto:contato@lovixpet.com.br" 
            className="inline-block bg-white text-primary font-bold px-6 py-2 rounded-full hover:bg-muted transition-colors"
          >
            Fale Conosco
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
