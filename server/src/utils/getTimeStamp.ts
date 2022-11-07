export const getTimeStamp = (time: string) => {
  const [numStr, unit] = time.split(/(d|h)$/);
  const unitMs = unit === 'h' ? 60 * 60 : unit === 'd' ? 60 * 24 : 1;
  const stamp = 1000 * unitMs * +numStr;
  return stamp;
};
