import { useParams,Link } from "react-router-dom";
import styles from '../css/ProductList.module.css'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Main(){
    const { category,smallCategory } = useParams(); // ← URL의 값 받기
    const [productList,setProductList] = useState([[]])
    const [startNum,setStartNum] = useState(0)
    const [size,setSize] = useState(0)
    
    useEffect(()=>{
        setStartNum(0);
        setProductList([[]]);
    },[category,smallCategory])

    useEffect(()=>{
        list()
    },[startNum, category, smallCategory])

    function list(){
        axios.post('http://localhost:5000/listAll',{
            category : category,
            smallCategory : smallCategory,
            startNum : startNum
        }).then(res=>{
            let result = []
            let line = []
            res.data[0].map((item,idx)=>{
                if(idx != 10){
                    line.push(item)
                    if((idx != 1 && idx % 5 == 4) || idx == res.data[0].length-1) {
                        result.push(line)
                        line=[]
                    }
                }
            })
            setSize(res.data[0].length)
            if(startNum==0) setProductList(result)
            else setProductList(prevList => [...prevList, ...result])
        }).catch(err=>{
            console.log(err)
        })
    }

    function add(){
        setStartNum(startNum+10)
    }

    return(
        <div className={styles.main}>
            <h1>{category+(smallCategory==null?'':'-'+smallCategory)}</h1>
            <div className={styles.list}>
                {
                    productList.map((item,idx)=>(
                        <div className={styles.line} key={idx}>
                            {
                                item.map((item2,idx2)=>(
                                    <div className={styles.product} key={idx2}>
                                        <picture>
                                            <source srcSet={'http://localhost:5000/imgLoad?img='+item2.img} type="image/webp" />
                                            <Link to={"/sell?productId="+item2.productId}>
                                                <img src={'http://localhost:5000/imgLoad?img='+item2.img} />
                                            </Link>
                                        </picture>
                                        <div>
                                            <Link to={"/sell?productId="+item2.productId}>
                                                <span>{item2.productName}</span>
                                                <span>
                                                    <em className={styles.discount}>{item2.discount==0 ? '' : item2.discount+'%'}</em>
                                                    <em>{item2.price+'원'}</em>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <p className={styles.add} onClick={add} style={{display:size==11?'':'none'}}>더보기</p>
        </div>
    )
}

export default Main