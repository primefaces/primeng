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

const staticMessages = {
    methods: "Defines methods that can be accessed by the component's reference.",
    emits: 'Defines emit that determine the behavior of the component based on a given condition or report the actions that the component takes.',
    templates: 'Defines the templates used by the component.',
    events: "Defines the custom events used by the component's emitters.",
    interfaces: 'Defines the custom interfaces used by the module.',
    types: 'Defines the custom types used by the module.',
    props: 'Defines the input properties of the component.',
    service: 'Defines the service used by the component',
    classes: 'List of class names used in the styled mode.'
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

        const parameters = (template) => {
            const _parameters = [];
            if (template.comment && template.comment.blockTags) {
                template.comment.blockTags.forEach((tag) => {
                    if (tag.tag === '@param') {
                        let type = 'unknown';
                        if (template.type && template.type.typeArguments) {
                            const typeArg = template.type.typeArguments.find((arg) => arg.declaration && arg.declaration.children);
                            if (typeArg) {
                                const paramType = typeArg.declaration.children.find((child) => child.name === tag.name);
                                if (paramType && paramType.type) {
                                    type = paramType.type.name;
                                }
                            }
                        }
                        _parameters.push({
                            name: tag.name,
                            description: tag.content.map((c) => c.text).join(' '),
                            type: type
                        });
                    }
                });
            }

            return _parameters;
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
                        const module_enums_group = module.groups.find((g) => g.title === 'Enumerations');
                        const module_types_group = module.groups.find((g) => g.title === 'Types');

                        if (isProcessable(module_types_group)) {
                            const types = {
                                description: staticMessages['types'],
                                values: []
                            };

                            module_types_group.children.forEach((type) => {
                                types.values.push({
                                    name: type.name,
                                    description: type.comment && type.comment.summary.map((s) => s.text || '').join(' '),
                                    type: type.type && type.type.toString(),
                                    parameters: parameters(type),
                                    deprecated: getDeprecatedText(type)
                                });
                            });

                            // doc[name]['components'][componentName]['templates'] = templates;
                        }

                        if (isProcessable(module_enums_group)) {
                            const classes = {
                                description: staticMessages['styles'],
                                values: []
                            };
                            module_enums_group.children.forEach((child) => {
                                if (child) {
                                    if (child && child.groups) {
                                        const values = child.groups.find((g) => g.title === 'Enumeration Members');
                                        values.children.forEach((value) => {
                                            classes.values.push({
                                                class: value.type.value,
                                                description: value.comment && value.comment.summary[0]['text']
                                            });
                                        });
                                    }
                                }
                            });

                            doc[name]['classes'] = classes;
                        }

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
                                        let defaultValue = prop.defaultValue ? prop.defaultValue.replace(/^'|'$/g, '') : undefined;

                                        // Check for @defaultValue tag in comment blockTags
                                        if (prop.comment && prop.comment.blockTags) {
                                            const defaultValueTag = prop.comment.blockTags.find((tag) => tag.tag === '@defaultValue');
                                            if (defaultValueTag) {
                                                defaultValue = defaultValueTag.content.map((c) => c.text.replace(/```ts\n|```/g, '').trim()).join(' ');
                                            }
                                        }

                                        props.values.push({
                                            name: prop.name,
                                            optional: prop.flags.isOptional,
                                            readonly: prop.flags.isReadonly,
                                            type: prop.getSignature && prop.getSignature.type ? prop.getSignature.type.toString() : prop.type ? prop.type.toString() : null,
                                            default: prop.type && prop.type.name === 'boolean' && !prop.defaultValue ? 'false' : defaultValue,
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
                                            parameters: [
                                                {
                                                    name: extractParameter(emitter) && extractParameter(emitter).includes('Event') ? 'event' : 'value',
                                                    type: extractParameter(emitter)
                                                }
                                            ],
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

                                const component_templates_group = component.groups.find((g) => g.title === 'Templates');
                                if (isProcessable(component_templates_group)) {
                                    const templates = {
                                        description: staticMessages['templates'],
                                        values: []
                                    };

                                    component_templates_group.children.forEach((template) => {
                                        const templateType = template.type && template.type.toString();
                                        let contextType = 'unknown';

                                        const match = templateType && templateType.match(/TemplateRef<(.+)>/);
                                        if (match && match[1]) {
                                            contextType = match[1];
                                        }
                                        templates.values.push({
                                            name: template.name.replace(/Template$/, '').toLowerCase(),
                                            description: template.comment && template.comment.summary.map((s) => s.text || '').join(' '),
                                            type: templateType,
                                            parameters: parameters(template).map((param) => (param.name === 'context' ? { ...param, type: contextType } : param)),
                                            deprecated: getDeprecatedText(template)
                                        });
                                    });

                                    doc[name]['components'][componentName]['templates'] = templates;
                                }

                                const component_types_group = component.groups.find((g) => g.title === 'Types');
                                if (isProcessable(component_types_group)) {
                                    const types = {
                                        description: staticMessages['types'],
                                        values: []
                                    };
                                    component_types_group.children.forEach((type) => {
                                        types.values.push({
                                            name: type.name,
                                            description: type.comment && type.comment.summary.map((s) => s.text || '').join(' '),
                                            type: type.type && type.type.toString(),
                                            parameters: parameters(type),
                                            deprecated: getDeprecatedText(type)
                                        });
                                    });
                                    doc[name]['components'][componentName]['types'] = types;
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
                                const parameters =
                                    t.signatures && t.signatures[0]?.parameters
                                        ? t.signatures[0].parameters.map((param) => ({
                                              name: param.name,
                                              description: param.comment && param.comment.summary.map((s) => s.text || '').join(' '),
                                              type: param.type && param.type.name
                                          }))
                                        : [];

                                const returnType = t.signatures && t.signatures[0]?.type ? t.signatures[0].type.name : t.type && t.type.declaration && t.type.declaration.signatures && t.type.declaration.signatures[0]?.type.name;

                                const returnDescription =
                                    t.comment && t.comment.blockTags
                                        ? t.comment.blockTags
                                              .filter((tag) => tag.tag === '@returns')
                                              .map((tag) => tag.content.map((content) => content.text).join(' '))
                                              .join(' ')
                                        : '';

                                const typeChildren =
                                    t.children && t.children.length
                                        ? t.children.map((child) => {
                                              const childSignatures = child.type && child.type.declaration && child.type.declaration.signatures;
                                              const childParameters =
                                                  childSignatures && childSignatures[0]?.parameters
                                                      ? childSignatures[0].parameters.map((param) => ({
                                                            name: param.name,
                                                            description: param.comment && param.comment.summary.map((s) => s.text || '').join(' '),
                                                            type: param.type && param.type.name
                                                        }))
                                                      : [];

                                              const childReturnType = childSignatures && childSignatures[0]?.type ? childSignatures[0].type.name : undefined;

                                              const childReturnDescription =
                                                  child.comment && child.comment.blockTags
                                                      ? child.comment.blockTags
                                                            .filter((tag) => tag.tag === '@returns')
                                                            .map((tag) => tag.content.map((content) => content.text).join(' '))
                                                            .join(' ')
                                                      : '';

                                              return {
                                                  name: child.name,
                                                  description: child.comment && child.comment.summary.map((s) => s.text || '').join(' '),
                                                  type: childParameters.length || childReturnType ? 'function' : child.type && child.type.name,
                                                  parameters: childParameters.length ? childParameters : undefined,
                                                  returns: childReturnType
                                                      ? {
                                                            type: childReturnType,
                                                            description: childReturnDescription
                                                        }
                                                      : undefined,
                                                  deprecated: getDeprecatedText(child)
                                              };
                                          })
                                        : [];

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
            const parentKey = key.includes('style') ? key.replace(/style/g, '') : key.includes('.interface') ? key.split('.')[0] : key;

            if (!mergedDocs[parentKey]) {
                mergedDocs[parentKey] = {
                    ...doc[parentKey]
                };
            }

            if (key.includes('style')) {
                const styleDoc = doc[key];
                mergedDocs[parentKey] = {
                    ...mergedDocs[parentKey],
                    style: {
                        ...styleDoc
                    }
                };
            }

            if (key.includes('.interface')) {
                const interfaceDoc = doc[key];
                mergedDocs[parentKey] = {
                    ...mergedDocs[parentKey],
                    interfaces: {
                        ...interfaceDoc
                    }
                };
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
                return type.typeArguments.map((el) => ({
                    name: el.name.includes('Event') ? 'event' : 'value',
                    type: el.name.replace(/[^a-zA-Z]/g, '')
                }));
            }

            if (type.typeArguments[0].types) {
                return type.typeArguments[0].types.map((el) => {
                    if (el.type && el.type === 'array') {
                        return { name: 'value', type: el.elementType.name + '[]' };
                    } else {
                        return {
                            name: el.name.includes('Event') ? 'event' : 'value',
                            type: el.name.replace(/[^a-zA-Z]/g, '')
                        };
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
