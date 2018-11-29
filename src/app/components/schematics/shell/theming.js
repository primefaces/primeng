"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("../utils/devkit-utils/config");
const ast_1 = require("../utils/ast");
function addThemeToAppStyles(options) {
    return function (host) {
        const workspace = config_1.getWorkspace(host);
        const project = config_1.getProjectFromWorkspace(workspace, options.project);
        assertDefaultProjectConfig(project);
        const themeName = options.theme;
        insertPrebuiltTheme(project, host, themeName, workspace);
        host.overwrite(ast_1.getStylesPath('', config_1.getProjectFromWorkspace(workspace)), "@import '../node_modules/primeng/resources/themes/" + themeName + "/theme.css';\n" +
            "@import '../node_modules/primeicons/primeicons.css';\n"
            + "@import '../node_modules/primeng/resources/primeng.min.css';\n");
        return host;
    };
}
exports.addThemeToAppStyles = addThemeToAppStyles;
function insertPrebuiltTheme(project, host, theme, workspace) {
    const themeFilePaths = [
        'node_modules/primeicons/primeicons.css',
        `node_modules/primeng/resources/themes/${theme}/theme.css`,
        'node_modules/primeng/resources/primeng.min.css'
    ];
    themeFilePaths.forEach(filePath => {
        if (project.architect) {
            addStyleToTarget(project.architect['build'], host, filePath, workspace);
            addStyleToTarget(project.architect['test'], host, filePath, workspace);
        }
        else {
            throw new schematics_1.SchematicsException(`${project.name} does not have an architect configuration`);
        }
    });
}
function addStyleToTarget(target, host, asset, workspace) {
    if (!target.options) {
        target.options = { styles: [asset] };
    }
    else if (!target.options.styles) {
        target.options.styles = [asset];
    }
    else {
        const existingStyles = target.options.styles.map((s) => typeof s === 'string' ? s : s.input);
        const hasGivenTheme = existingStyles.find((s) => s.includes(asset));
        if (!hasGivenTheme) {
            target.options.styles.splice(0, 0, asset);
        }
    }
    host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}
function assertDefaultProjectConfig(project) {
    if (!isProjectUsingDefaultConfig(project)) {
        throw new schematics_1.SchematicsException('Your project is not using the default configuration for ' +
            'build and test. The Prime NG schematics can only be used with the default ' +
            'configuration');
    }
}
function isProjectUsingDefaultConfig(project) {
    const defaultBuilder = '@angular-devkit/build-angular:browser';
    return project.architect &&
        project.architect['build'] &&
        project.architect['build']['builder'] === defaultBuilder &&
        project.architect['test'] &&
        project.architect['build']['builder'] === defaultBuilder;
}
//# sourceMappingURL=theming.js.map