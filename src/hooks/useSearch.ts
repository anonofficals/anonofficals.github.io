
import { useState } from "react";
import interns from "@/data/interns.json";

export interface InternData {
  applicationId: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  program: string;
  status: string;
  submittedDate: string;
  expectedDecision: string;
}

export const useSearch = () => {
  const [isSearching, setIsSearching] = useState(false);

  const searchIntern = async (query: string): Promise<InternData | null> => {
    setIsSearching(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const normalizedQuery = query.trim().toLowerCase();
      
      // Enhanced search with partial matching
      const result = interns.find((intern) => {
        const normalizedId = intern.applicationId.toLowerCase();
        const normalizedEmail = intern.email.toLowerCase();
        const normalizedName = intern.name.toLowerCase();
        
        return (
          normalizedId === normalizedQuery ||
          normalizedEmail === normalizedQuery ||
          normalizedId.includes(normalizedQuery) ||
          normalizedEmail.includes(normalizedQuery) ||
          normalizedName.includes(normalizedQuery)
        );
      });
      
      return result || null;
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchIntern,
    isSearching
  };
};
