import React, { useEffect, useState } from "react";
import Editor, { useMonaco, DiffEditor } from "@monaco-editor/react";

import {
  Container,
  Flex,
  Button,
  Box,
  Text,
  Image,
  Input,
  keyframes,
  Spinner,
} from "@chakra-ui/react";
import { PageHeader } from "~/components/PageHeader";
import { useUser } from "@clerk/nextjs";
const CodeGen = () => {
  const user = useUser();
  const monaco = useMonaco();
  const [updatedCode, setUpdatedCode] = useState<string>("");
  const [inputCode, setInputCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [commitMessage, setCommitMessage]  =  useState<string>("");
  const [filePath, setFilePath] = useState<string>("");
  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);
  function generateRandomText(length = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const fixTheCode = async () => {
    setLoading(true);
    try {
      const sonar = await fetch("https://fixr-code.onrender.com/fix-code", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          code: inputCode,
          file_path: filePath,
        }),
      });

      const { eslint_output, eslint_formatted_results, fixed_code } =
        await sonar.json();
        setCommitMessage(eslint_formatted_results)
        const newtest = fixed_code.replace(/^\{\s*"code":\s*/, '').replace(/\s*}$/, '')
      setUpdatedCode(newtest);

      setShowCompare(true);
    } catch (error) {
      // catch error
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const submitToGitHb = async () => {
    try {
      setSubmitting(true);
      await fetch("https://fixr-code.onrender.com/pull-request", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          codeChanges: [
            {
              filePath: filePath,
              content: updatedCode,
            },
          ],
          commitMessage: "Automated code change updates from FIXR, error found : "+ commitMessage,
          githubToken: process.env.NEXT_PUBLIC_AB_GITHUB_AUTH_TOKEN,
          owner: "Thomas-Sov",
          repo: "fixr",
          baseBranch: "main",
          featureBranch: `automated-changed-pr/${filePath}${generateRandomText(4)}`,
        }),
      });
      setSubmitting(false);
    } catch (error) {
      alert(error);
      setSubmitting(false);
    }
  };
  const clearAll = () => {
    setInputCode("");
    setUpdatedCode("");
    setFilePath("");
    setShowCompare(false);
  };
  return (
    <>
      <Box paddingTop={10} paddingX={10}>
        <PageHeader />
      </Box>

      {showCompare ? (
        <Flex
          flexDirection={"column"}
          minHeight={"100vh"}
          width="100%"
          gap={"32px"}
          paddingBottom={"100px"}
          overflow={"hidden"}
          px={"40px"}
        >
          <Box position={"relative"}>
            <DiffEditor
              original={inputCode}
              modified={updatedCode}
              height="70vh"
              language="text"
            />

            <Flex
              flexDirection={"column"}
              width={"48%"}
              position={"absolute"}
              bottom={-5}
              background={"white"}
            >
              <Text pb={2}>File path</Text>
              <Input
                onChange={(event) => {
                  setFilePath(event.target?.value);
                }}
                width={"100%"}
                defaultValue={filePath}
                placeholder="Enter file path"
              ></Input>
              <Text color={"#475467"} pt={1}>
                The file path of the original code file
              </Text>
            </Flex>
          </Box>
          <Flex gap={"64px"} mt={30}>
            <Flex
              justifyContent={"end"}
              padding={"24px"}
              width={"100%"}
              border={"1px solid #EAECF0"}
            >
              <Button
                backgroundColor={"#F2F4F7"}
                onClick={() => {
                  if (showCompare) {
                    setShowCompare(false);
                  } else {
                    fixTheCode();
                  }
                }}
              >
                {showCompare ? "Cancel" : "Submit"}
              </Button>
            </Flex>

            <Flex
              justifyContent={"end"}
              padding={"24px"}
              width={"100%"}
              border={"1px solid #EAECF0"}
            >
              <Button
                backgroundColor={"#7F56D9"}
                color={"white"}
                onClick={submitToGitHb}
                disabled={submitting}
              >
                Create Pull Request
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex
          width="100%"
          gap={"32px"}
          paddingBottom={"100px"}
          overflow={"hidden"}
        >
          <Flex
            flexDirection={"column"}
            gap={"30px"}
            maxWidth={"1280px"}
            width="50%"
            paddingLeft={"40px"}
          >
            <Box
              paddingBottom={"30px"}
              width={"100%"}
              height={"100%"}
              borderRadius={"8px"}
              border={"1px solid #EAECF0"}
            >
              <Editor
                height="654px"
                width="100%"
                onChange={(value) => {
                  setInputCode(value ?? "");
                }}
                value={inputCode}
                defaultValue="// Paste code here"
                language="text"
              />
            </Box>
           
            <Flex
              justifyContent={"space-between"}
              padding={"24px"}
              width={"100%"}
              borderRadius={"8px"}
              border={"1px solid #EAECF0"}
            >
              <Flex>
                <Button
                  backgroundColor={"white"}
                  style={{
                    border: !inputCode
                      ? "1px solid #EAECF0"
                      : "1px solid #7F56D9",
                    color: !inputCode ? "#98A2B3" : "#7F56D9",
                  }}
                  onClick={clearAll}
                  disabled={loading}
                >
                  Clear All
                </Button>
              </Flex>
              <Button
                border={"1px solid #EAECF0"}
                disabled={!inputCode || loading}
                style={{
                  backgroundColor: !inputCode ? "#F2F4F7" : "#7F56D9",
                  color: !inputCode ? "#98A2B3" : "#F2F4F7",
                }}
                onClick={() => {
                  if (!inputCode) return;
                  if (showCompare) {
                    setShowCompare(false);
                  } else {
                    fixTheCode();
                  }
                }}
              >
                {loading ? (
                  <Flex
                    height="20px"
                    width="20px"
                    alignItems="center"
                    justifyContent="center"
                    alignContent={"center"}
                  >
                    <Spinner
                      thickness="2px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="black.500"
                    />
                  </Flex>
                ) : (
                  <>Submit</>
                )}
              </Button>
            </Flex>
          </Flex>
          <Box
            width="50%"
            height="100%"
            minHeight={"100vh"}
            background="linear-gradient(135deg, #B39FFF 0%, #6A1ED2 100%)"
          >
            {loading ? (
              <Flex
                mt={"50%"}
                width="100%"
                alignItems="center"
                justifyContent="center"
                alignContent={"center"}
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="black.500"
                  size="xl"
                />
              </Flex>
            ) : (
              <Flex
                gap={"40px"}
                paddingLeft={"34px"}
                flexDirection={"column"}
                paddingTop={"34px"}
                width={"100%"}
              >
                <Box
                  height={"130px"}
                  borderRadius="16px 0px 0px 16px"
                  paddingY={"32px"}
                  paddingLeft={"32px"}
                  background={"rgba(255, 255, 255, 0.50)"}
                >
                  <Flex gap={"24px"}>
                    <Box
                      rounded={"50%"}
                      backgroundColor={"white"}
                      display="flex"
                      width={"56px"}
                      height={"56px"}
                      alignItems="center"
                      padding={"14px"}
                      justifyContent="center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M23.3332 14H4.6665M4.6665 14L11.6665 21M4.6665 14L11.6665 7"
                          stroke="#7F56D9"
                          strokeWidth="2.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                    <Box>
                      <Flex flexDirection={"column"}>
                        <Text fontSize={"30px"} fontWeight={"bold"}>
                          Paste Your Code Here
                        </Text>
                        <Text>
                          FIXR identifies technical debt and provides actionable
                          insights.
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
                <Flex
                  overflowX="hidden"
                  borderTop={"8.2px solid"}
                  borderLeft={"8.2px solid"}
                  borderTopRadius={"12.5px"}
                >
                  <Image
                    src="https://s3-alpha-sig.figma.com/img/13af/247b/2b878258d83317e441ee599a93773d29?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TFHG1wdVGCdJMq~VFXAQXWWn86RB~r-S7NYs58Q4cMwvLoVle3aRlexG-mAePy2Mi5CdbilShEjbH9Au2z1ro-Tw29vLBwmxuzV2qQ1GXgMNYYUDw6NhWP9POx6LNuDKVL08pMNGHeuhEgaFhrwK53YTftB3PldoKxniGUfyoEJuaC3M7SLUPslgVXWdyGYIJHEKgP6d3Zdlm2aiOD0SpzBi1miVlRDfdbLKjQ0cdC~EDEy4pW3PjyCJPF9n0wzEE87zIgcMjlvn3nRpCtz74LpzBIfJ~Kd2XWGlYkfRAsdi6uMFaywI5WsCdNfXRNrvtY3-Yq9ogO-HgxFdi8BcrA__"
                    width="900px"
                    minWidth="900px"
                  />
                </Flex>
              </Flex>
            )}
          </Box>
        </Flex>
      )}
    </>
  );
};
export default CodeGen;
