import type { Translations } from "./en";

export const id: Translations = {
  common: {
    logout: "Keluar",
  },
  onboarding: {
    step1: {
      title: "Mari Bersiap untuk Berkomunikasi",
      subtitle: "Ini hanya akan memakan waktu sebentar",
      faceDetected: "Wajah terdeteksi",
      cameraPreview: "Pratinjau kamera",
      adjustPosition: "Sesuaikan posisi Anda hingga wajah terdeteksi",
      rightPosition: "Anda berada di posisi yang tepat!",
      permissionDenied: "Akses kamera ditolak. Silakan aktifkan izin kamera di pengaturan browser Anda.",
      requestingPermission: "Meminta akses kamera...",
    },
    step2: {
      title: "Coba Pilih Tombol di Bawah",
      instruction: "Gerakkan kepala Anda untuk mengarahkan pointer di layar.\nSaat tombol disorot, kedipkan mata sekali untuk memilih.",
      buttonText: "Pilih tombol di sini",
      blinkDetected: "Bagus! Kedipan terdeteksi",
    },
    step3: {
      title: "Anda siap!",
      subtitle: "Siap untuk mulai berkomunikasi",
      startButton: "Mulai sekarang",
    },
  },
  main: {
    title: "Pilih Respons yang Disarankan atau\nKetik Sendiri",
    heardCard: {
      label: "Yang kami dengar",
      listening: "Mendengarkan...",
      defaultText: "Ada yang bisa saya bantu?",
    },
    messageInput: {
      placeholder: "Pesan Anda akan muncul di sini...",
    },
    suggestions: {
      option1: "Ya, tolong",
      option2: "Saya butuh bantuan",
      option3: "Saya baik-baik saja",
      option4: "Tidak untuk saat ini, terima kasih",
    },
    keyboard: {
      instruction: "Fokus bergerak otomatis. Kedipkan atau pilih untuk memilih.",
      clearMessage: "Hapus pesan",
      space: "Spasi",
    },
    telegram: {
      title: "Kirim pesan ini ke:",
      subtitle: "Pilih kontak untuk dikirim via Telegram",
      cancel: "Batal",
      sent: "Terkirim!",
      toastMessage: "Terkirim ke {name} via Telegram!",
      contacts: {
        anita: {
          name: "Anita",
          label: "Pengasuh",
        },
        mom: {
          name: "Ibu",
          label: "Keluarga",
        },
        nurseSarah: {
          name: "Perawat Sarah",
          label: "Tenaga Kesehatan",
        },
      },
    },
  },
};
