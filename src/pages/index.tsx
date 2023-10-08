export default function Home({settings}: any) {
  if(!settings.clientId){
    return(
      <>
        You need to specify Cliend ID first! Go to &apos;Settings&apos; tab
      </>
    )
  }
  return (
    <>
      Display Settings
    </>
  )
}
