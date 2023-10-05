export interface DialogDropZoneProps {
  handleClose: () => void
  open: boolean
  openAlert: boolean
  statusAlert: string
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

export interface DialogSuccessProps {
  open: boolean
  handleClose: () => void
  title: string
  content: string
}
