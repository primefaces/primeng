import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/styleclass/importdoc';
import { PropsDoc } from '../../doc/styleclass/propsdoc';
import { StyleClassAnimationDemo } from '../../doc/styleclass/animationdoc';
import { StyleClassToggleClassDemo } from '../../doc/styleclass/toggleclassdoc';

@Component({
    templateUrl: './styleclassdemo.html'
})
export class StyleClassDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'toggleclass',
            label: 'Toggle Class',
            component: StyleClassToggleClassDemo
        },
        {
            id: 'animation',
            label: 'Animation',
            component: StyleClassAnimationDemo
        }
    ];

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        }
    ];
}
