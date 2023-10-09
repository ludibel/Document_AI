import React, { useState, useContext, useEffect } from 'react'
import { ChromaClient } from 'chromadb'
// import mui
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material'

import DialogAlert from '@/components/MessageAlert'
import TitleDialog from '@/components/TitleDialog'

import DeleteIcon from '@mui/icons-material/Delete'
import FolderIcon from '@mui/icons-material/Folder'
import {
  StyledDialogContentText,
  StyledIconButton,
} from './StyledDialogFilesManage'

import FileUploadContext, {
  FileContextProps,
} from '@/utils/context/fileContext'
import { getFilesListVector } from '@/utils/functions/getListVectorStore'
interface DialogFileManageProps {
  open: boolean
  onClose: () => void
}

const DialogFileManage = ({ open, onClose }: DialogFileManageProps) => {
  const [statusAlert, setStatusAlert] = useState('')
  const [messageAlert, setMessageAlert] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const { setListVector, listVector } = useContext(
    FileUploadContext
  ) as FileContextProps
  // fermeture de l'alerte au bout de 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenAlert(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [openAlert])
  useEffect(() => {
    getFilesListVector(setListVector)
  }, [setListVector])

  // suppression d'un fichier dans public/upload, public/embeddings et chromadb
  const handleDeleteFile = async (file: string) => {
    // 1. récupération du nom du fichier
    const fileName = file
    // 2. supprimer le fichier du dossier upload
    const response = await fetch('/api/deleteFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: fileName }),
    })
    const responseStatusDelete = await response.json()
    if (responseStatusDelete.status === 'ok') {
      const chromadb = new ChromaClient('http://docker_chromadb:8000')
      chromadb
        .deleteCollection({ name: fileName })
        .then(() => {
          setStatusAlert('ok')
          setListVector(listVector.filter((file) => file !== fileName))
          setMessageAlert('Le fichier a été supprimé avec succès.')
          setOpenAlert(true)
        })
        .catch(() => {
          setStatusAlert('fail')
          setMessageAlert(
            `Une erreur s'est produite lors de la suppression du fichier.`
          )
          setOpenAlert(true)
        })
    }
    if (responseStatusDelete.status === 'fail') {
      setStatusAlert('fail')
      setMessageAlert(`Erreur lors de la suppression du fichier`)
      setOpenAlert(true)
    }
  }

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <TitleDialog
        onClose={onClose}
        id="title Dialog"
        title="Gestion des Fichiers"
      />
      <DialogContent dividers>
        {openAlert && statusAlert === 'ok' && (
          <DialogAlert status="success" message={messageAlert} />
        )}
        {openAlert && statusAlert === 'fail' && (
          <DialogAlert status="error" message={messageAlert} />
        )}
        <StyledDialogContentText>
          Liste des documents vectorisés
        </StyledDialogContentText>
        <List dense>
          {listVector.length === 0 && (
            <ListItem>
              <ListItemText primary="Aucun fichier vectorisé" />
            </ListItem>
          )}
          {listVector.map((file) => (
            <ListItem
              key={`list - ${file}`}
              secondaryAction={
                <StyledIconButton
                  edge="end"
                  aria-label="delete vector file"
                  onClick={() => handleDeleteFile(file)}
                >
                  <DeleteIcon />
                </StyledIconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={file} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogFileManage
