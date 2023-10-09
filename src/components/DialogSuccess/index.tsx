import React from 'react'
// import Component
import TitleDialog from '@/components/TitleDialog'

// import mui
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'

// import types
import { DialogSuccessProps } from '@/utils/types/dialog'

const DialogSuccess = ({
  open,
  handleClose,
  title,
  content,
}: DialogSuccessProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialogSuccess-title"
      aria-describedby="alert-dialogSuccess-description"
    >
      <TitleDialog
        onClose={handleClose}
        title={title}
        id="alert-dialogSuccess-title"
      />
      <DialogContent dividers>
        <DialogContentText id="alert-dialogSuccess-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogSuccess
