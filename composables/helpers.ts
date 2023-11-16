export const readFile = (event: Event): Promise<string> => {
  const files = (event.target as HTMLInputElement)?.files

  if (!files || files.length === 0) {
    return Promise.reject("No files found in the event or files array is empty.")
  }

  const file = files[0] // Get the first file from the 'files' array

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result as string) // Resolving the Promise with the blob data
    }

    reader.onerror = () => {
      reject(reader.error) // Rejecting the Promise if there's an error
    }

    reader.readAsDataURL(file) // Read the file as a data URL (blob)
  })
}
