import React, { useContext } from 'react'
// import context
import FileContext, { FileContextProps } from '@/utils/context/fileContext'
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
  notHandleClose,
}: DialogDropZoneProps) => {
  const { isFileUploaded, fileName, isFileVectorized } = useContext(
    FileContext
  ) as FileContextProps
  return (
    <StyledDialog
      open={open}
      onClose={
        isFileUploaded && !isFileVectorized ? notHandleClose : handleClose
      }
      maxWidth="sm"
      fullWidth
    >
      <TitleDialog
        onClose={
          isFileUploaded && !isFileVectorized ? notHandleClose : handleClose
        }
        id="dialogDropZone-title"
        title={
          isFileUploaded
            ? `Enregistrez votre document: ${fileName}`
            : 'Enregistrez votre document'
        }
      />
      <StyledDialogContent dividers>
        {openAlert && statusAlert === 'ok' && (
          <MessageAlert status="success" message={messageAlert} />
        )}
        {openAlert && statusAlert === 'fail' && (
          <MessageAlert status="error" message={messageAlert} />
        )}
        <DropZone deleteFile={notHandleClose} onUploadSuccess={handleClose} />
      </StyledDialogContent>
      <DialogActions>
        <Button
          onClick={
            isFileUploaded && !isFileVectorized ? notHandleClose : handleClose
          }
        >
          Annuler
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}

export default DialogDropZone
