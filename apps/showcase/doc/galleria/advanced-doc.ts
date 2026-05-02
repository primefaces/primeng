import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { PhotoService } from '@/service/photoservice';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Galleria, GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'advanced-doc',
    standalone: true,
    imports: [CommonModule, GalleriaModule, ButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Galleria can be extended further to implement complex requirements.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria
                #galleria
                [(value)]="images"
                [(activeIndex)]="activeIndex"
                [numVisible]="5"
                [showThumbnails]="showThumbnails"
                [showItemNavigators]="true"
                [showItemNavigatorsOnHover]="true"
                [circular]="true"
                [autoPlay]="isAutoPlay"
                [transitionInterval]="3000"
                [containerStyle]="{ 'max-width': '640px' }"
                [pt]="galleriaPT"
            >
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" [ngStyle]="{ width: !fullscreen ? '100%' : '', display: !fullscreen ? 'block' : '' }" />
                </ng-template>
                <ng-template #thumbnail let-item>
                    <div class="grid gap-4 justify-center">
                        <img [src]="item.thumbnailImageSrc" style="display: block" />
                    </div>
                </ng-template>
                <ng-template #footer let-item>
                    <div class="flex items-stretch gap-2 bg-surface-950 text-white h-10">
                        <button
                            type="button"
                            pButton
                            icon="pi pi-th-large"
                            (click)="onThumbnailButtonClick()"
                            class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3"
                        ></button>
                        <button
                            type="button"
                            pButton
                            [icon]="slideButtonIcon()"
                            (click)="toggleAutoSlide()"
                            class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3"
                        ></button>
                        <span *ngIf="images()" class="flex items-center gap-4 ml-3">
                            <span class="text-sm">{{ activeIndex + 1 }}/{{ images().length }}</span>
                            <span class="font-bold text-sm">{{ images()[activeIndex].title }}</span>
                            <span class="text-sm">{{ images()[activeIndex].alt }}</span>
                        </span>
                        <button
                            type="button"
                            pButton
                            [icon]="fullScreenIcon()"
                            (click)="toggleFullScreen()"
                            class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3 ml-auto"
                        ></button>
                    </div>
                </ng-template>
            </p-galleria>
        </div>
        <app-code></app-code>
    `
})
export class AdvancedDoc implements OnInit, OnDestroy {
    private platformId = inject(PLATFORM_ID);
    private photoService = inject(PhotoService);

    images = signal<any[]>([]);

    showThumbnails: boolean = false;

    fullscreen: boolean = false;

    activeIndex: number = 0;

    isAutoPlay: boolean = true;

    onFullScreenListener: any;

    get galleriaPT() {
        return {
            root: {
                class: [{ 'flex flex-col': this.fullscreen }]
            },
            content: {
                class: ['relative', { 'flex-1 justify-center': this.fullscreen }]
            },
            thumbnails: 'absolute w-full left-0 bottom-0'
        };
    }

    @ViewChild('galleria') galleria: Galleria | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    ngOnInit() {
        this.photoService.getImages().then((images) => {
            this.images.set(images);
        });
        this.bindDocumentListeners();
    }

    onThumbnailButtonClick() {
        this.showThumbnails = !this.showThumbnails;
    }

    toggleAutoSlide() {
        this.isAutoPlay = !this.isAutoPlay;
    }

    toggleFullScreen() {
        if (this.fullscreen) {
            this.closePreviewFullScreen();
        } else {
            this.openPreviewFullScreen();
        }
    }

    openPreviewFullScreen() {
        let elem = this.galleria?.element.nativeElement.querySelector('.p-galleria');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem['mozRequestFullScreen']) {
            /* Firefox */
            elem['mozRequestFullScreen']();
        } else if (elem['webkitRequestFullscreen']) {
            /* Chrome, Safari & Opera */
            elem['webkitRequestFullscreen']();
        } else if (elem['msRequestFullscreen']) {
            /* IE/Edge */
            elem['msRequestFullscreen']();
        }
    }

    onFullScreenChange() {
        this.fullscreen = !this.fullscreen;
    }

    closePreviewFullScreen() {
        if (isPlatformBrowser(this.platformId)) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document['mozCancelFullScreen']) {
                document['mozCancelFullScreen']();
            } else if (document['webkitExitFullscreen']) {
                document['webkitExitFullscreen']();
            } else if (document['msExitFullscreen']) {
                document['msExitFullscreen']();
            }
        }
    }

    bindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            this.onFullScreenListener = this.onFullScreenChange.bind(this);
            document.addEventListener('fullscreenchange', this.onFullScreenListener);
            document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
            document.addEventListener('webkitfullscreenchange', this.onFullScreenListener);
            document.addEventListener('msfullscreenchange', this.onFullScreenListener);
        }
    }

    unbindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            document.removeEventListener('fullscreenchange', this.onFullScreenListener);
            document.removeEventListener('mozfullscreenchange', this.onFullScreenListener);
            document.removeEventListener('webkitfullscreenchange', this.onFullScreenListener);
            document.removeEventListener('msfullscreenchange', this.onFullScreenListener);
            this.onFullScreenListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindDocumentListeners();
    }

    slideButtonIcon() {
        return this.isAutoPlay ? 'pi pi-pause' : 'pi pi-play';
    }

    fullScreenIcon() {
        return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
    }
}
