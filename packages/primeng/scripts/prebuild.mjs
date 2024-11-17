import path from 'path';
import { createPackageJson_For_NG_Packager, removeBuild, resolvePath } from '../../../scripts/build-helper.mjs';

removeBuild(import.meta.url);

const { INPUT_PATH } = resolvePath(import.meta.url);

createPackageJson_For_NG_Packager(path.resolve(resolvePath(import.meta.url).__dirname, '../package.json'), INPUT_PATH);
