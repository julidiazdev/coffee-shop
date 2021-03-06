// BlogList.js: a React component to show the list of blog posts
// --------------------------------------------------------------

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
// We use the BlogPost component
import BlogPost from './BlogPost';

export default function BlogList() {
    // Defining GraphQL query, using the useStaticQuery hook
    const data = useStaticQuery(graphql`
        {
            # Here in the GraphQL query we set the correct date order for the posts,
            # using a parameter (sort), the field used for sort, and sort order
            allMarkdownRemark (sort: { fields: frontmatter___date, order: DESC }) {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            date(formatString: "MMMM D, YYYY")
                        }
                        excerpt
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    return(
        <div>
            { data.allMarkdownRemark.edges.map(edge => (
                <BlogPost 
                    key={ edge.node.id } 
                    title={ edge.node.frontmatter.title } 
                    date={ edge.node.frontmatter.date }
                    excerpt={ edge.node.excerpt }
                    slug= { edge.node.fields.slug }
                />        
            ))}
        </div>
    );
}
