import fs from 'node:fs/promises'

export async function getFileFromPath(path: string) {
  const file = await fs.readFile(path, 'utf8')
  return file
}

export async function deleteFileFromPath(path: string) {
  await fs.unlink(path)
}
