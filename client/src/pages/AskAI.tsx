import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { Bot } from "lucide-react";

const SYSTEM_PROMPT = `You are an expert AI assistant specializing in federal data governance, artificial intelligence, machine learning, and emerging technologies in government. You help federal employees, contractors, and data professionals with:

1. Federal data policies and regulations (Evidence Act, OPEN Data Act, etc.)
2. AI/ML best practices and ethical considerations
3. Career guidance for federal data roles
4. Technical questions about data science, ML, and analytics
5. Federal agency data initiatives and programs
6. NIST frameworks and standards
7. Data governance and quality management

Provide accurate, helpful, and professional responses. When discussing policies, cite specific laws, regulations, or guidance documents when possible. For technical questions, provide clear explanations suitable for various skill levels.`;

export default function AskAI() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: SYSTEM_PROMPT },
  ]);

  const chatMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: (data: any) => {
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response as string,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
  });

  const handleSendMessage = (content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    chatMutation.mutate({ messages: [...messages, userMessage] });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold">Ask AI Assistant</h1>
          </div>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Get instant answers about federal data policy, AI/ML best practices, career guidance, and technical questions from our AI-powered assistant.
          </p>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-8">
        <div className="container max-w-5xl">
          <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <AIChatBox
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={chatMutation.isPending}
              placeholder="Ask me anything about federal data, AI/ML, or your career..."
              height="600px"
            />
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>💡 Tip: Ask specific questions for the best results. The AI assistant has knowledge of federal data policies, AI/ML concepts, and career guidance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
