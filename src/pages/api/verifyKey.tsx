// API pour vérifier que la clé  OPENAI est bien renseignée dans le fichier .env
import { NextApiRequest, NextApiResponse } from 'next'
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
  try {
    const openAIKey = process.env.OPENAI_API_KEY
    // on vérifie que la la clé existe dans .env
    if (!openAIKey) {
      result.status = 401
      result.resultBody = {
        status: 'fail',
        message: `La clé OPEN AI n'est pas renseignée`,
      }
      res.status(result.status).json(result.resultBody)
      return
    }
    // si elle existe on vérifie qu'elle est valide
    if (openAIKey) {
      // vérification d'authentification de la clé openAI avec API OpenAI
      const response = await authentificatedKey(openAIKey)
      if (response) {
        res.status(response.status).json(response.resultBody)
      } else {
        result.status = 500
        result.resultBody = {
          status: 'fail',
          message: `Erreur lors de la vérification de la clé`,
        }
        res.status(result.status).json(result.resultBody)
      }
    }
  } catch (error) {
    result.status = 500
    result.resultBody = {
      status: 'fail',
      message: `Erreur lors de la vérification de la clé`,
    }
    res.status(result.status).json(result.resultBody)
  }
}
export default handler
