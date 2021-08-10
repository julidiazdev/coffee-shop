// blog.js: template page for creating dynamic pages
// for the blog posts from this template
// ------------------------------------------------------

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import styles from './blog.module.css';

// BlogTemplate()
export default function BlogTemplate({ data }) {
    return (
        <Layout>
            <div className={ styles.blog }>
                <h1>{ data.markdownRemark.frontmatter.title }</h1>
                <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}/>
            </div>
        </Layout>
    );
}

// GraphQL query
// The argument of the query ($slug) is passed from
// file gatsby-node.js, function createPages()
export const query = graphql `
    query($slug: String!) {
        markdownRemak(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`;