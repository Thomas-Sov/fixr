import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'


import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
      </div>
      </ChakraProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
