'use client'

import clsx from 'clsx'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './settings.module.scss'
import { Button } from '@/components/ui/button/button'
import { Field } from '@/components/ui/fields/field'
import { Heading } from '@/components/ui/heading/heading'
import { useInitData } from '@/hooks/useInitData'
import { useUpdateSettings } from '@/hooks/useUpdateSettings'
import { TypeUserForm } from '@/types/auth.types'
import { emailValidation } from '@/utils/email'

const Settings: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitData(reset)
	const { mutate, isPending } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data
		mutate({
			...rest,
			password: password || undefined
		})
	}

	return (
		<div className={clsx(styles.wrapper)}>
			<Heading title='Settings' />
			<form className={clsx(styles.form)} onSubmit={handleSubmit(onSubmit)}>
				<div className={clsx(styles.settings)}>
					<div>
						<Field
							id='email'
							label='Email: '
							placeholder='Enter email: '
							type='email'
							{...register('email', {
								pattern: {
									value: emailValidation,
									message: 'Please enter a valid email'
								}
							})}
							extra='mb-4'
						/>

						<Field
							id='name'
							label='Name: '
							placeholder='Enter name: '
							{...register('name')}
							extra='mb-4'
						/>

						<Field
							id='password'
							label='Password'
							placeholder='Enter Password'
							extra='mb-10'
							error={errors.password}
							{...register('password', {
								minLength: {
									value: 6,
									message: 'Password must be at least 5 characters'
								}
							})}
						/>
					</div>

					<div>
						<Field
							id='workInterval'
							label='Work interval (min.): '
							placeholder='Enter work interval (min.): '
							isNumber
							{...register('workInterval', {
								valueAsNumber: true
							})}
							extra='mb-4'
						/>

						<Field
							id='breakInterval'
							label='Break interval (min.): '
							placeholder='Enter break interval (min.): '
							isNumber
							{...register('breakInterval', {
								valueAsNumber: true
							})}
							extra='mb-4'
						/>

						<Field
							id='intervalsCount'
							label='Intervals count (max 10): '
							placeholder='Enter intervals count (max 10): '
							isNumber
							{...register('intervalCount', {
								valueAsNumber: true
							})}
							extra='mb-6'
						/>
					</div>
				</div>
				<Button type='submit' disabled={isPending}>
					Save
				</Button>
			</form>
		</div>
	)
}

export default Settings
