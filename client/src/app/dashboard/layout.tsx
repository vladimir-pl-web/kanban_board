import { PropsWithChildren } from 'react'

import DashboardLayout from '@/components/dashboardLayout/dashboardLayout'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <DashboardLayout>{children}</DashboardLayout>
}
