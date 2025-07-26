import { Link } from "react-router-dom";
import styles from '../css/Header.module.css'

function Header(){
    return(
        <header>
            <div className={styles.logo}>
                <Link to={'/'}><h1>DEOKSU</h1></Link>
            </div>
            <div className={styles.big_menu}>
                <div className={styles.small_menu_area}>
                    <Link to={'/listAll/상의'}><h3>상의</h3></Link>
                    <div className={styles.small_menu}>
                        <Link to={'/listAll/상의-반팔'}><label>반팔</label></Link>
                        <Link to={'/listAll/상의-패딩'}><label>패딩</label></Link>
                        <Link to={'/listAll/상의-셔츠'}><label>셔츠</label></Link>
                        <Link to={'/listAll/상의-기타'}><label>기타</label></Link>
                    </div>
                </div>
                <div className={styles.small_menu_area}>
                    <Link to={'/listAll/하의'}><h3>하의</h3></Link>
                    <div className={styles.small_menu}>
                        <Link to={'/listAll/하의-반바지'}><label>반바지</label></Link>
                        <Link to={'/listAll/하의-청바지'}><label>청바지</label></Link>
                        <Link to={'/listAll/하의-기타'}><label>기타</label></Link>
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
            <input type="hidden" id="userId" value={sessionStorage.getItem('user')==null?'deoksu':sessionStorage.getItem('user')}/>
            <Link onClick={logout}><h3>로그아웃</h3></Link>
            <Link to={'/userInfo'}><h3>내정보</h3></Link>
            <Link to={'/cart'}><h3>장바구니</h3></Link>
            <Link to={'/delivery'}><h3>주문목록</h3></Link>
            <Link to={'/login'}><h3>로그인</h3></Link>
        </header>
    )
}

function logout(){
    console.log("logout")
}

export default Header;