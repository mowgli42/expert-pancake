import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Analytics } from '@/components/Analytics';

const dmSans = DM_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	display: 'swap',
	variable: '--font-dm-sans'
});

const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
	metadataBase: new URL(site),
	title: {
		default: 'EVMS Training | Earned Value Management (EVM) & EVMS Courses',
		template: '%s | EVMS Training'
	},
	description:
		'Interactive EVMS and earned value training: EVMS 101 (BAC, PV, EV, AC, SPI, CPI), twelve read-the-metrics cases, and ten project scenarios. Full curriculum is server-rendered; interactive paths load with JavaScript.',
	keywords: [
		'EVMS training',
		'earned value management',
		'EVM course',
		'EVMS 101',
		'SPI',
		'CPI',
		'BAC',
		'PV',
		'EV',
		'AC',
		'ANSI-748',
		'program management training'
	],
	authors: [{ name: 'EVMS Training' }],
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		locale: 'en_US',
		title: 'EVMS Training | Earned Value Management & EVMS',
		description:
			'EVMS 101, twelve metrics literacy drills, and ten hands-on scenarios. Server-rendered curriculum for accessibility and SEO.',
		siteName: 'EVMS Training'
	},
	twitter: {
		card: 'summary',
		title: 'EVMS Training | Earned Value Management & EVMS',
		description: 'Interactive EVMS / EVM lessons and scenarios.'
	},
	icons: {
		icon: '/favicon.svg'
	},
	alternates: { canonical: '/' },
	category: 'education'
};

export const viewport: Viewport = {
	themeColor: '#0d9488',
	width: 'device-width',
	initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={dmSans.variable}>
			<body className={`${dmSans.className} min-h-screen bg-surface-1 text-ink-1`}>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white focus:outline-none"
				>
					Skip to main content
				</a>
				<Analytics />
				{children}
			</body>
		</html>
	);
}
