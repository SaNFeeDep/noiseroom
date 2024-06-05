export const getWeekNumber = (time: Date) => {
  const date = new Date(time.getTime())
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))

  const firstWeek = new Date(date.getFullYear(), 0, 4)
  const firstWeekTime = (date.getTime() - firstWeek.getTime()) / 86400000
  const weeks = (firstWeek.getDay() + 6) % 7

  return 1 + Math.round((firstWeekTime - 3 + weeks) / 7)
}
