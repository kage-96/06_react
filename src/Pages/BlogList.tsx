import { posts } from '../data/posts';
import classes from './BlogList.module.css';
import type{ PostType } from '../Type/Post';

export const BlogList = () => {
  return (
    <>
    <ul className={classes.posts}>
      {posts.map((post: PostType) => {
        const date = new Date(post.createdAt);
        return(
          <li key={post.id} className={classes.post}>
            <div>
              <div className={classes.post_header}>
                <p className={classes.date}>{`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>
                <ul className={classes.category}>
                  {post.categories.map((category) => (
                    <li key={category}>
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={classes.post_content}>
                <p className={classes.post_title}>{post.title}</p>
                {post.content.split('<br/>').map((line,index) => (
                  <p className={classes.post_body} key={index}>
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
