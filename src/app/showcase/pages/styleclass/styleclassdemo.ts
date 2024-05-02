import { Component } from '@angular/core';
import { ImportDoc } from '@doc/styleclass/importdoc';
import { AnimationDoc } from '@doc/styleclass/animationdoc';
import { ToggleClassDoc } from '@doc/styleclass/toggleclassdoc';

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
            component: ToggleClassDoc
        },
        {
            id: 'animation',
            label: 'Animation',
            component: AnimationDoc
        }
    ];
}
