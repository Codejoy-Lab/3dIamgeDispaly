import React, { ReactNode } from "react";
import { Collapse   } from 'antd'
import styles from './index.module.scss';
interface Collapse  {
    onChange: (...args:any)=>void;
    items: {  label: string; children: ReactNode  }[]
}


export default (props)=>{
    const { onChange = ()=>{}, items = [  { key :1, label : '提示词', children:  <p style={{height:'100px', width: '100px'}}>提示词</p> }, {  key :2,label : '风格', children:  <p style={{height:'100px', width: '100px'}}>风格</p> }  ] } = props
    return <div className={styles.container} >
        <Collapse defaultActiveKey={1}  onChange={onChange} items={items} />
    </div>
}