
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import InstagramIcon from '@mui/icons-material/Instagram';
import { animateScroll as scroll} from "react-scroll";
import { useEffect, useState } from 'react';

const InstagramButton = styled(IconButton)({
  position: 'fixed',
  bottom: '100px',
  right: '18px',
  background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  color: '#ffffff',
  borderRadius: '50%',
  width: '55px',
  height: '55px',
  '&:hover': {
    transition: 'all 0.3s ease',
    background: '#ffffff',
    color: "#f09433",
  },
});



export function Instagram() {

    const [visible, setVisible] = useState(false)

    const onClickUp = () => {
        scroll.scrollToTop();
     }

     const toggleVisibility = () => {
        if (window.pageYOffset > window.innerHeight / 2) {
            setVisible(true)
        } else {
            setVisible(false)
        }
     }

     useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return() => {
            window.removeEventListener('scroll',toggleVisibility)
        }
     },[])

     
  return (
    <a
    href="https://www.instagram.com/psicologaintegral_sabrinaramos" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ display: visible ? 'block' : 'none' }}
    aria-label="Instagram"
    >
      <InstagramButton >
        <InstagramIcon style={{ fontSize: 35 }} onClick={onClickUp}/>
      </InstagramButton>
    </a>
  );
}