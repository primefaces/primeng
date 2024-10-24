export interface AppConfig {
    inputStyle?: string;
    darkMode?: boolean;
    theme?: string;
    ripple?: boolean;
    scale?: number;
    tableTheme?: string;
    direction?: TextDirection;
}

export type TextDirection = 'ltr' | 'rtl';
