/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Box } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "~/components/LandingPage";
import styles from "./index.module.css";

export default function Home() {

  return (
    <>
      <main className={styles.main}>
        <Box pt={10} px={10}>
          <SignedOut>
            <LandingPage />
          </SignedOut>
          <SignedIn>
            <LandingPage />
          </SignedIn>
        </Box>
      </main>
    </>
  );
}
