import styled from '@emotion/styled'

import { TableContainer, TableRow, TableCell } from '@mui/material'

export const StyledTableContainer = styled(TableContainer)({
  width: '100%',
  marginTop: '2em',
}) as typeof TableContainer

export const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  fontWeight: 700,
  textTransform: 'uppercase',
}))
export const StyledTableCellBody = styled(TableCell)({
  fontSize: 14,
})

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[500],
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
