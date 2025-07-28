import { Link } from "react-router-dom";
import styles from '../css/Buy.module.css'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Main(){
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const [deliveryDetailDtos,setDeliveryDetailDtos] = useState([])
    const [totalMoney,setTotalMoney] = useState(0)
    const [totalDiscountMoney,setTotalDiscountMoney] = useState(0)
    const [deliveryMoney,setDeliveryMoney] = useState(0)
    const [totalCnt,setTotalCnt] = useState(0)

    const [userName,setUserName] = useState('')
    const [userPhon,setUserPhon] = useState('')
    const [userAddress,setUserAddress] = useState('')

    const [textarea,setTextarea] = useState(false)

    useEffect(()=>{
        axios.post('http://localhost:5000/tmpCartList',{"keyData":params.get('keyData')})
        .then(response => {
            let tc = 0
            let tm=0
            let td=0
            response.data[0].map((item)=>{
                item.cnt = JSON.parse(item.cnt)
                let cnt= 0
                Object.keys(item.cnt).map(color=>{
                    Object.keys(item.cnt[color]).map(size=>{
                        cnt += item.cnt[color][size]
                    })
                })
                item['totalCnt'] = cnt
                tc += cnt
                tm += cnt * parseInt(item.price)
                td += parseInt((cnt * parseInt(item.price))*(item.discount==''?0:parseInt(item.discount)/100))
            })
            setDeliveryDetailDtos(response.data[0])
            setTotalCnt(tc)
            setTotalMoney(tm)
            setTotalDiscountMoney(td)
        })
        .catch(err => {
            console.log(err)
        });

        axios.post('http://localhost:5000/deliveryAddressDefault',{"userId":document.querySelector("#userId").value})
        .then(response => {
            setUserName(response.data[0][0].name)
            setUserPhon(response.data[0][0].phon)
            setUserAddress(response.data[0][0].address+' '+response.data[0][0].detailAddress+' '+(response.data[0][0].extraAddress!=''?response.data[0][0].extraAddress:''))
        })
        .catch(err => {
            console.log(err)
        });

    },[])

    function deliveryRequest(e){
        setTextarea(e.target.value == '직접입력')
    }

    function addressChange(){
        const win = window.open("/deliveryAddress", "addressList", "width=448,height=690")
    }
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== window.location.origin) return; // 보안 확인

            setUserAddress(event.data.userAddress);
            setUserName(event.data.userName);
            setUserPhon(event.data.userPhon);
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);
    return(
        <div className={styles.main}>
            <div>
                <label className={styles.page_title}>주문서</label>
                <div className={styles.delivery_info}>
                    <p className={styles.user_info}>
                        <span>
                            <em className={styles.name}>{userName}</em>
                            <em className={styles.default_yn}>기본 배송지</em>
                        </span>
                        <button className={styles.address_change} onClick={addressChange}>배송지 변경</button>
                    </p>
                    <p className={styles.address}>{userAddress}</p>
                    <p className={styles.phon}>{userPhon}</p>
                    <select onInput={deliveryRequest}>
                        <option value="배송 요청사항을 선택해주세요" hidden>배송 요청사항을 선택해주세요</option>
                        <option value="문 앞에 놔주세요">문 앞에 놔주세요</option>
                        <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                        <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
                        <option value="배송 전에 연락 주세요">배송 전에 연락 주세요</option>
                        <option value="직접입력">직접입력</option>
                    </select>
                    <textarea className={textarea? '':styles.hidden} placeholder="최대 50자까지 입력 가능합니다." maxLength="50"></textarea>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>이미지</th>
                            <th>정보</th>
                            <th>옵션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveryDetailDtos.map((item,idx)=>(
                                <tr key={idx}>
                                    <td>
                                        <picture>
                                            <source srcSet={"http://localhost:5000/imgLoad?img="+item.img} type="image/webp"/>
                                            <img src={"http://localhost:500/imgLoad?img="+item.img}/>
                                        </picture>
                                    </td>
                                    <td>
                                        {item.productName}
                                        <span className={styles.price}>
                                            <em className={styles.discount}>{item.discount==''?'':item.discount+"%"}</em>
                                            <em>{item.price}</em>
                                        </span>
                                    </td>
                                    <td>
                                        {
                                            
                                            Object.keys(item.cnt).map((color)=>(
                                                Object.keys(item.cnt[color]).map((size)=>{
                                                    if(item.cnt[color][size]>0){
                                                        return (<div className={styles.size_cnt} key={color+"_"+size}>
                                                            <div className={styles.size_cnt_one}>
                                                                <div className={styles.color_ff0000} style={{backgroundColor:`#${color}`,borderColor:`#${color}`,borderColor:`#${color}`}}></div>
                                                                <label className={styles.size}>{size}</label>
                                                                <label className={styles.cnt}>
                                                                    <span className={styles.num}>{item.cnt[color][size]}개</span>
                                                                </label>
                                                                <label className={styles.money}>{item.price - (item.price * (item.discount==''?0:parseInt(item.discount)/100))}원</label>
                                                            </div>
                                                        </div>)
                                                    }
                                                })
                                            ))
                                        }
                                        <p className={styles.total_money}>
                                            <span className={styles.total_cnt}>총 {item.totalCnt}개</span>
                                            <span className={styles.money}>{item.totalCnt * (item.price-(item.price*(item.discount==''?0:parseInt(item.discount)/100)))}원</span>
                                        </p>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className={styles.total}>
                <h3>구매 금액</h3>
                <p><span>상품 금액</span><span className={styles.product_total_money}>{totalMoney}</span><span>원</span></p>
                <p><span>할인 금액</span><span className={styles.product_total_discount_money}>{totalDiscountMoney}</span><span>원</span></p>
                <p><span>배송비</span><span className={styles.delivery_money}>{deliveryMoney}</span><span>원</span></p>
                <p><span>총 개수</span><span className={styles.total_buy_cnt}>{totalCnt}</span><span>개</span></p>
                <p><span>총 구매 금액</span><span className={styles.total_buy_money}>{totalMoney-totalDiscountMoney-deliveryMoney}</span><span>원</span></p>
                <button className={styles.buy_btn}>구매하기</button>
            </div>
        </div>
    )
}

export default Main;