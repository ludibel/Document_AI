// types pour les messages
export interface InputMessageProps {
  query: string
  setQuery: (input: string) => void
  sendMessage: (message: string) => void
  loading: boolean
}

export interface messageChatGPT {
  role: 'user' | 'system' | 'assistant'
  content: string
  language?: string
  fileName?: string
}
