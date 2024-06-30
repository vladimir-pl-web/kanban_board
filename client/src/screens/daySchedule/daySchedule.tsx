'use client'

import { Heading } from "@/components/ui/heading/heading"
import { FC } from "react"
import styles from './daySchedule.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { TimeBlockingList } from "@/components/timeBlocks/blockList/blockList"
import { TimeBlockingForm } from "@/components/timeBlocks/form/timeBlocksForm"
import { TypeTimeBlockFormState } from "@/types/time-block.types"


const DaySchedule:FC = ()=>{
    const methods = useForm<TypeTimeBlockFormState>()
    return<div className={styles.wrapper}>
        <Heading title='Day Schedule' />
        <FormProvider {...methods}>
			<div className={styles.content}>
				<TimeBlockingList />
				<TimeBlockingForm />
			</div>
		</FormProvider>

    </div>
}

export default DaySchedule