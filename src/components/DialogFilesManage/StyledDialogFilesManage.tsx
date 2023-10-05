import styled from '@emotion/styled'
import { DialogTitle, DialogContentText, Avatar } from '@mui/material'

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 700,
})) as typeof DialogTitle

export const StyledDialogContentText = styled(DialogContentText)(
  ({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: 700,
  })
) as typeof DialogContentText

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.primary.main,
}))
