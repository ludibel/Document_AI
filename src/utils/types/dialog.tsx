export interface DialogDropZoneProps {
  handleClose: () => void
  open: boolean
  openAlert: boolean
  statusAlert: 'ok' | 'fail' | undefined
  messageAlert: string
  notHandleClose: () => void
}

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
  title?: string
}

export interface DialogAlertProps {
  status: 'error' | 'success' | 'info' | 'warning' | undefined
  message: string
}
