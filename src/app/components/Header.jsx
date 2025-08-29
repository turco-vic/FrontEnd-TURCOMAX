import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Header.module.css';

export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.visual}>
                <Image src="/images/mask-aonymousblue500.png" alt="Logo" width={50} height={50} />
                <h1 className={styles.title}>TURCOMAX</h1>
            </div>
            
            <nav className={styles.nav}>
                <Link href="/intro" className={styles.navLink}>
                    Intro
                </Link>
                <Link href="/home" className={styles.navLink}>
                    Home
                </Link>
            </nav>
        </div>
    );
}