import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>TURCOFLIX</h1>
        </div>
    );
}