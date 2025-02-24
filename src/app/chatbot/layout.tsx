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

      {/* Main Content */}
      <main className="flex-1 overflow-auto pl-6 pt-6 pb-2"> 
        {children} 
      </main>

      {/* Footer */}
      <footer className="bg-transparent text-white text-center py-2"> 
        <Footer />
      </footer>
    </div>
  );
}