import React, { useCallback, useState } from 'react'
// import react-dropzone
import { FileWithPath, useDropzone } from 'react-dropzone'
// import context
import FileContext, { FileContextProps } from '@/utils/context/fileContext'
// import components
import MessageAlert from '@/components/MessageAlert'
// import style
import {
  StyledBox,
  StyledContainer,
  StyledButtonDropZone,
  StyledCircularProgress,
  StyledGridTable,
  StyledTypoTitleTable,
  StyledIconButton,
} from './StyledDropZone'
// import mui
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
// import icon mui
import UploadIcon from '@mui/icons-material/Upload'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import DeleteIcon from '@mui/icons-material/Delete'
// import functions
import slugName from '@/utils/functions/slugName'
// import types
import { DropZoneProps } from '@/utils/types/dropZone'

const DropZone = ({ deleteFile }: DropZoneProps) => {
  // hooks pour gérer l'alerte
  const [openAlert, setOpenAlert] = useState(false)
  // hooks pour gérer le status de l'alerte
  const [statusAlert, setStatusAlert] = useState('')
  // hooks pour gérer le message de l'alerte
  const [message, setMessage] = useState('')
  // hook pour gérer le coût du fichier
  const [costFile, setCostFile] = useState(undefined)
  // hooks loading
  const [loading, setLoading] = useState<boolean>(false)
  const [document, setDocument] = useState<Document | null>(null)

  const {
    setShowFile,
    fileName,
    setFileName,
    setIsFileUploaded,
    isFileUploaded,
  } = React.useContext(FileContext) as FileContextProps

  // fonction qui permet de sousmettre le formulaire et ainsi envoyer tous les fichiers en une seule fois au serveur
  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/uploadFile', {
        method: 'POST',
        body: formData,
      })

      const responseStatus = await response.json()
      if (responseStatus.status === 'ok') {
        setOpenAlert(true)
        setStatusAlert('ok')
        setMessage(responseStatus.message)
        setCostFile(responseStatus.document.cost)
        setDocument(responseStatus.document.doc)
        setShowFile(true)
        setLoading(false)
      }

      if (responseStatus.status === 'fail') {
        setOpenAlert(true)
        setStatusAlert('fail')
        setMessage(responseStatus.message)
        setFileName('')
        setIsFileUploaded(false)
        setLoading(false)
      }
    } catch (error) {
      alert(`le fichier n'a pas pu être uploadé ${error}`)
    }
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
      {openAlert && statusAlert === 'ok' && (
        <MessageAlert status="success" message={message} />
      )}
      {openAlert && statusAlert === 'fail' && (
        <MessageAlert status="error" message={message} />
      )}
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
      {loading && <StyledCircularProgress />}
      {isFileUploaded && (
        <StyledGridTable item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <StyledTypoTitleTable>Nom du fichier</StyledTypoTitleTable>
                  </TableCell>
                  <TableCell>
                    <StyledTypoTitleTable>
                      Vectorisation openAI
                    </StyledTypoTitleTable>
                  </TableCell>
                  <TableCell>
                    <StyledTypoTitleTable>Supprimer</StyledTypoTitleTable>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{fileName}</TableCell>
                  <TableCell align="center">
                    <Typography> $ {costFile} </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <StyledIconButton
                      onClick={() => deleteFile(fileName)}
                      aria-label="supprimer le fichier"
                    >
                      <DeleteIcon />
                    </StyledIconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </StyledGridTable>
      )}
    </StyledBox>
  )
}

export default DropZone
