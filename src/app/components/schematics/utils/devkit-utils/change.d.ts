/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export interface Host {
    write(path: string, content: string): Promise<void>;
    read(path: string): Promise<string>;
}
export interface Change {
    apply(host: Host): Promise<void>;
    readonly path: string | null;
    readonly order: number;
    readonly description: string;
}
/**
 * An operation that does nothing.
 */
export declare class NoopChange implements Change {
    description: string;
    order: number;
    path: null;
    apply(): Promise<void>;
}
/**
 * Will add text to the source code.
 */
export declare class InsertChange implements Change {
    path: string;
    pos: number;
    toAdd: string;
    order: number;
    description: string;
    constructor(path: string, pos: number, toAdd: string);
    /**
     * This method does not insert spaces if there is none in the original string.
     */
    apply(host: Host): Promise<void>;
}
/**
 * Will remove text from the source code.
 */
export declare class RemoveChange implements Change {
    path: string;
    private pos;
    private toRemove;
    order: number;
    description: string;
    constructor(path: string, pos: number, toRemove: string);
    apply(host: Host): Promise<void>;
}
/**
 * Will replace text from the source code.
 */
export declare class ReplaceChange implements Change {
    path: string;
    private pos;
    private oldText;
    private newText;
    order: number;
    description: string;
    constructor(path: string, pos: number, oldText: string, newText: string);
    apply(host: Host): Promise<void>;
}
