import { Link } from "react-router-dom";
import styles from '../css/Index.module.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Main(){
    const [top, setTop] = useState([]);
    const [bottom, setBottom] = useState([]);
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/top10')
        .then(response => {
            const topList = [];
            const bottomList = [];
            const shoesList = [];
            response.data[0].forEach(item => {
                if (item.category === '상의') {
                    topList.push(item);
                } else if (item.category === '하의') {
                    bottomList.push(item);
                } else {
                    shoesList.push(item);
                }
            });

            setTop(topList);
            setBottom(bottomList);
            setShoes(shoesList);
            
        })
        .catch(err => {
            console.log(err)
        });
    }, []); // 빈 배열: 컴포넌트 마운트 시 1회 실행

    function rank_1_5(e){
        let el = e.target.previousElementSibling
        const offsetX = el.offsetWidth;
        el.scrollBy(-offsetX,0)
    }
    function rank_6_10(e){
        let el = e.target.previousElementSibling.previousElementSibling 
        const offsetX = el.offsetWidth;
        el.scrollBy(offsetX,0)
    }

    return(
        <div className={styles.main}>
            <div className={styles.product_list}>
                <div className={styles.top}>
                    <p>상의</p>
                    <Link to="/listAll/상의"><label>전체보기</label></Link>
                    <div className={styles.list}>
                        {
                            top.map((item, index) => (
                                <div key={index} className={styles.product}>
                                    <picture>
                                        <source srcSet={`http://localhost:5000/imgLoad?img=${item.img}`} type="image/webp" />
                                        <Link to={`/sell?productId=${item.productId}`}>
                                            <img src={`http://localhost:5000/imgLoad?img=${item.img}`} alt={item.productName} />
                                        </Link>
                                    </picture>
                                    <div>
                                        <a href={`http://localhost:5000/sell?productId=${item.productId}`}>
                                            <span>{item.productName}</span>
                                        </a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.rank_1_5} onClick={rank_1_5}></div>
                    <div className={styles.rank_6_10} onClick={rank_6_10}></div>
                </div>
                <div className={styles.bottom}>
                    <p>하의</p>
                    <Link to='/listAll/하의'><label>전체보기</label></Link>
                    <div className={styles.list}>
                        {
                            bottom.map((item, index) => (
                                <div key={index} className={styles.product} >
                                    <picture>
                                        <source srcSet={`http://localhost:5000/imgLoad?img=${item.img}`} type="image/webp" />
                                        <Link to={`/sell?productId=${item.productId}`}>
                                            <img src={`http://localhost:5000/imgLoad?img=${item.img}`}/>
                                        </Link>
                                    </picture>
                                    <div>
                                        <Link to={`/sell?productId=${item.productId}`}>
                                            <span>{item.productName}</span>
                                        </Link>
                                    </div>
                                </div> 
                            ))
                        }
                    </div>
                    <div className={styles.rank_1_5} onClick={rank_1_5}></div>
                    <div className={styles.rank_6_10} onClick={rank_6_10}></div>
                </div>
                <div className={styles.shoes}>
                    <p>신발</p>
                    <Link to='/listAll/신발'><label>전체보기</label></Link>
                    <div className={styles.list}>
                        {
                            shoes.map((item, index)=>(
                                <div key={index} className={styles.product} >
                                    <picture>
                                        <source srcSet={`http://localhost:5000/imgLoad?img=${item.img}`} type="image/webp" />
                                        <Link to={`/sell?productId=${item.productId}`}>
                                            <img src={`http://localhost:5000/imgLoad?img=${item.img}`}/>
                                        </Link>
                                    </picture>
                                    <div>
                                        <Link to={`/sell?productId=${item.productId}`}>
                                            <span>{item.productName}</span>
                                        </Link>
                                    </div>
                                </div> 
                            ))
                        }
                    </div>
                    <div className={styles.rank_1_5} onClick={rank_1_5}></div>
                    <div className={styles.rank_6_10} onClick={rank_6_10}></div>
                </div>
            </div>
        </div>
    )
}

export default Main;