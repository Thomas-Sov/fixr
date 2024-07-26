import { Box, Button, Flex, Text } from "@chakra-ui/react";

export default function LandingPage() {
  return (
    <>
      <Flex flexDir={"column"} alignItems={"center"} gap={12}>
        <Text color={"gray.900"} fontSize={40}>
          Clean Code, Lasting Quality
        </Text>
        <Flex gap={8}>
          <Button bg={"white"} borderWidth={1} borderColor={"lightgray"}>
            View pricing options
          </Button>
          <Button bg={"purple.600"} color={"white"}>
            Try it out
          </Button>
        </Flex>
      </Flex>
      <Flex justifyContent={"space-between"} mt={20} gap={20}>
        <Box textAlign="center" p={10} bg={"gray.200"} borderRadius={30}>
          <Text mb={6}>Automated Technical Debt Detection</Text>
          <Text fontSize={14} color={"gray.500"}>
            FIXR uses advanced algorithms to pinpoint technical debt in your
            codebase, such as code smells, outdated dependencies, and poor
            practices.
          </Text>
        </Box>
        <Box textAlign="center" p={10} bg={"gray.200"} borderRadius={30}>
          <Text mb={6}>Proritized Actionalble Insights</Text>
          <Text fontSize={14} color={"gray.500"}>
            FIXR helps your team efficiently address the most critical issues
            first, optimising your technical debt reduction efforts.
          </Text>
        </Box>
        <Box textAlign="center" p={10} bg={"gray.200"} borderRadius={30}>
          <Text mb={6}>Real time PR generation</Text>
          <Text fontSize={14} color={"gray.500"}>
            Real-Time PR generation FIXR automates the creation of pull requests
            to address identified technical debt.
          </Text>
        </Box>
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
          <Button bg={"purple.600"} color={"white"}>
            Try it out
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
