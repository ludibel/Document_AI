import React, { useState } from 'react'
//import components
import ChatBox from '@/components/ChatBox'
import DialogDropZone from '@/components/DialogDropZone'
// import style
import { Grid } from '@mui/material'
import { StyledGridLeft, StyledGridcontainer } from './StyledChat'
import ListFiles from './ListFiles'

const Chat = () => {
  // gestion dialog dropzone
  const [openDialogDropZone, setOpenDialogDropZone] = useState(false)

  const handleCloseDialogDropZone = () => {
    setOpenDialogDropZone(false)
  }

  const handleClickUpload = () => {
    setOpenDialogDropZone(true)
  }

  return (
    <>
      <DialogDropZone
        open={openDialogDropZone}
        handleClose={handleCloseDialogDropZone}
      />
      <StyledGridcontainer
        container
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        flexWrap={{ md: 'nowrap' }}
      >
        <StyledGridLeft item xs={12} md={3}>
          <ListFiles handleClickUpload={handleClickUpload} />
        </StyledGridLeft>
        <Grid item xs={9}>
          <ChatBox />
        </Grid>
      </StyledGridcontainer>
    </>
  )
}

export default Chat
