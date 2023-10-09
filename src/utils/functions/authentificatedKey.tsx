// fonction pour authentifier la clé OpenAI
//import types
import { Result } from '@/utils/types/resultApi'

export const authentificatedKey = async (openAIKey: string | undefined) => {
  const result: Result = {
    status: 200,
    resultBody: {
      status: 'ok',
      message: 'ok',
    },
  }
  try {
    // vérification d'authentification de la clé openAI avec API OpenAI
    const response = await fetch('https://api.openai.com/v1/engines', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${openAIKey}`,
      },
    })

    if (!response.ok) {
      result.status = 401
      result.resultBody = {
        status: 'fail',
        message: 'Clé OpenAI invalide',
      }
      return result
    }
    if (response.ok) {
      result.status = 200
      result.resultBody = {
        status: 'ok',
        message: 'Clé OpenAI valide',
      }
      return result
    }
  } catch (error) {
    result.status = 500
    result.resultBody = {
      status: 'fail',
      message: `Erreur lors de la vérification de la clé`,
    }
    return result
  }
}
