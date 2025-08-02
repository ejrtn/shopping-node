import { Link,useNavigate } from "react-router-dom";
import styles from '../css/Login.module.css'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserId } from '../store/userSlice';

function Main(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function login(){
        axios.post('http://localhost:5000/login',{
            "userId":document.querySelector("#id").value,
            "password":document.querySelector("#password").value,
        }, {
            withCredentials: true
        }).then(response=>{
            if(response.data.loggedIn){
                dispatch(setUserId(response.data.userId)); // 로그인 성공
                navigate("/")
            }else{
                alert("아이디 또는 패스워드가 잘못 되었습니다")
            }
        }).catch(err=>{

        })
    }

    return(
        <div className={styles.main}>
            <h1 onClick={()=>{navigate('/')}}>DEOKSU</h1>
            <input type="text" className={styles.id} placeholder="아이디" id="id"/>
            <form><input type="password" placeholder="패스워드" className={styles.pw} autoComplete="no" id="password"/></form>
            <button onClick={login}>로그인</button>
            <span>
                <a href="idpw">아이디/비밀번호 찾기</a>
                <em></em>
                <a href="join">회원가입</a>
            </span>
        </div>
    )
}

export default Main