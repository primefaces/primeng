import sdk from '@stackblitz/sdk';
import { getAngularApp } from './templates';
import { Props } from './templates';

const useCodeSandbox = (props: Props) => {
    const { files } = getAngularApp(props);

    files['sandbox.config.json'] = {
        content: {
            infiniteLoopProtection: false,
            template: 'node',
            container: {
                node: '16'
            }
        }
    };

    fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ files: files, sourceFileName: 'src/app/app.component.ts' })
    })
        .then((response) => response.json())
        .then((data) => typeof window !== undefined && window.open(`https://codesandbox.io/s/${data.sandbox_id}`, '_blank'));
};

const useStackBlitz = (props: Props) => {
    const { files, title } = getAngularApp(props);

    let _files = {};

    Object.entries(files).forEach(([k, v]) => (_files[`${k}`] = typeof v.content === 'object' ? JSON.stringify(v.content, null, 2) : v.content));

    const project = {
        title: title,
        template: 'node',
        description:
            'PrimeNG is an open source UI library for Angular featuring a rich set of 90+ components, a theme designer, various theme alternatives such as Material, Bootstrap, Tailwind, premium templates and professional support. In addition, it integrates with PrimeBlock, which has 370+ ready to use UI blocks to build spectacular applications in no time.',
        files: _files
    };

    const options = {
        newWindow: true,
        openFile: 'src/app/app.component.html'
    };
    // @ts-ignore
    sdk.openProject(project, options);
};

export { useStackBlitz, useCodeSandbox };
