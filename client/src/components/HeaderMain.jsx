import { Link,useNavigate } from "react-router-dom";
import styles from '../css/Header.module.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useSelector } from 'react-redux';

function Header(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId, isLoggedIn } = useSelector(state => state.user);
    useEffect(()=>{
        console.log(userId)
        console.log(isLoggedIn)
    },[])
    const out = async () => {
        await axios.post('http://localhost:5000/logout').then(()=>{
            dispatch(logout());
            navigate('/login')
        });
    };

    return(
        <header>
            <div className={styles.logo}>
                <Link to={'/'}><h1>DEOKSU</h1></Link>
            </div>
            <div className={styles.big_menu}>
                <div className={styles.small_menu_area}>
                    <Link to={'/listAll/상의'}><h3>상의</h3></Link>
                    <div className={styles.small_menu}>
                        <Link to={'/listAll/상의/반팔'}><label>반팔</label></Link>
                        <Link to={'/listAll/상의/패딩'}><label>패딩</label></Link>
                        <Link to={'/listAll/상의/셔츠'}><label>셔츠</label></Link>
                        <Link to={'/listAll/상의/기타'}><label>기타</label></Link>
                    </div>
                </div>
                <div className={styles.small_menu_area}>
                    <Link to={'/listAll/하의'}><h3>하의</h3></Link>
                    <div className={styles.small_menu}>
                        <Link to={'/listAll/하의/반바지'}><label>반바지</label></Link>
                        <Link to={'/listAll/하의/청바지'}><label>청바지</label></Link>
                        <Link to={'/listAll/하의/기타'}><label>기타</label></Link>
                    </div>
                </div>
                <div className={styles.small_menu_area}>
                    <Link to={'/listAll/신발'}><h3>신발</h3></Link>
                    <div className={styles.small_menu}>
                        <Link to={'/listAll/신발/운동화'}><label>운동화</label></Link>
                        <Link to={'/listAll/신발/슬리퍼'}><label>슬리퍼</label></Link>
                        <Link to={'/listAll/신발/스니커즈'}><label>스니커즈</label></Link>
                        <Link to={'/listAll/신발/기타'}><label>기타</label></Link>
                    </div>
                </div>

            </div>
            <input type="hidden" id="userId" value={userId==null?'':userId}/>
            <Link to={'/userInfo'} style={{display:isLoggedIn?'':'none'}}><h3>내정보</h3></Link>
            <Link to={'/cart'} style={{display:isLoggedIn?'':'none'}}><h3>장바구니</h3></Link>
            <Link to={'/delivery'} style={{display:isLoggedIn?'':'none'}}><h3>주문목록</h3></Link>
            <Link onClick={out} style={{display:isLoggedIn?'':'none'}}><h3>로그아웃</h3></Link>
            <Link to={'/login'} style={{display:isLoggedIn?'none':''}}><h3>로그인</h3></Link>
        </header>
    )
}

export default Header;