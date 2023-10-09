import { Dispatch, SetStateAction } from 'react'
import { ChromaClient } from 'chromadb'

const getVectorCollection = async (
  name: string,
  setVector: Dispatch<SetStateAction<object | undefined>>
) => {
  const chromadb = new ChromaClient('http://docker_chromadb:8000')
  try {
    const vectorStore = await chromadb.getCollection({ name: name })
    setVector(vectorStore)
  } catch (err) {
    alert(`Une erreur s'est produite lors de la récupération du vector store`)
  }
}

export default getVectorCollection
