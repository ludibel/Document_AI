import React, { useContext, useState, useEffect } from 'react'
//import components
import ChatBox from '@/components/ChatBox'
import DialogDropZone from '@/components/DialogDropZone'
import DialogRemoveFile from '@/components/DialogRemoveFile'
// import style
import { Grid } from '@mui/material'
import { StyledGridLeft, StyledGridcontainer } from './StyledChat'
import ListFiles from './ListFiles'
// import context
import FileContext, { FileContextProps } from '@/utils/context/fileContext'

const Chat = () => {
  const [openDialogDropZone, setOpenDialogDropZone] = useState(false)
  const [openDialogRemoveFile, setOpenDialogRemoveFile] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [statusAlert, setStatusAlert] = useState('')
  const [messageAlert, setMessageAlert] = useState('')

  const { setIsFileUploaded, fileName, setFileName, setShowFile } = useContext(
    FileContext
  ) as FileContextProps
  // fermeture de l'alerte au bout de 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenAlert(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [openAlert])
  // gestion de DialogDropZone
  const handleClickUpload = () => {
    setOpenDialogDropZone(true)
  }
  const handleCloseDialogDropZone = () => {
    setOpenDialogDropZone(false)
    setIsFileUploaded(false)
  }
  // gestion de dialogRemoveFile
  const notHandleClose = () => {
    setOpenDialogDropZone(true)
    setOpenDialogRemoveFile(true)
    setShowFile(false)
    const timer = setTimeout(() => {
      setOpenAlert(false)
    }, 2000)
    return () => clearTimeout(timer)
  }
  const handleCloseDialogRemoveFile = () => {
    setOpenDialogRemoveFile(false)
  }

  // suppression du fichier
  const handleRemove = async () => {
    try {
      const response = await fetch('/api/deleteFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fileName }),
      })
      const responseStatus = await response.json()
      if (responseStatus.status === 'ok') {
        setOpenAlert(true)
        setMessageAlert(responseStatus.message)
        setStatusAlert('ok')
        setIsFileUploaded(false)
        setFileName('')
      }
      if (responseStatus.status === 'fail') {
        setOpenAlert(true)
        setMessageAlert(responseStatus.message)
        setStatusAlert('fail')
      }
      setOpenDialogRemoveFile(false)
      setOpenAlert(true)
      setMessageAlert(responseStatus.message)
    } catch (error) {
      setOpenAlert(true)
      setMessageAlert(
        `une erreur s'est produite lors de la suppression du fichier`
      )
      setStatusAlert('fail')
    }
  }
  return (
    <>
      <DialogDropZone
        open={openDialogDropZone}
        handleClose={handleCloseDialogDropZone}
        openAlert={openAlert}
        statusAlert={statusAlert}
        messageAlert={messageAlert}
        notHandleClose={notHandleClose}
      />
      <DialogRemoveFile
        open={openDialogRemoveFile}
        handleClose={handleCloseDialogRemoveFile}
        handleNotRemove={handleCloseDialogRemoveFile}
        handleRemove={handleRemove}
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
