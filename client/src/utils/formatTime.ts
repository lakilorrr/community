export const formatTime = (time: string) => {
  return time.replace(/T/,' ').replace(/\.(\d{3})Z/, '')
}