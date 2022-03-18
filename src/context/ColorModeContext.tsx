import {
    createContext,
    useContext,
    useState,
    useMemo,
    FC
} from 'react';
import {createTheme, ThemeProvider} from '@mui/material';
import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    iconColor: string;
    drawerBgColor: string;
  }
}

export const modeColors = {
    textLight: "#1C0B24",
    bgMainLight: "#F1F1F2",
    bgSideBarLight: "#fff",
    textDark: "#E4D8E9",
    bgMainDark: "#181827",
    bgSideBarDark: "#262033",
    iconLight: "#4C50C9",
    iconDark: "#3946FF"
}

interface IColorModeContext {
    toggleColorMode: () => void;
    mode: "dark" | "light";
}

export const ColorModeContext = createContext<IColorModeContext>({
    toggleColorMode: () => {},
    mode: "light"
});

interface Props {
    // any upcoming props here
}

export const ColorModeContextProvider: FC<Props> = ({children}) => {
    const [mode, setMode] = useState<IColorModeContext["mode"]>("light");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
            },
            mode
        }),
        [mode]
    );

    const theme = useMemo( () => (
        createTheme({
            palette: {
                mode,
                ...(mode === "light" ? {
                    primary: {
                        main: modeColors.textLight,
                        contrastText: '#fff',
                    },
                    common: {
                        iconColor: modeColors.iconLight,
                        drawerBgColor: modeColors.bgSideBarLight
                    },
                    secondary: {
                        main: "#000"
                    },
                    background: {
                        default: modeColors.bgMainLight
                    }
                } : {
                    primary: {
                        main: '#FCFBFF',
                        contrastText: '#fff'
                    },
                    secondary: {
                        main: "#000"
                    },
                    common: {
                        iconColor: modeColors.iconDark,
                        drawerBgColor: modeColors.bgSideBarDark
                    },
                    background: {
                        default: modeColors.bgMainDark
                    }
                }),
                
            },
            typography: {
                h3: {
                    fontFamily: "roboto",
                },
                h4: {
                    fontFamily: "roboto"
                },
                h5: {
                    color: "#43543"
                },
            },
            components: {
                MuiPaper: {
                    styleOverrides: {
                        elevation1: {
                            boxShadow: "none"
                        },
                        rounded: {
                            borderRadius: 12,
                        },
                    },
                },
            },
        })
    ), [mode])

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    )
};

export const useColorMode = () => useContext(ColorModeContext);