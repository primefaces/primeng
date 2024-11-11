import fs from 'fs-extra';
import path from 'path';
import { AUTO_FILE_COMMENT, createPackageJson_For_NG_Packager, removeBuild, resolvePath } from '../../../scripts/build-helper.mjs';

removeBuild(import.meta.url);

const { INPUT_PATH } = resolvePath(import.meta.url);

createPackageJson_For_NG_Packager(path.resolve(resolvePath(import.meta.url).__dirname, '../package.json'), INPUT_PATH);

// Generate exports
const IGNORED_FILES = /ng-package\.json$|public_api\.ts$|.*\.spec\.ts$/;

// update api > "exports" in public_api.ts
let apiExports = [AUTO_FILE_COMMENT];

const API_PATH = path.resolve(INPUT_PATH, 'api');
fs.readdirSync(API_PATH).forEach((file) => {
    !IGNORED_FILES.test(file) && apiExports.push(`export * from './${file.split('.ts')[0]}';`);
});

fs.writeFileSync(path.join(API_PATH, 'public_api.ts'), apiExports.join('\n') + '\n', { encoding: 'utf8' });

// update src > "exports" in public_api.ts
let exports = [AUTO_FILE_COMMENT];

fs.readdirSync(INPUT_PATH, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .forEach(({ name: folderName }) => {
        exports.push(`export * from '@primeng/core/${folderName}';`);
    });

fs.writeFileSync(path.join(INPUT_PATH, 'public_api.ts'), exports.join('\n') + '\n', { encoding: 'utf8' });
