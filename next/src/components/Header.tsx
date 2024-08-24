import { AppBar, Box, Button, Container } from '@mui/material'
import Link from 'next/link'
import { useUserState } from '@/hooks/useGlobalState'

const Header = () => {
  const [user] = useUserState()

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        py: '12px',
      }}
    >
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Link href="/">
              <h1>Beetle Maps</h1>
            </Link>
          </Box>
          {user.isFetched && (
            <>
              {!user.isSignedIn && (
                <Box>
                  <Link href="/sign_in">
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{
                        color: 'white',
                        textTransform: 'none',
                        fontSize: 16,
                        borderRadius: 2,
                        boxShadow: 'none',
                      }}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      fontSize: 16,
                      borderRadius: 2,
                      boxShadow: 'none',
                      border: '1px solid #3EA8FF',
                      ml: 2,
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
              {user.isSignedIn && <Box>{user.name}</Box>}
            </>
          )}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
