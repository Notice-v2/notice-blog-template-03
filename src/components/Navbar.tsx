'use client'

import { Flex, Heading } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMemo } from 'react'
import { Logo } from './Logo'

interface Props {
	meta: any
	accentColor?: string
}

export const Navbar = ({ meta, accentColor }: Props) => {
	const title = useMemo(
		() =>
			meta?.find((m: any) => m.tagName === 'meta' && m.attributes?.property === 'og:site_name')?.attributes?.content,
		[meta]
	)
	const icon = useMemo(
		() => meta?.find((m: any) => m.tagName === 'link' && m.attributes?.rel === 'icon')?.attributes?.href,
		[meta]
	)

	return (
		<Flex
			align="center"
			w="100%"
			mx="auto"
			maxW="1080px"
			px={4}
			minH="52px"
			gap={'6px'}
			my={{ base: 0, md: 4 }}
			bg={'transparent'}
			color="white"
			bgColor={accentColor ?? 'blackAlpha.900'}
			borderRadius={{ base: 0, md: '4px' }}
			as={motion.nav}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
			<Flex as={Link} href="/" gap={2} align="center" justify="start">
				{icon && <Logo src={icon} />}
				<Heading
					fontWeight="700"
					noOfLines={1}
					lineHeight={{ base: '3.5rem', md: '3.6rem' }}
					color="white"
					as="h4"
					fontSize={'xl'}
				>
					{title}
				</Heading>
			</Flex>
		</Flex>
	)
}
