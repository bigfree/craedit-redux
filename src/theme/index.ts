import {createTheme, ThemeOptions} from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#6a1b9a',
        },
        secondary: {
            main: '#64b5f6',
        },
        background: {
            default: '#f1f1f1',
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
                color: 'default',
            },
        },
        MuiTooltip: {
            defaultProps: {
                arrow: true,
            }
        }
    }
};

export const theme = createTheme(themeOptions);