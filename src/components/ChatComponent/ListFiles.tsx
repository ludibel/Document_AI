import React, { useState } from 'react'
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

const listVector = ['vector1', 'vector2', 'vector3', 'vector4', 'vector5']

const ListFiles = ({ handleClickUpload }: ListFilesProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const handleChange = (event: { target: { value: string } }) => {
    setSelectedValue(event.target.value)
  }

  const handleClickGestion = () => {
    console.log('ouverture dialog')
  }

  return (
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
  )
}

export default ListFiles
