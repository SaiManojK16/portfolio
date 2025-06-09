import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Chat } from './Chat';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] p-0">
        <Chat />
      </DialogContent>
    </Dialog>
  );
}; 