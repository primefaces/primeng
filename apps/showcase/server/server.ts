import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';
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

    // Serve markdown files
    server.get('/:component.md', (req, res, next) => {
        const component = req.params.component;

        // Skip if this looks like a static file request
        if (component.includes('.') || component === 'index') {
            return next();
        }

        const filePath = join(llmsFolder, 'components', `${component}.md`);

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
