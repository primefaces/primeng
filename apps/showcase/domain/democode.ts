import { Code, ExtFile, RouteFile } from './code';

export interface DemoMetadata {
    services: string[];
    extFiles: ExtFile[];
    routeFiles?: RouteFile[];
    imports: string[];
}

export interface Demo {
    selector: string;
    component: string;
    section: string;
    code: Code;
    metadata: DemoMetadata;
}

export interface DemosJson {
    version: string;
    generatedAt: string;
    totalDemos: number;
    demos: { [selector: string]: Demo };
}
