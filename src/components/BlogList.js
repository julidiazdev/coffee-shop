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
            allMarkdownRemark {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            date(formatString: "MMMM D, YYYY")
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
                />        
            ))}
        </div>
    );
}
