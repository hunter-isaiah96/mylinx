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

export const headerItems = [
  {
    title: "Links",
    icon: "mdi-view-list-outline",
    to: "/admin",
  },
  {
    title: "Appearance",
    icon: "mdi-shape-outline",
    to: "/admin/appearance",
  },
  {
    title: "QR Code",
    icon: "mdi-qrcode",
    to: "/admin/qrcode",
  },
  // {
  //   title: "Analytics",
  //   icon: "mdi-chart-box-outline",
  //   to: "/admin/analytics",
  // },
  // {
  //   title: "Settings",
  //   icon: "mdi-octagon-outline",
  //   to: "/admin/settings",
  // },
]
