import { useState } from 'react'
// import mui
import { Collapse } from '@mui/material'
// import style
import {
  StyledBox,
  StyledAlert,
} from '@/components/MessageAlert/StyledMessageAlert'
// import types
import { DialogAlertProps } from '@/utils/types/dialog'

const MessageAlert = ({ status = 'error', message }: DialogAlertProps) => {
  const [open, setOpen] = useState(true)

  return (
    <StyledBox>
      <Collapse in={open}>
        <StyledAlert severity={status}>{message}</StyledAlert>
      </Collapse>
    </StyledBox>
  )
}

export default MessageAlert
