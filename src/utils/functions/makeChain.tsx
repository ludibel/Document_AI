import { Chroma } from 'langchain/vectorstores/chroma'
import { ConversationalRetrievalQAChain } from 'langchain/chains'
import { BufferMemory, ChatMessageHistory } from 'langchain/memory'
import { BaseMessage } from 'langchain/schema'
import { ChatOpenAI } from 'langchain/chat_models/openai'

const makeChain = (vectorstore: Chroma, histories: BaseMessage[]) => {
  const model = new ChatOpenAI({
    temperature: 0.3,
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
    streaming: true,
  })
  const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up input, if it is a question rephrase it to be a standalone question.
  If it is not a question, just summarize the message.  Give a response in the same language as the question.

  Chat history:
  {chat_history}
  Follow up input: {question}
  Standalone input:
  Answer in Markdown format:
  `
  const QA_PROMPT_TEMPLATE = `You are a good assistant that answers question based on the document info you have. Use the following pieces of context to answer the question at the end.
  If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
  If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
  Give a response in the same language as the question.

  
  {context}
  
  Question: {question}
  Helpful answer in markdown:`

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      returnSourceDocuments: false,
      memory: new BufferMemory({
        memoryKey: 'chat_history',
        inputKey: 'question',
        outputKey: 'text',
        returnMessages: true,
        chatHistory: new ChatMessageHistory(histories),
      }),
      qaTemplate: QA_PROMPT_TEMPLATE,
      questionGeneratorChainOptions: { template: CONDENSE_QUESTION_TEMPLATE },
    }
  )
  return chain
}

export default makeChain
