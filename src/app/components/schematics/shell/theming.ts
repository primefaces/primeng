import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace, getWorkspace, Project, Workspace } from '../utils/devkit-utils/config';
import { Schema } from './schema';
import { getStylesPath } from '../utils/ast';


export function addThemeToAppStyles(options: Schema): (host: Tree) => Tree {
    return function (host: Tree): Tree {
        const workspace = getWorkspace(host);
        const project = getProjectFromWorkspace(workspace, options.project);


        assertDefaultProjectConfig(project);

        const themeName = options.theme;
        insertPrebuiltTheme(project, host, themeName, workspace);
        host.overwrite(getStylesPath('', getProjectFromWorkspace(workspace)), "@import '../node_modules/primeng/resources/themes/" + themeName + "/theme.css';\n" +
            "@import '../node_modules/primeicons/primeicons.css';\n"
            + "@import '../node_modules/primeng/resources/primeng.min.css';\n"
        );
        return host;
    };
}

function insertPrebuiltTheme(project: Project, host: Tree, theme: string, workspace: Workspace) {
    const themeFilePaths = [
        'node_modules/primeicons/primeicons.css',
        `node_modules/primeng/resources/themes/${theme}/theme.css`,
        'node_modules/primeng/resources/primeng.min.css'
    ];

    themeFilePaths.forEach(filePath => {
        if (project.architect) {
            addStyleToTarget(project.architect['build'], host, filePath, workspace);
            addStyleToTarget(project.architect['test'], host, filePath, workspace);
        } else {
            throw new SchematicsException(`${project.name} does not have an architect configuration`);
        }
    });
}

function addStyleToTarget(target: any, host: Tree, asset: string, workspace: Workspace) {

    if (!target.options) {
        target.options = { styles: [asset] };
    } else if (!target.options.styles) {
        target.options.styles = [asset];
    } else {
        const existingStyles = target.options.styles.map((s: any) => typeof s === 'string' ? s : s.input);
        const hasGivenTheme = existingStyles.find((s: any) => s.includes(asset));

        if (!hasGivenTheme) {
            target.options.styles.splice(0, 0, asset);
        }
    }
    host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}

function assertDefaultProjectConfig(project: Project) {
    if (!isProjectUsingDefaultConfig(project)) {
        throw new SchematicsException('Your project is not using the default configuration for ' +
            'build and test. The Prime NG schematics can only be used with the default ' +
            'configuration');
    }
}

function isProjectUsingDefaultConfig(project: Project) {
    const defaultBuilder = '@angular-devkit/build-angular:browser';

    return project.architect &&
        project.architect['build'] &&
        project.architect['build']['builder'] === defaultBuilder &&
        project.architect['test'] &&
        project.architect['build']['builder'] === defaultBuilder;
}
