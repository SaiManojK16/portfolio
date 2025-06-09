'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Chat } from './Chat';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="fixed bottom-28 right-8 left-auto top-auto translate-x-0 translate-y-0 w-[400px] max-h-[600px] p-0 m-0 rounded-xl shadow-2xl z-[110] bg-background border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2"
      >
        <VisuallyHidden>
          <DialogTitle>Chat with Sai's AI Assistant</DialogTitle>
          <DialogDescription>
            Ask questions about Sai Manoj Kartala's experience, skills, and background
          </DialogDescription>
        </VisuallyHidden>
        <Chat />
      </DialogContent>
    </Dialog>
  );
}; 