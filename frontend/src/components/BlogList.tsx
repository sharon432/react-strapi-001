import React, { useEffect, useState } from "react";

// Define the type for the blog post
interface BlogPost {
  id: number;
  title: string;
  content: { type: string; children: { type: string; text: string }[] }[]; 
  image: {
    url: string;
    formats: {
      thumbnail: { url: string };
      small?: { url: string };
      medium?: { url: string };
    };
  }[];
}

const BlogList: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the blog data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/blog-posts?populate=*"); // Ensure this is the correct Strapi URL
        const data = await response.json();
        setBlogPosts(data.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading blog posts...</p>;
  }

  if (blogPosts.length === 0) {
    return <p>No blog posts found.</p>;
  }

  return (
    <div className="blog-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          className="blog-card rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
        >
          {/* Loop through the image formats if available */}
          {post.image && post.image.length > 0 && (
            post.image.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:1337${img.formats.medium?.url || img.url}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            ))
          )}

          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>

            {/* Render content dynamically */}
            <div className="text-gray-600">
              {post.content.map((block, blockIndex) => (
                <div key={blockIndex}>
                  {block.children.map((child, childIndex) => (
                    <p key={childIndex}>
                      {child.text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
