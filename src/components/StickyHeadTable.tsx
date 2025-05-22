import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import './StickyHeadTable.css' // importa el CSS aquí

interface Column {
  id: 'from' | 'date' | 'subject' | 'summary'
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
  format?: (value: string | number) => string
}

const columns: readonly Column[] = [
  { id: 'from', label: 'Remitente', minWidth: 170 },
  { id: 'date', label: 'Fecha', minWidth: 100, align: 'center' },
  { id: 'subject', label: 'Asunto', minWidth: 200 },
  { id: 'summary', label: 'Resumen', minWidth: 300 },
]

interface Data {
  from: string
  date: string
  subject: string
  summary: string
}

interface Props {
  rows: Data[]
}

export default function StickyHeadTable({ rows }: Props) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className="paper" elevation={8}>
      <TableContainer className="table-container">
        <Table stickyHeader aria-label="sticky table" className="table">
          <TableHead className='table-header-cell'>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  className="table-header-cell"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  style={{ padding: '32px 0', color: 'rgba(255,255,255,0.5)' }}
                >
                  No hay correos para mostrar
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.from + row.date + idx}
                    className="table-row"
                  >
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align || 'left'}
                          className="table-cell"
                          title={typeof value === 'string' ? value : undefined}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="pagination"
      />
    </Paper>
  )
}
