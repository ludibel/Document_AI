import styled from '@emotion/styled'

import { Grid } from '@mui/material'

export const StyledGridLeft = styled(Grid)({
  height: '1000px',
  position: 'relative',
  '@media (min-width: 1024px)': {
    maxWidth: '25% !important',
  },
})

export const StyledGridcontainer = styled(Grid)({
  paddingRight: '1em',
  paddingLeft: '1em',
  '@media (min-width: 1920px)': {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
