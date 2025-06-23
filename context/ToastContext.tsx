import React, { createContext, useContext } from "react";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

type ToastContextType = {
  toasts: Toast[];
  addToast: (message: string, type: "success" | "error" | "info") => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = (message: string, type: "success" | "error" | "info") => {
    const id = new Date().getTime();
    setToasts((prev) => [{ id, message, type }]); // Always replace with the new toast
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
