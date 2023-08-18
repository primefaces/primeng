import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/icons/basicdoc';
import { ColorDoc } from '../../doc/icons/colordoc';
import { ConstantsDoc } from '../../doc/icons/constantsdoc';
import { DownloadDoc } from '../../doc/icons/downloaddoc';
import { ImportDoc } from '../../doc/icons/importdoc';
import { ListDoc } from '../../doc/icons/listdoc';
import { SizeDoc } from '../../doc/icons/sizedoc';
import { SpinDoc } from '../../doc/icons/spindoc';

@Component({
    templateUrl: './iconsdemo.component.html',
    styleUrls: ['./iconsdemo.component.scss']
})
export class IconsDemoComponent {
    docs = [
        {
            id: 'download',
            label: 'Download',
            component: DownloadDoc
        },
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'color',
            label: 'Color',
            component: ColorDoc
        },
        {
            id: 'spin',
            label: 'Spin',
            component: SpinDoc
        },
        {
            id: 'constants',
            label: 'Constants',
            component: ConstantsDoc
        },
        {
            id: 'list',
            label: 'List',
            component: ListDoc
        }
    ];
}
