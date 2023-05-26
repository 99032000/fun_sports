export const hoursList = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
]
export const minsList = [0, 15, 30, 45]

export const StringtoTimestamp = (strDate: string) => {

  const dt = new Date(strDate).getTime();
  return dt / 1000;
}