export default async function auth() {
  try {
    const response = await fetch('/login?username=vasya&password=Terkin', {
      method: 'POST',
      credentials: 'include',
    })

    if (response.ok) {
      console.log(await response.json())
    } else {
      console.error('Ошибка авторизации')
    }
  } catch (error) {
    throw new Error(`Ошибка запроса: ${error}`)
  }
}
