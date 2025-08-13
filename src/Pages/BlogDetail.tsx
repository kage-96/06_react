import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { posts } from '../data/posts';
import type { PostType } from '../Type/Post';

import classes from './BlogDetail.module.css'

export const BlogDetail:React.FC = () => {
  const [ loading, setLoading ] = useState(false);
  const [ post , setPost ] = useState<PostType | undefined>(undefined)
  const params = useParams();
  

  useEffect(() => {
    setLoading(true);
    try{
      const post:PostType | undefined = posts.find(post => post.id.toString() == params.id);
      setPost(post);
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false)
    }
  },[])

  if (loading) {
    return <p>読み込み中...</p>
  }

  if (!post) {
    return <p>投稿は見つかりませんでした。</p>;
  }

  const { title, thumbnailUrl, createdAt, categories, content } = post;
  const date = new Date(createdAt)
  return (
    <div className={classes.detailContainer}>
      <div className={classes.detailPost}>
        <img src={thumbnailUrl} alt={title} />
        <div className={classes.detailHeader}>
          <p className={classes.date}>{`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}</p>
          <ul className={classes.category}>
            {categories.map(category => <li>{category}</li>)}
          </ul>
        </div>
        <div>
          <p className={classes.detailTitle}>{title}</p>
          <p dangerouslySetInnerHTML={{__html:content}} />
        </div>
      </div>
    </div>
  )
}
