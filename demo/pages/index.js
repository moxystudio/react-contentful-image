import React from 'react';
import ContentfulImage from '@moxy/react-contentful-image';

import styles from './index.module.css';

const Home = () => (
    <div className={ styles.container }>
        <h1>Contentful Image</h1>
        <ContentfulImage
            backgroundColor="#9090ff"
            resize={ { width: 100, height: 100, behavior: 'pad' } }
            image="//images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg" />
    </div>
);

export default Home;
