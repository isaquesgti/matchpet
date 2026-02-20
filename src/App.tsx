import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Adicionado useLocation
import { AuthProvider } from "@/hooks/useAuth";
import { useEffect } from "react"; // Adicionado useEffect
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PetForm from "./pages/PetForm";
import Swipe from "./pages/Swipe";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import PetDetails from "./pages/PetDetails";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import TermsPage from "./components/Terms"; // Importando Termos
import PrivacyPage from "./components/Privacy"; // Importando Privacidade

const queryClient = new QueryClient();

// Componente para rolar a página para o topo automaticamente ao navegar
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop /> {/* Adicionado aqui */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pets/new" element={<PetForm />} />
            <Route path="/pets/:id" element={<PetForm />} />
            <Route path="/pets/:petId/details" element={<PetDetails />} />
            <Route path="/swipe" element={<Swipe />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/chat/:matchId" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* Novas Rotas Legais */}
            <Route path="/termos" element={<TermsPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
