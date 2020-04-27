import { FORMAT, RESIZE, CROP, QUALITY, BACKGROUND_COLOR } from '../constants';
import { parametersMapper, valuesMapper } from './mappers';

const getParameterPrefix = (currentUrlParameters) => !currentUrlParameters ? '?' : '&';

const buildUrlParametersFormat = ({ key, value, currentUrlParameters, includeMimeType }) => {
    const conversion = value.split(' ');
    const formatParameter = parametersMapper[key].format;
    const compressionParameter = parametersMapper[key].compression;
    const prefix = getParameterPrefix(currentUrlParameters);

    if (conversion.length === 2) {
        const compressionValue = valuesMapper[key].compression[conversion[0]];
        const url = `${prefix}${formatParameter}=${conversion[1]}&${compressionParameter}=${compressionValue}`;

        return !includeMimeType ?
            url :
            { url, mimeType: `image/${valuesMapper[key].mimeType[conversion[1]]}` };
    }

    const url = `${prefix}${formatParameter}=${conversion[0]}`;

    return !includeMimeType ?
        url :
        { url, mimeType: `image/${valuesMapper[key].mimeType[conversion[0]]}` };
};

const buildUrlParametersResize = ({ key, value, currentUrlParameters }) => {
    const resizeParameters = Object.keys(value).reduce((acc, element, index) => {
        const prefix = getParameterPrefix(index === 0 ? currentUrlParameters : acc);
        const parameter = parametersMapper[key][element];

        return acc.concat(`${prefix}${parameter}=${value[element]}`);
    }, '');

    return resizeParameters;
};

const buildSimpleUrlParameter = ({ key, value, currentUrlParameters }) => {
    const prefix = getParameterPrefix(currentUrlParameters);
    const parameter = parametersMapper[key];

    return `${prefix}${parameter}=${value}`;
};

const buildUrlParameterBackgroundColor = ({ key, value, currentUrlParameters }) => {
    const prefix = getParameterPrefix(currentUrlParameters);
    const parameter = parametersMapper[key];
    const finalValue = value.replace('#', 'rgb:');

    return `${prefix}${parameter}=${finalValue}`;
};

const buildUrlParameters = (options) => {
    const { key } = options;

    switch (key) {
    case FORMAT:
        return buildUrlParametersFormat(options);
    case RESIZE:
        return buildUrlParametersResize(options);
    case CROP:
    case QUALITY:
        return buildSimpleUrlParameter(options);
    case BACKGROUND_COLOR:
        return buildUrlParameterBackgroundColor(options);
    default:
        break;
    }
};

export default buildUrlParameters;
