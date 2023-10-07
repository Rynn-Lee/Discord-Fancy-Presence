import styles from '@styles/pages/about.module.sass'

export default function About() {
  return (
    <div className={styles.about}>
      <fieldset className={styles.fieldset}>
        <legend>App</legend>
        Fancy RPC - Alpha 0.0.1
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend>Devs</legend>
        <span>RynnLee - Front-end</span>
        <span>SketchPiece - Back-end</span>
      </fieldset>
    </div>
  )
}
