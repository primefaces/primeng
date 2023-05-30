//@ts-ignore
const TypeDoc = require('typedoc');
//@ts-ignore
const path = require('path');
//@ts-ignore
const fs = require('fs');
//@ts-ignore
const rootDir = path.resolve(__dirname, '../');
//@ts-ignore
const outputPath = path.resolve(rootDir, 'src/app/showcase/doc/apidoc');

const staticMessages = {
    methods: "Defines methods that can be accessed by the component's reference.",
    emits: 'Defines emit that determine the behavior of the component based on a given condition or report the actions that the component takes.',
    templates: 'Defines the templates used by the component.',
    events: "Defines the custom events used by the component's emitters.",
    interfaces: 'Defines the custom interfaces used by the module.',
    types: 'Defines the custom types used by the module.',
    properties: 'Defines the input properties of the component.'
};
const app = new TypeDoc.Application();

// If you want TypeDoc to load tsconfig.json / typedoc.json files
app.options.addReader(new TypeDoc.TSConfigReader());
app.options.addReader(new TypeDoc.TypeDocReader());

app.bootstrap({
    // typedoc options here
    name: 'PrimeNG',
    entryPoints: [`src/app/components/dropdown/`],
    entryPointStrategy: 'expand',
    hideGenerator: true,
    excludeExternals: true,
    includeVersion: true,
    searchInComments: true,
    disableSources: true,
    logLevel: 'Error',
    sort: ['source-order'],
    exclude: ['node_modules', 'src/app/components/**/*spec.ts', 'src/app/components/**/*public_api.ts']
});

const project = app.convert();
app.generateJson(project, `./api-generator/typedoc.json`);

function extractValues(children, arg) {
    const propsChildren = [];

    if (children) {
        children.forEach((child) => {
            const { groups, children: nestedChildren } = child;

            if (groups) {
                const propsGroup = groups.find((group) => group.title === arg);
                if (propsGroup) {
                    propsChildren.push(...propsGroup.children);
                }
            }

            if (nestedChildren) {
                const nestedPropsChildren = extractValues(nestedChildren, arg);
                propsChildren.push(...nestedPropsChildren);
            }
        });
        return Array.from(new Set(propsChildren));
    }
}

if (project) {
    let doc = {};

    const parseText = (text) => {
        return text.replace(/&#123;/g, '{').replace(/&#125;/g, '}');
    };

    project.children.forEach((child) => {
        let { name, children, comment } = child;

        doc[name] = {
            description: '',
            components: {},
        };
        
        const description = comment && comment.summary.map((s) => s.text || '').join(' ');

        const props_group = extractValues(children, 'Props');
        const emits_group = extractValues(children, 'Emits');
        const templates_group = name.includes('interface') ? extractValues(project.children, 'Templates') : undefined;
        const methods_group = extractValues(children, 'Method');
        const types_group = extractValues(children, 'Types');
        const events_group = name.includes('interface') ? extractValues(project.children, 'Events') : undefined;
        const components_group = (!name.includes('interface') && !name.includes('Module')) ? extractValues(project.children, 'Components') : undefined;

        if(components_group) {
            components_group.forEach((component) => {
                const componentName = component.name;
                const componentComment = component.comment;

                const componentDescription = componentComment && componentComment.summary.map((s) => s.text || '').join(' ');
                
                doc[name]['description'] = componentDescription.split('.').slice(0,1).join('');
                doc[name]['components'][componentName] = {
                    description: componentDescription
                };

                if (props_group) {
                    const props = {
                        description: staticMessages['props'],
                        values: []
                    };

                    props_group.forEach((prop) => {
                        props.values.push({
                            parent: prop.parent ? prop.parent.name : undefined,
                            name: prop.name,
                            optional: prop.flags.isOptional,
                            readonly: prop.flags.isReadonly,
                            type: 'prop.type', //TODO: make it meaningful -> getType?
                            default: prop.comment && prop.comment.getTag('@defaultValue') ? prop.comment.getTag('@defaultValue').content[0].text : '',
                            description: prop.comment && prop.comment.summary.map((s) => s.text || '').join(' '),
                            deprecated: prop.comment && prop.comment.getTag('@deprecated') ? parseText(prop.comment.getTag('@deprecated').content[0].text) : undefined
                        });
                    });

                    doc[name]['components'][componentName]['props'] = props;
                }

                if (emits_group) {
                    let emits = {
                        description: staticMessages['emits'],
                        values: []
                    };

                    emits_group.forEach((emitter) => {
                        emits.values.push({
                            parent: emitter.parent ? emitter.parent.name : undefined,
                            name: emitter.name,
                            parameters: 'emitter.type',
                            description: emitter.comment && emitter.comment.summary.map((s) => s.text || '').join(' '),
                            returnType: 'void', //TODO: make it meaningful
                            deprecated: emitter.comment && emitter.comment.getTag('@deprecated') ? parseText(emitter.comment.getTag('@deprecated').content[0].text) : undefined
                        });
                    });

                    doc[name]['components'][componentName]['emits'] = emits;
                }

                if (methods_group) {
                    let methods = {
                        description: staticMessages['methods'],
                        values: []
                    };

                    methods_group.forEach((method) => {
                        const signature = method.getAllSignatures()[0];
                        methods.values.push({
                            parent: method.parent ? method.parent.name : undefined,
                            name: signature.name,
                            parameters: signature.parameters.map((param) => {
                                return {
                                    name: param.name,
                                    type: param.type.toString(),
                                    description: param.comment && param.comment.summary.map((s) => s.text || '').join(' ')
                                };
                            }),
                            returnType: signature.type.toString(),
                            description: signature.comment && signature.comment.summary.map((s) => s.text || '').join(' ')
                        });
                    });

                    doc[name]['components'][componentName]['methods'] = methods;
                }
            });
        }

        if(events_group) {
            let events = {
                description: staticMessages['events'],
                values: []
            };
    
            let parentName = '';
            events_group.forEach((event) => {
                parentName = event.parent.name.split('.').slice(0,1).join('');
                events.values.push({
                    name: event.name,
                    description: event.comment && event.comment.summary.map((s) => s.text || '').join(' '),
                    props:
                        event.children &&
                        event.children.map((child) => ({
                            name: child.name,
                            optional: child.flags.isOptional,
                            readonly: child.flags.isReadonly,
                            type: child.type.toString(),
                            description: child.comment && child.comment.summary.map((s) => s.text || '').join(' '),
                            deprecated: child.comment && child.comment.getTag('@deprecated') ? parseText(child.comment.getTag('@deprecated').content[0].text) : undefined
                        }))
                });
            });

            if(doc[name]){
                doc[name]['events'] = events;
            }
        }

        if(templates_group){
            let templates = {
                description: staticMessages['templates'],
                values: []
            };
            templates_group.forEach((template) => {
                const parent = template.parent ? template.parent.name : undefined;
                template.children.forEach((child) => {
                    const signature = child.getAllSignatures()[0];
                    templates.values.push({
                        parent: parent,
                        name: signature ? signature.name : child.name,
                        parameters: signature.parameters.map((param) => {
                            let type = param.type.toString();

                            if (param.type.declaration) {
                                type = '';

                                if (param.type.declaration.children) {
                                    param.type.declaration.children.forEach((child) => {
                                        if (child.signatures) {
                                            const childSignature = child.signatures[0];
                                            const parameters = childSignature.parameters.reduce((acc, { name, type }, index) => (index === 0 ? `${name}: ${type.name}` : `${acc}, ${name}: ${type.name}`), '');
                                            type += ` \t ${childSignature.name}(${parameters}): ${childSignature.type?.name}, // ${childSignature.comment?.summary[0]?.text}\n `;
                                        } else {
                                            const childType = child.type.elementType ? child.type.elementType.name : child.type.name;

                                            type += ` \t ${child.name}: ${childType}, // ${child.comment?.summary[0]?.text}\n `;
                                        }
                                    });
                                }
                            }

                            return {
                                name: param.name,
                                type: type,
                                description: param.comment && param.comment.summary.map((s) => s.text || '').join(' ')
                            };
                        }),
                        returnType: signature ? signature.type?.name : child.type.toString(),
                        description: signature.comment && signature.comment.summary.map((s) => s.text || '').join(' ')
                    });
                });
            });

            if(doc[name]){
                doc[name]['templates'] = templates;
            }
        }

        if(types_group){

        }

    });
    const typedocJSON = JSON.stringify(doc, null, 4);

    !fs.existsSync(outputPath) && fs.mkdirSync(outputPath);
    fs.writeFileSync(path.resolve(outputPath, 'index.json'), typedocJSON);
}