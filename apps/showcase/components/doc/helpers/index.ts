import APIDocs from '@/doc/apidoc/index.json';
import ComponentTokens from '@primeuix/themes/tokens';

interface PropInfo {
    name: string;
    type: string;
    description: string;
    deprecated?: boolean;
    optional: boolean;
    readonly: boolean;
    default?: string;
}

interface InterfaceValue {
    name: string;
    description: string;
    props: PropInfo[];
}

interface APIDocEntry {
    components?: Record<string, any>;
    interfaces?: {
        description: string;
        values: InterfaceValue[];
    };
    enumerations?: {
        values: Record<string, { members: Array<{ value: string; description: string }> }>;
    };
    style?: {
        components?: Record<string, any>;
        classes?: {
            values: Array<{ class: string; description: string }>;
        };
    };
}

interface PTOption {
    value: number;
    label: string;
    options?: PropInfo[];
    description: string;
}

interface StyleOption {
    class: string;
    description: string;
}

interface TokenOption {
    token: string;
    'CSS Variable': string;
    description: string;
}

export const getPTOptions = (name: string): PTOption[] => {
    const apiDoc = (APIDocs as Record<string, APIDocEntry>)[name.toLowerCase()];
    const interfaceValues = apiDoc.interfaces?.values || [];
    const ptInterface = interfaceValues.find((v) => v.name === `${name}PassThroughOptions` || v.name === `${name}DirectivePassThroughOptions`);
    const optionsInterface = interfaceValues.find((v) => v.name === `${name}PassThroughMethodOptions`);
    const props = ptInterface?.props || [];
    const data: PTOption[] = [];

    for (const [i, prop] of props.entries()) {
        if (optionsInterface) {
            let subCompName: string | undefined;
            let subOptions: InterfaceValue | undefined;
            const hasSubComp = prop.name !== 'hooks' && prop.type.indexOf('TransitionType') === -1 && prop.type.indexOf('<') > -1 && name.toLowerCase() !== prop.type.slice(0, prop.type.indexOf('<')).toLowerCase();

            if (hasSubComp) {
                subCompName = prop.type.slice(0, prop.type.indexOf('<')).replace('PassThroughOptions', '').replace('PassThroughOptionType', '');
                const subApiDoc = (APIDocs as Record<string, APIDocEntry>)[subCompName.toLowerCase()];
                const subInterfaceValues = subApiDoc.interfaces?.values || [];
                subOptions = subInterfaceValues.find((v) => v.name === `${subCompName}PassThroughMethodOptions`);
                const objToReplace = subOptions?.props.find((opt) => opt.name === 'parent');

                if (objToReplace) {
                    objToReplace.type = prop.type;
                }
            }

            if (!prop.deprecated) {
                data.push({
                    value: i + 1,
                    label: prop.name,
                    options: hasSubComp ? subOptions?.props : optionsInterface?.props,
                    description: prop.description
                });
            }
        } else {
            data.push({
                value: i + 1,
                label: prop.name,
                description: prop.description
            });
        }
    }

    return data;
};

export const getStyleOptions = (name: string): StyleOption[] => {
    const styleDoc = (APIDocs as Record<string, APIDocEntry>)[name.toLowerCase() + 'style'];
    const enumValues = styleDoc && styleDoc.enumerations && styleDoc.enumerations.values;
    const { members = [] } = enumValues ? enumValues[`${name}Classes`] || {} : {};
    const data: StyleOption[] = [];

    for (const member of members) {
        const { value, description } = member;

        data.push({
            class: value.replaceAll('"', ''),
            description
        });
    }

    return data;
};

export const getTokenOptions = (name: string): TokenOption[] => {
    const data: TokenOption[] = [];

    if ((ComponentTokens as Record<string, any>)[name.toLowerCase()]) {
        const tokens = (ComponentTokens as Record<string, any>)[name.toLowerCase()].tokens;

        for (const [_, value] of Object.entries(tokens) as [string, any][]) {
            data.push({
                token: value.token,
                /*property: value.name.split('.').slice(1).join('.'),*/
                'CSS Variable': value.variable,
                description: value.description
            });
        }
    }

    return data;
};
