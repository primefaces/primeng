import { Pipe, PipeTransform } from '@angular/core';
import { isNotEmpty } from '@primeuix/utils';

@Pipe({
    name: 'isItemGroup',
    standalone: true
})
export class IsItemGroupPipe implements PipeTransform {
    transform(processedItem: any): boolean {
        return isNotEmpty(processedItem.items);
    }
}
