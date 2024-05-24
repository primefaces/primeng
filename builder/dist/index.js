"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const core_1 = require("@angular-devkit/core");
const fs_1 = require("fs");
const _path = require("path");
exports.default = (0, architect_1.createBuilder)(styleBuilder);
const components = ['button'];
const variables = {
    'button.primary.color': 'red',
    'button.primary.background': 'blue'
};
const getKey = (value) => {
    return variables[value];
};
async function styleBuilder(options, ctx) {
    // builder logic
    ctx.logger.info('Building started');
    try {
        const componentsPath = `${(0, core_1.getSystemPath)((0, core_1.normalize)(ctx.workspaceRoot))}/src/app/components`;
        const components = (0, fs_1.readdirSync)(componentsPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name)
            .filter((folder) => {
            const _f = (0, fs_1.readdirSync)(_path.join(componentsPath, folder));
            return _f.some((file) => _path.extname(file) === '.css');
        });
        console.log(components);
        // const path = `${getSystemPath(normalize(ctx.workspaceRoot))}/`;
        // for (let component in components) {
        //     const _c = components[component];
        //     const { theme } = await import(`${path}/src/app/components/${_c}/style.ts`);
        //     writeFile(`${path}/src/app/components/${_c}/${_c}.css`, theme({ dt: (key) => `${getKey(key)}` }), (err) => {
        //         if (err) throw err;
        //         ctx.logger.info('File has been saved');
        //     });
        // }
    }
    catch (err) { }
    return { success: true };
}
