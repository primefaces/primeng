"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const core_1 = require("@angular-devkit/core");
const fs_1 = require("fs");
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
        const path = `${(0, core_1.getSystemPath)((0, core_1.normalize)(ctx.workspaceRoot))}/`;
        for (let component in components) {
            const _c = components[component];
            const { theme } = await Promise.resolve(`${`${path}/src/app/components/${_c}/style.ts`}`).then(s => require(s));
            (0, fs_1.writeFile)(`${path}/src/app/components/${_c}/${_c}.css`, theme({ dt: (key) => `${getKey(key)}` }), (err) => {
                if (err)
                    throw err;
                ctx.logger.info('File has been saved');
            });
        }
    }
    catch (err) { }
    return { success: true };
}
