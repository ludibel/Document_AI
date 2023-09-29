import React from 'react'
// import components
import TitleDialog from '@/components/TitleDialog'
import DropZone from '@/components/DropZone'
import MessageAlert from '@/components/MessageAlert'
// import mui
import { Button, DialogActions } from '@mui/material'
import { StyledDialog, StyledDialogContent } from './StyledDialogDropZone'
// import types
import { DialogDropZoneProps } from '@/utils/types/dialog'

const DialogDropZone = ({
  handleClose,
  open,
  openAlert,
  statusAlert,
  messageAlert,
}: DialogDropZoneProps) => {
  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <TitleDialog
        onClose={handleClose}
        id="dialog-title"
        title={'Enregistrez votre document'}
      />
      <StyledDialogContent dividers>
        {openAlert && statusAlert === 'ok' && (
          <MessageAlert status="success" message={messageAlert} />
        )}
        {openAlert && statusAlert === 'fail' && (
          <MessageAlert status="error" message={messageAlert} />
        )}
        <DropZone />
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
      </DialogActions>
    </StyledDialog>
  )
}

export default DialogDropZone
