import React, { useEffect, useState } from "react";
import Editor, { useMonaco, DiffEditor } from "@monaco-editor/react";
import { Container, Flex, Button, Box, Text, Image } from "@chakra-ui/react";
import { PageHeader } from "~/components/PageHeader";
const CodeGen = () => {
  const monaco = useMonaco();
  const [updatedCode, setUpdatedCode] = useState<string>("");
  const [inputCode, setInputCode] = useState<string>("asdasd");
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [filePath, setFilePath] = useState<string>("");
  const handleSetFilePath = (event: any) => {
    setFilePath(event.target.value);
  };
  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);
  const fixTheCode = async () => {
    try {
      const sonar = await fetch(
        "https://fixr-eslint-sonarlint-validation.onrender.com/fixr ",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ code: inputCode, file_path: filePath }),
        }
      );
      const codeFixer = await fetch(
        "https://code-analyzer.onrender.com/fix-code",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ code: inputCode }),
        }
      );
      const { eslint_formatted_results } = await sonar.json();
      const data = await codeFixer.json();
      console.log(eslint_formatted_results, 'eslint_formatted_results');
      if (eslint_formatted_results) {
        // send error to backend and then fix it
      } else {
        // call to backend to  improve the code
      }
      // https://code-analyzer.onrender.com/fix-code
      // set updated code , random function down here
      const jsonObject = await JSON.parse(data.cleanedCode.content[0].text);

      setUpdatedCode(jsonObject.code);
      setShowCompare(true);
    } catch (error) {
      // catch error
      console.log(error);
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
        >
          <DiffEditor
            original={inputCode}
            modified={updatedCode}
            height="70vh"
            language="javascript"
          />
          <Flex
            justifyContent={"space-between"}
            padding={"24px"}
            width={"50%"}
            border={"1px solid #EAECF0"}
          >
            <Flex>
              <Button>Clear All</Button>
              <input type="text" onChange={handleSetFilePath} />
            </Flex>
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
            gap={"50px"}
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
                height="624px"
                width="100%"
                onChange={(value) => {
                  setInputCode(value ?? "");
                }}
                value={inputCode}
                defaultValue="// Paste code here"
                language="javascript"
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
                      : "1px solid #7F56D9)",
                    color: !inputCode ? "#98A2B3" : "#7F56D9",
                  }}
                  onClick={clearAll}
                >
                  Clear All
                </Button>
                <input type="text" onChange={handleSetFilePath} />
              </Flex>
              <Button
                border={"1px solid #EAECF0"}
                disabled={!inputCode}
                style={{
                  backgroundColor: !inputCode ? "#F2F4F7" : "#7F56D9",
                  color: !inputCode ? "#98A2B3" : "#F2F4F7",
                }}
                onClick={() => {
                  if (showCompare) {
                    setShowCompare(false);
                  } else {
                    fixTheCode();
                  }
                }}
              >
                Submit
              </Button>
            </Flex>
          </Flex>
          <Box
            width="50%"
            height="100%"
            background="linear-gradient(135deg, #B39FFF 0%, #6A1ED2 100%)"
          >
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
          </Box>
        </Flex>
      )}
    </>
  );
};
export default CodeGen;
