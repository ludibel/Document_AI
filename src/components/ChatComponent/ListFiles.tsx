import React, { useState, useContext, useEffect } from 'react'
// import context
import FileContext, { FileContextProps } from '@/utils/context/fileContext'
// import style
import {
  StyledCard,
  StyledCardContent,
  StyledDivButton,
  StyledDiv,
  StyledButtonManage,
  StyledButtonUpload,
  StyledTypoDiv,
  StyledTitle,
} from './StyledListFiles'
// import mui
import { FormControl, MenuItem, Select } from '@mui/material'
import { ListFilesProps } from '@/utils/types/general'
// import components
import DialogFilesManage from '@/components/DialogFilesManage'
// import fonctions
import getVectorCollection from '@/utils/functions/getVectorCollection'

const ListFiles = ({ handleClickUpload }: ListFilesProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [openDialogFilesManage, setOpenDialogFilesManage] = useState(false)
  const { listVector, fileName, setFileName, setSelectValue, setVector } =
    useContext(FileContext) as FileContextProps
  // mise à jour de la valeur du select
  useEffect(() => {
    setSelectedValue(fileName || '')
  }, [fileName])
  const handleChange = async (event: { target: { value: string } }) => {
    const nameFile = event.target.value
    setSelectedValue(nameFile)
    setFileName(nameFile)
    setSelectValue(true)
    // on recupere la collection de vector store dans le context
    await getVectorCollection(nameFile, setVector)
  }

  const handleClickGestion = () => {
    setOpenDialogFilesManage(true)
  }

  const handleCloseDialogFilesManage = () => {
    setOpenDialogFilesManage(false)
  }

  return (
    <>
      <DialogFilesManage
        open={openDialogFilesManage}
        onClose={handleCloseDialogFilesManage}
      />
      <StyledCard elevation={3}>
        <StyledCardContent>
          <div>
            <StyledTitle variant="h3" component="h1">
              Document AI
            </StyledTitle>
          </div>
          <StyledDiv>
            <StyledTypoDiv variant="h5" component="h2">
              Fichiers disponibles
            </StyledTypoDiv>
            <div style={{ position: 'relative' }}>
              <FormControl fullWidth>
                <Select
                  labelId="select-file"
                  id="select-file"
                  value={selectedValue}
                  onChange={handleChange}
                  sx={{
                    '& .MuiSelect-select': {
                      whiteSpace: 'normal !important',
                    },
                  }}
                >
                  {listVector.map((file) => (
                    <MenuItem key={file} value={file}>
                      {file}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </StyledDiv>
          <StyledDiv>
            <StyledTypoDiv variant="h5" component="h2">
              Uploader un fichier
            </StyledTypoDiv>
            <StyledButtonUpload
              variant="contained"
              fullWidth
              size="large"
              onClick={handleClickUpload}
            >
              Uploader un fichier
            </StyledButtonUpload>
          </StyledDiv>
          <StyledDivButton>
            <StyledButtonManage
              variant="contained"
              fullWidth
              size="large"
              onClick={handleClickGestion}
            >
              Gestion des fichiers
            </StyledButtonManage>
          </StyledDivButton>
        </StyledCardContent>
      </StyledCard>
    </>
  )
}

export default ListFiles
