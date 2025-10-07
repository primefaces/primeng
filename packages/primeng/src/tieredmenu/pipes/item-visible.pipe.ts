import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isItemVisible',
    standalone: true
})
export class IsItemVisiblePipe implements PipeTransform {
    transform(processedItem: any): boolean {
        if (!processedItem || !processedItem.item) {
            return false;
        }
        return processedItem.item.visible !== false;
    }
}
