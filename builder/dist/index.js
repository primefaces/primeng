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
        for (let component in components) {
            const _c = components[component];
            if (_c === 'button') {
                const { theme } = await Promise.resolve(`${`${componentsPath}/${_c}/style.ts`}`).then(s => require(s));
                theme &&
                    (0, fs_1.writeFile)(`${componentsPath}/${_c}/${_c}.css`, theme({ dt: (key) => `${getKey(key)}` }), (err) => {
                        if (err)
                            throw err;
                    });
            }
        }
    }
    catch (err) { }
    return { success: true };
}
