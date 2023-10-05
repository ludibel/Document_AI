import styled from '@emotion/styled'

import { DialogTitle, IconButton, Typography } from '@mui/material'

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  color: theme.palette.primary.main,
})) as typeof DialogTitle

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: theme.palette.grey[500],
}))

export const StyledTypoTitleDialog = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.3em',
}) as typeof Typography
