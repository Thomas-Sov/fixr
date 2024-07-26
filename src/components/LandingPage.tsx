import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import Image1 from "../assets/image.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
export default function LandingPage() {
  return (
    <>
      <Flex flexDir={"column"} alignItems={"center"} gap={8}>
        <Text color={"gray.900"} fontSize={40}>
          Clean Code, Lasting Quality
        </Text>
        <Flex gap={8}>
          <Button bg={"white"} borderWidth={1} borderColor={"lightgray"}>
            View pricing options
          </Button>
          <SignedOut>
            <SignInButton>
              <Button bg={"purple.600"} color={"white"}>
                Try it out
              </Button>
            </SignInButton>
          </SignedOut>
        </Flex>
      </Flex>
      <Flex mt={10} gap={10} bg={"gray.100"} borderRadius={30}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          textAlign="center"
          p={10}
          borderRadius={30}
          gap={6}
        >
          <Image w={40} h={40} src={Image1.src} />
          <Text>Automated Technical Debt Detection</Text>
          <Text fontSize={14} color={"gray.500"}>
            FIXR uses advanced algorithms to pinpoint technical debt in your
            codebase, such as code smells, outdated dependencies, and poor
            practices.
          </Text>
        </Flex>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          textAlign="center"
          p={10}
          borderRadius={30}
          gap={6}
        >
          <Image w={40} h={40} src={Image2.src} />
          <Text>Proritized Actionalble Insights</Text>
          <Text fontSize={14} color={"gray.500"}>
            FIXR helps your team efficiently address the most critical issues
            first, optimising your technical debt reduction efforts.
          </Text>
        </Flex>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          textAlign="center"
          p={10}
          borderRadius={30}
          gap={6}
        >
          <Image w={40} h={40} src={Image3.src} />
          <Text>Real time PR generation</Text>
          <Text fontSize={14} color={"gray.500"}>
            Real-Time PR generation FIXR automates the creation of pull requests
            to address identified technical debt.
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} alignItems={"center"} gap={4} mt={20}>
        <Text color={"gray.900"} fontSize={40}>
          Start your 30-Day free trial
        </Text>
        <Text color={"gray.500"} fontSize={20}>
          Start your 30-Day free trial
        </Text>
        <Flex gap={8}>
          <Button bg={"white"} borderWidth={1} borderColor={"lightgray"}>
            View pricing options
          </Button>
          <SignedOut>
            <SignInButton>
              <Button bg={"purple.600"} color={"white"}>
                Try it out
              </Button>
            </SignInButton>
          </SignedOut>
        </Flex>
      </Flex>
    </>
  );
}
