"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

interface Contact {
  id: string;
  name: string;
  label: string;
  avatar: string;
  isDefault?: boolean;
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
  const [selectedContact, setSelectedContact] = useState<string | null>("anita");
  const [sentContact, setSentContact] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const contacts: Contact[] = [
    { id: "anita", name: texts.contacts.anita.name, label: texts.contacts.anita.label, avatar: "A", isDefault: true },
    { id: "mom", name: texts.contacts.mom.name, label: texts.contacts.mom.label, avatar: "M" },
    { id: "nurseSarah", name: texts.contacts.nurseSarah.name, label: texts.contacts.nurseSarah.label, avatar: "N" },
  ];

  const handleContactClick = async (contact: Contact) => {
    if (sentContact) return;

    setSelectedContact(contact.id);
    setSentContact(contact.id);

    try {
      // Call Telegram API
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          contactId: contact.id
        }),
      });

      const data = await res.json();
      console.log("Telegram send result:", data);

      if (data.success) {
        setShowToast(true);
        onSend(contact.name);

        setTimeout(() => {
          setShowToast(false);
          setSelectedContact("anita");
          setSentContact(null);
          onClose();
        }, 2000);
      } else {
        console.error("Failed to send:", data.error);
        setSentContact(null);
        alert("Gagal mengirim pesan: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Telegram API error:", error);
      setSentContact(null);
      alert("Gagal mengirim pesan. Periksa koneksi.");
    }
  };

  const handleClose = () => {
    setSelectedContact("anita");
    setSentContact(null);
    setShowToast(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="bg-white rounded-[24px] p-6 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-[24px] font-semibold text-[#111827] tracking-[-0.5px] mb-2">
              {texts.title}
            </h2>
            <p className="text-[15px] text-[#9ca3af] tracking-[-0.3px]">
              {texts.subtitle}
            </p>
          </div>

          <div className="bg-[#f9fafb] rounded-[16px] p-4 mb-4 border border-[#e5e7eb]">
            <p className="text-[15px] text-[#111827] tracking-[-0.3px]">
              {message || "..."}
            </p>
          </div>

          <div className="space-y-3 mb-4">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                disabled={sentContact !== null && sentContact !== contact.id}
                className={`w-full flex items-center gap-4 p-4 rounded-[16px] transition-all border-2 ${selectedContact === contact.id
                    ? "border-[#0B1FB7] bg-white"
                    : "border-[#e5e7eb] bg-white hover:bg-[#f9fafb]"
                  }`}
              >
                <div
                  className="w-[48px] h-[48px] rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(180deg, #354BF3 0%, #0B1FB7 100%)"
                  }}
                >
                  <span className="text-white text-[18px] font-semibold">
                    {contact.avatar}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-medium text-[#111827] tracking-[-0.3px]">
                      {contact.name}
                    </span>
                    {contact.isDefault && selectedContact === contact.id && (
                      <span className="text-[12px] text-[#6b7280] bg-[#e5e7eb] px-2 py-0.5 rounded-md">
                        Default
                      </span>
                    )}
                    {sentContact === contact.id && (
                      <span className="text-[12px] text-white bg-[#22c55e] px-2 py-0.5 rounded-md">
                        {texts.sent}
                      </span>
                    )}
                  </div>
                  <span className="text-[14px] text-[#0B1FB7] tracking-[-0.3px]">
                    {contact.label}
                  </span>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#9ca3af]"
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
            className="w-full py-4 bg-[#f3f4f6] rounded-[16px] text-[16px] font-medium text-[#6b7280] hover:bg-[#e5e7eb] transition-colors"
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
