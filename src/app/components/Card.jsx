import styles from '../../styles/Card.module.css';

export default function Card({ title, text, imgs }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            
            {text && (
                <p className={styles.text}>{text}</p>
            )}
            
            {imgs && (
                <div className={styles.imagesContainer}>
                    {imgs.map((img, index) => (
                        <div key={index} className={styles.imageWrapper}>
                            <img 
                                src={img} 
                                alt={`Tecnologia ${index + 1}`} 
                                className={styles.image}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
