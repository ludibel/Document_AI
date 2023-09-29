// import emotion style
import styled from '@emotion/styled'
// import mui
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Button,
  Grid,
} from '@mui/material'

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  color: theme.palette.primary.main,
})) as typeof DialogTitle

export const StyledDialog = styled(Dialog)({
  borderRadius: 16,
  '& .MuiPaper-root': {
    borderRadius: 16,
  },
}) as typeof Dialog

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(4),
})) as typeof DialogContent

export const StyledTypoTitleDialog = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.3em',
}) as typeof Typography

export const StyledGridContainer = styled(Grid)({
  marginBottom: '1em',
  textAlign: 'left',
  paddingTop: '1em',
})

export const StyledTypoTitle = styled(Typography)({
  fontWeight: 700,
}) as typeof Typography

export const StyledTypoListTitle = styled(Typography)({
  fontSize: '1em',
  paddingRight: '2em',
}) as typeof Typography
export const StyledButtonDropZone = styled(Button)({
  marginTop: '1em',
  textTransform: 'none',
  fontSize: '1.2em',
}) as typeof Button
export const StyledButtonEmbedding = styled(Button)({
  borderRadius: 16,
  textTransform: 'none',
  fontSize: '1.2em',
})

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: theme.palette.grey[500],
})) as typeof IconButton

export const StyledTypoTitleTable = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.secondary.main,
  fontWeight: 700,
})) as typeof Typography

export const StyledGridTable = styled(Grid)({ margintop: '1em' })
