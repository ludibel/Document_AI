import type { NextApiRequest, NextApiResponse } from 'next'
// import langchain
import { Chroma } from 'langchain/vectorstores/chroma'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
// import types
import { Result } from '../../utils/types/resultApi'

// types
interface DocumentLoaderType {
  pageContent: string | string[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const successResult: Result = {
    status: 200,
    resultBody: {
      status: 'ok',
      message: 'Le fichier a bien été vectorisé',
    },
  }
  const failureResult: Result = {
    status: 500,
    resultBody: {
      status: 'fail',
      message: `Une erreur s'est produite lors de la vectorisation du fichier.`,
    },
  }

  // on récupere le document loadé
  const documentLoader = req.body
  const name = documentLoader.fileName.split('.')[0]
  // fonction permettant de concatener le document
  const concatDocuments = (docs: DocumentLoaderType[]): string[] => {
    return docs.map((doc) => {
      if (typeof doc.pageContent === 'string') {
        return doc.pageContent
      } else if (Array.isArray(doc.pageContent)) {
        return doc.pageContent.join('\n')
      }
      return '' // Ajout d'un retour par défaut pour les autres cas
    })
  }
  const documents = concatDocuments(documentLoader.document)
  // creation du vector store
  // on separe le document en chunk de 1000 caracteres
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  })

  const splitDocuments = await splitter.createDocuments(documents)

  try {
    // on crée le vector store avec chroma
    await Chroma.fromDocuments(splitDocuments, new OpenAIEmbeddings(), {
      collectionName: name,
      url: 'http://docker_chromadb:8000',
    })
    // on renvoie une reponse reussite
    res.status(successResult.status).json(successResult.resultBody)
  } catch (error) {
    // on renvoie une reponse d'erreur
    res.status(failureResult.status).json(failureResult.resultBody)
  }
}

export default handler
