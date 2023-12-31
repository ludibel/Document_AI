import styled from '@emotion/styled'
import { DialogContentText, Avatar, IconButton } from '@mui/material'

export const StyledDialogContentText = styled(DialogContentText)(
  ({ theme }) => ({
    color: theme.palette.secondary.main,
    fontWeight: 700,
  })
) as typeof DialogContentText

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

export const StyledIconButton = styled(IconButton)({
  color: '#ff0000',
})
