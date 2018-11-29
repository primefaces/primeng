"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const schematics_1 = require("@angular-devkit/schematics");
exports.ANGULAR_CLI_WORKSPACE_PATH = '/angular.json';
/** Gets the Angular CLI workspace config (angular.json) */
function getWorkspace(host) {
    const configBuffer = host.read(exports.ANGULAR_CLI_WORKSPACE_PATH);
    if (configBuffer === null) {
        throw new schematics_1.SchematicsException('Could not find angular.json');
    }
    return JSON.parse(configBuffer.toString());
}
exports.getWorkspace = getWorkspace;
/**
 * Gets a project from the Angular CLI workspace. If no project name is given, the first project
 * will be retrieved.
 */
function getProjectFromWorkspace(config, projectName) {
    if (config.projects) {
        if (projectName) {
            const project = config.projects[projectName];
            if (!project) {
                throw new schematics_1.SchematicsException(`No project named "${projectName}" exists.`);
            }
            Object.defineProperty(project, 'name', { enumerable: false, value: projectName });
            return project;
        }
        // If there is exactly one non-e2e project, use that. Otherwise, require that a specific
        // project be specified.
        const allProjectNames = Object.keys(config.projects).filter(p => !p.includes('e2e'));
        if (allProjectNames.length === 1) {
            const project = config.projects[allProjectNames[0]];
            // Set a non-enumerable project name to the project. We need the name for schematics
            // later on, but don't want to write it back out to the config file.
            Object.defineProperty(project, 'name', { enumerable: false, value: projectName });
            return project;
        }
        else {
            throw new schematics_1.SchematicsException('Multiple projects are defined; please specify a project name');
        }
    }
    throw new schematics_1.SchematicsException('No projects are defined');
}
exports.getProjectFromWorkspace = getProjectFromWorkspace;
//# sourceMappingURL=config.js.map