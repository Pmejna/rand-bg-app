import React, {FC, useContext, useEffect, useState, useRef} from 'react';
import lottie from 'lottie-web/build/player/lottie_light';
import { ColorModeContext } from '../../context/ColorModeContext';
import animationData from '../../resources/lottie/dark-mode-lottie.json';
import {useTheme} from '@mui/material/styles';


export interface IThemeButton {

}

const ThemeModeButton: FC = () => {
    const theme = useTheme();
    const animationContainer = useRef(null);
    const anim: React.MutableRefObject<any> | null = useRef(null);
    const [open, setOpen] = useState(false);
    const {mode, toggleColorMode} = useContext(ColorModeContext);
    useEffect(() => {
        if (animationContainer.current) {
          anim.current = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData,
          });
    
          return () => anim.current?.destroy();
        }
      }, []);

    return (
        <div style={{position: 'relative'}}>
            <button 
                onClick={() => {
                    setOpen(!open);
                    anim.current?.setDirection(open ? -1 : 1);
                    anim.current?.play();
                    toggleColorMode()
                }}
                style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer', width: '80px', height: 'auto'}}
                ref={animationContainer} 
            >
            </button>
            <p style={{
                position: 'absolute',
                top: '80%',
                width: '100%',
                left: 0,
                margin: '0', 
                color: theme.palette.primary.main,
                fontSize: '12px',
                textAlign: 'center', 
            }}>
                {!open? 'Light Mode' : 'Dark Mode'}
            </p>
        </div>
    )
}

export default ThemeModeButton