'use client'

import { useSelectedTag } from '@/providers/selectedTagProvider'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { ArticleCard } from './ArticleCard'
import { TagsGroup } from './TagsGroup'

interface Props {
	pages: any[]
	accentColor?: string
}

export const ArticlesGrid = ({ pages, accentColor }: Props) => {
	const { selectedTag } = useSelectedTag()

	const ref = useRef(null)
	const isInView = useInView(ref)

	const tags: any = useMemo(() => pages.reduce((acc, page) => [...acc, ...(page?.tags ?? [])], []), [pages])

	const filteredArticles = useMemo(
		() =>
			selectedTag === 'All'
				? pages
				: pages.filter((page) => {
						return page?.tags?.includes(selectedTag)
				  }),
		[pages, selectedTag]
	)

	const container = {
		hidden: { opacity: isInView ? 1 : 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}

	return (
		<Box
			as={motion.div}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			boxSizing="border-box"
			mx="auto"
			mb="30px"
			w="100%"
			h="fit-content"
			layout
			layoutRoot
		>
			<Flex
				gap={{ base: '6px', md: '24px' }}
				direction={{ base: 'column', md: 'row' }}
				justify="space-between"
				align="center"
				bg={accentColor ?? 'blackAlpha.900'}
				px="16px"
				py="8px"
				mb="20px"
				minH="52px"
				borderRadius={{ base: 0, md: '4px' }}
			>
				<Box
					id="all-posts"
					flexShrink={0}
					fontWeight="bold"
					as="h1"
					fontSize={{ base: '2xl', lg: '3xl' }}
					color="white"
				>
					All posts
				</Box>
				<TagsGroup tags={tags} activeTag={selectedTag} accentColor={accentColor} />
			</Flex>
			<SimpleGrid
				ref={ref}
				as={motion.div}
				variants={container}
				initial={isInView ? 'show' : 'hidden'}
				whileInView="show"
				viewport={{ once: true }}
				gridAutoRows="1fr"
				columns={{ base: 1, sm: 2, md: 3 }}
				gap="46px"
				justifyContent="stretch"
			>
				{filteredArticles.map((page) => (
					<ArticleCard key={page._id} page={page} accentColor={accentColor} />
				))}
			</SimpleGrid>
		</Box>
	)
}
