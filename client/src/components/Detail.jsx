import { Link } from "react-router-dom";
import styles from '../css/Detail.module.css'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Main(){
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const [payStatus,setPayStatus] = useState('')
    const [userName,setUserName] = useState('')
    const [userPhon,setUserPhon] = useState('')
    const [userAddress,setUserAddress] = useState('')
    const [userRequest,setUserRequest] = useState('')
    const [deliveryDetailCommentsList,setDeliveryDetailCommentsList] = useState([])

    const [totalMoney,setTotalMoney] = useState(0)
    const [totalDiscountMoney,setTotalDiscountMoney] = useState(0)
    const [deliveryMoney,setDeliveryMoney] = useState(0)
    const [totalCnt,setTotalCnt] = useState(0)
    
    useEffect(()=>{
        axios.post('http://localhost:5000/getDelivery',{'deliveryId':params.get('deliveryId')})
        .then(response=>{
            setPayStatus(response.data[0][0].status)
            setUserName(response.data[0][0].name)
            setUserPhon(response.data[0][0].phon)
            setUserAddress(response.data[0][0].address)
            setUserRequest(response.data[0][0].request)

        }).catch(err=>{
            console.log(err)
        })

        axios.post('http://localhost:5000/deliveryDetailCommentsList',{
            'deliveryId':params.get('deliveryId'),
            'userId':document.querySelector("#userId").value
        }).then(response=>{
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
                tc += cnt
                tm += cnt * parseInt(item.price)
                td += parseInt((cnt * parseInt(item.price))*(item.discount==''?0:parseInt(item.discount)/100))
            })
            setTotalCnt(tc)
            setTotalMoney(tm)
            setTotalDiscountMoney(td)
            setDeliveryDetailCommentsList(response.data[0])
        }).catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <div className={styles.main}>
            <div>
                <label className={styles.page_title}>주문 상세보기</label>
                <div className={styles.delivery_info}>
                    <p className={styles.name}>{userName}</p>
                    <p className={styles.address}>{userAddress}</p>
                    <p className={styles.phon}>{userPhon}</p>
                    <textarea maxLength='50' className={styles.request} disabled value={userRequest}></textarea>
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
                            deliveryDetailCommentsList.map((item,idx)=>(
                                <tr key={item.productId}>
                                    <td>
                                        <input type="hidden" value={item.productId} className={styles.productId}/>
                                        <picture>
                                           <source srcSet={"http://localhost:5000/imgLoad?img="+item.img} type="image/webp" />
                                           <img src={"http://localhost:5000/imgLoad?img="+item.img} />
                                        </picture>
                                    </td>
                                    <td>
                                        {item.productName}
                                        <span className={styles.price}>
                                            <em className={styles.discount}>{item.discount==0 ? '' : item.discount+'%'}</em>
                                            <em>{item.price}</em>
                                        </span>
                                        
                                        <div style={{display: payStatus == '결제완료'?'block':'none'}}>
                                            <button className={styles.comment_btn} value={item.commentId==null?'':item.commentId}>{item.content==null?'리뷰저장':'리뷰수정'}</button>
                                            <div className={styles.comment_head}>
                                                <input type="text" className={styles.comment_title} placeholder="제목" defaultValue={item.title==null?'':item.title}/>
                                                <input type="text" className={styles.comment_rating} placeholder="평점 0.0~5.0" defaultValue={item.rating==null?'':item.rating}/>
                                            </div>
                                            <textarea className={styles.content} maxLength="100" placeholder="해당 제품 리뷰 작성(제한 100자)" defaultValue={item.content==null?'':item.content}></textarea>
                                        </div>
                                        
                                    </td>
                                    <td>
                                        <div className={styles.size_cnt}>
                                            {
                                                Object.keys(item.cnt).map(color=>(
                                                    Object.keys(item.cnt[color]).map(size=>{
                                                        if(item.cnt[color][size] > 0){
                                                            return (
                                                            <div className={styles.size_cnt_one} key={color+'_'+size}>
                                                                <div style={{backgroundColor:'#'+color
                                                                    , borderColor:'#'+(parseInt(color)>7631988?"000000":'ffffff')
                                                                    , color:'#'+(parseInt(color)>7631988?"000000":'ffffff')}}></div>
                                                                <label className={styles.size}>{size}</label>
                                                                <label className={styles.cnt}>
                                                                    <span className={styles.num}>{item.cnt[color][size]}</span>
                                                                </label>
                                                                <label className={styles.money}>{(parseInt(item.price * ((100-parseInt(item.discount))*0.01))*parseInt(item.cnt[color][size]))}원</label>
                                                            </div>
                                                            )
                                                        }
                                                    })
                                                ))
                                            }
                                        </div>
                                        <p className={styles.total_money}>
                                            <span className={styles.total_cnt}>총 0개</span><span className={styles.money}>0원</span>
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
                <p><span>총 구매 금액</span><span className={styles.total_buy_money}>{totalMoney-totalDiscountMoney+deliveryMoney}</span><span>원</span></p>
            </div>
        </div>
    )
}

export default Main;