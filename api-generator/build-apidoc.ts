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
    props: 'Defines the input properties of the component.',
    service: 'Defines the service used by the component'
};

async function main() {
    const app = await TypeDoc.Application.bootstrapWithPlugins({
        // typedoc options here
        name: 'PrimeNG',
        entryPoints: [`src/app/components/`],
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
    await app.generateJson(project, `./api-generator/typedoc.json`);

    if (project) {
        let doc = {};

        const parseText = (text) => {
            return text.replace(/&#123;/g, '{').replace(/&#125;/g, '}');
        };

        const getDeprecatedText = (signature) => {
            const deprecatedTag = signature?.comment?.getTag('@deprecated');
            return deprecatedTag ? parseText(deprecatedTag.content[0].text) : undefined;
        };

        const modules = project.groups.find((g) => g.title === 'Modules');

        if (isProcessable(modules)) {
            modules.children.forEach((module) => {
                const name = module.name.replace(/.*\//, '');
                if (allowed(name)) {
                    if (module.groups) {
                        if (!doc[name]) {
                            doc[name] = {
                                components: {}
                            };
                        }
                        const module_components_group = module.groups.find((g) => g.title === 'Components');
                        const module_events_group = module.groups.find((g) => g.title === 'Events');
                        const module_templates_group = module.groups.find((g) => g.title === 'Templates');
                        const module_interface_group = module.groups.find((g) => g.title === 'Interface');
                        const module_service_group = module.groups.find((g) => g.title === 'Service');
                        const module_types_group = module.groups.find((g) => g.title === 'Types');

                        if (isProcessable(module_components_group)) {
                            module_components_group.children.forEach((component) => {
                                const componentName = component.name;
                                const comment = component.comment;

                                doc[name]['components'][componentName] = {
                                    description: comment && comment.summary.map((s) => s.text || '').join(' ')
                                };

                                const component_props_group = component.groups.find((g) => g.title === 'Props');

                                if (isProcessable(component_props_group)) {
                                    const props = {
                                        description: staticMessages['props'],
                                        values: []
                                    };

                                    component_props_group.children.forEach((prop) => {
                                        props.values.push({
                                            name: prop.name,
                                            optional: prop.flags.isOptional,
                                            readonly: prop.flags.isReadonly,
                                            type: prop.getSignature && prop.getSignature.type ? prop.getSignature.type.toString() : prop.type ? prop.type.toString() : null,
                                            default: prop.type && prop.type.name === 'boolean' && !prop.defaultValue ? 'false' : prop.defaultValue ? prop.defaultValue.replace(/^'|'$/g, '') : undefined,
                                            description: (prop.getSignature?.comment?.summary || prop.setSignature?.comment?.summary || prop.comment?.summary)?.map((s) => s.text || '').join(' '),
                                            deprecated: getDeprecatedText(prop.getSignature) || getDeprecatedText(prop.setSignature) || getDeprecatedText(prop)
                                        });
                                    });
                                    doc[name]['components'][componentName]['props'] = props;
                                }

                                const component_emits_group = component.groups.find((g) => g.title === 'Emits');
                                if (isProcessable(component_emits_group)) {
                                    const emits = {
                                        description: staticMessages['emits'],
                                        values: []
                                    };

                                    component_emits_group.children.forEach((emitter) => {
                                        emits.values.push({
                                            name: emitter.name,
                                            parameters: [{ name: extractParameter(emitter) && extractParameter(emitter).includes('Event') ? 'event' : 'value', type: extractParameter(emitter) }],
                                            description: emitter.comment && emitter.comment.summary.map((s) => s.text || '').join(' '),
                                            deprecated: getDeprecatedText(emitter)
                                        });
                                    });

                                    doc[name]['components'][componentName]['emits'] = emits;
                                }

                                const component_methods_group = component.groups.find((g) => g.title === 'Method');
                                if (isProcessable(component_methods_group)) {
                                    const methods = {
                                        description: staticMessages['methods'],
                                        values: []
                                    };

                                    component_methods_group.children.forEach((method) => {
                                        const signature = method.getAllSignatures()[0];
                                        methods.values.push({
                                            name: signature.name,
                                            parameters: signature.parameters.map((param) => {
                                                return {
                                                    name: param.name,
                                                    type: param.type.toString(),
                                                    description: param.comment && param.comment.summary.map((s) => s.text || '').join(' ')
                                                };
                                            }),
                                            description: signature.comment && signature.comment.summary.map((s) => s.text || '').join(' ')
                                        });
                                    });

                                    doc[name]['components'][componentName]['methods'] = methods;
                                }

                                const component_events_group = component.groups.find((g) => g.title === 'Events');
                                if (isProcessable(component_events_group)) {
                                    const events = {
                                        description: staticMessages['events'],
                                        values: []
                                    };

                                    component_events_group.children.forEach((event) => {
                                        events.values.push({
                                            name: event.name,
                                            description: event.comment && event.comment.summary.map((s) => s.text || '').join(' '),
                                            props:
                                                event.children &&
                                                event.children.map((child) => ({
                                                    name: child.name,
                                                    optional: child.flags.isOptional,
                                                    readonly: child.flags.isReadonly,
                                                    type: child.type && child.type.toString(),
                                                    description: child.comment && child.comment.summary.map((s) => s.text || '').join(' '),
                                                    deprecated: getDeprecatedText(child)
                                                }))
                                        });
                                    });

                                    doc[name]['components'][componentName]['events'] = events;
                                }
                            });
                        }

                        if (isProcessable(module_events_group)) {
                            const events = {
                                description: staticMessages['events'],
                                values: []
                            };

                            module_events_group.children.forEach((event) => {
                                events.values.push({
                                    name: event.name,
                                    description: event.comment && event.comment.summary.map((s) => s.text || '').join(' '),
                                    props:
                                        event.children &&
                                        event.children.map((child) => ({
                                            name: child.name,
                                            optional: child.flags.isOptional,
                                            readonly: child.flags.isReadonly,
                                            type: child.type && child.type.toString(),
                                            description: child.comment && child.comment.summary.map((s) => s.text || '').join(' '),
                                            deprecated: getDeprecatedText(child)
                                        }))
                                });
                            });

                            doc[name]['events'] = events;
                        }

                        if (isProcessable(module_templates_group)) {
                            const templates = {
                                description: staticMessages['templates'],
                                values: []
                            };

                            module_templates_group.children.forEach((template) => {
                                const parent = template.parent.name.split(/[^a-zA-Z]+/)[1];
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

                                                type = `{\n ${type} }`;
                                            }

                                            return {
                                                name: param.name,
                                                type: type,
                                                description: param.comment && param.comment.summary.map((s) => s.text || '').join(' ')
                                            };
                                        }),
                                        description: signature.comment && signature.comment.summary.map((s) => s.text || '').join(' '),
                                        deprecated: getDeprecatedText(signature)
                                    });
                                });
                            });

                            doc[name]['templates'] = templates;
                        }

                        if (isProcessable(module_interface_group)) {
                            const interfaces = {
                                description: staticMessages['interfaces'],
                                values: []
                            };

                            module_interface_group.children.forEach((int) => {
                                interfaces.values.push({
                                    name: int.name,
                                    description: int.comment && int.comment.summary.map((s) => s.text || '').join(' '),
                                    props:
                                        int.children &&
                                        int.children.map((child) => ({
                                            name: child.name,
                                            optional: child.flags.isOptional,
                                            readonly: child.flags.isReadonly,
                                            type: child.type ? child.type.toString() : extractParameter(int),
                                            description: child.comment && child.comment.summary.map((s) => s.text || '').join(' '),
                                            deprecated: getDeprecatedText(child)
                                        }))
                                });
                            });

                            doc[name]['interfaces'] = interfaces;
                        }

                        if (isProcessable(module_service_group)) {
                            doc[name] = {
                                description: staticMessages['service']
                            };

                            module_service_group.children.forEach((service) => {
                                const service_methods_group = service.groups.find((g) => g.title === 'Method');
                                if (isProcessable(service_methods_group)) {
                                    const methods = {
                                        description: 'Methods used in service.',
                                        values: []
                                    };

                                    service_methods_group.children.forEach((method) => {
                                        const signature = method.getAllSignatures()[0];
                                        methods.values.push({
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

                                    doc[name]['methods'] = methods;
                                }
                            });
                        }

                        if (isProcessable(module_types_group)) {
                            const types = {
                                description: staticMessages['types'],
                                values: []
                            };

                            module_types_group.children.forEach((t) => {
                                types.values.push({
                                    name: t.name,
                                    value: getTypesValue(t),
                                    description: t.comment.summary && t.comment.summary.map((s) => s.text || '').join(' ')
                                });
                            });

                            doc[name]['types'] = types;
                        }
                    }
                }
            });
        }

        let mergedDocs = {};

        for (const key in doc) {
            if (key.includes('.interface')) {
                const parentKey = key.split('.')[0];
                const interfaceDoc = doc[key];
                if (!mergedDocs[parentKey]) {
                    mergedDocs[parentKey] = {
                        ...doc[parentKey],
                        interfaces: {
                            ...interfaceDoc
                        }
                    };
                }
            } else {
                if (!mergedDocs[key]) {
                    mergedDocs[key] = {
                        ...doc[key]
                    };
                }
            }
        }

        const typedocJSON = JSON.stringify(mergedDocs, null, 4);

        !fs.existsSync(outputPath) && fs.mkdirSync(outputPath);
        fs.writeFileSync(path.resolve(outputPath, 'index.json'), typedocJSON);
    }
}

function extractParameter(emitter) {
    let { comment, type } = emitter;

    if (type && type.typeArguments) {
        if (type.toString()) {
            return type.toString().replace(/^.*?<([^>]*)>.*$/, '$1');
        } else {
            if (!type.typeArguments[0].types && !type.typeArguments[0].type) {
                return type.typeArguments.map((el) => ({ name: el.name.includes('Event') ? 'event' : 'value', type: el.name.replace(/[^a-zA-Z]/g, '') }));
            }

            if (type.typeArguments[0].types) {
                return type.typeArguments[0].types.map((el) => {
                    if (el.type && el.type === 'array') {
                        return { name: 'value', type: el.elementType.name + '[]' };
                    } else {
                        return { name: el.name.includes('Event') ? 'event' : 'value', type: el.name.replace(/[^a-zA-Z]/g, '') };
                    }
                });
            }
        }
    }
}

const isProcessable = (value) => {
    return value && value.children && value.children.length;
};

const allowed = (name) => {
    return !name.includes('ts-helpers') && !name.includes('icons');
};

const getTypesValue = (typeobj) => {
    let { type } = typeobj;

    if (typeobj.indexSignature) {
        const signature = typeobj.getAllSignatures()[0];
        const value = signature.parameters.map((param) => {
            return {
                [`[${param.name}:${param.type.toString()}]`]: signature.type.toString()
            };
        })[0];

        return JSON.stringify(value);
    }

    if (type) {
        if (type.type === 'union') {
            return type.toString();
        }
        if (type.type === 'reflection' && type.declaration) {
            let values = type.declaration.children.map((child) => ({
                [child.name]: child.type.toString()
            }));

            return JSON.stringify(Object.assign({}, ...values), null, 4);
        }
    }
};

main().catch(console.error);
