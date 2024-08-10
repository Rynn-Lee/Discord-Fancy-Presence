import styles from "@styles/pages/faq.module.sass"

export default function FAQ(){
  return (
    <>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}> • Where do i get custom titles from?</legend>
        <div>
        We have a built-in list of apps registered on discord. Just search for the title you want and copy its Application ID.<br/>
        If you don&apos;t see the game you wanted, visit <a href="https://discord.com/developers/applications" target="_blank" className="link">Discord Dev Portal</a> and register your own title:
        <ul>
          <li>Log into your account</li>
          <li>Create a new application</li>
          <li>Give it a name, it will be shown in your discord activity</li>
          <li>Copy &quot;Application ID&quot;</li>
          <li>In the app select a game you want to see, go to &quot;Other&quot; tab</li>
          <li>Paste the ID</li>
        </ul>
      </div>
        
        <legend className={styles.legend}> • What is &quot;Events&quot; tab for?</legend>
        <div>
          For example, you can set your birthday date. When the day comes, a special activity will be displayed over the others
        </div>
        
        <legend className={styles.legend}> • How to choose an image?</legend>
        <div>
          It&apos;s better to use 1:1 ratio images for your status, otherwise it may stretch or not load at all. You may ignore the warning, but discord may not set your activity properly
        </div>
      </fieldset>
    </>
  )
}