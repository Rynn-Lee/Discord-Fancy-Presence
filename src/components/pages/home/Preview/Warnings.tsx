import Icons from '@/components/icons'

export default function Warnings({ styles, isSquare, appInfo }: any) {
  return (
    <div className={styles.warnings}>
      {!isSquare.small ? (
        <span>
          <Icons.ExclamationMark />
          [small image] It&apos;s better to use 1:1 ratio
        </span>
      ) : (
        <></>
      )}
      {!isSquare.large ? (
        <span>
          <Icons.ExclamationMark />
          [large image] It&apos;s better to use 1:1 ratio
        </span>
      ) : (
        <></>
      )}
      {!appInfo.largeImageKey && appInfo.smallImageKey ? (
        <span>
          <Icons.ExclamationMark />
          Missing a large image!
        </span>
      ) : (
        <></>
      )}
    </div>
  )
}
