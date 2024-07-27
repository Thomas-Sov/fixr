import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { Check } from '../../components'

const Pricing = () => {
    return (
        <Box pt={10} pb={16} px={10}>
            <Flex flexDir={"column"} alignItems={"center"} gap={2}>
                <Text color={"gray.900"} fontSize={40}>
                    Simple, transparent pricing
                </Text>
                <Text color={"gray.400"} fontSize={16}>
                    We believe debt free code should be accessible to all companies, no matter the size.
                </Text>
            </Flex>
            <Flex flexDirection={'row'} justifyContent={'center'} alignContent={'center'} pt={10} >
                <SimpleGrid flexDirection={'row'} justifyContent={'center'} width={'60vw'} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card>
                        <CardHeader>
                            <Text pb={2}>Start-up Plan</Text>
                            <Heading size='md'>Free</Heading>
                        </CardHeader>
                        <CardBody >
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>1 Repository</Text>
                            </Flex>
                            <Flex flexDir={'row'} alignItems={'center'}>

                                <Check />
                                <Text ml={1} fontSize={14}>3 Contributors</Text>
                            </Flex>
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>Unlimited Hours</Text>
                            </Flex>
                        </CardBody>
                        <CardFooter flexDir={'column'} gap={2}>
                            <Button size={'sm'} bg={"purple.600"} color={'white'} width={'100%'}>Purchase</Button>
                            <Button size={'sm'} width={'100%'}>
                                <Link href='/codegen' color={"gray.800"} _hover={{ textDecoration: '' }}>
                                    Try it out
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Text pb={2}>Medium Plan</Text>
                            <Heading size='md'>$99 / month</Heading>
                        </CardHeader>
                        <CardBody >
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>5 Repositories</Text>
                            </Flex>
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>Unlimited Contributors</Text>
                            </Flex>
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>20 Hours</Text>
                            </Flex>
                        </CardBody>
                        <CardFooter flexDir={'column'} gap={2}>
                            <Button size={'sm'} bg={"purple.600"} color={'white'} width={'100%'}>Purchase</Button>
                            <Button size={'sm'} width={'100%'}>
                                <Link href='/codegen' color={"gray.800"} _hover={{ textDecoration: '' }}>
                                    Try it out
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Text pb={2}>Pro plan</Text>
                            <Heading size='md'>$2000 / month</Heading>
                        </CardHeader>
                        <CardBody >
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>Unlimited Repositories</Text>
                            </Flex>
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>Unlimited Contributors</Text>
                            </Flex>
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>2000 Hours</Text>
                            </Flex>
                        </CardBody>
                        <CardFooter flexDir={'column'} gap={2}>
                            <Button size={'sm'} bg={"purple.600"} color={'white'} width={'100%'}>Purchase</Button>
                            <Button size={'sm'} width={'100%'}>
                                <Link href='/codegen' color={"gray.800"} _hover={{ textDecoration: '' }}>
                                    Try it out
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Text pb={2}>Enterprise plan</Text>
                            <Heading size='md'>Contact us</Heading>
                        </CardHeader>
                        <CardBody >
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>Unlimited Repositories</Text>
                            </Flex>
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>Unlimited Contributors</Text>
                            </Flex>
                            <Flex flexDir={'row'} alignItems={'center'}>
                                <Check />
                                <Text ml={1} fontSize={14}>Unlimited Hours</Text>
                            </Flex>
                        </CardBody>
                        <CardFooter flexDir={'column'} gap={2}>
                            <Button size={'sm'} bg={"purple.600"} color={'white'} width={'100%'}>Purchase</Button>
                            <Button size={'sm'} width={'100%'}>
                                <Link href='/codegen' color={"gray.800"} _hover={{ textDecoration: '' }}>
                                    Try it out
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </SimpleGrid>
            </Flex>
        </Box >
    )
}

export default Pricing