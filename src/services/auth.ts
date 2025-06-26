export default async function auth() {
  try {
    const response = await fetch('/FrontTestingService-auth/login?username=vasya&password=Terkin', {
      method: 'POST',
      credentials: 'include',
    })

    if (response.ok) {
      console.log(await response.json())
    }
  } catch (error) {
    console.error(error)
  }
}
