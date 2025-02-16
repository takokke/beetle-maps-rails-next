import { Card, CardContent, Container } from '@mui/material'

const Error = () => {
  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 3, mt: 8, backgroundColor: '#EEEEEE' }}>
        <CardContent sx={{ lineHeight: 2 }}>
          現在、料金節約のためバックエンドのAPIを停止しております。ご不便をおかけして申し訳ございません。
        </CardContent>
      </Card>
    </Container>
  )
}

export default Error
