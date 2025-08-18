"use client";

import { useEffect } from "react";

interface TransitionProviderProps {
  children: React.ReactNode;
}

export const TransitionProvider = ({ children }: TransitionProviderProps) => {
  useEffect(() => {
    // Ajouter la classe pour empêcher les transitions au chargement
    document.body.classList.add('preload-transitions');
    
    // Retirer la classe après un court délai pour activer les transitions
    const timer = setTimeout(() => {
      document.body.classList.remove('preload-transitions');
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('preload-transitions');
    };
  }, []);

  return <>{children}</>;
};