import styles from '../css/Header.module.css'

function Header(){
    return(
        <div className={styles.msg}>
            <div className={`${styles.chat} ${styles.hidden}`}>
                <div className={styles.chatting}>
                    <p className={styles.default_hello}></p>
                    <div className={styles.old_chat}></div>
                </div>
                <div id="write_area" className={styles.write_area} contentEditable={true} onDragEnter={(e) => e.preventDefault()} onDrop={(e) => e.preventDefault()} onDragOver={(e) => e.preventDefault()}></div>
            </div>
            <picture>
                <source srcSet="/msg-icon.webp" type="image/webp" />
                <img src="/msg-icon.webp"/>
            </picture>
        </div>
    )
}

export default Header;