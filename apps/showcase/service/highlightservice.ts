import { Injectable } from '@angular/core';
import { codeToHtml } from 'shiki';

const themes = {
    dark: 'github-dark',
    light: 'github-light'
};

const transformers = [
    {
        pre(node: any) {
            node.properties['data-rehype-pretty-code-pre'] = '';
            node.properties['data-rehype-pretty-code-figure'] = '';
            delete node.properties.style;
        },
        code(node: any) {
            node.properties['data-line-numbers'] = '';
        },
        line(node: any) {
            node.properties['data-line'] = '';
        }
    }
];

@Injectable({ providedIn: 'root' })
export class HighlightService {
    private cache = new Map<string, string>();

    async highlight(code: string, lang: string = 'typescript'): Promise<string> {
        const key = `${lang}:${code}`;

        if (this.cache.has(key)) {
            return this.cache.get(key)!;
        }

        const html = await codeToHtml(code, {
            lang,
            themes,
            transformers
        });

        this.cache.set(key, html);
        return html;
    }
}
