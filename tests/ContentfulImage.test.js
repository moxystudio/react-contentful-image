import React from 'react';
import { render } from '@testing-library/react';
import ContentfulImage from '../src/ContentfulImage';

const imageSrc = '//images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg';
const defaultProps = {
    src: imageSrc,
};

const renderWithProps = (props = {}) => render(<ContentfulImage { ...defaultProps } { ...props } />);

const renderAndRetrieveElements = (props = {}) => {
    const { getByTestId } = renderWithProps({ ...props });
    const pictureElem = getByTestId('picture');

    const children = Array.from(pictureElem.childNodes).reduce((acc, node, index) => {
        acc[`elem${index}`] = node;

        return acc;
    }, {});

    return {
        pictureElem,
        ...children,
    };
};

describe('ContentfulImage component', () => {
    it('should render correctly', () => {
        const {
            pictureElem,
            elem0: firstSourceElem,
            elem1: fallbackSourceElem,
            elem2: fallbackImgElem,
        } = renderAndRetrieveElements();

        expect(pictureElem.childNodes).toHaveLength(3);
        expect(firstSourceElem.tagName).toMatch(/source/i);
        expect(fallbackSourceElem.tagName).toMatch(/source/i);
        expect(fallbackImgElem.tagName).toMatch(/img/i);
    });

    it('should convert to webp format by default', () => {
        const {
            elem0: firstSourceElem,
            elem1: fallbackSourceElem,
            elem2: fallbackImgElem,
        } = renderAndRetrieveElements();

        expect(firstSourceElem).toHaveAttribute('srcset', `${imageSrc}?fm=webp`);
        expect(firstSourceElem).toHaveAttribute('type', 'image/webp');
        expect(fallbackSourceElem).toHaveAttribute('srcset', imageSrc);
        expect(fallbackImgElem).toHaveAttribute('src', imageSrc);
    });

    it('should\'t convert to any format when optimize prop is false', () => {
        const {
            pictureElem,
            elem0: sourceElem,
            elem1: fallbackImgElem,
        } = renderAndRetrieveElements({ optimize: false });

        expect(pictureElem.childNodes).toHaveLength(2);
        expect(sourceElem).toHaveAttribute('srcset', imageSrc);
        expect(fallbackImgElem).toHaveAttribute('src', imageSrc);
    });

    it('should convert to the required format', () => {
        const {
            elem0: firstSourceElem,
            elem1: fallbackSourceElem,
            elem2: fallbackImgElem,
        } = renderAndRetrieveElements({ format: 'progressive jpg' });

        expect(firstSourceElem).toHaveAttribute('srcset', `${imageSrc}?fm=jpg&fl=progressive`);
        expect(firstSourceElem).toHaveAttribute('type', 'image/jpeg');
        expect(fallbackSourceElem).toHaveAttribute('srcset', imageSrc);
        expect(fallbackImgElem).toHaveAttribute('src', imageSrc);
    });

    it('should resize the image', () => {
        const {
            elem0: firstSourceElem,
            elem1: fallbackSourceElem,
            elem2: fallbackImgElem,
        } = renderAndRetrieveElements({
            resize: { width: 40, height: 60, behavior: 'fill', focusArea: 'top' },
            optimize: false,
        });

        expect(firstSourceElem).toHaveAttribute('srcset', `${imageSrc}?w=40&h=60&fit=fill&f=top`);
        expect(fallbackSourceElem).toHaveAttribute('srcset', imageSrc);
        expect(fallbackImgElem).toHaveAttribute('src', imageSrc);
    });

    it('should crop the image', () => {
        const {
            elem0: firstSourceElem,
            elem1: fallbackSourceElem,
            elem2: fallbackImgElem,
        } = renderAndRetrieveElements({ cropRadius: 20, optimize: false });

        expect(firstSourceElem).toHaveAttribute('srcset', `${imageSrc}?r=20`);
        expect(fallbackSourceElem).toHaveAttribute('srcset', imageSrc);
        expect(fallbackImgElem).toHaveAttribute('src', imageSrc);
    });

    it('should convert image to a different level of quality', () => {
        const {
            elem0: firstSourceElem,
            elem1: fallbackSourceElem,
            elem2: fallbackImgElem,
        } = renderAndRetrieveElements({ quality: 10, format: 'jpg' });

        expect(firstSourceElem).toHaveAttribute('srcset', `${imageSrc}?fm=jpg&q=10`);
        expect(fallbackSourceElem).toHaveAttribute('srcset', imageSrc);
        expect(fallbackImgElem).toHaveAttribute('src', imageSrc);
    });

    it('should add background-color to the image', () => {
        const {
            elem0: firstSourceElem,
            elem1: fallbackSourceElem,
            elem2: fallbackImgElem,
        } = renderAndRetrieveElements({
            resize: { width: 100, height: 100, behavior: 'pad' },
            backgroundColor: '#9090ff',
        });

        expect(firstSourceElem).toHaveAttribute('srcset', `${imageSrc}?fm=webp&w=100&h=100&fit=pad&bg=rgb:9090ff`);
        expect(fallbackSourceElem).toHaveAttribute('srcset', imageSrc);
        expect(fallbackImgElem).toHaveAttribute('src', imageSrc);
    });
});
