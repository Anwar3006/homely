"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "./(auth)/authProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>
        <Auth>
          {children}
          <Toaster position="bottom-right" />
        </Auth>
      </Authenticator.Provider>
    </QueryClientProvider>
  );
};

export default Providers;
