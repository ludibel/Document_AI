import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Chroma } from 'langchain/vectorstores/chroma'
import makeChain from '@/utils/functions/makeChain'
import { BaseMessage, HumanMessage, AIMessage } from 'langchain/schema'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question, history } = req.body
  // gestion de l'historique en fonction du type de message (human ou ai)
  const histories: BaseMessage[] = []
  history.forEach((hist: { [x: string]: string }) => {
    if (hist['type'] === 'human') {
      const req: BaseMessage = new HumanMessage(question)
      histories.push(req)
    } else if (hist['type'] === 'ai') {
      const respond: BaseMessage = new AIMessage(question)
      histories.push(respond)
    }
  })

  // acceptation uniquement de la méthode POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'methode non autorisée' })
    return
  }
  // gestion de la question posée par l'utilisateur si elle est vide
  if (!question) {
    return res.status(400).json({ message: 'pas de question posée' })
  }

  const sanitizedQuestion = question.trim().replaceAll('\n', ' ')

  // création de la chaine
  try {
    const vectorStore = await Chroma.fromExistingCollection(
      new OpenAIEmbeddings(),
      {
        collectionName: req.body.fileName,
        url: 'http://docker_chromadb:8000',
      }
    )
    console.log(vectorStore)

    const chain = makeChain(vectorStore, histories)
    // poser la question à l'IA en utilisant le chain
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: histories || [],
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenu' })
  }
}
