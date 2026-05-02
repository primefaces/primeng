const originalStyles = new WeakMap<HTMLElement, { display?: string; visibility?: string; maxHeight?: string; overflow?: string }>();

export function applyHiddenStyles(element: HTMLElement, strategy: 'display' | 'visibility') {
    if (!element) return;

    if (!originalStyles.has(element)) {
        originalStyles.set(element, {
            display: element.style.display,
            visibility: element.style.visibility,
            maxHeight: element.style.maxHeight,
            overflow: element.style.overflow
        });
    }

    switch (strategy) {
        case 'display':
            element.style.display = 'none';
            break;
        case 'visibility':
            element.style.visibility = 'hidden';
            element.style.maxHeight = '0';
            element.style.overflow = 'hidden';
            break;
    }
}

export function resetStyles(element: HTMLElement, strategy: 'display' | 'visibility') {
    if (!element) return;

    const original = originalStyles.get(element) ?? element.style;

    switch (strategy) {
        case 'display':
            element.style.display = original?.display || '';
            break;
        case 'visibility':
            element.style.visibility = original?.visibility || '';
            element.style.maxHeight = original?.maxHeight || '';
            element.style.overflow = original?.overflow || '';
            break;
    }

    originalStyles.delete(element);
}
