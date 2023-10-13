export const getMeta = async (url: string) => {
  const img = new Image();
  img.src = url;
  await img.decode().catch((err)=>{return false});
  if(img.naturalWidth == img.naturalHeight){return true}
  return false
};
