import styles from './Button.module.css'

export default function Button({ label, onClick }) {
  return (
    <div>
      <button className={styles.button} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}
