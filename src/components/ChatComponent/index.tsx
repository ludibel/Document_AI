import React from 'react'
//import components
import ChatBox from '@/components/ChatBox'
// import style
import { Grid } from '@mui/material'
import { StyledGridLeft, StyledGridcontainer } from './StyledChat'
import ListFiles from './ListFiles'
const Chat = () => {
  return (
    <StyledGridcontainer
      container
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      flexWrap={{ md: 'nowrap' }}
    >
      <StyledGridLeft item xs={12} md={3}>
        <ListFiles />
      </StyledGridLeft>
      <Grid item xs={9}>
        <ChatBox />
      </Grid>
    </StyledGridcontainer>
  )
}

export default Chat
