import { Link } from "react-router-dom";
import styles from '../css/Sell.module.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Main(){
    
    return(
        <div className={styles.main2}>
            <p>상품 리뷰</p>
            <div className={styles.comments}></div>
            <button className={`${styles.comments_add} ${styles.hidden}`}>더보기</button>
        </div>
    )
}

export default Main;