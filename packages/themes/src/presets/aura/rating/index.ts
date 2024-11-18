import { RatingDesignTokens } from '../../../../types/rating';

export default {
    root: {
        gap: '0.25rem',
        transitionDuration: '{transition.duration}',
        focusRing: {
            width: '{focus.ring.width}',
            style: '{focus.ring.style}',
            color: '{focus.ring.color}',
            offset: '{focus.ring.offset}',
            shadow: '{focus.ring.shadow}'
        }
    },
    icon: {
        size: '1rem',
        color: '{text.muted.color}',
        hoverColor: '{primary.color}',
        activeColor: '{primary.color}'
    }
} as RatingDesignTokens;
