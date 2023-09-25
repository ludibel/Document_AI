import '@emotion/react'; 
import { CSSProperties } from 'react';
declare module '@emotion/react' {
  export interface Theme {
    palette: {
        primary: {
            [x: string]: Color | string[] |
            Color[] | undefined;
            main: CSSProperties['color']
            light: CSSProperties['color']
            dark: CSSProperties['color']
        }
        secondary: {
            main: CSSProperties['color']
            light: CSSProperties['color']
            dark: CSSProperties['color']
        }
        grey : {
            500: CSSProperties['color']
        }
    }
    spacing: number | string 
  }

}