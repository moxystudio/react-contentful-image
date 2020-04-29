import { FORMAT, RESIZE, CROP, QUALITY, BACKGROUND_COLOR } from '../constants';
import { parametersMapper, valuesMapper } from './mappers';

const buildUrlParametersFormat = ({ key, value, includeMimeType }) => {
    const conversion = value.split(' ');
    const formatParameter = parametersMapper[key].format;
    const compressionParameter = parametersMapper[key].compression;

    if (conversion.length === 2) {
        const compressionValue = valuesMapper[key].compression[conversion[0]];
        const url = `${formatParameter}=${conversion[1]}&${compressionParameter}=${compressionValue}`;

        return !includeMimeType ?
            [url] :
            {
                url: [url],
                mimeType: `image/${valuesMapper[key].mimeType[conversion[1]]}`,
            };
    }

    const url = `${formatParameter}=${conversion[0]}`;

    return !includeMimeType ?
        [url] :
        { url: [url], mimeType: `image/${valuesMapper[key].mimeType[conversion[0]]}` };
};

const buildUrlParametersResize = ({ key, value }) => {
    const resizeParameters = Object.keys(value).map((element) => {
        const parameter = parametersMapper[key][element];

        return `${parameter}=${value[element]}`;
    });

    return resizeParameters;
};

const buildSimpleUrlParameter = ({ key, value }) => {
    const parameter = parametersMapper[key];

    return [`${parameter}=${value}`];
};

const buildUrlParameterBackgroundColor = ({ key, value }) => {
    const parameter = parametersMapper[key];
    const finalValue = value.replace('#', 'rgb:');

    return [`${parameter}=${finalValue}`];
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
