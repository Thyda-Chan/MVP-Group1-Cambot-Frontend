import Header from "@/app/chatbot/components/header";
import Footer from "@/app/chatbot/components/footer";

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#F5FCFF] to-[#62C9F1]">
      {/* Header */}
      <Header />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 p-6 bg-transparent overflow-auto">
          {children} 
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-transparent text-white text-center py-4">
        <Footer />
      </footer>
    </div>
  );
}
