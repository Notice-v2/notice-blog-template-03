'use client'

import { Box } from '@chakra-ui/react'
import { useMemo } from 'react'
import { ArticlesGrid } from './ArticlesGrid'
import { BlogHero } from './BlogHero'

interface Props {
	data: any
}

export const HomeComponents = ({ data }: Props) => {
	const heroElements = useMemo(() => (data?.pages.length >= 3 ? data?.pages.slice(0, 3) : data?.pages.slice(0, 1)), [])
	const mainArticles = useMemo(() => (data?.pages.length >= 3 ? data?.pages.slice(3) : data?.pages), [])
	return (
		<Box w="100%">
			<Box mx="auto" maxW="1080px">
				{data?.pages.length >= 3 && (
					<Box mt="10px" as="section">
						<BlogHero pages={heroElements} />
					</Box>
				)}
				<Box mt={{ base: '20px', lg: data?.pages?.length > 3 ? '20px' : '20px' }} as="section">
					<ArticlesGrid accentColor={data?.project?.accentColor} pages={mainArticles} />
				</Box>
			</Box>
		</Box>
	)
}
