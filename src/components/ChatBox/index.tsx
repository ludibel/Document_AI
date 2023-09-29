import React, { useRef, useState } from 'react'
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

const messages = [
  {
    role: 'assitant',
    content: 'Bonjour, comment puis-je vous aider?',
  },
  {
    role: 'assistant',
    content: 'Bonjour',
  },
]
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
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const sendMessage = (message: string) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const ref = useRef<HTMLInputElement>(null)
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
