async function findAllUserInfo() {
  try {
    const response = await fetch('FrontTestingService-back/userInfo/findAll', {
      method: 'GET',
      credentials: 'include',
    })

    if (response.ok) {
      let data = await response.json()
      return data
    }
  } catch (error) {
    console.error(error)
  }
}

export { findAllUserInfo }
