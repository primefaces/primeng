import { OnInit } from '@angular/core';
import { Message } from '../../../components/common/api';
export declare class GMapDemo implements OnInit {
    options: any;
    overlays: any[];
    dialogVisible: boolean;
    markerTitle: string;
    selectedPosition: any;
    infoWindow: any;
    draggable: boolean;
    msgs: Message[];
    ngOnInit(): void;
    handleMapClick(event: any): void;
    handleOverlayClick(event: any): void;
    addMarker(): void;
    handleDragEnd(event: any): void;
    initOverlays(): void;
    zoomIn(map: any): void;
    zoomOut(map: any): void;
    clear(): void;
}
