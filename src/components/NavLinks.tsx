'use client'

import { MenuIcon } from '@/icons'
import { Box, IconButton } from '@chakra-ui/react'

export const NavLinks = () => {
	return (
		<Box display={{ base: 'block', md: 'none' }}>
			<IconButton
				isRound={true}
				variant="ghost"
				colorScheme="blue"
				aria-label="Search"
				icon={<MenuIcon size={20} color="gray" />}
			/>
		</Box>
	)
}
