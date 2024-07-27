import Editor, { DiffEditor, useMonaco } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';

interface GitHub {
  owner: string;
  repo: string;
  branch: string;
  filePath: string;
}

const CodeGen: React.FC = () => {
  const monaco = useMonaco();
  const [updatedCode, setUpdatedCode] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [commitMessage, setCommitMessage] = useState<string>('');
  const [filePath, setFilePath] = useState<string>('');
  const [github, setGithub] = useState<GitHub | null>(null);

  useEffect(() => {
    if (monaco) {
      console.log('Monaco instance:', monaco);
    }
  }, [monaco]);

  const generateRandomText = (length = 4): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  };

  const fixTheCode = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('https://fixr-code-1ffp.onrender.com/fix-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: inputCode, file_path: filePath }),
      });

      const { eslint_formatted_results, fixed_code } = await response.json();
      setCommitMessage(eslint_formatted_results);
      setUpdatedCode(fixed_code.replace(/^\{\s*"code":\s*/, '').replace(/\s*}$/, ''));
      setShowCompare(true);
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const parseGitHubUrl = (url: string): GitHub => {
    const regex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/;
    const match = url.match(regex);

    if (match) {
      return {
        owner: match[1],
        repo: match[2],
        branch: match[3],
        filePath: match[4],
      };
    } else {
      throw new Error('Invalid GitHub URL');
    }
  };

  const getCode = async (): Promise<void> => {
    try {
      const parsedGithub = parseGitHubUrl(filePath);
      setGithub(parsedGithub);
      const response = await fetch('https://fixr-code-1ffp.onrender.com/read-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: parsedGithub.owner,
          repo: parsedGithub.repo,
          filePath: parsedGithub.filePath,
          githubToken: process.env.NEXT_PUBLIC_AB_GITHUB_AUTH_TOKEN,
        }),
      });
      const { content } = await response.json();
      setInputCode(content);
    } catch (error) {
      alert('Enter valid GitHub URL');
    }
  };

  useEffect(() => {
    if (filePath && !showCompare) {
      getCode();
    } else if (filePath) {
      const parsedGithub = parseGitHubUrl(filePath);
      setGithub(parsedGithub);
    }
  }, [filePath, showCompare]);

  const submitToGitHub = async (): Promise<void> => {
    if (!github?.filePath) return;
    try {
      setSubmitting(true);
      await fetch('https://fixr-code-1ffp.onrender.com/pull-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codeChanges: [{ filePath: github.filePath, content: updatedCode }],
          commitMessage: `Automated code change updates from FIXR, error found: ${commitMessage}`,
          githubToken: process.env.NEXT_PUBLIC_AB_GITHUB_AUTH_TOKEN,
          owner: github.owner,
          repo: github.repo,
          baseBranch: 'main',
          featureBranch: `automated-changed-pr/${github.filePath}${generateRandomText(4)}`,
        }),
      });
    } catch (error) {
      alert(error);
    } finally {
      setSubmitting(false);
    }
  };

  const clearAll = (): void => {
    setInputCode('');
    setUpdatedCode('');
    setFilePath('');
    setShowCompare(false);
  };

  return (
    <>
      <Flex
        flexDirection='column'
        width='50%'
        maxWidth='1280px'
        background='white'
        px='40px'
        mb={3}
      >
        <Text pb={2}>File path</Text>
        <Input
          onChange={(event) => setFilePath(event.target.value)}
          width='100%'
          value={filePath}
          placeholder={showCompare ? 'Enter Your Github URL to make a PR' : 'Enter the github url to a file you want to analyse'}
        />
      </Flex>
      {showCompare ? (
        <Flex
          flexDirection='column'
          minHeight='100vh'
          width='100%'
          gap='32px'
          paddingBottom='100px'
          overflow='hidden'
          px='40px'
        >
          <Box position='relative'>
            <DiffEditor
              original={inputCode}
              modified={updatedCode}
              height='70vh'
              language='text'
            />
          </Box>
          <Flex gap='64px' mt={30}>
            <Flex
              justifyContent='end'
              padding='24px'
              width='100%'
              border='1px solid #EAECF0'
            >
              <Button
                backgroundColor='#F2F4F7'
                onClick={() => setShowCompare(false)}
              >
                Cancel
              </Button>
            </Flex>
            <Flex
              justifyContent='end'
              padding='24px'
              width='100%'
              border='1px solid #EAECF0'
            >
              <Button
                backgroundColor='#7F56D9'
                color='white'
                onClick={submitToGitHub}
                disabled={!github?.repo}
              >
                {submitting ? (
                  <Spinner
                    thickness='2px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='black.500'
                    size='sm'
                  />
                ) : (
                  'Create Pull Request'
                )}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex
          width='100%'
          gap='32px'
          paddingBottom='100px'
          overflow='hidden'
        >
          <Flex
            flexDirection='column'
            gap='30px'
            maxWidth='1280px'
            width='50%'
            paddingLeft='40px'
          >
            <Box
              paddingBottom='30px'
              width='100%'
              height='100%'
              borderRadius='8px'
              border='1px solid #EAECF0'
            >
              <Editor
                height='654px'
                width='100%'
                onChange={(value) => setInputCode(value ?? '')}
                value={inputCode}
                defaultValue='// Paste code here'
                language='text'
              />
            </Box>
            <Flex
              justifyContent='space-between'
              padding='24px'
              width='100%'
              borderRadius='8px'
              border='1px solid #EAECF0'
            >
              <Button
                backgroundColor='white'
                border={inputCode ? '1px solid #7F56D9' : '1px solid #EAECF0'}
                color={inputCode ? '#7F56D9' : '#98A2B3'}
                onClick={clearAll}
                disabled={loading}
              >
                Clear All
              </Button>
              <Button
                backgroundColor={inputCode ? '#7F56D9' : '#F2F4F7'}
                color={inputCode ? '#F2F4F7' : '#98A2B3'}
                disabled={!inputCode || loading}
                onClick={fixTheCode}
              >
                {loading ? (
                  <Spinner
                    thickness='2px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='black.500'
                    size='sm'
                  />
                ) : (
                  'Submit'
                )}
              </Button>
            </Flex>
          </Flex>
          <Box
            width='50%'
            height='100%'
            minHeight='100vh'
            background='linear-gradient(135deg, #B39FFF 0%, #6A1ED2 100%)'
          >
            {loading ? (
              <Flex
                mt='50%'
                width='100%'
                alignItems='center'
                justifyContent='center'
              >
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='black.500'
                  size='xl'
                />
              </Flex>
            ) : (
              <Flex
                gap='40px'
                paddingLeft='34px'
                flexDirection='column'
                paddingTop='34px'
                width='100%'
              >
                <Box
                  height='130px'
                  borderRadius='16px 0px 0px 16px'
                  paddingY='32px'
                  paddingLeft='32px'
                  background='rgba(255, 255, 255, 0.50)'
                >
                  <Flex gap='24px'>
                    <Box
                      rounded='50%'
                      backgroundColor='white'
                      display='flex'
                      width='56px'
                      height='56px'
                      alignItems='center'
                      padding='14px'
                      justifyContent='center'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='28'
                        height='28'
                        viewBox='0 0 28 28'
                        fill='none'
                      >
                        <path
                          d='M23.3332 14H4.6665M4.6665 14L11.6665 21M4.6665 14L11.6665 7'
                          stroke='#7F56D9'
                          strokeWidth='2.33333'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </Box>
                    <Box>
                      <Text fontSize='30px' fontWeight='bold'>
                        Paste Your Code Here
                      </Text>
                      <Text>
                        FIXR identifies technical debt and provides actionable
                        insights.
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <Flex
                  overflowX='hidden'
                  borderTop='8.2px solid'
                  borderLeft='8.2px solid'
                  borderTopRadius='12.5px'
                >
                  <Image
                    src='https://s3-alpha-sig.figma.com/img/13af/247b/2b878258d83317e441ee599a93773d29?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TFHG1wdVGCdJMq~VFXAQXWWn86RB~r-S7NYs58Q4cMwvLoVle3aRlexG-mAePy2Mi5CdbilShEjbH9Au2z1ro-Tw29vLBwmxuzV2qQ1GXgMNYYUDw6NhWP9POx6LNuDKVL08pMNGHeuhEgaFhrwK53YTftB3PldoKxniGUfyoEJuaC3M7SLUPslgVXWdyGYIJHEKgP6d3Zdlm2aiOD0SpzBi1miVlRDfdbLKjQ0cdC~EDEy4pW3PjyCJPF9n0wzEE87zIgcMjlvn3nRpCtz74LpzBIfJ~Kd2XWGlYkfRAsdi6uMFaywI5WsCdNfXRNrvtY3-Yq9ogO-HgxFdi8BcrA__'
                    width='900px'
                    minWidth='900px'
                    alt='Code example'
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