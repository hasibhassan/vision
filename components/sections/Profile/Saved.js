import styles from './Saved.module.css'

export default function Saved({ userData }) {
  return (
    <div>
      <p className={styles.header}>Account Created At: {userData.createdAt}</p>
    </div>
  )
}
