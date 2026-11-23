import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { ShieldOutlined, PrivacyTipOutlined } from '@mui/icons-material'

export default function LGPDNotice() {
  return (
    <Card sx={{ mt: 4, p: 0 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <ShieldOutlined sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2" fontWeight="bold" color="primary.dark">
            LGPD - Lei Geral de Proteção de Dados
          </Typography>
        </Box>
        <List dense sx={{ mb: 0 }}>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
              <PrivacyTipOutlined fontSize="small" sx={{ color: 'action.active' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" color="text.secondary">
                  Arquivos são armazenados temporariamente no navegador e excluídos automaticamente após o prazo definido.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
              <PrivacyTipOutlined fontSize="small" sx={{ color: 'action.active' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" color="text.secondary">
                  O administrador pode excluir arquivos a qualquer momento pelo painel.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
              <PrivacyTipOutlined fontSize="small" sx={{ color: 'action.active' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" color="text.secondary">
                  Senhas de arquivo são armazenadas no navegador para controle de acesso.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
              <PrivacyTipOutlined fontSize="small" sx={{ color: 'action.active' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" color="text.secondary">
                  Não coletamos dados pessoais dos visitantes que baixam arquivos via link público.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
              <PrivacyTipOutlined fontSize="small" sx={{ color: 'action.active' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" color="text.secondary">
                  Para solicitar exclusão de dados ou exercer direitos LGPD, entre em contato pelo e-mail do administrador.
                </Typography>
              }
            />
          </ListItem>
        </List>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: 'block' }}
        >
          <strong>Aviso de segurança:</strong> este sistema roda totalmente no frontend (sem backend). Os dados ficam
          armazenados apenas na sessão do navegador e são perdidos ao limpar o cache ou fechar o navegador.
        </Typography>
      </CardContent>
    </Card>
  )
}
