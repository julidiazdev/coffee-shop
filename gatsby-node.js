// gatsby-node.js: this file is used for creating dynamic pages
// (ex. the one for a blog post); for that, it uses the Gatsby Node APIs
// These APIs allow us to manipulate and query the GraphQL schema data and
// create dynamic pages from them

// The different functions we include in this file will be called in different
// moments of the BUILD PROCESS of the site.

// The main two functions we'll use are:

// 1. onCreateNode(): this function is called everytime a NEW NODE is created
// (ex. when a new file Markdown is created -- thanks to plugin gatsby-source-filesystem --, a new node is created, so this function is called)
// We'll use this function to create the SLUG for each blog post
// This function receives 2 params:
// - An object "node" containing the NEW NODE that is being created
// - An object "actions", which contains certain helper functions that can be called to perform several actions

// 2. createPages(): once we have get/collect data from a type SOURCE plugin and
// these data have been transformed thanks to a type TRANSFORMER plugin, we call this
// we have the data ready to create a new dynamic page from them.

// Because the data model has been prepared before calling this function
// we can execute GraphQL queries to view/check the data we need for creating our
// new dynamic page

// What we'll do is create a TEMPLATE PAGE and we'll pass it the specific data
// for each post, so we'll obtain a specific and dynamic page for each post

// createPages() function is called with 2 params:
// - An object containing the GraphQL query to obtain the blog post data for creating the page
// - An object "actions", similar to previous function

// Everytime we add a new post to the blog, we'll get
// the SLUG for each post and we'll add the slug as a NEW FIELD
// to the post data fields.
// After that, we'll use the slug to setup the URL for each post; as we already know,
// the slug is based on the Markdown filename for the post

// ------------------------------------------------------------------------------------------------

// Added the following variable which is needed by function createPages()
const path = require('path');

// We need to use the helper function createFilePath(), included
// in gatsby-source-filesystem plugin, to create an URL from a file path
const { createFilePath } = require('gatsby-source-filesystem');

// onCreateNode(node, getNode, actions)
exports.onCreateNode = function({ node, getNode, actions }) {
    
    // We need to destructure the "actions" object to pull out from it
    // the helper function createNodeField(), which we use to add the new "slug" field
    // to the node data fields
    const { createNodeField } = actions;

    // Because the previous helper function, createNodeField() is called everytime a new node is created,
    // but we only want to add the new field "slug" when the new node represents a new Markdown file (blog post),
    // we have firstly to check that ...
    if(node.internal.type === 'MarkdownRemark') {
        // Getting slug from file path
        const slug = createFilePath({ node, getNode });
        // Adding the slug
        createNodeField({
            node,
            name: 'slug',
            value: slug
        });
    }
};


// createPages(graphql, actions) --> asynchronous function (async)
exports.createPages = async function({ graphql, actions }) {
    // We need to destructure the "actions" object to pull out from it
    // the helper function createPage(), which we use to create a new dynamic page
    // from the page template "blog.js"
    const { createPage } = actions;  
  
    // GraphQL query to get the slug
    // Here the query is a bit different than in previous queries,
    // because instead of a graphql tag on a template string (graphql`....`), 
    // it's a function we call to execute the query, which is supplied as an argument --> await graphql(`...`) 
    // The use of "await" tell us that the graphql() function is returning us a Promise
    // To simplify the code, we're using the async/await syntax, which allows us to have 
    // asynchronous code written in synchronous style 
    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
        `);
    
    // As always, the result of a GraphQL query is stored
    // in the property "data", so we access it through const variable "result" ...
    // We loop over the set of nodes, mapping each node
    // to a call of createPage() function, which will create a new page
    // from the slug of each post, using the page template (blog.js)
    // The slug value is what is passed as an argument to the page query in the template page (blog.js),
    // used to get the whole data of each post
    result.data.allMarkdownRemark.edges
    .forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/blog.js'),
            context: {
                slug: node.fields.slug
            }
        });
    });
};

