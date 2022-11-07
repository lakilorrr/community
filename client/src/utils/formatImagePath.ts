export const formatImagePath = (path: string) => {
  const baseURL = 'http://localhost:999';
  return `${baseURL}/${path.substring(2)}`
}