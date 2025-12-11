import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const server = express();
    const serverDistFolder = dirname(fileURLToPath(import.meta.url));
    const browserDistFolder = resolve(serverDistFolder, '../browser');
    const indexHtml = join(serverDistFolder, 'index.server.html');
    const llmsFolder = join(browserDistFolder, 'llms');

    const commonEngine = new CommonEngine();

    server.set('view engine', 'html');
    server.set('views', browserDistFolder);

    // LLM Documentation Routes
    // Serve components.json
    server.get('/components.json', (req, res, next) => {
        const filePath = join(llmsFolder, 'components.json');

        if (!existsSync(filePath)) {
            return res.status(404).send('Components JSON data not found. Run build:llm-docs to generate it.');
        }

        const content = readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', process.env['NODE_ENV'] === 'production' ? 'public, max-age=300' : 'no-cache');
        res.json(data);
    });

    // Pages that have their own markdown files (not components)
    // These are defined in GUIDE_PAGES in build-llm-docs.mjs
    const pageNames = new Set(['installation', 'configuration', 'styled', 'unstyled', 'icons', 'customicons', 'passthrough', 'tailwind', 'llms', 'accessibility', 'animations', 'rtl', 'v19', 'v20']);

    // Serve markdown files - handles both components and pages
    server.get('/:name.md', (req, res, next) => {
        const name = req.params.name;

        // Skip if this looks like a static file request
        if (name.includes('.') || name === 'index') {
            return next();
        }

        let filePath: string;

        // Check if it's a known page
        if (pageNames.has(name)) {
            filePath = join(llmsFolder, 'pages', `${name}.md`);
        } else {
            // Try components folder first
            filePath = join(llmsFolder, 'components', `${name}.md`);
        }

        if (!existsSync(filePath)) {
            return next();
        }

        const content = readFileSync(filePath, 'utf-8');
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.setHeader('Cache-Control', process.env['NODE_ENV'] === 'production' ? 'public, max-age=300' : 'no-cache');
        res.send(content);
    });

    // Serve nested page markdown files (e.g., /theming/styled.md, /guides/accessibility.md, /migration/v19.md)
    // Using regex pattern to properly match .md extension in nested paths
    server.get(/^\/([^/]+)\/([^/]+)\.md$/, (req, res, next) => {
        const page = req.params[1]; // Second capture group is the page name

        // Skip if this looks like a static file request
        if (page.includes('.') || page === 'index') {
            return next();
        }

        // Check if it's a known page
        if (!pageNames.has(page)) {
            return next();
        }

        // All nested pages go to pages folder
        const filePath = join(llmsFolder, 'pages', `${page}.md`);

        if (!existsSync(filePath)) {
            return next();
        }

        const content = readFileSync(filePath, 'utf-8');
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.setHeader('Cache-Control', process.env['NODE_ENV'] === 'production' ? 'public, max-age=300' : 'no-cache');
        res.send(content);
    });

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get(
        '*.*',
        express.static(browserDistFolder, {
            maxAge: '1y'
        })
    );

    // All regular routes use the Angular engine
    server.get('*', (req, res, next) => {
        const { protocol, originalUrl, baseUrl, headers } = req;

        commonEngine
            .render({
                bootstrap,
                documentFilePath: indexHtml,
                url: `${protocol}://${headers.host}${originalUrl}`,
                publicPath: browserDistFolder,
                providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }]
            })
            .then((html) => res.send(html))
            .catch((err) => next(err));
    });

    return server;
}

function run(): void {
    const port = process.env['PORT'] || 4000;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

run();
