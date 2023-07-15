import { createContext, useContext, useState } from "react";
export const VendorContext = createContext<any>(null);

export function useVendor() {
  return useContext(VendorContext);
}

export function VendorProvider({ children }: any) {
  const [vendor, setVendor] = useState({});
  return (
    <VendorContext.Provider value={{ vendor, setVendor }}
    >
      {children}
    </VendorContext.Provider>
  );
}