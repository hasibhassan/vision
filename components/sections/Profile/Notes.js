import styles from './Notes.module.css'

export default function Notes({ userData }) {
  return (
    <div>
      <h1 className={styles.header}>Email is: {userData.user}</h1>
    </div>
  )
}
