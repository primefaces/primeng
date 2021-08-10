import { TreeNodeDragEvent } from './treenodedragevent';
export declare class TreeDragDropService {
    private dragStartSource;
    private dragStopSource;
    dragStart$: import("rxjs").Observable<TreeNodeDragEvent>;
    dragStop$: import("rxjs").Observable<TreeNodeDragEvent>;
    startDrag(event: TreeNodeDragEvent): void;
    stopDrag(event: TreeNodeDragEvent): void;
}
