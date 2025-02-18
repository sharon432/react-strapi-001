import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blog data from Strapi backend
  useEffect(() => {
    axios.get('http://localhost:1337/api/blogs')
      .then(response => {
        setBlogs(response.data.data); // Assuming the data is under the "data" key
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {/* Iterate over the fetched blogs and display each one */}
      {blogs.length === 0 ? (
        <p>No blog posts available.</p> // Display if no blogs are fetched
      ) : (
        blogs.map(blog => (
          <div key={blog.id} className="blog-post">
            {/* Blog Title */}
            <h2>{blog.attributes.title}</h2>

            {/* Blog Content */}
            <p>{blog.attributes.content[0]?.children[0]?.text}</p> {/* Extracting content text */}

            {/* Blog Image */}
            {blog.attributes.image && (
              <img
                src={`http://localhost:1337${blog.attributes.image.url}`} // Prefix with your Strapi URL
                alt={blog.attributes.image.alternativeText || 'Blog image'}
                style={{ width: '100%', height: 'auto' }} // Adjust as needed
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
