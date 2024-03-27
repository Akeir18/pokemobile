export default function getIdFromUrl(url: string): number {
  const urlArray = url.split('/');
  if (urlArray[urlArray.length - 1] !== '') {
    return parseInt(urlArray[urlArray.length - 1]);
  }
  return parseInt(urlArray[urlArray.length - 2]);
}
