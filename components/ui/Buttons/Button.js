import styles from './Button.module.css'

export default function Button({ label }) {
  return (
    <div>
      <button className={styles.button}>{label}</button>
    </div>
  )
}
