// import axios from 'axios'

// import { getUpdateUrl } from './get-update-url'

// export async function isUpdateAvailable(): Promise<boolean> {
export function isUpdateAvailable(): Promise<boolean> {
  const isNewVersionAvailable = false

  // try {
  //   const { data } = await axios(getUpdateUrl())
  //   isNewVersionAvailable = Boolean(data)
  // } catch {
  //   isNewVersionAvailable = false
  // }

  return Promise.resolve(isNewVersionAvailable)
}
