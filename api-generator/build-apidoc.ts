//@ts-ignore
const TypeDoc = require('typedoc');
//@ts-ignore
const path = require('path');
//@ts-ignore
const fs = require('fs');
//@ts-ignore
const rootDir = path.resolve(__dirname, '../');
//@ts-ignore
const outputPath = path.resolve(rootDir, 'doc/common/apidoc');

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
    entryPoints: [`src/app/components/accordion`],
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
const projectJson = fs.readdirSync('./api-generator').filter((file) => file.endsWith('.json'));

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

        return propsChildren;
    }
}

if (project) {
    const doc = {};

    const parseText = (text) => {
        return text.replace(/&#123;/g, '{').replace(/&#125;/g, '}');
    };

    const props_group = extractValues(project.children, 'Props');
    const emits_group = extractValues(project.children, 'Emits');
    const templates_group = extractValues(project.children, 'Templates');
    const methods_group = extractValues(project.children, 'Method');
    const interfaces_group = extractValues(project.children, 'Interfaces');
    const events_group = extractValues(project.children, 'Events');

    let templates = {
        description: staticMessages['templates'],
        values: []
    };

    let props = {
        description: staticMessages['props'],
        values: []
    }

    let emits = {
        description: staticMessages['emits'],
        values: []
    }

    let events = {
        description: staticMessages['events'],
        values: []
    }

    if(templates_group) {
        templates_group.forEach((template) => {
            template.children.forEach((child) => {
                const signature = child.getAllSignatures()[0];
                templates.values.push({
                    name: signature ? signature.name : child.name,
                    parameters: signature.parameters.map((param) => {
                        let type = param.type.toString();

                        if(param.type.declaration) {
                            type = '';

                            if(param.type.declaration.children) {
                                param.type.declaration.children.forEach((child) => {
                                    if(child.signatures) {
                                        const childSignature = child.signatures[0];
                                        const parameters = childSignature.parameters.reduce((acc, {name, type}, index) => (index === 0 ? `${name}: ${type.name}` : `${acc}, ${name}: ${type.name}`), '')
                                        type += ` \t ${childSignature.name}(${parameters}): ${childSignature.type?.name}, // ${childSignature.comment?.summary[0]?.text}\n `;
                                    }
                                    else {
                                        const childType = child.type.elementType ? child.type.elementType.name : child.type.name;

                                        type += ` \t ${child.name}: ${childType}, // ${child.comment?.summary[0]?.text}\n `;
                                    }
                                })
                            }

                            type = `{\n ${type} }`;
                        }

                        return {
                            name: param.name,
                            type: type,
                            description: param.comment && param.comment.summary.map((s) => parseText(s.text || '')).join(' ')
                        };
                    }),
                    returnType: signature.type.toString(),
                    description: signature.comment && signature.comment.summary.map((s) => parseText(s.text || '')).join(' '),
                    deprecated: signature.comment && signature.comment.getTag('@deprecated') ? parseText(signature.comment.getTag('@deprecated').content[0].text) : undefined
                })
            })
        })
    }

    if(props_group) {
        props_group.forEach((prop) => {
            props.values.push({
                name: prop.name,
                optional: prop.flags.isOptional,
                readonly: prop.flags.isReadonly,
                type: prop.type, //TODO: make it meaningful
                default: prop.comment && prop.comment.getTag('@defaultValue') ? prop.comment.getTag('@defaultValue').content[0].text : '',
                description: prop.comment && prop.comment.summary.map((s) => s.text || '').join(' '),
                deprecated: prop.comment && prop.comment.getTag('@deprecated') ? parseText(prop.comment.getTag('@deprecated').content[0].text) : undefined
            });
        })
    }

    if(emits_group) {
        emits_group.forEach((emitter) => {
            emits.values.push({
                name: emitter.name,
                parameters: emitter.type,
                description: emitter.comment && emitter.comment.summary.map((s) => s.text || '').join(' '),
                returnType: 'void', //TODO: make it meaningful
                deprecated: emitter.comment && emitter.comment.getTag('@deprecated') ? parseText(emitter.comment.getTag('@deprecated').content[0].text) : undefined,
            })
        })
    }

    if(methods_group) {
        methods_group.forEach((method) => {

        })
    }

    if(interfaces_group) {
        interfaces_group.forEach((interface) => {
        })
    }

    if(events_group) {
        events_group.forEach((event) => {
            events.values.push({
                name: event.name,
                description: event.comment && event.comment.summary.map((s) => s.text || '').join(' '),
                props: event.children && event.children.map(child => ({
                    name: child.name,
                    optional: child.flags.isOptional,
                    readonly: child.flags.isReadonly,
                    type: child.type.toString(),
                    description: child.comment && child.comment.summary.map((s) => s.text || '').join(' '),
                    deprecated: child.comment && child.comment.getTag('@deprecated') ? parseText(child.comment.getTag('@deprecated').content[0].text) : undefined
                }))
            })
        })
    }

}