import { useContext } from 'react'
import { StyledDialogTitle } from './StyledDialogRemoveFile'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import React from 'react'
import FileContext, { FileContextProps } from '@/utils/context/fileContext'

interface DialogRemoveFileProps {
  open: boolean
  handleClose: () => void
  handleRemove: () => void
  handleNotRemove: () => void
}

const DialogRemoveFile = ({
  open,
  handleClose,
  handleNotRemove,
  handleRemove,
}: DialogRemoveFileProps) => {
  const { fileName } = useContext(FileContext) as FileContextProps
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <StyledDialogTitle id="alert-dialog-title">
        Confirmation de suppression du document: {fileName}
      </StyledDialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Etes-vous sûr de vouloir supprimer ce fichier ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRemove}>Oui</Button>
        <Button onClick={handleNotRemove} autoFocus>
          Non
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogRemoveFile
