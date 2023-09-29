import React from 'react'
// import mui
import { Table, TableBody, TableRow, TableHead, Paper } from '@mui/material'
// import style
import {
  StyledTableCellBody,
  StyledTableCellHead,
  StyledTableContainer,
  StyledTableRow,
} from './StyledTable'

interface TableComponentProps {
  lines: string[]
}

const TableComponent = ({ lines }: TableComponentProps) => {
  // Séparer la première ligne (en-tête de colonnes) du reste des lignes (données du tableau)
  const [tableHeaders, ...tableData] = lines.map((line) =>
    line
      .trim()
      .split('|')
      .filter(Boolean)
      .map((cell) => cell.trim())
  )

  // Filtrer les cellules pour exclure celles qui contiennent au moins trois caractères '-'
  const filteredTableData = tableData.map((rowData) =>
    rowData.filter((cell) => cell.replace(/-/g, '').length >= 3)
  )
  return (
    <StyledTableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, headerIndex) => (
              <StyledTableCellHead key={headerIndex}>
                {header}
              </StyledTableCellHead>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTableData.map((rowData, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {rowData.map((cell, cellIndex) => (
                <StyledTableCellBody key={cellIndex}>
                  {cell}
                </StyledTableCellBody>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}

export default TableComponent
