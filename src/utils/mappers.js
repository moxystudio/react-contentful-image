import { FORMAT, RESIZE, CROP, QUALITY, BACKGROUND_COLOR } from '../constants';

const parametersMapper = {
    [FORMAT]: {
        format: 'fm',
        compression: 'fl',
    },
    [RESIZE]: {
        width: 'w',
        height: 'h',
        behavior: 'fit',
        focusArea: 'f',
    },
    [CROP]: 'r',
    [QUALITY]: 'q',
    [BACKGROUND_COLOR]: 'bg',
};

const valuesMapper = {
    [FORMAT]: {
        compression: {
            '8bit': 'png8',
            progressive: 'progressive',
        },
        mimeType: {
            webp: 'webp',
            jpg: 'jpeg',
            png: 'png',
        },
    },
};

export {
    valuesMapper,
    parametersMapper,
};
