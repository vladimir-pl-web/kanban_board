import clsx from "clsx"
import { FC } from "react"
import styles from './sidebar.module.scss'
import Link from "next/link"
import { GanttChartSquare } from "lucide-react"
import { COLORS } from "@/constants/colors.constant"
import { LogoutBtn } from "./logout/logout"
import { MenuItem } from "./menu/menuItem"
import { MENU } from "./menu/menu.data"

const Sidebar:FC = ()=>{
    return<aside className={clsx(styles.sidebar)}>
        <div>
				<Link
					href='/'
					className={clsx(styles.link)}
				>
					<GanttChartSquare
						color={COLORS.primary}
						size={38}
					/>
					<span className={clsx(styles.timeManager)}>
						Time manager
						<span>
							Vladimir
						</span>
					</span>
				</Link>
				<div className={clsx(styles.menu)}>
					<LogoutBtn />
					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
				</div>
			</div>
			<footer className={clsx(styles.footer)}>
				2024 &copy; With love from{' '}
				<a
					href='https://www.linkedin.com/in/vladimirs-plotnikovs/'
					target='_blank'
					rel='noreferrer'
				>
					Vladimir
				</a>
				. <br /> All rights reserved.
			</footer>
        </aside>
}

export default Sidebar