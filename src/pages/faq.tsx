import styles from "@styles/pages/faq.module.sass"

export default function FAQ(){
  return (
    <>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}> • Where do i get Custom Titles from?</legend>
        <div>
        We don&apos;t store the full app list on your pc to remain the app lightweight and blazingly fast, so there are two options
        <ul>
          <li>Visit <a href="https://github.com/Rynn-Lee/Discrod-ClientID-Library/blob/main/games.json" target="_blank" className="link">My Github Repository</a> and choose any title you want</li>
          <li>Visit <a href="https://discord.com/developers/applications" target="_blank" className="link">Discord Dev Portal</a> and register your own title</li>
        </ul>
      </div>
        
        <legend className={styles.legend}> • What "Events" do?</legend>
        <div>
          For example, you can set your birthday date. When the day comes, a special activity will be displayed over the others
        </div>
        
        <legend className={styles.legend}> • How to choose an image?</legend>
        <div>
          You shold use a 1:1 ratio images for your status, otherwise you will get a warning message that your image is not 1:1. You may ignore the warning, but discord might not set your activity properly
        </div>
      </fieldset>
    </>
  )
}