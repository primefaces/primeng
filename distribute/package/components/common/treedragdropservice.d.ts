import { Observable } from 'rxjs/Observable';
import { TreeNodeDragEvent } from './treenodedragevent';
export declare class TreeDragDropService {
    private dragStartSource;
    private dragStopSource;
    dragStart$: Observable<TreeNodeDragEvent>;
    dragStop$: Observable<TreeNodeDragEvent>;
    startDrag(event: TreeNodeDragEvent): void;
    stopDrag(event: TreeNodeDragEvent): void;
}
