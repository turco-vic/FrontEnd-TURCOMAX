"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import styles from '../../styles/Header.module.css';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogoClick = () => {
        if (pathname === '/home') {
            window.location.reload();
        } else {
            router.push('/home');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.visual} onClick={handleLogoClick}>
                <Image 
                    src="/images/mask-aonymousblue500.png" 
                    alt="Logo" 
                    width={50} 
                    height={50} 
                    className={styles.logo}
                />
                <h1 className={styles.title}>TURCOMAX</h1>
            </div>
            
            <nav className={styles.nav}>
                <Link href="/series" className={styles.navLink}>
                    Home
                </Link>
                <Link href="/sobre" className={styles.navLink}>
                    Sobre
                </Link>
                <Link href="/apiinfo" className={styles.navLink}>
                    API Info
                </Link>
            </nav>
        </div>
    );
}