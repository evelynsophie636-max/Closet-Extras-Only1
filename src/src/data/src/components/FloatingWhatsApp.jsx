import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappNumber = "+2349161314677";
  const defaultText = encodeURIComponent("Hello Closet Extras Only! I am browsing your store and would like to make an enquiry.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contact Customer Support on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium text-xs pl-0 group-hover:pl-2">
        Chat with Us
      </span>
    </a>
  );
}
