import { Modal, Box, Typography } from '@mui/material'
import Link from 'next/link'
import { AuthRequiredModalProps } from '@/types/AuthRequiredModalProps'

const AuthRequiredModal = (props: AuthRequiredModalProps) => {
  const { isOpen, onClose } = props

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 300, md: 400 },
          bgcolor: 'background.paper',
          border: '1px solid gray',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-link" variant="h6" component="h2">
          <Link href="/sign_in">ログインする</Link>
        </Typography>
        <Typography
          id="modal-modal-link"
          variant="h6"
          component="h2"
          sx={{ mt: 2 }}
        >
          <Link href="/sign_up">ユーザー登録をする</Link>
        </Typography>
      </Box>
    </Modal>
  )
}
export default AuthRequiredModal
