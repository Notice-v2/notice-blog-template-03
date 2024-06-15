import { CreatedWithNotice } from '@/components/CreatedWithNotice'
import { Navbar } from '@/components/Navbar'
import { Providers } from '@/providers'
import { headers } from 'next/headers'
import { API, extractProjectID } from '../tools/api'

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const projectData = await getProjectData()
	const { hideCreatedWithNotice, accentColor } = projectData?.project || {}

	return (
		<html lang="en">
			<body>
				<Providers>
					<Navbar meta={projectData?.metadata} accentColor={accentColor} />
					{children}
					<CreatedWithNotice shouldHide={hideCreatedWithNotice} />
				</Providers>
			</body>
		</html>
	)
}

async function getProjectData() {
	const projectId = extractProjectID(headers(), { target: '0dfea954-92d0-4c9a-bc44-41800f0da317' })

	if (!projectId) return null

	try {
		const { data } = await API.get(`/projects/${projectId}`)
		return data
	} catch (_) {
		return null
	}
}
