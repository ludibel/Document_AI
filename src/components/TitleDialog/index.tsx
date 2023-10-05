import React from 'react'
// import components

// import style
import {
  StyledDialogTitle,
  StyledIconButton,
  StyledTypoTitleDialog,
} from './StyledTitleDialog'
// import mui
import CloseIcon from '@mui/icons-material/Close'
// import types
import { DialogTitleProps } from '@/utils/types/dialog'

const TitleDialog = ({ title, onClose, ...other }: DialogTitleProps) => {
  return (
    <StyledDialogTitle {...other}>
      <StyledTypoTitleDialog>{title}</StyledTypoTitleDialog>
      {onClose ? (
        <StyledIconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      ) : null}
    </StyledDialogTitle>
  )
}

export default TitleDialog
