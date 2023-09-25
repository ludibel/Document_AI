import { Box, Grid, Typography } from '@mui/material'
// import emotion
import styled from '@emotion/styled'

export const StyledBox = styled(Box)({
  textAlign: 'center',
  paddingTop: '1em',
  paddingBottom: '1em',
  '@media (min-width: 1024px)': {
    width: 1024,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
export const StyledTypoTitle = styled(Typography)({
  backgroundImage: 'linear-gradient(to bottom left, #313860, #4fd1c5)',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textTransform: 'uppercase',
  fontFamily: 'Inter',
  fontWeight: 800,
  fontSize: '2.5em',
  '@media (min-width: 768px)': {
    fontSize: '4em',
  },
}) as typeof Typography
export const StyledTypo = styled(Typography)({
  fontSize: '1.5em',
  fontFamily: 'Inter',
  '@media (min-width: 768px)': {
    fontSize: '2em',
  },
})
export const StyledGridContainer = styled(Grid)({
  marginTop: '2em',
  marginBottom: '2em',
  paddingTop: '4em',
  paddingBottom: '4em',
  paddingLeft: '1em',
  paddingRight: '1em',
})
