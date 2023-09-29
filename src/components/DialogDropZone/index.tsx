import React from 'react'
// import components
import TitleDialog from '@/components/TitleDialog'
// import mui
import { Button, DialogActions } from '@mui/material'
import { StyledDialog, StyledDialogContent } from './StyledDialogDropZone'
// import types
import { DialogDropZoneProps } from '@/utils/types/dialog'

const DialogDropZone = ({ handleClose, open }: DialogDropZoneProps) => {
  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <TitleDialog
        onClose={handleClose}
        id="dialog-title"
        title={'Enregistrez votre document'}
      />
      <StyledDialogContent dividers>
        {/* Ajouter le composant Message d'alerte */}
        {/* Ajouter le composant DialogDropZone */}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
      </DialogActions>
    </StyledDialog>
  )
}

export default DialogDropZone
