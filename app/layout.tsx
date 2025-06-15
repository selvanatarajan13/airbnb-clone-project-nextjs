import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import { QueryClientProvider } from "@tanstack/react-query";

import RegisterModal from './components/modals/RegisterModel'
import { queryClient } from './libs/queryClient'

const noto = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb clone project',
  description: 'Airbnb clone project developed by NextJS',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

	return (
		<html lang="ja">
			<body className={noto.className}>
				<QueryClientProvider client={queryClient}>
					<ClientOnly>
						<RegisterModal />
						<Navbar />
					</ClientOnly>
					<div className="pb-20 pt-28">
						{children}
					</div>
				</QueryClientProvider>
			</body>
		</html>
	)
}
