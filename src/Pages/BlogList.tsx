import { posts } from '../data/posts';
import type{ PostType } from '../Type/Post';

export const BlogList = () => {
  return (
    <>
    <ul className="posts">
      {posts.map((post: PostType) => {
        const date = new Date(post.createdAt);
        return(
          <li key={post.id} className="post">
            <div>
              <div className="post-header">
                <p className="date">{`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>
                <ul className="category">
                  {post.categories.map((category) => (
                    <li key={category}>
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="post-content">
                <p className="post-title">{post.title}</p>
                {post.content.split('<br/>').map((line,index) => (
                  <p className="post-body" key={index}>
                    {line}
                    <br />
                    </p>
                ))}
              </div>
            </div>
          </li>
        )
      })}

    </ul>
    </>
  )
}
