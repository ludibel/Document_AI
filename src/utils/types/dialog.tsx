export interface DialogDropZoneProps {
  handleClose: () => void
  open: boolean
}

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
  title?: string
}
