export default function getIdByURL(url: string) {
  const data = url.split('/');
  return data[data.length - 2];
}
