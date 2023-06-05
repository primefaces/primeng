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
    entryPoints: [`src/app/components/virtualscroller`],
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

function extractGroup(children, arg) {
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
                const nestedPropsChildren = extractGroup(nestedChildren, arg);
                propsChildren.push(...nestedPropsChildren);
            }
        });
        return Array.from(new Set(propsChildren));
    }
}

function extractType(prop, arg) {
    if(arg === 'emitter') {
        let {comment, type} = prop;
    
        if(type.typeArguments) {
            if(type.toString()) {
                return type.toString().replace(/^.*?<([^>]*)>.*$/, '$1');

            }else {
                if(!type.typeArguments[0].types && !type.typeArguments[0].type){
                    return type.typeArguments.map(el => ( {name: el.name.includes('Event') ? 'event' : 'value', type: el.name.replace(/[^a-zA-Z]/g, '')}));
                }
        
                if(type.typeArguments[0].types) {
                    return type.typeArguments[0].types.map(el => {
                        if(el.type && el.type === 'array') {
                            return {name: 'value', type: el.elementType.name + '[]'}
                        } else {
                            return {name: el.name.includes('Event') ? 'event' : 'value', type: el.name.replace(/[^a-zA-Z]/g, '')};
                        }
                    })
                } 
            }
        }
    }

    if(arg === 'props'){
        let {type} = prop;
        let typeStr = '';
        if(type) {
            if(prop.name === 'appendTo' || prop.name.includes('appendTo')) {
                typeStr += 'HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | ';
            }
            if(type.type && type.type !== 'reflection') {
                typeStr += type.name;
            }
            if(type.declaration && type.declaration.indexSignature && prop.name.toLowerCase().includes('style')) {
                typeStr += '{ [klass: string]: any } | null | undefined';
            }
        }

        if(!type) {
            if(prop.getSignature) {
                let {getSignature} = prop;
                if(getSignature.type.type !== 'union' ) {
                    typeStr = getSignature.type.name;
                }
                if(getSignature.type.type === 'union') {
                    typeStr += getSignature.type.types.map(el => {
                        if(el.type === 'array') {
                            return el.elementType.name + '[]'
                        }
                        else {
                            return el.name
                        }
                    }).join(' | ');
                }
            }
        }

        if (typeStr) {
            return typeStr.replace(/^'|'$/g, '');
        }
    }
}

function extractMethod(method) {}

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

        const props_group = extractGroup(children, 'Props');
        const emits_group = extractGroup(children, 'Emits');
        const templates_group = name.includes('interface') ? extractGroup(project.children, 'Templates') : undefined;
        const methods_group = extractGroup(children, 'Method');
        const types_group = extractGroup(children, 'Types');
        const events_group = name.includes('interface') ? extractGroup(project.children, 'Events')  : undefined;
        const components_group = (!name.includes('interface') && !name.includes('Module')) ? extractGroup(project.children, 'Components') : undefined;
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
                        if(prop.parent.name === componentName){
                            props.values.push({
                                parent: prop.parent.name ?? undefined,
                                name: prop.name,
                                optional: prop.flags.isOptional,
                                readonly: prop.flags.isReadonly,
                                type: extractType(prop, 'props'), //TODO: make it meaningful -> getType?
                                default: (prop.type && prop.type.name === 'boolean' && !prop.defaultValue) ? 'false' : prop.defaultValue ? prop.defaultValue.replace(/^'|'$/g, '') : undefined,
                                description:prop.getSignature && prop.getSignature.comment ? prop.getSignature.comment.summary.map((s) => s.text || '').join(' ') : prop.comment && prop.comment.summary.map((s) => s.text || '').join(' '),
                                deprecated: prop.getSignature && prop.getSignature.comment && prop.getSignature.comment.getTag('@deprecated') ? parseText(prop.getSignature.comment.getTag('@deprecated').content[0].text) : prop.comment && prop.comment.getTag('@deprecated') ? parseText(prop.comment.getTag('@deprecated').content[0].text) : undefined
                            });
                        }
                    });
                    
                    doc[name]['components'][componentName]['props'] = props;
                }

                if (emits_group) {
                    let emits = {
                        description: staticMessages['emits'],
                        values: []
                    };

                    emits_group.forEach((emitter) => {
                        if(emitter.parent.name === componentName) {
                            emits.values.push({
                                parent: emitter.parent.name ?? undefined,
                                name: emitter.name,
                                parameters: extractType(emitter, 'emitter'),
                                description: emitter.comment && emitter.comment.summary.map((s) => s.text || '').join(' '),
                                deprecated: emitter.comment && emitter.comment.getTag('@deprecated') ? parseText(emitter.comment.getTag('@deprecated').content[0].text) : undefined
                            });
                        }
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
                        if(method.parent.name === componentName){
                            methods.values.push({
                                parent: method.parent.name ?? undefined,
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
                        }
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
                    parent: parentName,
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

                                type = `{\n ${type} }`;
                            }

                            return {
                                name: param.name,
                                type: type,
                                description: param.comment && param.comment.summary.map((s) => s.text || '').join(' ')
                            };
                        }),
                        description: signature.comment && signature.comment.summary.map((s) => s.text || '').join(' '),
                        deprecated: signature.comment && signature.comment.getTag('@deprecated') ? parseText(signature.comment.getTag('@deprecated').content[0].text) : undefined
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