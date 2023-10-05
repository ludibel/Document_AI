import styled from '@emotion/styled'
import { DialogTitle } from '@mui/material'

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: theme.palette.primary.main,
})) as typeof DialogTitle
