import { Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { Project } from './devkit-utils/config';
/** Reads file given path and returns TypeScript source file. */
export declare function getSourceFile(host: Tree, path: string): ts.SourceFile;
/** Import and add module to root app module. */
export declare function addModuleImportToRootModule(host: Tree, moduleName: string, src: string, project: Project): void;
/**
 * Import and add module to specific module path.
 * @param host the tree we are updating
 * @param modulePath src location of the module to import
 * @param moduleName name of module to import
 * @param src src location to import
 */
export declare function addModuleImportToModule(host: Tree, modulePath: string, moduleName: string, src: string): void;
/** Gets the app index.html file */
export declare function getIndexHtmlPath(_: any, project: Project): string;
/** Get the root stylesheet file. */
export declare function getStylesPath(_: any, project: Project): string;
/** Wraps the internal find module from options with undefined path handling  */ 
export declare function findModuleFromOptions(host: Tree, options: any): import("../../../../../node_modules/@angular-devkit/core/src/virtual-fs/path").Path | undefined;
