import { Dispatch, SetStateAction } from 'react'
import { ChromaClient } from 'chromadb'

export const getFilesListVector = async (
  setListVector: Dispatch<SetStateAction<string[]>>
) => {
  try {
    const chromadb = new ChromaClient({ path: 'http://docker_chromadb:8000' })
    const collections = await chromadb.listCollections()
    const sortedCollections = collections.sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    const collectionNames = sortedCollections.map(
      (collection) => collection.name
    )
    setListVector(collectionNames)
  } catch (error) {
    console.error(`Une erreur s'est produite :`, error)
  }
}
