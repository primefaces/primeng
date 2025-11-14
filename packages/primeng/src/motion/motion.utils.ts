export function applyHiddenStyles(element: HTMLElement, strategy: 'display' | 'visibility') {
    if (!element) return;

    switch (strategy) {
        case 'display':
            element.style.display = 'none';
            break;
        case 'visibility':
            element.style.visibility = 'hidden';
            element.style.maxHeight = '0';
            break;
    }
}

export function resetStyles(element: HTMLElement, strategy: 'display' | 'visibility') {
    if (!element) return;

    switch (strategy) {
        case 'display':
            element.style.display = '';
            break;
        case 'visibility':
            element.style.visibility = '';
            element.style.maxHeight = '';
            break;
    }
}
