import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#263238',
        },
        secondary: {
            main: '#2979ff',
        },
    },
    components: {
        MuiTooltip: {
            defaultProps: {
                arrow: true,
            }
        }
    }
};

export const theme = createTheme(themeOptions);