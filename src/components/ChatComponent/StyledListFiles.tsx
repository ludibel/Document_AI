// import emotion styled
import styled from '@emotion/styled'
// import mui
import { Card, Button, CardContent, Typography } from '@mui/material'

export const StyledCard = styled(Card)({
  borderRadius: '1em',
  backgroundColor: '#F7F7F8',
  padding: '0.5em',
  height: 400,
  '@media (min-width: 1024px)': {
    height: 1000,
    padding: '0.3em',
  },
})

export const StyledDivButton = styled('div')({
  marginTop: 'auto',
})

export const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

export const StyledDiv = styled('div')({
  marginTop: '1em',
  '@media (min-width: 768px)': {
    fontSize: '2em',
  },
})

export const StyledButtonManage = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  fontWeight: 700,
}))

export const StyledButtonUpload = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  fontWeight: 700,
}))

export const StyledTypoDiv = styled(Typography)({
  '@media (min-width: 1024px)': {
    fontSize: '1.6rem',
  },
}) as typeof Typography

export const StyledTitle = styled(Typography)({
  '@media (min-width: 1024px)': {
    fontSize: '2.6rem',
  },
}) as typeof Typography
