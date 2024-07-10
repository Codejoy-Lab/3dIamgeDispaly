import React from "react";
import styles from './index.module.scss'
import {   useNavigate } from 'react-router-dom'
export default ()=>{
  const navigate = useNavigate()
  const handleClick=(path:string)=>{
    navigate(path)
  }
  return <div className={styles.container}>
    <div className={styles.image} onClick={()=>{handleClick('/imageToModel')}}>图生3D</div>
    <div className={styles.text} onClick={()=>{handleClick('/textToModel')}}>文生3D</div>
  </div>
}