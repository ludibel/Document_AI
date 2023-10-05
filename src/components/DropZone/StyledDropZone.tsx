// import mui
import {
  Button,
  Box,
  Grid,
  Typography,
  IconButton,
  Table,
  CircularProgress,
} from '@mui/material'
// emotion styled
import styled from '@emotion/styled'

interface StyledContainerProps {
  isdisabled?: boolean
}

export const StyledContainer = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'isdisabled',
})<StyledContainerProps>(({ theme, isdisabled }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1em',
  borderRadius: 16,
  backgroundColor: isdisabled
    ? theme.palette.secondary.light
    : theme.palette.primary.light,
  color: theme.palette.secondary.main,
  outline: 'none',
  transition: `border 0.24s ease-in-out`,
  textAlign: 'center',
  margin: 'auto',
}))

export const StyledBox = styled(Box)({
  textAlign: 'center',
})

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: '#FFF',
  },
})) as typeof Button

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

export const StyledIconButton = styled(IconButton)({
  color: '#F00',
  paddingBottom: 0,
  paddingTop: 5,
}) as typeof IconButton

export const StyledTypoTitleTable = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.secondary.main,
  fontWeight: 700,
})) as typeof Table

export const StyledGridTable = styled(Grid)({ margintop: '1em' })

export const StyledCircularProgress = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12,
})
