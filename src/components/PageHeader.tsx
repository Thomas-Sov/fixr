import { Button, Flex, Link } from "@chakra-ui/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Logo } from ".";

const PageHeader = () => {
  return (
    <Flex justifyContent="space-between" mb={20}>
      <Flex alignItems="center" gap={10}>
        <Link href='/' color="gray.600" _hover={{ textDecoration: '' }}>
          <Logo />
        </Link>
        <Link href='/' color="gray.600" _hover={{ textDecoration: '' }}>
          Overview
        </Link>
        <Link href='/pricing' color="gray.600" _hover={{ textDecoration: '' }}>
          Pricing
        </Link>
      </Flex>
      <Flex alignItems="center" gap={6}>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button bg={"purple.600"} color={"white"}>
              Login
            </Button>
          </SignInButton>
        </SignedOut>
      </Flex>
    </Flex>
  );
}

export default PageHeader;