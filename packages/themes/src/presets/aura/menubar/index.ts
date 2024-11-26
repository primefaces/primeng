import { MenubarDesignTokens } from '../../../../types/menubar';

export default {
    root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        transitionDuration: '{transition.duration}'
    },
    baseItem: {
        borderRadius: '{content.border.radius}',
        padding: '{navigation.item.padding}'
    },
    item: {
        focusBackground: '{navigation.item.focus.background}',
        activeBackground: '{navigation.item.active.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        activeColor: '{navigation.item.active.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
            color: '{navigation.item.icon.color}',
            focusColor: '{navigation.item.icon.focus.color}',
            activeColor: '{navigation.item.icon.active.color}'
        }
    },
    submenu: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        mobileIndent: '1rem',
        icon: {
            size: '{navigation.submenu.icon.size}',
            color: '{navigation.submenu.icon.color}',
            focusColor: '{navigation.submenu.icon.focus.color}',
            activeColor: '{navigation.submenu.icon.active.color}'
        }
    },
    separator: {
        borderColor: '{content.border.color}'
    },
    mobileButton: {
        borderRadius: '50%',
        size: '1.75rem',
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        hoverBackground: '{content.hover.background}',
        focusRing: {
            width: '{focus.ring.width}',
            style: '{focus.ring.style}',
            color: '{focus.ring.color}',
            offset: '{focus.ring.offset}',
            shadow: '{focus.ring.shadow}'
        }
    }
} as MenubarDesignTokens;
