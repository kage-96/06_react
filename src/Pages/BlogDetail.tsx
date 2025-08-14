import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { posts } from '../data/posts';
import type { PostType } from '../Type/Post';

import classes from './BlogDetail.module.css'

export const BlogDetail:React.FC = () => {
  const [ loading, setLoading ] = useState(false);
  const [ post , setPost ] = useState<PostType | undefined>(undefined)
  const params = useParams();
  const url = `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${params.id}`
  

  useEffect(() => {
    const getData = async () => {
      try{
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        setPost(data.post);
      }catch(err){
        console.error(err);
      }finally{
        setLoading(false)
      }
    }
    getData()
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
            {categories.map(category => <li key={category}>{category}</li>)}
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
