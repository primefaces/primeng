import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { join } from 'node:path';
import bootstrap from './src/main.server';
import { environment } from 'src/environments/environment';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const server = express();
    const distFolder = join(process.cwd(), 'dist/primeng/browser');
    const indexHtml = join(distFolder, 'index.html');

    const commonEngine = new CommonEngine();

    server.set('view engine', 'html');
    server.set('views', distFolder);

    console.log('distFolder', environment.production, distFolder);

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get(
        '*.*',
        express.static(distFolder, {
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
                publicPath: distFolder,
                providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }]
            })
            .then((html) => res.send(html))
            .catch((err) => next(err));
    });

    return server;
}
