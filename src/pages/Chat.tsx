import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Send, PawPrint } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Message validation schema
const messageSchema = z.string()
  .min(1, 'Mensagem não pode estar vazia')
  .max(5000, 'Mensagem muito longa (máx 5000 caracteres)');

const MAX_MESSAGE_LENGTH = 5000;

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  read_at: string | null;
}

interface MatchInfo {
  id: string;
  pet: {
    id: string;
    name: string;
    photos: string[] | null;
    owner: {
      id: string;
      full_name: string;
    };
  };
}

export default function Chat() {
  const { matchId } = useParams<{ matchId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [matchInfo, setMatchInfo] = useState<MatchInfo | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && matchId) {
      initializeChat();
    }
  }, [user, matchId]);

  // Realtime subscription for messages
  useEffect(() => {
    if (!matchId) return;

    const channel = supabase
      .channel(`messages-${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `match_id=eq.${matchId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages(prev => {
            // Avoid duplicates
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [matchId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeChat = async () => {
    try {
      // Get profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user!.id)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) {
        toast.error('Perfil não encontrado');
        return;
      }
      
      setProfileId(profile.id);

      // Get user's pets
      const { data: userPets, error: petsError } = await supabase
        .from('pets')
        .select('id')
        .eq('owner_id', profile.id);

      if (petsError) throw petsError;
      const petIds = userPets?.map(p => p.id) || [];

      // Get match info
      const { data: match, error: matchError } = await supabase
        .from('matches')
        .select('*')
        .eq('id', matchId)
        .maybeSingle();

      if (matchError || !match) {
        toast.error('Match não encontrado');
        navigate('/matches');
        return;
      }

      // Get the other pet
      const otherPetId = petIds.includes(match.pet1_id) ? match.pet2_id : match.pet1_id;
      
      const { data: petData, error: petError } = await supabase
        .from('pets')
        .select(`
          id,
          name,
          photos,
          owner:profiles!pets_owner_id_fkey (
            id,
            full_name
          )
        `)
        .eq('id', otherPetId)
        .maybeSingle();

      if (petError || !petData) {
        toast.error('Pet não encontrado');
        return;
      }

      setMatchInfo({
        id: match.id,
        pet: petData as any,
      });

      // Get messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('match_id', matchId)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;
      setMessages(messagesData || []);

    } catch (error) {
      console.error('Error initializing chat:', error);
      toast.error('Erro ao carregar conversa');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || !profileId || !matchId) return;
    
    // Validate message content
    const validationResult = messageSchema.safeParse(trimmedMessage);
    if (!validationResult.success) {
      toast.error(validationResult.error.errors[0].message);
      return;
    }
    
    // Rate limiting - 1 second cooldown between messages
    const now = Date.now();
    if (now - lastMessageTime < 1000) {
      toast.error('Aguarde antes de enviar outra mensagem');
      return;
    }
    
    setSending(true);
    setLastMessageTime(now);
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          match_id: matchId,
          sender_id: profileId,
          content: trimmedMessage,
        });

      if (error) throw error;
      
      setNewMessage('');
      inputRef.current?.focus();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erro ao enviar mensagem');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    }
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.created_at);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">
          <PawPrint className="w-12 h-12 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/matches')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          {matchInfo && (
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                {matchInfo.pet.photos && matchInfo.pet.photos[0] ? (
                  <img
                    src={matchInfo.pet.photos[0]}
                    alt={matchInfo.pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PawPrint className="w-5 h-5 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="font-semibold text-foreground">{matchInfo.pet.name}</h1>
                <p className="text-xs text-muted-foreground">{matchInfo.pet.owner.full_name}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {Object.entries(groupedMessages).map(([date, msgs]) => (
            <div key={date}>
              {/* Date Separator */}
              <div className="flex items-center justify-center my-4">
                <span className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                  {date}
                </span>
              </div>
              
              {/* Messages for this date */}
              <div className="space-y-2">
                {msgs.map((message) => {
                  const isOwn = message.sender_id === profileId;
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        isOwn ? "justify-end" : "justify-start"
                      )}
                    >
                      <Card
                        className={cn(
                          "max-w-[80%] px-4 py-2 rounded-2xl",
                          isOwn 
                            ? "bg-primary text-primary-foreground rounded-br-md" 
                            : "bg-muted rounded-bl-md"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        <p className={cn(
                          "text-[10px] mt-1 text-right",
                          isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {formatTime(message.created_at)}
                        </p>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center py-12">
              <PawPrint className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Comece uma conversa! Diga olá para {matchInfo?.pet.name} 🐾
              </p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Message Input */}
      <div className="border-t border-border/50 bg-card/80 backdrop-blur-sm sticky bottom-0">
        <form onSubmit={sendMessage} className="container mx-auto px-4 py-3 max-w-2xl">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              placeholder="Digite uma mensagem..."
              className="flex-1"
              disabled={sending}
              maxLength={MAX_MESSAGE_LENGTH}
            />
            <Button type="submit" disabled={!newMessage.trim() || sending}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
