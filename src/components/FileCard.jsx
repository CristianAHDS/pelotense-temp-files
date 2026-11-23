import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Avatar,
} from '@mui/material';
import {
  FileDownload,
  AccessTime,
  LockOutlined,
  LinkOutlined,
  ContentCopy,
  Delete,
} from '@mui/icons-material';

export default function FileCard({ file, onDelete }) {
  const expiraEm = new Date(file.expiraEm).toLocaleString('pt-BR');
  const url = `${window.location.origin}?id=${file.id}`;
  const temSenha = !!file.senha;
  const [copiado, setCopiado] = useState(false);

  const copiarLink = () => {
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <ListItem
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 1,
        mb: 1.5,
        border: '1px solid',
        borderColor: 'divider',
      }}
      disablePadding
    >
      <ListItemAvatar sx={{ mr: 2 }}>
        <Avatar sx={{ bgcolor: 'grey.200' }}>
          <FileDownload fontSize="small" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight="600">
            {file.nome}
          </Typography>
        }
        secondary={
          <Typography variant="caption" color="text.secondary">
            {(file.tamanho / 1024 / 1024).toFixed(2)} MB &bull;{' '}
            {file.tipo || 'arquivo'}
          </Typography>
        }
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
          <AccessTime
            fontSize="small"
            sx={{ mr: 0.5, verticalAlign: 'middle' }}
          />
          Expira em {expiraEm}
        </Typography>
      </Box>
      {temSenha && (
        <Chip
          style={{ marginRight: 130 }}
          label="Com senha"
          size="small"
          color="warning"
          variant="outlined"
          sx={{ mr: 1 }}
        />
      )}
      <ListItemSecondaryAction>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <IconButton size="small" color="primary" title="Abrir link público">
              <LinkOutlined fontSize="small" />
            </IconButton>
          </a>
          <IconButton
            size="small"
            onClick={copiarLink}
            title={copiado ? 'Copiado!' : 'Copiar link'}
            sx={{ color: copiado ? 'success.main' : 'action.active' }}
          >
            <ContentCopy fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(file.id, file.downloadUrl)}
            color="error"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
