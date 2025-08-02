import { useLocation,useNavigate } from "react-router-dom";
import styles from '../css/DeliveryAddressSC.module.css'
import axios from 'axios';
import React,{ useState, useEffect } from 'react';

function Main(){
    const navigate = useNavigate();
    const [userId,setUserId] = useState('')
    const [name, setName] = useState('')
    const [phon, setPhon] = useState('')
    const [extraAddress, setExtraAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('')
    const [detailAddress,setDetailAddress] = useState('')
    const [defaultYn, setDefaultYn] = useState(false)
    const location = useLocation();
    const { deliveryAddressId } = location.state || {};

    useEffect(()=>{
        axios.get('http://localhost:5000/session',{
            withCredentials: true // 🔥 핵심: 세션 쿠키 전달 허용
        }).then(res=>{
            if(res.data.loggedIn){
                setUserId(res.data.userId)
            }else{
                setUserId('')
            }
        })

        if(deliveryAddressId != ''){
            axios.post("http://localhost:5000/deliveryAddressOne",{"deliveryAddressId":deliveryAddressId})
            .then(response=>{
                setName(response.data[0][0].name)
                setPostcode(response.data[0][0].postcode)
                setAddress(response.data[0][0].address)
                setDetailAddress(response.data[0][0].detailAddress)
                setExtraAddress(response.data[0][0].extraAddress)
                setPhon(response.data[0][0].phon)
                setDefaultYn(response.data[0][0].defaultYn=="Y")
            }).catch(err=>{
                
            })
        }
    },[])

    function daumOpen() {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.onload = () => {
            new window.daum.Postcode({
                oncomplete: onComplete
            }).open();
        };
        document.body.appendChild(script);

    };
    function onComplete(data){
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ''; // 주소 변수
        var extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            setExtraAddress(extraAddr)
        
        } else {
            setExtraAddress('')
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        setPostcode(data.zonecode)
        setAddress(addr)
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("sample6_detailAddress").focus();
    }
    
    function addressSave(){
        let url = 'deliveryAddressSave'
        let data = {
            "userId":document.querySelector("#userId"),
            "name":name,
            "phon":phon,
            "postcode":postcode,
            "address":address,
            "detailAddress":detailAddress,
            "extraAddress":extraAddress,
            "defaultYn":defaultYn ? 'Y':'N',
        }
        if(deliveryAddressId != ''){
            data["deliveryAddressId"] = deliveryAddressId
            url = 'deliveryAddressChange'
        }
        axios.post("http://localhost:5000/"+url,data)
        .then(response=>{
            if(response.data>0) navigate('/deliveryAddress')
        }).catch(err=>{
            
        })
    }

    return(
        <div className={styles.main}>
            <input type="hidden" id="userId" value={userId}/>
            <input type="hidden" className={styles.id} value={deliveryAddressId}/>
            <span>
                <label>배송지 {deliveryAddressId==''?'추가':'수정'}</label>
                <label className={styles.close} onClick={()=>{navigate('/deliveryAddress')}}>X</label>
            </span>
            <div className={styles.content}>
                <label>이름</label>
                <input type="text" placeholder="받는 분의 이름을 입력해주세요" value={name} className={styles.name} onChange={(e)=>{setName(e.currentTarget.value)}} />
                <label>휴대폰번호</label>
                <input type="text" placeholder="휴대폰번호를 입력해주세요" value={phon} className={styles.phon} onChange={(e)=>{setPhon(e.currentTarget.value)}}/>
                <label>주소</label>
                <div className={styles.address}>
                    <input type="text" id="sample6_postcode" value={postcode} placeholder="우편번호" readOnly />
                    <button onClick={daumOpen}>우편번호 찾기</button>
                </div>
                <input type="text" id="sample6_address" value={address} placeholder="주소" readOnly />
                <div className={styles.address2}>
                    <input type="text" id="sample6_detailAddress" value={detailAddress} placeholder="상세주소" onChange={(e) => setDetailAddress(e.target.value)}/>
                    <input type="text" id="sample6_extraAddress" value={extraAddress} placeholder="참고항목" onChange={(e) => setExtraAddress(e.target.value)}/>
                </div>
                <div className={styles.default_checked}>
                    <input type="checkbox" checked={defaultYn} onChange={()=>setDefaultYn(!defaultYn)}/>
                    <em>기본 배송지로 설정</em>
                </div>
            </div>
            <button className={styles.ok} onClick={addressSave}>저장하기</button>
        </div>
    )
}
    

export default Main;