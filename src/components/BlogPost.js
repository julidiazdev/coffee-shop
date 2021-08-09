// BlogPost.js: a React component to show a blog post
// ----------------------------------------------------

import React from 'react';
// The component has attached its CSS module for styling
import styles from './BlogPost.module.css';

// BlogPost component receives as PROPERTIES all its
// data (title, date, excerpt), from a parent component ... 
export default function BlogPost({ title, date, excerpt }) {
    return (
        <article className={ styles.blog }>
            <h2>{ title }</h2>
            <h3>{ date }</h3>
            <p>{ excerpt } </p>
        </article>
    );
}