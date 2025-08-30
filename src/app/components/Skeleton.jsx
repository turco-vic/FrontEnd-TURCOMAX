import styles from '../../styles/Skeleton.module.css';

export const SkeletonCard = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
        </div>
    );
};

export const SkeletonCarousel = () => {
    return (
        <div className={styles.skeletonCarousel}>
            <div className={styles.skeletonCarouselImage}></div>
            <div className={styles.skeletonCarouselInfo}>
                <div className={styles.skeletonCarouselTitle}></div>
                <div className={styles.skeletonCarouselRating}></div>
                <div className={styles.skeletonCarouselGenres}></div>
            </div>
        </div>
    );
};

export const SkeletonGrid = ({ count = 21 }) => {
    return (
        <div className={styles.skeletonGenresContainer}>
            {Array.from({ length: 5 }, (_, genreIndex) => (
                <div key={genreIndex} className={styles.skeletonGenreSection}>
                    <div className={styles.skeletonGenreTitle}></div>
                    <div className={styles.skeletonGenreRow}>
                        {Array.from({ length: 8 }, (_, cardIndex) => (
                            <div key={cardIndex} className={styles.skeletonGenreCard}>
                                <div className={styles.skeletonGenreImage}></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const SkeletonPagination = () => {
    return (
        <div className={styles.skeletonPagination}>
            {Array.from({ length: 7 }, (_, index) => (
                <div key={index} className={styles.skeletonPaginationButton}></div>
            ))}
        </div>
    );
};

export const SkeletonProfile = () => {
    return (
        <div className={styles.skeletonProfile}>
            <div className={styles.skeletonProfileImage}></div>
            <div className={styles.skeletonProfileCard}>
                <div className={styles.skeletonProfileTitle}></div>
                <div className={styles.skeletonProfileText}></div>
                <div className={styles.skeletonProfileText}></div>
            </div>
            <div className={styles.skeletonProfileCard}>
                <div className={styles.skeletonProfileTitle}></div>
                <div className={styles.skeletonTechGrid}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <div key={index} className={styles.skeletonTechIcon}></div>
                    ))}
                </div>
            </div>
            <div className={styles.skeletonButton}></div>
        </div>
    );
};
