import styles from './main.module.scss'
import clsx from "clsx"

export default function Home() {
  return (
    <main className={clsx(styles.main)}>
      <h1 className='text-white'>Hello world</h1>
      
    </main>
  );
}
