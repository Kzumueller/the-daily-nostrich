/** returns a timestamp representing the start of today in the current timezone */
export const getStartDate = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return now.getTime() / 1e3
}