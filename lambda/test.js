module.exports.handler = async (event, context) => {
  console.log('context', context)
  const { identity, user } = context.clientContext
  const usersUrl = `${identity.url}/admin/users`
  const adminAuthHeader = 'Bearer ' + identity.token
  console.log('event', JSON.stringify(event))
  let data
  try {
    data = await fetch(usersUrl, {
      method: 'GET',
      headers: {
        Authorization: adminAuthHeader,
      },
    }).then((res) => res.json())
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e.message,
      }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
