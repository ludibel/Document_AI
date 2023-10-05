import styled from '@emotion/styled'

import { DialogTitle } from '@mui/material'

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: '1.3em',
})) as typeof DialogTitle
