import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

const WhatsAppButton = styled(IconButton)({
  position: 'fixed',
  bottom: '20px',
  right: '18px',
  backgroundColor: '#25D366',
  color: '#ffffff',
  borderRadius: '50%',
  width: '55px',
  height: '55px',
  '&:hover': {
    backgroundColor: '#ffffff',
    color: '#25D366',

  },
});



export function Whatsapp() {
  return (
    <a
      href="https://wa.me/2994654519"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={{ textDecoration: 'none' }}
    >
      <WhatsAppButton>
        <WhatsAppIcon style={{ fontSize: 35 }} />
      </WhatsAppButton>
    </a>
  );
}