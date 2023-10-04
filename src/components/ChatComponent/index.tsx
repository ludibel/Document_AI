import React, { useContext, useState } from 'react'
//import components
import ChatBox from '@/components/ChatBox'
import DialogDropZone from '@/components/DialogDropZone'
// import style
import { Grid } from '@mui/material'
import { StyledGridLeft, StyledGridcontainer } from './StyledChat'
import ListFiles from './ListFiles'
// import context
import FileContext, { FileContextProps } from '@/utils/context/fileContext'

const Chat = () => {
  // gestion dialog dropzone
  const [openDialogDropZone, setOpenDialogDropZone] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [statusAlert, setStatusAlert] = useState(undefined)
  const [messageAlert, setMessageAlert] = useState('')

  const { setIsFileUploaded, fileName, setFileName } = useContext(
    FileContext
  ) as FileContextProps

  // gestion de DialogDropZone
  const handleClickUpload = () => {
    setOpenDialogDropZone(true)
  }
  const handleCloseDialogDropZone = () => {
    setOpenDialogDropZone(false)
    setIsFileUploaded(false)
  }

  return (
    <>
      <DialogDropZone
        open={openDialogDropZone}
        handleClose={handleCloseDialogDropZone}
        openAlert={openAlert}
        statusAlert={statusAlert}
        messageAlert={messageAlert}
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
