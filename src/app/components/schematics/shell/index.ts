import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addModuleImportToRootModule } from '../utils/ast';
import { primengVersion, primeiconsVersion, angularAnimationsVersion } from '../utils/lib-versions';
import { addPackageToPackageJson } from '../utils/package';
import { getProjectFromWorkspace, getWorkspace } from '../utils/devkit-utils/config';
import { Schema } from './schema';
import { addThemeToAppStyles } from './theming';


export default function (options: Schema): Rule {
    return chain([
        options && options.skipPackageJson ? noop() : addPrimengToPackageJson(),
        addThemeToAppStyles(options),
        addAnimationRootConfig(options)
    ]);
}

function addPrimengToPackageJson() {
    return (host: Tree, context: SchematicContext) => {
        addPackageToPackageJson(host, 'dependencies', 'primeng', primengVersion);
        addPackageToPackageJson(host, 'dependencies', 'primeicons', primeiconsVersion);
        addPackageToPackageJson(host, 'dependencies', '@angular/animations', angularAnimationsVersion);
        context.addTask(new NodePackageInstallTask());
        return host;
    };
}

function addAnimationRootConfig(options: Schema) {
    return (host: Tree) => {
        const workspace = getWorkspace(host);
        const project = getProjectFromWorkspace(workspace, options.project);

        addModuleImportToRootModule(
            host,
            'BrowserAnimationsModule',
            '@angular/platform-browser/animations',
            project);

        return host;
    };
}

