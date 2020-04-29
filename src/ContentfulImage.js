import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import buildUrlParameters from './utils';
import { FORMAT, RESIZE, CROP, QUALITY, BACKGROUND_COLOR } from './constants';

const ContentfulImage = forwardRef(({ format, optimize, resize, cropRadius, quality, backgroundColor, image, ...imageProps }, ref) => {
    const imageData = useMemo(() => {
        const originalUrl = typeof image === 'string' ? image : get(image, 'fields.file.url');

        if (!originalUrl) {
            return;
        }

        const urlParameters = [];
        let returnedMimeType;

        if (optimize) {
            const { url, mimeType } = buildUrlParameters({ key: FORMAT, value: format });

            urlParameters.push(...url);
            returnedMimeType = mimeType;
        }

        if (resize) {
            const url = buildUrlParameters({ key: RESIZE, value: resize });

            urlParameters.push(...url);
        }

        if (cropRadius) {
            const url = buildUrlParameters({ key: CROP, value: cropRadius });

            urlParameters.push(...url);
        }

        if (quality) {
            const url = buildUrlParameters({ key: QUALITY, value: quality });

            urlParameters.push(...url);
        }

        if (backgroundColor) {
            const url = buildUrlParameters({ key: BACKGROUND_COLOR, value: backgroundColor });

            urlParameters.push(...url);
        }

        const enhancedUrl = urlParameters.length ?
            `${originalUrl}?${urlParameters.join('&')}` :
            originalUrl;

        return {
            enhancedUrl,
            mimeType: returnedMimeType,
            originalUrl,
        };
    }, [image, format, resize, optimize, cropRadius, quality, backgroundColor]);

    if (!imageData) {
        console.error('ContentfulImage: Could not retrieve an URL from the `image` prop. Please check your object structure.');

        return null;
    }

    const { enhancedUrl, mimeType, originalUrl } = imageData;

    return (
        <picture data-testid="picture">
            { enhancedUrl !== originalUrl && <source srcSet={ enhancedUrl } type={ mimeType } /> }
            <source srcSet={ originalUrl } />
            <img { ...imageProps } src={ originalUrl } ref={ ref } />
        </picture>
    );
});

ContentfulImage.propTypes = {
    optimize: PropTypes.bool,
    quality: PropTypes.number,
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
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
