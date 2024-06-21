import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

import styles from './dashboardLayout.module.scss'
import Header from './header/header'
import Sidebar from './sidebar/sidebar'

const DashboardLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div className={clsx(styles.dashboardLayout)}>
			<Sidebar />
			<main className={clsx(styles.mainDashboard)}>
				<Header />
				{children}
			</main>
		</div>
	)
}

export default DashboardLayout
