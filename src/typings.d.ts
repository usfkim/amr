// Global typings for third-party globals

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

declare const gtag: ((...args: any[]) => void) | undefined;

export {};
