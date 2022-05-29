import {createTheme, ThemeOptions} from "@mui/material";
import {blue, indigo, yellow} from "@mui/material/colors";

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: yellow[500],
        },
        background: {
            default: '#ffffff',
        },
        divider: 'rgba(0,0,0,0.08)',
    },
    typography: {
        fontFamily: [
            '"Source Sans Pro"',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontWeightMedium: 600,
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                color: 'primary',
            },
            styleOverrides: {
                root: () => ({
                    backgroundColor: indigo['A700'],
                    boxShadow: 'none',
                    zIndex: 999
                })
            }
        },
        MuiTooltip: {
            defaultProps: {
                arrow: true,
            }
        }
    }
};

export const theme = createTheme(themeOptions);