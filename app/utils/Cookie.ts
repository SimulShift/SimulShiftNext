/**
 * Gets the cookie with the given name
 * @param {string} name - The name of the cookie to get
 * @returns {string} The cookie string in the format string=jsonString
 */
export const getCookie = (name: string) => {
  const cookies = decodeURIComponent(document.cookie)
  const cookieVal = cookies.split('; ').find(row => row.startsWith(name))
  if (!cookieVal) throw new Error(`No cookie named ${name} found`)
  return cookieVal
}

/**
 * Converts a cookie string to a json object
 * Cookie is in the format string=jsonString
 * @param {string} cookie - The cookie string to convert
 */
export const cookieToJson = (cookie: string) => {
  const json = JSON.parse(cookie?.split('=')[1] || '{}')
  console.log('cookie json', json)
  if (!json) throw new Error('No json found in cookie')
  return json
}
