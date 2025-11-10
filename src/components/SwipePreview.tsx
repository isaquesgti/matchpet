import { useState } from "react";
import { Heart, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import demoPet1 from "@/assets/demo-pet-1.jpg";
import demoPet2 from "@/assets/demo-pet-2.jpg";

const SwipePreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const pets = [
    {
      name: "Max",
      breed: "Beagle",
      age: "3 anos",
      gender: "Macho",
      image: demoPet1,
      description: "Beagle saudável e carinhoso, procurando parceira para cruzamento.",
    },
    {
      name: "Luna",
      breed: "Gato Persa",
      age: "2 anos",
      gender: "Fêmea",
      image: demoPet2,
      description: "Gata Persa pura, com pedigree, pronta para ter filhotes.",
    },
  ];

  const currentPet = pets[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    setCurrentIndex((prev) => (prev + 1) % pets.length);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Interface de Swipe
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experimente como será encontrar o match perfeito para seu pet
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="relative overflow-hidden shadow-strong">
            <div className="aspect-[3/4] relative">
              <img 
                src={currentPet.image} 
                alt={`${currentPet.name} - ${currentPet.breed}`}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{currentPet.name}, {currentPet.age}</h3>
                    <p className="text-lg opacity-90">{currentPet.breed} • {currentPet.gender}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Info className="w-6 h-6" />
                  </Button>
                </div>
                <p className="text-sm opacity-80">{currentPet.description}</p>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-center gap-6 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="w-16 h-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-white shadow-soft"
              onClick={() => handleSwipe("left")}
            >
              <X className="w-8 h-8" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="w-20 h-20 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-soft"
              onClick={() => handleSwipe("right")}
            >
              <Heart className="w-10 h-10" />
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Deslize para a esquerda para passar, direita para dar like!
          </p>
        </div>
      </div>
    </section>
  );
};

export default SwipePreview;
