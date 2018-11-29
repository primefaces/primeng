"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular-devkit/schematics/testing");
const path_1 = require("path");
const test_1 = require("@schematics/angular/utility/test");
const testing_2 = require("../utils/testing");
const collectionPath = path_1.join(__dirname, '../collection.json');
describe('primeng-shell-schematic', () => {
    let runner;
    let appTree;
    beforeEach(() => {
        appTree = testing_2.createTestApp();
        runner = new testing_1.SchematicTestRunner('schematics', collectionPath);
    });
    it('should update package.json', () => {
        const tree = runner.runSchematic('primeng-shell', {}, appTree);
        const packageJson = JSON.parse(test_1.getFileContent(tree, '/package.json'));
        expect(packageJson.dependencies['primeng']).toBeDefined();
        expect(packageJson.dependencies['font-awesome']).toBeDefined();
    });
});
//# sourceMappingURL=index_spec.js.map