import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Logo } from '.'

const PageFooter = () => {
    return (
        <Flex flexDir={"row"} alignItems={"center"} justifyContent={'space-between'} width={'100%'} pt={24} pb={5}>
            <Flex flexDir={'column'} alignItems={'left'} width={'100%'} gap={1}>
                <Logo />
            </Flex>
            <Flex flexDir={'column'} alignItems={'end'} width={'100%'} gap={3}>
                <Text color={'gray.500'}>Your AI Partner for Clean Code and</Text>
                <Text color={'gray.500'}>Sustainable Software Quality</Text>
            </Flex>
        </Flex>
    )
}

export default PageFooter