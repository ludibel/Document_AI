// import mui
import {
  Box,
  Grid,
  TextField,
  List,
  Fab,
  Typography,
  Card,
} from '@mui/material'
// import emotion
import styled from '@emotion/styled'

export const StyledBox = styled(Card)({
  textAlign: 'left',
  borderRadius: '1em',
})

export const StyledGridTitle = styled(Grid)({
  textAlign: 'left',
  paddingBottom: '1em',
  paddingTop: '1em',
})
export const StyledTypoTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
})) as typeof Typography

export const StyledGridBox = styled(Grid)({
  position: 'relative',
  overflow: 'hidden',
  height: '600px',
  '@media (min-width: 1024px)': {
    height: '1000px',
  },
})
export const StyledList = styled(List)({
  paddingBottom: 0,
  width: '100%',
})
export const StyledTextField = styled(TextField)({
  boxShadow: '0 0 10px rgba(0,0,0,.1)',
  width: '100%',
  '& ::placeholder': {
    opacity: 0.5,
  },
  fontSize: '1.2em',
})
export const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 150,
  right: 15,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}))
export const StyledGridInput = styled(Grid)({
  borderTop: '1px solid #0000001a',
  width: '100%',
  paddingLeft: '4em',
  paddingRight: '4em',
  textAlign: 'center',
  paddingTop: '2em',
  paddingBottom: '2em',
  backgroundColor: 'transparent',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,0) 10%,#fff 30%)',
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: 1000,
})
export const StyledGridMessage = styled(Grid)(({ theme }) => ({
  overflowY: 'auto',
  height: '600px',
  '&::-webkit-scrollbar': {
    width: 5,
    WebkitAppearance: 'none',
  },

  '&::-webkit-scrollbar-thumb': {
    borderRadius: 8,
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  '@media (min-width: 1024px)': {
    height: '1000px',
  },
}))

export const StyledBoxList = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  bottom: '100px',
  overflowY: 'scroll',
  maxHeight: '1000px',
  '&::-webkit-scrollbar': {
    width: 5,
    WebkitAppearance: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 8,
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}))
