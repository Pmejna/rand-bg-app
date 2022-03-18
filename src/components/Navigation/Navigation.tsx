import React, {useContext} from 'react';
import { styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {ColorModeContext, modeColors} from '../../context/ColorModeContext';
import SvgIcon from '../SvgIcons/SvgIcon';

const drawerOpenWidth = 180;
const drawerClosedWidth = 70;

interface IAppBarProps extends MuiAppBarProps {
  open?: boolean;
  mode?: string;
}

interface IDrawerHeaderProps {
  open?: boolean;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  // width: `calc(100% - 70px)`,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `0`,
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // width: `calc(100% - ${drawerOpenWidth}px)`,
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<IAppBarProps>(({ theme, open, mode }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "transparent",
  boxShadow: "none",
  marginLeft: drawerClosedWidth, 
    width: `calc(100% - 70px)`,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerOpenWidth,
    width: `calc(100% - ${drawerOpenWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div',{
  shouldForwardProp: (prop) => prop !== 'open',
})<IDrawerHeaderProps>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerOpenWidth,
    width: `calc(100% - ${drawerOpenWidth}px)`,
    
  }),
}));

const DrawerBody = styled(Drawer,{
  shouldForwardProp: (prop) => prop !== 'open',
})<IDrawerHeaderProps>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerOpenWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Navigation(props: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {mode, toggleColorMode} = useContext(ColorModeContext);

  const handleDrawerToggle = (): void => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        open={open} 
        mode={mode}
        sx={{background: 'transparent'}}
      >
        <Toolbar style={{justifyContent: "flex-end"}}>
          <SvgIcon
            aria-label="open drawer"
            onClick={toggleColorMode}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
          </SvgIcon>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleColorMode}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            gfdg
          </IconButton> */}
          <Typography variant="h6" noWrap component="div" color="primary">
            Logo
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerBody
        sx={{
          width: open ? drawerOpenWidth : drawerClosedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerOpenWidth : drawerClosedWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader open={open}>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {['Admin', 'Products', 'Sales', 'Orders'].map((text, index) => (
            <ListItemButton 
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText 
                primary={text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </DrawerBody>
      <Main open={open}>
        <DrawerHeader />
        {props.children ? props.children : null}
      </Main>
    </Box>
  );
}