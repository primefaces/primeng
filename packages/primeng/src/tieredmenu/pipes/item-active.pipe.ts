import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isItemActive',
    standalone: true
})
export class IsItemActivePipe implements PipeTransform {
    transform(processedItem: any, activeItemPath?: any[]): boolean {
        return isItemActive(processedItem, activeItemPath);
    }
}

export const isItemActive = (processedItem: any, activeItemPath?: any[]): boolean => {
    if (!activeItemPath?.length) {
        return false;
    }

    return activeItemPath.some((path) => path.key === processedItem.key);
};
