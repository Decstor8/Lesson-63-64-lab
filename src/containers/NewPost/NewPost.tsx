import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiPost } from '../../types';

const NewPost = () => {
  const date = new Date();
  date.toISOString();

  const {id } = useParams<{id: string }>();
  const [post, setPost] = useState<ApiPost>({
    title: '',
    description: '',
    createdAt: date,
  });

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axiosApi.get<ApiPost>('/posts/' + id + '.json');
      setPost(response.data);
    } catch (error) {
      console.error('Упс.. ошибка: ', error);
    }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      await axiosApi.put('/posts/' + id + '.json', post);
    } else {
      await axiosApi.post('/posts.json', post);
    }
    setPost({ title: '', description: '' });
  };

  return (
    <div>
      <h2>
        {
          id ? 'Редактирование поста' : 'Новый пост'
        }
      </h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={post.title}
            onChange={change}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={post.description}
            onChange={change}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {
            id ? 'Update' : 'Create'
          }
        </button>
        <NavLink to="/" className="btn btn-danger m-3">Главная страница</NavLink>
      </form>
    </div>
  );
};
export default NewPost;