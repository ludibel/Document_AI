import React, { useCallback, useState } from 'react'
// import react-dropzone
import { FileWithPath, useDropzone } from 'react-dropzone'
// import style
import {
  StyledBox,
  StyledContainer,
  StyledButtonDropZone,
} from './StyledDropZone'
// import mui
import { Box, Typography } from '@mui/material'
// import icon mui
import UploadIcon from '@mui/icons-material/Upload'
import UploadFileIcon from '@mui/icons-material/UploadFile'
// import functions
import slugName from '@/utils/functions/slugName'

const DropZone = () => {
  // hooks pour gérer l'alerte
  const [openAlert, setOpenAlert] = useState(false)
  // hooks pour gérer le status de l'alerte
  const [statusAlert, setStatusAlert] = useState('')
  // hooks pour gérer le message de l'alerte
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isFileUploaded, setIsFileUploaded] = useState(false)

  const handleFileUpload = () => {
    console.log('handleFileUpload')
  }
  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length === 0) {
      setOpenAlert(true)
      setStatusAlert('fail')
      setMessage('Aucun fichier reçu, verifiez la taille du fichier')
    }

    if (acceptedFiles.length >= 1) {
      const ext = ['pdf', 'docx', 'csv', 'txt']
      const file = acceptedFiles[0]
      const fileNotExtension = file.name.split('.')[0]
      const slugNameFile = slugName(fileNotExtension)
      setFileName(slugNameFile)
      const extension = file.name.split('.').pop()
      const reader = new FileReader()
      if (extension && ext.includes(extension)) {
        reader.onload = async () => {
          handleFileUpload(file)
          setLoading(true)
          setFileName(slugNameFile)
          setIsFileUploaded(true)
        }
        reader.readAsText(file)
      }
      if (extension && extension === 'json') {
        reader.onload = async () => {
          handleFileUpload(file)
          setFileName(slugNameFile)
          setIsFileUploaded(true)
        }
        reader.readAsDataURL(file)
      }
      if (extension && !ext.includes(extension) && extension !== 'json') {
        setOpenAlert(true)
        setStatusAlert('fail')
        setMessage('Extension non autorisée')
      }
    }
  }, [])
  // getRootProps permet d'obtenir les fonctionnalités de drag and dop
  // open est passé à Button pour lui permettre d'ouvrir le répertoire de fichiers
  // getInputProps utilisé pour crér la zone de drag and drop
  // acceptedFiles vérifie si les fichiers sont accéptés selon des contraintes définies
  // noClick et noKeyBoard si ils sont à true permettent de ne pas pouvoir ouvrir le gestionnaire de fichier en cliquant sur la dropzone ou en appuyant sur les touches entrée et espace

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    disabled: isFileUploaded,
    multiple: false,
    maxFiles: 1,
    // désactive le comportement de click et keydown
    noClick: true,
    noKeyboard: true,
    maxSize: 900 * 1000,
  })
  return (
    <StyledBox>
      {/* // ajouter Alerte Message */}
      <StyledContainer
        {...getRootProps({
          'aria-label': 'drag and drop area',
        })}
        isdisabled={isFileUploaded ? true : undefined}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop le fichier ici ...</Typography>
        ) : (
          <Box sx={{ position: 'relative' }}>
            <UploadIcon />
            {fileName === '' ? (
              <Typography>Drag 'n' drop votre fichier ici</Typography>
            ) : (
              <Typography>Impossible de déposer un fichier</Typography>
            )}
            <StyledButtonDropZone
              type="button"
              onClick={isFileUploaded ? undefined : open}
              variant="contained"
              color="primary"
              disabled={isFileUploaded}
              startIcon={<UploadFileIcon />}
            >
              Uploader
            </StyledButtonDropZone>
          </Box>
        )}
      </StyledContainer>
    </StyledBox>
  )
}

export default DropZone
