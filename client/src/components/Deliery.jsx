import { Link,useNavigate } from "react-router-dom";
import styles from '../css/Delivery.module.css'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Main(){
    const navigate = useNavigate();
    const [start,setStart] = useState(0)
    const [deliveryList,setDeliveryList] = useState([])
    const [deliveryListLength,setDeliveryListLength] = useState(0)
    
    useEffect(()=>{
        addDeliveryList(start)
    },[])

    function addDeliveryList(start){
        console.log(document.querySelector('#userId').value)
        axios.post('http://localhost:5000/deliveryList',{
            'userId':document.querySelector('#userId').value,
            'start':start
        }).then(response=>{
            console.log(response.data)
            let data = response.data[0].filter((item,idx)=>{
                if(idx < response.data[0].length-1 && response.data[0].length == 11){
                    return item
                }
            })
            setStart(start+10)
            setDeliveryListLength(response.data[0].length)
            setDeliveryList(prevList => [...prevList, ...data]);
        }).catch(err=>{
            console.log(err)
        })

    }

    function pay(idx){
        axios.post('http://localhost:5000/deliveryDetailList',{
            "deliveryId":deliveryList[idx].deliveryId
        }).then(response=>{
            let data = {
                "deliveryId":deliveryList[idx].deliveryId,
                "userId":document.querySelector('#userId').value,
                "name":deliveryList[idx].name,
                "address":deliveryList[idx].address,
                "phon":deliveryList[idx].phon,
                "request":deliveryList[idx].request,
                "quantity":deliveryList[idx].quantity,
                "totalAmount":deliveryList[idx].totalAmount,
                "tid":deliveryList[idx].tid,
                "deliveryDetailDtos":response.data[0]
            }
            axios.post('http://localhost:5000/kakaoPayment/ready',data)
            .then((response)=>{
                let win = window.open(response.data.next_redirect_pc_url,'kakapPay')
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    function delivery_cancel(idx){
        console.log(idx)
        axios.post('http://localhost:5000/kakaoPayment/refund',{
            
            "tid":deliveryList[idx].tid,
            "amount":deliveryList[idx].totalAmount
        })
        .then((response)=>{
            let win = window.open(response.data.next_redirect_pc_url,'kakapPay')
        }).catch(err=>{
            console.log(err)
        })
    }

    function detail_open(idx){
        navigate("/detail?deliveryId="+deliveryList[idx].deliveryId)
    }

    function tracking(idx){
        window.open("" ,"popForm",'width=450,height=914');
        document.querySelector("#t_name").value = deliveryList[idx].companyName
        document.querySelector("#t_invoice").value = deliveryList[idx].trackingCode
        document.querySelector(".courier-btn").click()
    }
    
    return(
        <div className={styles.main}>
            <table>
                <thead>
                    <tr>
                        <th>주문정보</th>
                        <th>받는사람</th>
                        <th>주문날짜</th>
                        <th>상태</th>
                        <th>기타</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deliveryList.map((item,idx)=>(
                            <tr key={idx}>
                                
                                <td>
                                    <input type="hidden" value={idx} className={styles.idx}/>
                                    <div className={styles.detail}>
                                        <span>제품 종류 : {item.kindCnt}개 </span>
                                        <span>총 수량 : {item.quantity}개 </span>
                                        <span>총 비용 : {item.totalAmount}원</span>
                                    </div>
                                </td>
                                <td><span>{item.name}</span></td>
                                <td><span>{item.cdate}</span></td>
                                <td>
                                    <span>{item.status}</span>
                                    {item.status=='배송중'?<p className={styles.tracking} onClick={()=>{tracking(idx)}}>배송조회</p>:''}
                                    {item.status=='미결제'?<p className={styles.pay} onClick={()=>{pay(idx)}}>결제하기</p>:''}
                                    {item.status=='결제완료'?<p className={styles.delivery_cancel} onClick={()=>{delivery_cancel(idx)}}>주문취소</p>:''}
                                </td>
                                <td><p className={styles.detail_open} onClick={()=>{detail_open(idx)}}>상세보기</p></td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            <span className={`${styles.add} ${deliveryListLength!=11?styles.hidden:''}`} onClick={()=>{addDeliveryList(start)}}>더보기</span>
            
            {/* <form action="/courier" method="post" style={{'display':'none'}} target="popForm">
                <div className={styles.form_group}>
                <label for="t_name">택배사 코드</label>
                <input type="text" className={styles.form_control} name="t_name" id="t_name" placeholder="택배사 이름"/>
                </div>
                <div className={styles.form_group}>
                <label for="t_invoice">운송장 번호</label>
                <input type="text" className={styles.form_control} name="t_invoice" id="t_invoice" placeholder="운송장 번호"/>
                </div>
                <button type="submit" className={styles.courier_btn}>조회하기</button>
            </form> */}
        </div>
    )
}

export default Main;