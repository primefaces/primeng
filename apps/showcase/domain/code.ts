export interface Code {
    basic?: string;
    html?: string;
    typescript?: string;
    command?: string;
    scss?: string;
    data?: string;
    module?: string;
    routerModule?: string;
    component?: string;
    service?: string[];
    imports?: string[];
    extFiles?: ExtFile[];
}

export interface ExtFile {
    path: string;
    content: string;
}

export interface RouteFile extends ExtFile {
    name: string;
}
