import Icons from '@/components/icons'

export default function Warnings({ styles, isSquare, appInfo }: any) {
  return (
    <div className={styles.warnings}>
      {!isSquare.small ? (
        <span>
          <Icons.exclamationMark />
          [small image] It&apos;s better to use 1:1 ratio
        </span>
      ) : (
        <></>
      )}
      {!isSquare.large ? (
        <span>
          <Icons.exclamationMark />
          [large image] It&apos;s better to use 1:1 ratio
        </span>
      ) : (
        <></>
      )}
      {!appInfo.largeImageKey && appInfo.smallImageKey ? (
        <span>
          <Icons.exclamationMark />
          Missing a large image!
        </span>
      ) : (
        <></>
      )}
    </div>
  )
}
