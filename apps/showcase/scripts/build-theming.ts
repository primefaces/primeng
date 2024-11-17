//@ts-ignore
const TypeDoc = require('typedoc');
//@ts-ignore
const path = require('path');
//@ts-ignore
const fs = require('fs');
//@ts-ignore
const rootDir = path.resolve(__dirname, '../');
//@ts-ignore
const outputPath = path.resolve(rootDir, '@/doc/apidoc');

// const staticMessages = {
//     methods: "Defines methods that can be accessed by the component's reference.",
//     emits: 'Defines emit that determine the behavior of the component based on a given condition or report the actions that the component takes.',
//     templates: 'Defines the templates used by the component.',
//     events: "Defines the custom events used by the component's emitters.",
//     interfaces: 'Defines the custom interfaces used by the module.',
//     types: 'Defines the custom types used by the module.',
//     props: 'Defines the input properties of the component.',
//     service: 'Defines the service used by the component',
// };

async function theming() {
    const app = await TypeDoc.Application.bootstrapWithPlugins({
        // typedoc options here
        name: 'PrimeNG',
        entryPoints: [`src/app/components/themes/types/accordion/`, `src/app/components/themes/types/panel/`],
        entryPointStrategy: 'expand',
        hideGenerator: true,
        excludeExternals: true,
        includeVersion: true,
        searchInComments: true,
        disableSources: false,
        logLevel: 'Error',
        sort: ['source-order'],
        exclude: ['node_modules', 'src/app/components/**/*spec.ts', 'src/app/components/**/*public_api.ts']
    });

    const project = await app.convert();
    await app.generateJson(project, `./api-generator/themedoc.json`);
    // console.log(project);
    if (project) {
        let doc = {};

        const parseText = (text) => {
            return text.replace(/&#123;/g, '{').replace(/&#125;/g, '}');
        };

        const getDeprecatedText = (signature) => {
            const deprecatedTag = signature?.comment?.getTag('@deprecated');
            return deprecatedTag ? parseText(deprecatedTag.content[0].text) : undefined;
        };

        const isProcessable = (value) => {
            return value && value.children && value.children.length;
        };

        const allowed = (name) => {
            return !name.includes('ts-helpers') && !name.includes('icons');
        };

        const modules = project.groups.find((g) => g.title === 'Modules');
        modules.children.forEach((child) => {
            const _name = child.name.split('/').pop();
            doc[_name] = {
                name: _name,
                properties: {}
            };

            child.groups.forEach((group) => {
                // console.log(group.children);
            });
        });

        let mergedDocs = {};

        for (const key in doc) {
            if (!mergedDocs[key]) {
                mergedDocs[key] = {
                    ...doc[key]
                };
            }
        }

        const typedocJSON = JSON.stringify(mergedDocs, null, 4);

        !fs.existsSync(outputPath) && fs.mkdirSync(outputPath);
        fs.writeFileSync(path.resolve(outputPath, 'index.json'), typedocJSON);
    }
}

theming().catch(console.error);
