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

async function themedoc() {
    const app = await TypeDoc.Application.bootstrapWithPlugins({
        // themedoc options here
        name: 'PrimeNG',
        entryPoints: [`src/app/components/themes/types/`],
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
    if (project) {
        let doc = {};

        const parseText = (text) => {
            return text.replace(/&#123;/g, '{').replace(/&#125;/g, '}');
        };

        project.children.forEach((module) => {
            const { name, comment } = module;
            const componentName = name.split('/').slice(1).join('-');

            const description = comment && comment.summary.map((s) => s.text || '').join(' ');
            doc[componentName] = {
                description
            };

            const module_interfaces_group = module.groups.find((g) => g.title === 'Interfaces');
            const tokens = [];
            module_interfaces_group.children.forEach((_interface) => {
                if (!doc[componentName]['tokens']) {
                    doc[componentName]['tokens'] = {
                        description: 'Tokens Description',
                        values: {}
                    };

                    const setTokens = (_declaration, _name) => {
                        if (_declaration?.groups) {
                            const event_props_group = _declaration.groups.find((g) => g.title === 'Properties');

                            event_props_group &&
                                event_props_group.children.forEach((prop) => {
                                    if (prop.type?.declaration) {
                                        setTokens(prop.type?.declaration, prop.name);
                                    } else if (prop.comment?.getTag('@designToken')) {
                                        const variable = prop.comment.getTag('@designToken').content[0]?.text || '';
                                        tokens.push({
                                            token: _name ? `${_name}.${prop.name}` : prop.name,
                                            variable: '--p-' + variable.replaceAll('.', '-'),
                                            description:
                                                prop.comment &&
                                                prop.comment.summary
                                                    .map((s) => {
                                                        if (s.text.indexOf('[here]') > -1) {
                                                            return `${s.text.slice(0, s.text.indexOf('[here]'))} <a target="_blank" href="${s.text.slice(s.text.indexOf('(') + 1, s.text.indexOf(')'))}">here</a> ${s.text.slice(s.text.indexOf(')') + 1)}`;
                                                        }

                                                        return s.text || '';
                                                    })
                                                    .join(' '),
                                            deprecated: prop.comment && prop.comment.getTag('@deprecated') ? parseText(prop.comment.getTag('@deprecated').content[0]?.text) : undefined
                                        });
                                    }
                                });
                        }
                    };

                    setTokens(_interface, _interface.name);
                }
            });
            doc[componentName]['tokens'] = tokens;
        });

        const themedocJSON = JSON.stringify(doc, null, 4);

        !fs.existsSync(outputPath) && fs.mkdirSync(outputPath);
        fs.writeFileSync(path.resolve(outputPath, 'themedoc.json'), themedocJSON);
    }
}

themedoc().catch(console.error);
