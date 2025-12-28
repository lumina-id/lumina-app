export const en = {
  common: {
    logout: "Logout",
  },
  onboarding: {
    step1: {
      title: "Let's Get Ready to Communicate",
      subtitle: "This will only take a moment",
      faceDetected: "Face detected",
      cameraPreview: "Camera preview",
      adjustPosition: "Adjust your position until your face is detected",
      rightPosition: "You're in the right position!",
      permissionDenied: "Camera access denied. Please enable camera permissions in your browser settings.",
      requestingPermission: "Requesting camera access...",
    },
    step2: {
      title: "Try Selecting the Button Below",
      instruction: "Move your head to guide the pointer on the screen.\nWhen the button is highlighted, blink once to select it.",
      buttonText: "Select button here",
      blinkDetected: "Great! Blink detected",
    },
    step3: {
      title: "You're all set!",
      subtitle: "Ready to start communicating",
      startButton: "Start now",
    },
  },
  main: {
    title: "Choose a Suggested Response or\nType Your Own",
    heardCard: {
      label: "What we heard",
      listening: "Listening...",
      defaultText: "Is there anything I can help?",
    },
    messageInput: {
      placeholder: "Your message will appear here...",
    },
    suggestions: {
      option1: "Yes, please",
      option2: "I need some help",
      option3: "I'm okay right now",
      option4: "Not at the moment, thank you",
    },
    keyboard: {
      instruction: "Focus moves automatically. Blink or select to choose.",
      clearMessage: "Clear message",
      space: "Space",
    },
    telegram: {
      title: "Send this message to:",
      subtitle: "Select a contact to send via Telegram",
      cancel: "Cancel",
      sent: "Sent!",
      toastMessage: "Sent to {name} via Telegram!",
      contacts: {
        anita: {
          name: "Anita",
          label: "Caregiver",
        },
        mom: {
          name: "Mom",
          label: "Family",
        },
        nurseSarah: {
          name: "Nurse Sarah",
          label: "Healthcare",
        },
      },
    },
  },
};

export type Translations = {
  common: {
    logout: string;
  };
  onboarding: {
    step1: {
      title: string;
      subtitle: string;
      faceDetected: string;
      cameraPreview: string;
      adjustPosition: string;
      rightPosition: string;
      permissionDenied: string;
      requestingPermission: string;
    };
    step2: {
      title: string;
      instruction: string;
      buttonText: string;
      blinkDetected: string;
    };
    step3: {
      title: string;
      subtitle: string;
      startButton: string;
    };
  };
  main: {
    title: string;
    heardCard: {
      label: string;
      listening: string;
      defaultText: string;
    };
    messageInput: {
      placeholder: string;
    };
    suggestions: {
      option1: string;
      option2: string;
      option3: string;
      option4: string;
    };
    keyboard: {
      instruction: string;
      clearMessage: string;
      space: string;
    };
    telegram: {
      title: string;
      subtitle: string;
      cancel: string;
      sent: string;
      toastMessage: string;
      contacts: {
        anita: {
          name: string;
          label: string;
        };
        mom: {
          name: string;
          label: string;
        };
        nurseSarah: {
          name: string;
          label: string;
        };
      };
    };
  };
};
