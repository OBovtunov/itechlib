import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Box,
  Card,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { titles } from '../../common/constants/titles-constants'
import router from 'next/router'
import { BOOK_PREVIEW_PAGE_PATH } from '../../common/constants/route-constants'

function toLowerCaseExeptFirstLetter(string) {
  return string[0] + string.slice(1).toLowerCase()
}

export const BooksListResults = ({ books }) => {
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{titles.title}</TableCell>
                <TableCell>{titles.author}</TableCell>
                <TableCell>{titles.category}</TableCell>
                <TableCell>{titles.language}</TableCell>
                <TableCell>{titles.description}</TableCell>
                <TableCell>{titles.rating}</TableCell>
                <TableCell>{titles.status}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.length ? (
                books.map((book) => {
                  return (
                    <TableRow
                      onClick={() =>
                        router.push(`${BOOK_PREVIEW_PAGE_PATH}/${book.id}`)
                      }
                      key={book.id}
                      hover
                    >
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>
                        {toLowerCaseExeptFirstLetter(book.category.name)}
                      </TableCell>
                      <TableCell>
                        {toLowerCaseExeptFirstLetter(book.language.name)}
                      </TableCell>
                      <TableCell>{book.description}</TableCell>
                      <TableCell>
                        <Rating
                          name="read-only"
                          value={book.rating}
                          size="small"
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        {toLowerCaseExeptFirstLetter(book.status.name)}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography
                      sx={{ textAlign: 'center', color: 'action.active' }}
                    >
                      No books have been added yet!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}