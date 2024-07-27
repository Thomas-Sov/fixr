import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { Box, ChakraProvider } from '@chakra-ui/react'


import { api } from "~/utils/api";

import "~/styles/globals.css";
import { PageHeader, PageFooter } from '~/components';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ChakraProvider>
        <div className={GeistSans.className}>
          <Box pt={5} px={10}>
            <PageHeader />
          </Box>
          <Component {...pageProps} />
          <Box px={10}>
            <PageFooter />
          </Box>
        </div>
      </ChakraProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
