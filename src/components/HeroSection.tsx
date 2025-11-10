import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Heart className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Cruzamento Responsável</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Encontre o Match
              <span className="text-primary"> Perfeito</span> para seu Pet
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              Conecte-se com outros donos para cruzamento seguro e responsável de cães e gatos. 
              Deslize, dê match e encontre o parceiro ideal!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group">
                Começar Agora
                <Heart className="ml-2 group-hover:scale-110 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Saiba Mais
              </Button>
            </div>
            
            <div className="flex items-center gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
              <div>
                <span className="text-2xl font-bold text-primary block">10k+</span>
                Pets Cadastrados
              </div>
              <div>
                <span className="text-2xl font-bold text-secondary block">5k+</span>
                Matches Realizados
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-strong animate-float">
              <img 
                src={heroImage} 
                alt="Pets felizes prontos para encontrar um match" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
