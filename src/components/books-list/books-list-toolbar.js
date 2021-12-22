import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from '@mui/material'
import { Search as SearchIcon } from '../../icons/search'
import CustomModal from '../custom-modal'

export const BooksListToolbar = ({ createBook, search, handleChange }) => {
  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Main catalogue
        </Typography>
        <Box sx={{ m: 1, display: 'flex' }}>
          <Button sx={{ mr: 1 }}>Suggest a book</Button>
          <CustomModal whatModal={'add book'} createBook={createBook} />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box>
              <TextField
                name="search"
                type="text"
                onChange={(e) => handleChange(e.target.value)}
                value={search}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search a book"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
