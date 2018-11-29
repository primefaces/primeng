"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const ast_1 = require("../utils/ast");
const lib_versions_1 = require("../utils/lib-versions");
const package_1 = require("../utils/package");
const config_1 = require("../utils/devkit-utils/config");
const theming_1 = require("./theming");
function default_1(options) {
    return schematics_1.chain([
        options && options.skipPackageJson ? schematics_1.noop() : addPrimengToPackageJson(),
        theming_1.addThemeToAppStyles(options),
        addAnimationRootConfig(options)
    ]);
}
exports.default = default_1;
function addPrimengToPackageJson() {
    return (host, context) => {
        package_1.addPackageToPackageJson(host, 'dependencies', 'primeng', lib_versions_1.primengVersion);
        package_1.addPackageToPackageJson(host, 'dependencies', 'primeicons', lib_versions_1.primeiconsVersion);
        package_1.addPackageToPackageJson(host, 'dependencies', '@angular/animations', lib_versions_1.angularAnimationsVersion);
        context.addTask(new tasks_1.NodePackageInstallTask());
        return host;
    };
}
function addAnimationRootConfig(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = config_1.getProjectFromWorkspace(workspace, options.project);
        ast_1.addModuleImportToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);
        return host;
    };
}
//# sourceMappingURL=index.js.map