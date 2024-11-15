"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="bg-gray-900 text-gray-300 shadow-lg rounded-md border border-gray-800 animate-in slide-in-from-top-right animate-out fade-out"
          >
            <div className="grid gap-2 px-4 py-3">
              {title && (
                <ToastTitle className="text-lg font-bold">{title}</ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-sm text-gray-300">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport className="fixed top-4 right-4 z-50 flex flex-col gap-3 " />
    </ToastProvider>
  );
}
