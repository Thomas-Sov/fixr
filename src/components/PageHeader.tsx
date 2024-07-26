import { Button, Flex, Text } from "@chakra-ui/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function PageHeader() {
  return (
    <Flex justifyContent="space-between" mb={20}>
      <Flex alignItems="center" gap={10}>
        <Text color="gray.600">Home</Text>
        <Text color="gray.600">Products</Text>
        <Text color="gray.600">Resources</Text>
        <Text color="gray.600">Pricing</Text>
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
