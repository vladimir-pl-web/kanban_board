import clsx from 'clsx'
import Link from 'next/link'

import { IMenuItem } from './menu.interface'
import styles from './menuItem.module.scss'

export function MenuItem({ item }: { item: IMenuItem }) {
	return (
		<div>
			<Link href={item.link} className={clsx(styles.menuItem)}>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	)
}
