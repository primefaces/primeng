import { ImageCompareDesignTokens } from '../../../../types/imagecompare';

export default {
    handle: {
        size: '15px',
        hoverSize: '30px',
        background: 'rgba(255,255,255,0.3)',
        hoverBackground: 'rgba(255,255,255,0.3)',
        borderColor: 'rgba(255,255,255,0.3)',
        hoverBorderColor: 'rgba(255,255,255,0.3)',
        borderWidth: '3px',
        borderRadius: '50%',
        transitionDuration: '{transition.duration}',
        focusRing: {
            width: '{focus.ring.width}',
            style: '{focus.ring.style}',
            color: 'rgba(255,255,255,0.3)',
            offset: '{focus.ring.offset}',
            shadow: '{focus.ring.shadow}'
        }
    }
} as ImageCompareDesignTokens;
