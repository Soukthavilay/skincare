import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

function SideBar() {
  const state = useContext(GlobalState);
  const [bands] = state.BandAPI.bands;
  const [categories] = state.categoriesAPI.categories;
  const [selectedBand, setSelectedBand] = useState('');
  const [id,setId] = useState('');

  const handleClick = (bandName) => {
    setSelectedBand(bandName);
  };

  useEffect(()=>{
    bands.forEach((band)=>{
      if(selectedBand === band.name){
        setId(band._id)
      }
    })
  },[selectedBand,bands,id])

  return (
    <div className="sidebar" style={{width: "400px"}}>
      <div className="sidebar-item">
        <h3 className="sidebar-item-title">Categories</h3>
        <ul className="sidebar-item-list">
          {categories?.map((category)=>{
            return (
              <Link target='_parent' key={category._id} to={`/product-list/${category._id}`}><li >{category.name}</li></Link>
            )
          })}
        </ul>
      </div>
      <div className="sidebar-item">
        <h3 className="sidebar-item-title">Bands</h3>
        <ul className="sidebar-item-list">
        {bands?.map((band)=>{
            return (
              <Link target='_parent' key={band._id} to={`/product-list/${band._id}`}><li >{band.name}</li></Link>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default SideBar