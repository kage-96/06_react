import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import classes from './Contact.module.css'
import type { FormData, FormError } from '../Type/Form'

export const Contact:React.FC = () => {
  const url = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts';
  const [isSubmitting, setIsSubmitting ] = useState<boolean>(false)

  const [formData, setFormData] = useState<FormData>({
    name:"",
    email:"",
    content:""
  });

  const [errors, setErrors] = useState<FormError>({})

  const handleClickClear = () => {
    setFormData({name:'',email:'',content:''});
  }

  const checkEmail = (email: string) => {
    return /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
  };

  // 入力変更ハンドラ
  const handleChange =(e:ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    const {name,value} = e.target;
    setFormData((prev) => ({...prev,[name]:value}))
  }
  // バリデーション関数
  const validate = () => {
    const newErrors: FormError = {};

    if (!formData.name.trim()) {
      newErrors.name = "お名前は必須です。";
    } else if (formData.name.length > 30) {
      newErrors.name = "名前は30文字以内で入力してください";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスは必須です。";
    } else if (!checkEmail(formData.email)) {
      newErrors.email = "メールアドレスの形式が正しくありません";
    }

    if (!formData.content.trim()) {
      newErrors.content = "本文は必須です。";
    } else if (formData.content.length > 500) {
      newErrors.content = "本文は500文字以内で入力してください";
    }

    return newErrors;
  };
  // 送信イベント
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return
      // エラーなし → 送信処理
    const fetchData = async () => {
      try{
        console.log("送信データ:", formData);
        await fetch(url,{
          method:'POST',
          body:JSON.stringify(formData),
        });
        alert("送信成功！");
        setFormData({ name: "", email: "", content: "" });
      }catch(err){
        console.log(err)
      }finally{
        setIsSubmitting(false);
      }
    }
    fetchData();
  };

  return (
    <div className={classes.contact}>
      <h1>問い合わせフォーム</h1>

      <form onSubmit={handleSubmit}>

        <div className={classes.formItem}>
          <label htmlFor="name">お名前</label>
          <div>
            <input type="text" name="name" id='name' onChange={handleChange} value={formData.name} readOnly={isSubmitting} />
            {errors.name && <p className={classes.warning}>{errors.name}</p>}
          </div>
        </div>

        <div className={classes.formItem}>
          <label htmlFor="email">メールアドレス</label>
          <div>
            <input type="email" name="email" value={formData.email} id='email' onChange={handleChange} readOnly={isSubmitting} />
            {errors.email && <p className={classes.warning}>{errors.email}</p>}
          </div>
        </div>

        <div className={classes.formItem}>
          <label htmlFor="content">本文</label>
          <div>
            <textarea rows={8} name="content" id="content" onChange={handleChange} value={formData.content} readOnly={isSubmitting}></textarea>
            {errors.content && <p className={classes.warning}>{errors.content}</p>}
          </div>
        </div>

        <div className={classes.flex}>
          <button className={classes.black} type='submit' disabled={isSubmitting}>送信</button>
          <button className={classes.gray} type='button' onClick={handleClickClear} disabled={isSubmitting}>クリア</button>
        </div>

      </form>
    </div>
  )
}
