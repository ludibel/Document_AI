// api pour supprimer un fichier dans les répertoires public/upload et public/embeddings
import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
// import types
import { Result } from '@/utils/types/resultApi'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const successResult: Result = {
    status: 200,
    resultBody: {
      status: 'ok',
      message: 'Le fichier a été supprimé avec succès.',
    },
  }
  const failureResult: Result = {
    status: 500,
    resultBody: {
      status: 'fail',
      message: `Une erreur s'est produite lors de la suppression du fichier.`,
    },
  }

  try {
    const { name } = req.body
    const directory = path.join(process.cwd(), '/public/upload/')
    const filePath = path.join(directory, name)
    const directoryEmbeddingFile = path.join(
      process.cwd(),
      '/public/embeddings/'
    )
    const filePathEmbeddingFile = path.join(directoryEmbeddingFile, name)

    // Promesses pour gérer les opérations de suppression de fichiers
    const unlinkPromise = (filePath: string) => {
      return new Promise<void>((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }

    // Suppression des fichiers en parallèle
    await Promise.all([
      unlinkPromise(filePath),
      unlinkPromise(filePathEmbeddingFile),
    ])

    // Renvoie une réponse réussie
    res.status(successResult.status).json(successResult.resultBody)
  } catch (error) {
    // Renvoie une réponse d'erreur
    res.status(failureResult.status).json(failureResult.resultBody)
  }
}

export default handler
