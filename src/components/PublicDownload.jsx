import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Alert,
} from '@mui/material'
import { ArrowLeft, Description, Check, ErrorOutlined } from '@mui/icons-material'
import { useFiles } from '../contexts/FilesContext'

export default function PublicDownload() {
  const { getFile } = useFiles()
  const [senha, setSenha] = useState('')
  const [status, setStatus] = useState('')
  const [arquivo, setArquivo] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    if (id) {
      const f = getFile(id)
      if (!f) {
        setStatus('expirado')
        return
      }
      if (new Date(f.expiraEm) <= new Date()) {
        setStatus('expirado')
        return
      }
      setArquivo(f)
    }
  }, [getFile])

  const baixar = (e) => {
    e.preventDefault()
    if (!arquivo) return
    if (arquivo.senha && arquivo.senha !== senha) {
      setStatus('erro')
      return
    }
    setLoading(true)
    try {
      const link = document.createElement('a')
      link.href = arquivo.dataUrl
      link.download = arquivo.nome
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setStatus('sucesso')
    } catch {
      setStatus('erro')
    } finally {
      setLoading(false)
    }
  }

  if (!arquivo && status !== 'expirado') {
    return (
      <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <Card sx={{ maxWidth: 450, p: 4, textAlign: 'center', boxShadow: 3 }}>
          <Box sx={{ mx: 'auto', mb: 2, p: 2, bgcolor: 'primary.light', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Description fontSize="medium" sx={{ color: 'primary.main' }} />
          </Box>
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            Arquivo não encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            O link informado é inválido ou o arquivo não existe.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowLeft fontSize="small" />}
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>
        </Card>
      </Box>
    )
  }

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, mt: 4, mb: 4, boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ mx: 'auto', mb: 2, p: 2, bgcolor: 'primary.light', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Description fontSize="medium" sx={{ color: 'primary.main' }} />
              </Box>
              <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
                Baixar Arquivo
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Pelotense Temp File
              </Typography>
            </Box>

            {status === 'expirado' && (
              <Alert severity="error" sx={{ mb: 3 }}>
                <ErrorOutlined fontSize="small" sx={{ mr: 1 }} />
                Este arquivo expirou ou não está mais disponível.
              </Alert>
            )}
            {status === 'erro' && (
              <Alert severity="error" sx={{ mb: 3 }}>
                <ErrorOutlined fontSize="small" sx={{ mr: 1 }} />
                Senha incorreta ou erro ao baixar.
              </Alert>
            )}
            {status === 'sucesso' && (
              <Alert severity="success" sx={{ mb: 3 }}>
                <Check fontSize="small" sx={{ mr: 1 }} />
                Download iniciado!
              </Alert>
            )}

            {!arquivo.senha && status !== 'sucesso' && status !== 'erro' && (
              <form onSubmit={baixar} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  size="large"
                >
                  {loading ? 'Enviando...' : 'Baixar Arquivo'}
                </Button>
              </form>
            )}

            {arquivo.senha && status !== 'sucesso' && status !== 'erro' && (
              <form onSubmit={baixar} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Senha de acesso"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite a senha do arquivo"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !senha}
                  size="large"
                >
                  {loading ? 'Enviando...' : 'Baixar Arquivo'}
                </Button>
              </form>
            )}

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="text"
                color="primary"
                startIcon={<ArrowLeft fontSize="small" />}
                onClick={() => window.history.back()}
              >
                Voltar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
