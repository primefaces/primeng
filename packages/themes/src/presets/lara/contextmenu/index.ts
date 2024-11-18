import { ContextMenuDesignTokens } from '../../../../types/contextmenu';

export default {
    root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        transitionDuration: '{transition.duration}'
    },
    list: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}'
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
        mobileIndent: '1.25rem'
    },
    submenuLabel: {
        padding: '{navigation.submenu.label.padding}',
        fontWeight: '{navigation.submenu.label.font.weight}',
        background: '{navigation.submenu.label.background.}',
        color: '{navigation.submenu.label.color}'
    },
    submenuIcon: {
        size: '{navigation.submenu.icon.size}',
        color: '{navigation.submenu.icon.color}',
        focusColor: '{navigation.submenu.icon.focus.color}',
        activeColor: '{navigation.submenu.icon.active.color}'
    },
    separator: {
        borderColor: '{content.border.color}'
    }
} as ContextMenuDesignTokens;
