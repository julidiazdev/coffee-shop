// BlogPost.js: a React component to show a blog post
// ----------------------------------------------------

import React from 'react';
// The component has attached its CSS module for styling
import styles from './BlogPost.module.css';
// Importing built-in Link component from Gatsby to render a link into
// the post title to link to the dynamic page generated for the post
import { Link } from 'gatsby';

// BlogPost component receives as PROPERTIES all its
// data (title, date, excerpt), from a parent component ...
// UPDATE: we add the "slug" property, received from BlogList component
// We'll use this slug value to compose the link we'll insert in post title,
// for linking to the dynamic page of the post
export default function BlogPost({ title, date, excerpt, slug }) {
    return (
        <article className={ styles.blog }>
            <h2><Link to={ slug }> { title }</Link></h2>
            <h3>{ date }</h3>
            <p>{ excerpt } </p>
        </article>
    );
}