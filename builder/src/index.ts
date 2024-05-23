import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject, getSystemPath, normalize } from '@angular-devkit/core';
import { writeFile } from 'fs';

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
        const path = `${getSystemPath(normalize(ctx.workspaceRoot))}/`;

        for (let component in components) {
            const _c = components[component];
            const { theme } = await import(`${path}/src/app/components/${_c}/style.ts`);
            writeFile(`${path}/src/app/components/${_c}/${_c}.css`, theme({ dt: (key) => `${getKey(key)}` }), (err) => {
                if (err) throw err;
                ctx.logger.info('File has been saved');
            });
        }
    } catch (err) {}
    return { success: true };
}
