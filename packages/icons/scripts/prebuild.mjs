import fs from 'fs-extra';
import path from 'path';
import { AUTO_FILE_COMMENT, createPackageJson_For_NG_Packager, removeBuild, resolvePath } from '../../../scripts/build-helper.mjs';

removeBuild(import.meta.url);

const { INPUT_PATH } = resolvePath(import.meta.url);

createPackageJson_For_NG_Packager(path.resolve(resolvePath(import.meta.url).__dirname, '../package.json'), INPUT_PATH);

// Generate exports

// update src > "exports" in public_api.ts
let exports = [AUTO_FILE_COMMENT];

fs.readdirSync(INPUT_PATH, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .forEach(({ name: folderName }) => {
        exports.push(`export * from '@primeng/icons/${folderName}';`);
    });

fs.writeFileSync(path.join(INPUT_PATH, 'public_api.ts'), exports.join('\n') + '\n', { encoding: 'utf8' });
