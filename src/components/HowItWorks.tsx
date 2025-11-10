import { UserPlus, Heart, MessageCircle } from "lucide-react";
import pawIcon from "@/assets/paw-icon.png";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Crie o Perfil do seu Pet",
      description: "Adicione fotos, raça, idade e todas as informações importantes sobre seu amigo de quatro patas.",
    },
    {
      icon: Heart,
      title: "Deslize e Dê Match",
      description: "Navegue pelos perfis de outros pets compatíveis. Deslize para a direita se gostar, esquerda se não for compatível.",
    },
    {
      icon: MessageCircle,
      title: "Converse e Encontre",
      description: "Quando ambos derem like, é um match! Converse com o dono e combine todos os detalhes do cruzamento.",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
            <img src={pawIcon} alt="Paw icon" className="w-full h-full animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Como Funciona?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Três passos simples para encontrar o match perfeito para seu pet
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative bg-card p-8 rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 group"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-soft">
                  {index + 1}
                </div>
                
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
