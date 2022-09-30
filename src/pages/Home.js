import styles from "../assets/pages/Home.module.css";
import { Link }  from "react-router-dom";

export default function Home()  {

    return (
        <div className={styles.main}>
            <div className={styles.sectionContainer}>
                <div className={styles.leftSide}>
                    <div className={styles.titleContainer}>
                        <span className={styles.title}>Vertical the <span className={styles.crypto}>crypto</span> gallery</span>
                    </div>
                    <div className={styles.subtitleContainer}>
                        <span className={styles.subtitle}>Gallery of gold-based NFTs</span>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Link to="/gold" className={styles.linkContainer}>
                            <div className={styles.btnContainer}>
                                <span className={styles.btnText}>GOLD</span>
                            </div>
                        </Link>
                        <Link to="/art" className={styles.linkContainer}>
                            <div className={styles.btnContainer}>
                                <span className={styles.btnText}>ART</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <span className={styles.rightLogo}>VERTICAL</span>
            </div>
        </div>
    );
};