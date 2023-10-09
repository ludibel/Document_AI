import React, { useRef, useState, useContext, useEffect } from 'react'
// import langchain
import { BaseMessage, HumanMessage, AIMessage } from 'langchain/schema'
// import components
import ListMessageChat from '@/components/ChatBox/ListMessages'
// import Styled
import {
  StyledBox,
  StyledBoxList,
  StyledGridBox,
  StyledGridMessage,
  StyledList,
  StyledTextField,
  StyledGridInput,
  StyledBoxEmpty,
} from './StyledChatBox'
// import mui
import { Grid, InputAdornment, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
// import types
import { InputMessageProps } from '@/utils/types/messages'
import { messageChatGPT } from '@/utils/types/messages'
// import context
import FileContext, { FileContextProps } from '@/utils/context/fileContext'

const InputMessage = ({
  query,
  setQuery,
  sendMessage,
  loading,
}: InputMessageProps) => {
  return (
    <StyledGridInput item xs={12}>
      <StyledTextField
        variant="outlined"
        required
        fullWidth
        name="input"
        aria-label="chat input"
        placeholder={
          loading
            ? 'En attente de la réponse...'
            : 'Que souhaitez-vous savoir sur ce document ?'
        }
        value={query}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage(query)
            setQuery('')
          }
        }}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  sendMessage(query)
                  setQuery('')
                }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </StyledGridInput>
  )
}
const ChatBox = () => {
  const ref = useRef<HTMLInputElement>(null)
  const [fileNameHistory, setFileNameHistory] = useState<string | undefined>(
    undefined
  )
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { selectValue, fileName } = useContext(FileContext) as FileContextProps
  // permet d'ajouter le nom du fichier dans l'historique des messages
  interface BaseMessageWithName extends BaseMessage {
    name: string
  }
  // state initiale pour les messages
  const [messageState, setMessageState] = useState<{
    messages: messageChatGPT[]
    history: BaseMessageWithName[]
  }>({
    messages: [
      {
        content: 'Que souhaitez-vous savoir sur ce document ?',
        role: 'assistant',
      },
    ],
    // history doit contenir le nom du fichier
    history: [],
  })
  const { messages, history } = messageState

  // gestion du scrool sur la liste des messages
  useEffect(() => {
    const scrollToBottom = () => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight
      }
    }
    scrollToBottom()
  }, [messages])
  // Mise à jour de  fileNameHistory lorsque history change
  useEffect(() => {
    if (history.length > 0) {
      setFileNameHistory(history[history.length - 1].name)
    }
  }, [history])

  // gestion de l'historique en fonction du nom du fichier
  useEffect(() => {
    if (fileNameHistory !== fileName) {
      setMessageState((state) => ({
        ...state,
        messages: [
          {
            content: 'Que souhaitez-vous savoir sur ce document ?',
            role: 'assistant',
          },
        ],
        history: [],
      }))
    }
  }, [fileName, fileNameHistory])
  // state message si pas de fichier selectionné
  useEffect(() => {
    if (!selectValue) {
      setMessageState((state) => ({
        ...state,
        messages: [
          {
            content: 'Merci de sélectionner un fichier',
            role: 'assistant',
          },
        ],
        history: [],
      }))
    }
  }, [selectValue])

  const sendMessage = async (query: string) => {
    // Vérifier si un fichier est sélectionné
    if (!selectValue) {
      setMessageState((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            role: 'assistant',
            content: 'Merci de sélectionner un fichier',
          } as messageChatGPT,
        ],
      }))
      return
    }

    // Vérifier si la question est vide
    if (!query) {
      setMessageState((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            role: 'assistant',
            content: 'Merci de poser une question',
          } as messageChatGPT,
        ],
      }))
      return
    }

    // Traiter la question
    const question = query.trim()

    // Ajouter la question de l'utilisateur aux messages
    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          role: 'user',
          content: question,
        } as messageChatGPT,
      ],
    }))

    setLoading(true)
    setQuery('')

    try {
      // Envoyer la question en POST à l'API /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
          fileName,
        }),
      })
      const data = await response.json()

      // Créer des objets de message
      const req: BaseMessage = new HumanMessage(question)
      const respond: BaseMessage = new AIMessage(data.text)

      if (data.error) {
        // Ajouter la réponse de l'assistant aux messages
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              role: 'assistant',
              content:
                'Un problème est survenu je ne peux pas répondre à votre question',
            } as messageChatGPT,
          ],
        }))
      } else {
        // Ajouter la réponse de l'assistant aux messages
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              role: 'assistant',
              content: data.text,
            } as messageChatGPT,
          ],
          history: [
            ...state.history,
            req,
            respond,
            { name: fileName },
          ] as BaseMessageWithName[],
        }))
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <StyledBox elevation={3}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ overflow: 'hidden' }}
      >
        <StyledGridBox item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
          >
            <StyledGridMessage item xs={12}>
              <StyledBoxList ref={ref}>
                <StyledList>
                  {messages.map((message, index) => (
                    <ListMessageChat
                      key={index}
                      role={message.role as 'user' | 'system' | 'assistant'}
                      content={message.content}
                    />
                  ))}
                </StyledList>
              </StyledBoxList>
              <StyledBoxEmpty></StyledBoxEmpty>
            </StyledGridMessage>
            <InputMessage
              loading={loading}
              query={query}
              setQuery={setQuery}
              sendMessage={sendMessage}
            />
          </Grid>
        </StyledGridBox>
      </Grid>
    </StyledBox>
  )
}

export default ChatBox
