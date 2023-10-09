import React, { useState, FormEvent, useEffect } from 'react'
// import mui
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from '@mui/material'
// import components
import MessageAlert from '@/components/MessageAlert'
import TitleDialog from '@/components/TitleDialog'
// import types
import { DialogKeyOpenAIProps } from '@/utils/types/dialog'

const DialogKeyOpenAI = ({
  message,
  open,
  handleCloseDialog,
}: DialogKeyOpenAIProps) => {
  const [openAIKey, setOpenAIKey] = useState('')
  const [messageAlert, setMessageAlert] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [statusAlert, setStatusAlert] = useState('')
  // fermeture de l'alerte au bout de 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenAlert(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [openAlert])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // enregistrer la clé dans le fichier .env
    const response = await fetch('/api/saveKey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ openAIKey }),
    })
    const data = await response.json()
    if (data.status === 'ok') {
      setMessageAlert(data.message)
      setStatusAlert(data.status)
      setOpenAlert(true)
      // fermeture de la dialog après 2 secondes
      const timer = setTimeout(() => {
        handleCloseDialog()
      }, 2000)
      return () => clearTimeout(timer)
    }
    if (data.status === 'fail') {
      setMessageAlert(data.message)
      setStatusAlert(data.status)
      setOpenAlert(true)
    }
  }
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setOpenAIKey(e.target.value)
  }

  return (
    <Dialog open={open}>
      <TitleDialog title={message} id="title-dialogSaveKey" />
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {openAlert && statusAlert === 'ok' && (
            <MessageAlert status="success" message={messageAlert} />
          )}
          {openAlert && statusAlert === 'fail' && (
            <MessageAlert status="error" message={messageAlert} />
          )}
          <DialogContentText>
            Veuillez renseigner la clé OPEN AI dans le champ ci-dessous
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="openaikey"
            label="Open AI Key"
            type="text"
            fullWidth
            variant="standard"
            value={openAIKey}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Enregistrer</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogKeyOpenAI
