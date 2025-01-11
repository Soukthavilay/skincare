import React from 'react'
import { GlobalState } from '../../../GlobalState'
import { useContext } from 'react'
import { useState } from 'react';
import axios from 'axios';
import '../scss/category_create.scss'

const Categories = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories
  const [category, setCategory] = useState('')
  const [token] = state.token
  const [callback, setCallback] = state.categoriesAPI.callback
  const [onEdit, setOnEdit] = useState(false)
  const [id, setID] = useState('')


  const createCategory = async e =>{
    e.preventDefault()
    try {
        if(onEdit){
            await axios.put(`http://localhost:5000/api/category/${id}`, {name: category}, {
                headers: {Authorization: token}
            })
            alert("Success")
        }else{
            await axios.post('http://localhost:5000/api/category', {name: category}, {
                headers: {Authorization: token}
            })
            alert("Success")
        }
        setOnEdit(false)
        setCategory('')
        setCallback(!callback)
        
    } catch (err) {
        alert(err.response.data.msg)
    }
  }
  const deleteCategory = async id =>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/category/${id}`, {
            headers: {Authorization: token}
        })
        alert(res.data.msg)
        setCallback(!callback)
    } catch (err) {
        alert(err.response.data.msg)
    }
  }
  const editCategory = async (id, name) =>{
    setID(id)
    setCategory(name)
    setOnEdit(true)
  }
  return (
    <>
      <div className='category_create'>
        <div className='sidebar_category'>
          <div className='category_left'>
            <h3>Create category</h3>
            <div className='field_category'>
            <input className='' type="text" name="category" value={category} required
                onChange={e => setCategory(e.target.value)} />
              <button className='app-content-headerButton button' type="submit" onClick={createCategory}>{onEdit? "Edit" : "Create"}</button>
            </div>
          </div>
          <div className='category_right'>
            <h3>Category List</h3>
            {categories?.map((category) =>{
              return (
                <div key={category._id} className='category_list'>
                  <h5>{category.name}</h5>
                  <div className='button-category'>
                      <button className='app-content-headerButton button' onClick={() => editCategory(category._id, category.name)}>Edit</button>
                      <button className='app-content-headerButton button' onClick={() => deleteCategory(category._id)}>Delete</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories