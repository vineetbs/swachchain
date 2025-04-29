import React, { createContext, useContext, useState, ReactNode } from "react";
// We might need to import the actual toast function later
// import { toast } from "sonner"; // Example if using sonner
// import { useToast } from "@/components/ui/use-toast"; // Example if using shadcn/ui toaster

// Define the shape of the context data
interface InfoContextType {
  // Example state (add more as needed)
  lastUploadStatus: string | null;
  setLastUploadStatus: (status: string | null) => void;

  // Placeholder functions for feedback (replace console.log with actual toast calls)
  showSuccessMessage: (message: string) => void;
  showErrorMessage: (message: string) => void;

  // Add other states or functions needed by components (e.g., user profile details)
  // userId: string | null;
}

// Create the context with a default value (can be null or a default object)
const InfoContext = createContext<InfoContextType | undefined>(undefined);

// Define the Provider component
interface InfoStoreProviderProps {
  children: ReactNode;
}

const InfoStoreProvider: React.FC<InfoStoreProviderProps> = ({ children }) => {
  const [lastUploadStatus, setLastUploadStatus] = useState<string | null>(null);
  // const { toast } = useToast(); // Example for shadcn/ui toaster

  // Placeholder implementation for showing messages
  const showSuccessMessage = (message: string) => {
    console.log("SUCCESS:", message);
    // Replace with actual toast call, e.g.:
    // toast({ title: "Success", description: message }); // shadcn/ui example
    // toast.success(message); // sonner example
    setLastUploadStatus("success"); // Optionally update state
  };

  const showErrorMessage = (message: string) => {
    console.error("ERROR:", message);
    // Replace with actual toast call, e.g.:
    // toast({ variant: "destructive", title: "Error", description: message }); // shadcn/ui example
    // toast.error(message); // sonner example
    setLastUploadStatus("error"); // Optionally update state
  };

  // Value provided by the context
  const contextValue: InfoContextType = {
    lastUploadStatus,
    setLastUploadStatus,
    showSuccessMessage,
    showErrorMessage,
    // Add other values here
  };

  return (
    <InfoContext.Provider value={contextValue}>{children}</InfoContext.Provider>
  );
};

// Custom hook to use the InfoContext
export const useInfoStore = (): InfoContextType => {
  const context = useContext(InfoContext);
  if (context === undefined) {
    throw new Error("useInfoStore must be used within an InfoStoreProvider");
  }
  return context;
};

// Export the provider as default
export default InfoStoreProvider;
