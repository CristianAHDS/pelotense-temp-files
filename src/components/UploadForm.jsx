import { useState, useRef } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import { Upload, AddBox, Key } from '@mui/icons-material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'

export default function UploadForm({ onUpload }) {
  const [arquivo, setArquivo] = useState(null)
  const arquivoInputRef = useRef(null)
  const [tempoHoras, setTempoHoras] = useState(24)
  const [senha, setSenha] = useState('')
  const [gerarSenha, setGerarSenha] = useState(false)
  const [senhaGerada, setSenhaGerada] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGerarSenha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    let s = ''
    for (let i = 0; i < 16; i++) s += chars[Math.floor(Math.random() * chars.length)]
    setSenhaGerada(s)
    setSenha(s)
    setGerarSenha(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!arquivo) return
    setLoading(true)
    try {
      await onUpload({ arquivo, tempoHoras, senha: senha || '' })
      setArquivo(null)
      setTempoHoras(24)
      setSenha('')
      setSenhaGerada('')
      setGerarSenha(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card sx={{ p: 3, mb: 4, boxShadow: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Upload fontSize="small" sx={{ color: 'primary.main' }} />
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Enviar Arquivo
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <InputLabel shrink>Arquivo</InputLabel>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                mb: 1,
              }}
              onClick={() => arquivoInputRef.current?.click()}
            >
              <AddBox fontSize="small" sx={{ display: 'block', mx: 'auto', mb: 1, color: 'grey.500' }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                Clique para selecionar o arquivo
              </Typography>
              <input
                ref={arquivoInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setArquivo(e.target.files[0])}
              />
              {arquivo && (
                <Typography variant="caption" color="primary" sx={{ mt: 1, fontWeight: 500 }}>
                  {arquivo.name} ({(arquivo.size / 1024 / 1024).toFixed(2)} MB)
                </Typography>
              )}
            </Box>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-BR">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <InputLabel shrink>Tempo de expiração (horas)</InputLabel>
              <TimePicker
                value={dayjs().hour(tempoHoras).minute(0).second(0).millisecond(0)}
                onChange={(newValue) => {
                  if (newValue) setTempoHoras(newValue.hour())
                }}
                slots={{ openPickerIcon: undefined }}
                sx={{ width: '100%', mb: 1 }}
                ampm={false}
              />
              <Typography variant="caption" color="text.secondary">
                Escolha a quantidade de horas até o arquivo expirar
              </Typography>
            </Box>
          </LocalizationProvider>

          <FormControlLabel
            control={
              <Checkbox
                checked={gerarSenha}
                onChange={() => setGerarSenha(!gerarSenha)}
                color="primary"
                sx={{ ml: -1 }}
              />
            }
            label="Exigir senha para baixar"
            labelPlacement="start"
          />

          {gerarSenha && (
            <Box sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 1, mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0 }}>
                <Key fontSize="small" sx={{ color: 'primary.main' }} />
                <Typography variant="caption" fontWeight="bold" color="primary.main">
                  Senha de acesso ao arquivo
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                <TextField
                  fullWidth
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite ou gere uma senha"
                  InputProps={{ readOnly: !!senhaGerada }}
                  sx={{ flex: 1 }}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleGerarSenha}
                  startIcon={<Key fontSize="small" />}
                  sx={{ minWidth: 'auto', whiteSpace: 'nowrap' }}
                >
                  Gerar senha forte
                </Button>
              </Box>
              {senhaGerada && (
                <Typography variant="caption" color="primary.main" sx={{ mt: 0.5 }}>
                  Senha gerada: {senhaGerada}
                </Typography>
              )}
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || !arquivo}
            sx={{ mt: 1 }}
          >
            {loading ? 'Enviando...' : 'Enviar Arquivo'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
