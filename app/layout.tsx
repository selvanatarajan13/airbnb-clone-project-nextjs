import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'

import RegisterModal from './components/modals/RegisterModel'

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
				<ClientOnly>
					<RegisterModal />
					<Navbar />
				</ClientOnly>
				<div className="pb-20 pt-28">
					{children}
				</div>
			</body>
		</html>
	)
}
