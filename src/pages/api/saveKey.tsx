// api pour enregistrer et authentifier la clé open AI dans le fichier .env
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
// import fonction pour authentifier la clé OpenAI
import { authentificatedKey } from '@/utils/functions/authentificatedKey'
// import types
import { Result } from '@/utils/types/resultApi'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result: Result = {
    status: 200,
    resultBody: {
      status: 'ok',
      message: 'ok',
    },
  }
  const { openAIKey } = req.body
  // enregistrer la clé dans le fichier .env
  try {
    // vérification d'authentification de la clé openAI avec API OpenAI
    const response = await authentificatedKey(openAIKey)
    if (response) {
      if (response.resultBody.status === 'fail') {
        res.status(response.status).json(response.resultBody)
      }
      if (response.resultBody.status === 'ok') {
        await fs.promises.writeFile('.env', `OPENAI_API_KEY=${openAIKey}`)
        result.status = 200
        result.resultBody = {
          status: 'ok',
          message: 'Clé a été enregistrée avec succès !',
        }
        res.status(result.status).json(result.resultBody)
      }
    }
    if (!response) {
      result.status = 500
      result.resultBody = {
        status: 'fail',
        message: `Erreur lors de l'enregistrement de la clé`,
      }
      res.status(result.status).json(result.resultBody)
    }
  } catch (e) {
    console.error(e)
    result.status = 500
    result.resultBody = {
      status: 'fail',
      message: `Erreur lors de l'enregistrement de la clé`,
    }
    res.status(result.status).json(result.resultBody)
  }
}

export default handler
