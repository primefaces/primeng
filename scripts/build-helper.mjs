import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

export const AUTO_FILE_COMMENT = `/**
 * @file
 * THIS FILE IS AUTO-GENERATED. PLEASE DO NOT MODIFY.
 */`;

export function resolvePath(metaUrl) {
    const __dirname = path.dirname(fileURLToPath(metaUrl || import.meta.url));
    const __root = path.resolve(path.dirname(fileURLToPath(metaUrl || import.meta.url)), '../');
    const __workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../');
    const { INPUT_DIR, OUTPUT_DIR } = process.env;
    const INPUT_PATH = path.resolve(__root, process.env.INPUT_DIR);
    const OUTPUT_PATH = path.resolve(__root, process.env.OUTPUT_DIR);

    return {
        __dirname,
        __root,
        __workspace,
        INPUT_DIR,
        OUTPUT_DIR,
        INPUT_PATH,
        OUTPUT_PATH
    };
}

export function removeBuild(metaUrl) {
    const { OUTPUT_DIR, __root } = resolvePath(metaUrl);

    fs.remove(OUTPUT_DIR);
    fs.remove(path.resolve(__root, '.angular'));
}

export function updatePackageJson(localPackageJson, callback) {
    const { __workspace } = resolvePath();
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(__workspace, './package.json'), { encoding: 'utf8', flag: 'r' }));
    const pkg = JSON.parse(fs.readFileSync(localPackageJson, { encoding: 'utf8', flag: 'r' }));

    pkg.version = packageJson.version;
    pkg.author = packageJson.author;
    pkg.homepage = packageJson.homepage;
    pkg.license = packageJson.license;
    pkg.repository = { ...pkg.repository, ...packageJson.repository };
    pkg.bugs = { ...pkg.bugs, ...packageJson.bugs };
    //pkg.engines = { ...pkg.engines, ...packageJson.engines };

    callback?.(pkg);

    fs.writeFileSync(localPackageJson, JSON.stringify(pkg, null, 4), { encoding: 'utf8' });
}

export function createPackageJson_For_NG_Packager(localPackageJson, INPUT_PATH, callback) {
    updatePackageJson(localPackageJson);

    const pkgPath = path.join(INPUT_PATH, 'package.json');

    fs.copyFileSync(localPackageJson, pkgPath);

    clearPackageJson(pkgPath, (pkg) => {
        delete pkg?.exports;
        delete pkg?.main;
        delete pkg?.module;
        delete pkg?.types;
    });

    callback?.(pkg);
}

export function clearPackageJson(localPackageJson, callback) {
    const pkg = JSON.parse(fs.readFileSync(localPackageJson, { encoding: 'utf8', flag: 'r' }));

    delete pkg?.scripts;
    delete pkg?.devDependencies;
    delete pkg?.publishConfig?.directory;
    delete pkg?.publishConfig?.linkDirectory;

    callback?.(pkg);

    fs.writeFileSync(localPackageJson, JSON.stringify(pkg, null, 4), { encoding: 'utf8' });
}

export function copyDependencies(inFolder, outFolder, subFolder) {
    fs.readdirSync(inFolder, { withFileTypes: true }).forEach((entry) => {
        const fileName = entry.name;
        const sourcePath = path.join(inFolder, fileName);
        const destPath = path.join(outFolder, fileName);

        if (entry.isDirectory()) {
            copyDependencies(sourcePath, destPath, subFolder);
        } else {
            if (fileName.endsWith('d.ts') || fileName.endsWith('.vue')) {
                if (subFolder && sourcePath.includes(subFolder)) {
                    const subDestPath = path.join(outFolder, fileName.replace(subFolder, ''));

                    fs.ensureDirSync(path.dirname(subDestPath));
                    fs.copyFileSync(sourcePath, subDestPath);
                } else {
                    fs.ensureDirSync(path.dirname(destPath));
                    fs.copyFileSync(sourcePath, destPath);
                }
            }
        }
    });
}

export async function renameDTSFile(dir, newName, resolver) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await renameDTSFile(fullPath, newName);
        } else if (entry.name.endsWith('.d.ts') && (resolver?.(entry.name, dir) ?? true)) {
            const newFullPath = path.join(dir, `${newName}.d.ts`);

            await fs.rename(fullPath, newFullPath);
        }
    }
}
