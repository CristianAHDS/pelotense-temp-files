import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Chip,
} from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import UploadForm from './UploadForm'
import FileCard from './FileCard'
import LGPDNotice from './LGPDNotice'
import { useFiles } from '../contexts/FilesContext'

export default function AdminPanel({ logout }) {
  const { files, addFile, removeFile } = useFiles()
  const [loading, setLoading] = useState(false)

  const handleUpload = async (fileData) => {
    setLoading(true)
    addFile(fileData)
    setLoading(false)
  }

  const handleDelete = (id) => {
    if (!confirm('Deseja excluir este arquivo?')) return
    removeFile(id)
  }

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
              Pelotense Temp File
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Painel Administrativo
            </Typography>
          </Box>
          <Button
            onClick={logout}
            startIcon={<ExitToApp fontSize="small" />}
            color="error"
            variant="contained"
            size="small"
          >
            Sair
          </Button>
        </Box>

        <UploadForm onUpload={handleUpload} />

        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
            Arquivos Enviados
          </Typography>
          {files.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography color="text.secondary">
                Nenhum arquivo enviado ainda.
              </Typography>
            </Box>
          ) : (
            <List dense>
              {files.map((f) => (
                <FileCard key={f.id} file={f} onDelete={handleDelete} />
              ))}
            </List>
          )}
        </Box>

        <Box sx={{ mt: 6 }}>
          <LGPDNotice />
        </Box>
      </Container>
    </Box>
  )
}
