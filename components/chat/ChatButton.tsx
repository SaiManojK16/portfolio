"use client";

import React, { useState } from 'react';
import { IconMessage } from "@tabler/icons-react";
import { ChatModal } from './ChatModal';
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={() => setIsOpen(true)}
              className="fixed bottom-8 right-8 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open chat"
            >
              <IconMessage className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Open chat with AI assistant</span>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chat with Sai's AI Assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}; 