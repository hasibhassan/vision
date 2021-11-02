import styles from './Portfolio.module.css'

export default function Portfolio({ userData }) {
  return (
    <div>
      <h1 className={styles.header}>Account Email is: {userData.user}</h1>
    </div>
  )
}
