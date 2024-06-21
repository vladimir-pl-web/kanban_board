import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './config/pages-url.config'
import { ETokens } from './services/authTokens.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request

	const refreshToken = cookies.get(ETokens.REFRESH_TOKEN)?.value

	const isDashboard = url.includes('/dashboard')
	const isAuth = url.includes('/auth')

	if (isAuth && refreshToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
	}
	if (isAuth) {
		return NextResponse.next()
	}
	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth', url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/path']
}
