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
} from './StyledChatBox'
// import mui
import { Grid, Box, InputAdornment, IconButton } from '@mui/material'
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
  // va permettre d'ajouter le nom du fichier dans l'historique des messages
  interface BaseMessageWithName extends BaseMessage {
    name: string
  }
  // state initiales pour les messages
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

  const sendMessage = (message: string) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  // gestion de l'historique en fonction du nom du fichier
  useEffect(() => {
    if (fileNameHistory !== fileName) {
      setMessageState((state) => ({
        ...state,
        messages: [
          {
            content: 'Que souhaitez-vous savoir sur ce document',
            role: 'assistant',
          },
        ],
        history: [],
      }))
    }
  }, [fileName, fileNameHistory])
  // si pas de fichier selectionné
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
              <StyledBoxList
                ref={ref}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  bottom: '100px',
                  overflowY: 'scroll',
                  maxHeight: '1000px',
                }}
              >
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
              <Box sx={{ flexShrink: 0, height: '12rem' }}></Box>
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
