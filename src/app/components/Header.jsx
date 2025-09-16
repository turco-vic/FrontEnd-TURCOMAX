"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from '../../styles/Header.module.css';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogoClick = () => {
        if (pathname === '/home') {
            window.location.reload();
        } else {
            router.push('/series');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/series?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
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
            
            <div className={styles.searchContainer}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Pesquisar séries..."
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        onKeyPress={handleKeyPress}
                        className={styles.searchInput}
                    />
                    <button 
                        type="submit" 
                        className={styles.searchButton}
                        disabled={!searchTerm.trim()}
                    >
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"/>
                            <path d="21 21l-4.35-4.35"/>
                        </svg>
                    </button>
                </form>
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