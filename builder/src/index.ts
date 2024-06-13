import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject, getSystemPath, normalize } from '@angular-devkit/core';
import { writeFile, readdirSync } from 'fs';
import * as _path from 'path';

interface Options extends JsonObject {
    source: string;
    destination: string;
}

export default createBuilder(styleBuilder);

const components = ['button'];

const variables = {
    'button.primary.color': 'red',
    'button.primary.background': 'blue'
};

const getKey = (value) => {
    return variables[value];
};

async function styleBuilder(options: Options, ctx: BuilderContext): Promise<BuilderOutput> {
    // builder logic
    ctx.logger.info('Building started');
    try {
        const componentsPath = `${getSystemPath(normalize(ctx.workspaceRoot))}/src/app/components`;
        const components = readdirSync(componentsPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name)
            .filter((folder) => {
                const _f = readdirSync(_path.join(componentsPath, folder));
                return _f.some((file) => _path.extname(file) === '.css');
            });

        for (let component in components) {
            const _c = components[component];
            if (_c === 'button') {
                const { theme } = await import(`${componentsPath}/${_c}/style.ts`);
                theme &&
                    writeFile(`${componentsPath}/${_c}/${_c}.css`, theme({ dt: (key) => `${getKey(key)}` }), (err) => {
                        if (err) throw err;
                    });
            }
        }
    } catch (err) {}
    return { success: true };
}
