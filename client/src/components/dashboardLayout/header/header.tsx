import { FC } from 'react'

import { GlobalLoader } from './globalLoader'
import Profile from './profile/profile'

const Header: FC = () => {
	return (
		<header>
			<GlobalLoader />
			<Profile />
		</header>
	)
}

export default Header
