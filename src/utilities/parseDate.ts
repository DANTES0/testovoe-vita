export default function parseDate(date: string) {
  const newDate = new Date(date)
  return newDate.toLocaleString('ru-RU').split(',')[0]
}
