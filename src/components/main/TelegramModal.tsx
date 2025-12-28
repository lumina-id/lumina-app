"use client";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  label: string;
  avatar: string;
}

interface TelegramModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onSend: (contactName: string) => void;
  texts: {
    title: string;
    subtitle: string;
    cancel: string;
    sent: string;
    toastMessage: string;
    contacts: {
      anita: { name: string; label: string };
      mom: { name: string; label: string };
      nurseSarah: { name: string; label: string };
    };
  };
}

export default function TelegramModal({
  isOpen,
  message,
  onClose,
  onSend,
  texts,
}: TelegramModalProps) {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [sentContact, setSentContact] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const contacts: Contact[] = [
    { id: "anita", name: texts.contacts.anita.name, label: texts.contacts.anita.label, avatar: "A" },
    { id: "mom", name: texts.contacts.mom.name, label: texts.contacts.mom.label, avatar: "M" },
    { id: "nurseSarah", name: texts.contacts.nurseSarah.name, label: texts.contacts.nurseSarah.label, avatar: "N" },
  ];

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact.id);
    setSentContact(contact.id);
    
    setTimeout(() => {
      setShowToast(true);
      onSend(contact.name);
      
      setTimeout(() => {
        setShowToast(false);
        setSelectedContact(null);
        setSentContact(null);
        onClose();
      }, 2000);
    }, 500);
  };

  const handleClose = () => {
    setSelectedContact(null);
    setSentContact(null);
    setShowToast(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="bg-white rounded-[20px] p-6 shadow-xl">
          <div className="text-center mb-4">
            <h2 className="text-[20px] font-medium text-[#202020] tracking-[-0.8px]">
              {texts.title}
            </h2>
            <p className="text-[14px] text-[#64748b] tracking-[-0.56px] mt-1">
              {texts.subtitle}
            </p>
          </div>

          <div className="bg-[#f8fafc] rounded-[12px] p-3 mb-4">
            <p className="text-[14px] text-[#202020] tracking-[-0.56px]">
              {message || "..."}
            </p>
          </div>

          <div className="space-y-2 mb-4">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                disabled={sentContact !== null}
                className={`w-full flex items-center gap-3 p-3 rounded-[12px] transition-all border-2 ${
                  selectedContact === contact.id
                    ? "border-[#3b82f6] bg-white"
                    : "border-transparent hover:bg-[#f8fafc]"
                }`}
              >
                <div className="w-[40px] h-[40px] rounded-full bg-[#3b82f6] flex items-center justify-center">
                  <span className="text-white text-[16px] font-medium">
                    {contact.avatar}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-medium text-[#202020] tracking-[-0.64px]">
                      {contact.name}
                    </span>
                    {sentContact === contact.id && (
                      <span className="text-[12px] text-white bg-[#22c55e] px-2 py-0.5 rounded-full">
                        {texts.sent}
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] text-[#64748b] tracking-[-0.48px]">
                    {contact.label}
                  </span>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#94a3b8]"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>

          <button
            onClick={handleClose}
            className="w-full py-3 text-[16px] text-[#64748b] hover:text-[#202020] transition-colors"
          >
            {texts.cancel}
          </button>
        </div>
      </Modal>

      {showToast && sentContact && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] animate-fade-in">
          <div className="bg-[#22c55e] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[14px] font-medium">
              {texts.toastMessage.replace("{name}", contacts.find(c => c.id === sentContact)?.name || "")}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
