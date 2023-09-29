const slugName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .replace(/_/g, '-')
}

export default slugName
