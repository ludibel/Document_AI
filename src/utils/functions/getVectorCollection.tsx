import { Dispatch, SetStateAction } from 'react'
import { ChromaClient } from 'chromadb'

const getVectorCollection = async (
  name: string,
  setVector: Dispatch<SetStateAction<object | undefined>>
) => {
  const chromadb = new ChromaClient('http://docker_chromadb:8000')
  try {
    const vectorStore = await chromadb.getCollection({ name: name })
    console.log('vector', vectorStore)
    setVector(vectorStore)
  } catch (err) {
    console.log('err', err)
  }
}

export default getVectorCollection
