import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import buildUrlParameters from './utils';
import { FORMAT, RESIZE, CROP, QUALITY, BACKGROUND_COLOR } from './constants';

const ContentfulImage = forwardRef(({ format, optimize, resize, cropRadius, quality, backgroundColor, ...imageProps }, ref) => {
    const { convertedUrl, mimeType, originalUrl } = useMemo(() => {
        const originalUrl = imageProps.src;
        const urlParameters = [];
        let returnedMimeType;

        if (optimize) {
            const { url, mimeType } = buildUrlParameters({
                key: FORMAT,
                value: format,
                includeMimeType: true,
            });

            urlParameters.push(...url);
            returnedMimeType = mimeType;
        }

        if (resize) {
            const url = buildUrlParameters({
                key: RESIZE,
                value: resize,
            });

            urlParameters.push(...url);
        }

        if (cropRadius) {
            const url = buildUrlParameters({
                key: CROP,
                value: cropRadius,
            });

            urlParameters.push(...url);
        }

        if (quality) {
            const url = buildUrlParameters({
                key: QUALITY,
                value: quality,
            });

            urlParameters.push(...url);
        }

        if (backgroundColor) {
            const url = buildUrlParameters({
                key: BACKGROUND_COLOR,
                value: backgroundColor,
            });

            urlParameters.push(...url);
        }

        const convertedUrl = urlParameters.length ?
            `${originalUrl}?${urlParameters.join('&')}` :
            originalUrl;

        return {
            convertedUrl,
            mimeType: returnedMimeType,
            originalUrl,
        };
    }, [imageProps.src, format, resize, optimize, cropRadius, quality, backgroundColor]);

    return (
        <picture data-testid="picture">
            { convertedUrl !== originalUrl && <source srcSet={ convertedUrl } type={ mimeType } /> }
            <source srcSet={ originalUrl } />
            <img { ...imageProps } ref={ ref } />
        </picture>
    );
});

ContentfulImage.propTypes = {
    optimize: PropTypes.bool,
    quality: PropTypes.number,
    src: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    cropRadius: PropTypes.oneOfType([
        PropTypes.oneOf(['max']),
        PropTypes.number,
    ]),
    format: PropTypes.oneOf([
        'webp',
        'jpg',
        'png',
        'progressive jpg',
        '8bit png',
    ]),
    resize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        behavior: PropTypes.oneOf([
            'pad',
            'fill',
            'scale',
            'crop',
            'thumb',
        ]),
        focusArea: PropTypes.oneOf([
            'top',
            'right',
            'bottom',
            'left',
            'center',
            'top_right',
            'top_left',
            'bottom_right',
            'bottom_left',
            'face',
            'faces',
        ]),
    }),
};

ContentfulImage.defaultProps = {
    format: 'webp',
    optimize: true,
};

export default ContentfulImage;
