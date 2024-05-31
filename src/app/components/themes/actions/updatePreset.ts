import { SharedUtils, Theme } from 'primeng/themes';

export default (...presets) => {
    const newPreset = SharedUtils.object.mergeKeys(Theme.getPreset(), ...presets);

    Theme.setPreset(newPreset);

    return newPreset;
};
