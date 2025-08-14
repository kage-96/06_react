import classes from './BlogList.module.css';
import type{ PostType } from '../Type/Post';
import type React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const BlogList:React.FC = () => {
  const [posts, setPosts ] = useState<PostType[] | undefined>(undefined);
  const url = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts'

  useEffect(() => {
    const getDatas = async () => {
      try{
        const res = await fetch(url);
        const data = await res.json();
        setPosts(data.posts);
      }catch(err){
        console.log(err);
      }
    }
    getDatas()
  },[])

  return (
    <>
    <ul className={classes.posts}>
      {posts?.map((post: PostType) => {
        const date = new Date(post.createdAt);
        return(
          <li key={post.id} className={classes.post}>
            <Link to={`/posts/${post.id}/`}>
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
            </Link>
          </li>
        )
      })}

    </ul>
    </>
  )
}
