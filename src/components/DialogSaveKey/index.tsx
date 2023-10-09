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
// import style
// import components
import MessageAlert from '@/components/MessageAlert'
import TitleDialog from '@/components/TitleDialog'

interface DialogKeyOpenAIProps {
  message: string
  open: boolean
  handleCloseDialog: () => void
}

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
    // enregistrement de la clé dans le fichier .env
  }
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setOpenAIKey(e.target.value)
  }

  return (
    <Dialog open={open}>
      <TitleDialog title={message} />
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
