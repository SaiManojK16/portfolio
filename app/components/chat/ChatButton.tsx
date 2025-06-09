import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ChatModal } from './ChatModal';

export const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex items-center gap-2">
        {!isOpen && (
          <div className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-md">
            Chat with AI Assistant
          </div>
        )}
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full shadow-lg"
          size="icon"
          variant="default"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}; 