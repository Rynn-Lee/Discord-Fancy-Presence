import styles from '@styles/pages/about.module.sass'

export default function About() {
  return (
    <div className={styles.about}>
      <fieldset className={styles.fieldset}>
        <legend>Fancy DRPC (Discord Rich Presence)</legend>
          Alpha 0.0.1
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend>Devs</legend>
        <span>RynnLee - SketchPiece</span>
      </fieldset>
    </div>
  )
}
