/// <reference types="vite/client" />
// ============================================================
// src/config/firebaseConfig.ts
// Public client configuration for optional cloud synchronization
// Per SECURITY.md: Client variables must never hold private secrets
// ============================================================

export const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env?.VITE_FIREBASE_APP_ID ?? '',
};
