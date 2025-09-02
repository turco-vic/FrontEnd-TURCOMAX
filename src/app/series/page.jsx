"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SkeletonCarousel, SkeletonGrid, SkeletonPagination } from '../components/Skeleton';
import styles from './Series.module.css';

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [topRatedShows, setTopRatedShows] = useState([]);
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
    const [genreShows, setGenreShows] = useState({});
    const [scrollPositions, setScrollPositions] = useState({});
    const [scrollStates, setScrollStates] = useState({});
    const router = useRouter();

    const buscarSeries = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://api.tvmaze.com/shows");
            setData(response.data);
            
            const showsWithRating = response.data.filter(show => 
                show.rating?.average && show.rating.average > 0
            );
            
            console.log("Total shows with rating:", showsWithRating.length);
            console.log("Ratings sample:", showsWithRating.slice(0, 5).map(show => ({
                name: show.name,
                rating: show.rating.average
            })));
            
            const top10Shows = showsWithRating
                .sort((a, b) => b.rating.average - a.rating.average)
                .slice(0, 10);
            
            console.log("Top 10 shows:", top10Shows.map(show => ({
                name: show.name,
                rating: show.rating.average
            })));
            
            setTopRatedShows(top10Shows);
            
            const genreGroups = {
                'Ação': ['Action'],
                'Aventura': ['Adventure'],
                'Comédia': ['Comedy'],
                'Drama': ['Drama'],
                'Romance': ['Romance'],
                'Ficção Científica': ['Science-Fiction'],
                'Fantasia': ['Fantasy'],
                'Terror': ['Horror'],
                'Suspense': ['Thriller'],
                'Crime': ['Crime'],
                'Mistério': ['Mystery'],
                'Documentário': ['Documentary'],
                'História': ['History'],
                'Família': ['Family'],
                'Infantil': ['Children'],
                'Anime': ['Anime'],
                'Animação': ['Animation'],
                'Música': ['Music'],
                'Variedades': ['Variety'],
                'Talk Show': ['Talk-Show'],
                'Esportes': ['Sports'],
                'Guerra': ['War'],
                'Legal': ['Legal'],
                'Sobrenatural': ['Supernatural'],
                'Western': ['Western'],
                'Medical': ['Medical'],
                'Espionagem': ['Espionage'],
                'Ação Militar': [],
                'Romance Dramático': [],
                'Comédia Romântica': [],
                'Terror Sobrenatural': [],
                'Ficção Científica Distópica': [],
                'Fantasia Épica': [],
                'Crime Investigativo': [],
                'Suspense Psicológico': [],
                'Comédia Familiar': [],
                'Drama Histórico': [],
                'Ação Policial': [],
                'Terror Clássico': [],
                'Aventura Fantástica': [],
                'Drama Médico': [],
                'Comédia de Situação': [],
                'Biografia': [],
                'Natureza & Ciência': [],
                'True Crime': [],
                'Reality TV': [],
                'Game Shows': [],
                'Late Night': [],
                'Esportes Extremos': [],
                'Guerra Moderna': [],
                'Guerra Histórica': [],
                'Investigação Paranormal': [],
                'Ação Cyberpunk': [],
                'Romance Histórico': [],
                'Comédia Stand-up': [],
                'Drama Policial': [],
                'Ficção Científica Espacial': [],
                'Fantasia Urbana': [],
                'Terror Psicológico': [],
                'Aventura Histórica': [],
                'Drama Social': [],
                'Comédia Musical': [],
                'Ação Heroica': [],
                'Mistério Sobrenatural': [],
                'Romance Contemporâneo': [],
                'Drama Judiciário': [],
                'Ficção Científica Alternativa': [],
                'Terror Slasher': [],
                'Aventura Selvagem': [],
                'Crime Organizado': [],
                'Suspense Tecnológico': [],
                'Drama Familiar': [],
                'Comédia Negra': [],
                'Ação Internacional': [],
                'Fantasia Medieval': [],
                'Terror Gótico': [],
                'Romance Adolescente': [],
                'Drama Escolar': [],
                'Crime de Rua': [],
                'Ficção Científica Apocalíptica': [],
                'Aventura Marítima': [],
                'Suspense Criminal': [],
                'Drama Biográfico': [],
                'Comédia Improvisacional': [],
                'Ação Futurista': [],
                'Fantasia Sombria': [],
                'Terror de Sobrevivência': [],
                'Romance Sobrenatural': [],
                'Drama Psicológico': [],
                'Crime Internacional': [],
                'Ficção Científica Experimental': [],
                'Aventura Urbana': [],
                'Suspense Médico': [],
                'Drama de Época': [],
                'Comédia Absurda': [],
                'Ação de Espionagem': [],
                'Fantasia Romântica': [],
                'Terror Cósmico': [],
                'Romance Maduro': [],
                'Drama de Guerra': [],
                'Crime Forense': [],
                'Ficção Científica Utópica': [],
                'Aventura Aérea': [],
                'Suspense Político': [],
                'Drama Musical': [],
                'Comédia Romântica Moderna': [],
                'Ação de Artes Marciais': [],
                'Fantasia Mitológica': [],
                'Terror de Possessão': [],
                'Romance de Época': [],
                'Drama Corporativo': [],
                'Crime de Elite': [],
                'Ficção Científica Biológica': [],
                'Aventura Espacial': [],
                'Suspense Doméstico': [],
                'Drama de Relacionamentos': [],
                'Comédia de Costumes': [],
                'Ação Militar Especial': [],
                'Fantasia Contemporânea': [],
                'Terror Viral': [],
                'Romance Virtual': [],
                'Drama de Vingança': [],
                'Crime Cibernético': [],
                'Ficção Científica Temporal': [],
                'Aventura Arqueológica': [],
                'Suspense Sobrenatural': [],
                'Drama de Superação': [],
                'Comédia Política': [],
                'Ação de Resgate': [],
                'Fantasia Infantil': [],
                'Terror de Criaturas': [],
                'Romance Intercultural': [],
                'Drama de Imigração': [],
                'Crime de Máfia': [],
                'Ficção Científica Robótica': [],
                'Aventura de Sobrevivência': [],
                'Suspense de Sequestro': [],
                'Drama de Amadurecimento': [],
                'Comédia de Viagem': [],
                'Ação Pós-Apocalíptica': [],
                'Fantasia de Portal': [],
                'Terror de Isolamento': [],
                'Romance de Verão': [],
                'Drama de Tribunal': [],
                'Crime de Vingança': [],
                'Ficção Científica Médica': [],
                'Aventura de Tesouro': [],
                'Suspense de Identidade': [],
                'Drama de Redenção': [],
                'Comédia de Escritório': [],
                'Ação de Proteção': [],
                'Fantasia de Magia': [],
                'Terror de Experimentos': [],
                'Romance de Reconciliação': [],
                'Drama de Comunidade': [],
                'Crime de Investigação': [],
                'Ficção Científica de Contato': [],
                'Aventura de Exploração': [],
                'Suspense de Conspiração': [],
                'Drama de Sacrifício': []
            };
            
            const genreMap = {};
            
            Object.keys(genreGroups).forEach(groupName => {
                genreMap[groupName] = [];
            });
            
            response.data.forEach(show => {
                if (show.genres && show.genres.length > 0) {
                    const genres = show.genres;
                    const rating = show.rating?.average || 0;
                    const summary = show.summary?.toLowerCase() || '';
                    
                    Object.entries(genreGroups).forEach(([groupName, genreList]) => {
                        if (genreList.length > 0 && genres.some(genre => genreList.includes(genre))) {
                            genreMap[groupName].push(show);
                        }
                    });
                    
                    if (genres.includes('Action') && genres.includes('War')) {
                        genreMap['Ação Militar'].push(show);
                    }
                    if (genres.includes('Drama') && genres.includes('Romance')) {
                        genreMap['Romance Dramático'].push(show);
                    }
                    if (genres.includes('Comedy') && genres.includes('Romance')) {
                        genreMap['Comédia Romântica'].push(show);
                    }
                    if (genres.includes('Horror') && genres.includes('Supernatural')) {
                        genreMap['Terror Sobrenatural'].push(show);
                    }
                    if (genres.includes('Science-Fiction') && rating >= 8.0) {
                        genreMap['Ficção Científica Distópica'].push(show);
                    }
                    if (genres.includes('Fantasy') && rating >= 8.0) {
                        genreMap['Fantasia Épica'].push(show);
                    }
                    if (genres.includes('Crime') && genres.includes('Mystery')) {
                        genreMap['Crime Investigativo'].push(show);
                    }
                    if (genres.includes('Thriller') && genres.includes('Drama')) {
                        genreMap['Suspense Psicológico'].push(show);
                    }
                    if (genres.includes('Comedy') && genres.includes('Family')) {
                        genreMap['Comédia Familiar'].push(show);
                    }
                    if (genres.includes('Drama') && genres.includes('History')) {
                        genreMap['Drama Histórico'].push(show);
                    }
                    if (genres.includes('Action') && genres.includes('Crime')) {
                        genreMap['Ação Policial'].push(show);
                    }
                    if (genres.includes('Horror') && rating >= 7.0 && rating < 8.5) {
                        genreMap['Terror Clássico'].push(show);
                    }
                    if (genres.includes('Adventure') && genres.includes('Fantasy')) {
                        genreMap['Aventura Fantástica'].push(show);
                    }
                    if (genres.includes('Drama') && genres.includes('Medical')) {
                        genreMap['Drama Médico'].push(show);
                    }
                    if (genres.includes('Comedy') && !genres.includes('Romance') && !genres.includes('Family')) {
                        genreMap['Comédia de Situação'].push(show);
                    }
                    if (genres.includes('Documentary') && (summary.includes('biography') || summary.includes('life of'))) {
                        genreMap['Biografia'].push(show);
                    }
                    if (genres.includes('Documentary') && (summary.includes('science') || summary.includes('nature'))) {
                        genreMap['Natureza & Ciência'].push(show);
                    }
                    if (genres.includes('Crime') && (summary.includes('true') || summary.includes('real'))) {
                        genreMap['True Crime'].push(show);
                    }
                    if (genres.includes('Mystery') && genres.includes('Supernatural')) {
                        genreMap['Investigação Paranormal'].push(show);
                    }
                    if (genres.includes('Science-Fiction') && genres.includes('Action') && (summary.includes('future') || summary.includes('cyber'))) {
                        genreMap['Ação Cyberpunk'].push(show);
                    }
                    if (genres.includes('Romance') && genres.includes('History')) {
                        genreMap['Romance Histórico'].push(show);
                    }
                    if (genres.includes('Drama') && genres.includes('Crime')) {
                        genreMap['Drama Policial'].push(show);
                    }
                    if (genres.includes('Science-Fiction') && (summary.includes('space') || summary.includes('planet'))) {
                        genreMap['Ficção Científica Espacial'].push(show);
                    }
                    if (genres.includes('Fantasy') && (summary.includes('modern') || summary.includes('city'))) {
                        genreMap['Fantasia Urbana'].push(show);
                    }
                    if (genres.includes('Horror') && genres.includes('Drama')) {
                        genreMap['Terror Psicológico'].push(show);
                    }
                    if (genres.includes('Adventure') && genres.includes('History')) {
                        genreMap['Aventura Histórica'].push(show);
                    }
                    if (genres.includes('Drama') && (summary.includes('social') || summary.includes('society'))) {
                        genreMap['Drama Social'].push(show);
                    }
                    if (genres.includes('Comedy') && genres.includes('Music')) {
                        genreMap['Comédia Musical'].push(show);
                    }
                    if (genres.includes('Action') && (summary.includes('hero') || summary.includes('super'))) {
                        genreMap['Ação Heroica'].push(show);
                    }
                    if (genres.includes('Romance') && !genres.includes('History') && !genres.includes('Fantasy')) {
                        genreMap['Romance Contemporâneo'].push(show);
                    }
                    if (genres.includes('Drama') && genres.includes('Legal')) {
                        genreMap['Drama Judiciário'].push(show);
                    }
                    if (genres.includes('Science-Fiction') && (summary.includes('alternate') || summary.includes('parallel'))) {
                        genreMap['Ficção Científica Alternativa'].push(show);
                    }
                    if (genres.includes('Horror') && (summary.includes('slasher') || summary.includes('killer'))) {
                        genreMap['Terror Slasher'].push(show);
                    }
                    if (genres.includes('Adventure') && (summary.includes('wild') || summary.includes('nature'))) {
                        genreMap['Aventura Selvagem'].push(show);
                    }
                    if (genres.includes('Crime') && (summary.includes('organization') || summary.includes('gang'))) {
                        genreMap['Crime Organizado'].push(show);
                    }
                    if (genres.includes('Thriller') && (summary.includes('technology') || summary.includes('tech'))) {
                        genreMap['Suspense Tecnológico'].push(show);
                    }
                    if (genres.includes('Drama') && genres.includes('Family')) {
                        genreMap['Drama Familiar'].push(show);
                    }
                    if (genres.includes('Comedy') && (summary.includes('dark') || summary.includes('black'))) {
                        genreMap['Comédia Negra'].push(show);
                    }
                    if (genres.includes('Action') && (summary.includes('international') || summary.includes('global'))) {
                        genreMap['Ação Internacional'].push(show);
                    }
                    if (genres.includes('Fantasy') && (summary.includes('medieval') || summary.includes('knight'))) {
                        genreMap['Fantasia Medieval'].push(show);
                    }
                    if (genres.includes('Horror') && (summary.includes('gothic') || summary.includes('classic'))) {
                        genreMap['Terror Gótico'].push(show);
                    }
                    if (genres.includes('Romance') && (summary.includes('teen') || summary.includes('young'))) {
                        genreMap['Romance Adolescente'].push(show);
                    }
                    if (genres.includes('Drama') && (summary.includes('school') || summary.includes('student'))) {
                        genreMap['Drama Escolar'].push(show);
                    }
                    
                    let hasBasicCategory = false;
                    ['Ação', 'Aventura', 'Comédia', 'Drama', 'Romance', 'Ficção Científica', 'Fantasia', 'Terror', 'Suspense', 'Crime', 'Mistério'].forEach(basicGenre => {
                        const genreMapping = {
                            'Ação': 'Action',
                            'Aventura': 'Adventure', 
                            'Comédia': 'Comedy',
                            'Drama': 'Drama',
                            'Romance': 'Romance',
                            'Ficção Científica': 'Science-Fiction',
                            'Fantasia': 'Fantasy',
                            'Terror': 'Horror',
                            'Suspense': 'Thriller',
                            'Crime': 'Crime',
                            'Mistério': 'Mystery'
                        };
                        
                        if (genres.includes(genreMapping[basicGenre])) {
                            hasBasicCategory = true;
                        }
                    });
                    
                    if (!hasBasicCategory) {
                        genreMap['Drama'].push(show);
                    }
                }
            });
            
            const filteredGenreMap = {};
            Object.entries(genreMap).forEach(([groupName, shows]) => {
                if (shows.length >= 3) {
                    const sortedShows = shows
                        .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
                        .slice(0, 12);
                    filteredGenreMap[groupName] = sortedShows;
                }
            });
            
            Object.entries(genreMap).forEach(([groupName, shows]) => {
                if (shows.length >= 1 && shows.length < 3) {
                    const mainCategories = {
                        'Ação Militar': 'Ação',
                        'Romance Dramático': 'Drama',
                        'Comédia Romântica': 'Comédia',
                        'Terror Sobrenatural': 'Terror',
                        'Ficção Científica Distópica': 'Ficção Científica',
                        'Fantasia Épica': 'Fantasia',
                        'Crime Investigativo': 'Crime',
                        'Suspense Psicológico': 'Suspense',
                        'Comédia Familiar': 'Comédia',
                        'Drama Histórico': 'Drama',
                        'Ação Policial': 'Ação',
                        'Terror Clássico': 'Terror',
                        'Aventura Fantástica': 'Aventura',
                        'Drama Médico': 'Drama'
                    };
                    
                    const targetCategory = mainCategories[groupName];
                    if (targetCategory && filteredGenreMap[targetCategory] && filteredGenreMap[targetCategory].length < 12) {
                        filteredGenreMap[targetCategory].push(...shows);
                    } else if (filteredGenreMap['Drama'] && filteredGenreMap['Drama'].length < 12) {
                        filteredGenreMap['Drama'].push(...shows);
                    }
                }
            });
            
            Object.keys(filteredGenreMap).forEach(groupName => {
                if (filteredGenreMap[groupName].length > 12) {
                    filteredGenreMap[groupName] = filteredGenreMap[groupName]
                        .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
                        .slice(0, 12);
                }
            });
            
            setGenreShows(filteredGenreMap);
            console.log("Genre groups created:", Object.keys(filteredGenreMap));
            console.log("Shows per group:", Object.entries(filteredGenreMap).map(([name, shows]) => `${name}: ${shows.length}`));
            
            console.log(response.data);

        } catch (error) {
            console.error("Erro ao buscar séries:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarSeries();
    }, []);

    useEffect(() => {
        if (Object.keys(genreShows).length > 0) {
            Object.keys(genreShows).forEach(genre => {
                const container = document.getElementById(`genre-${genre}`);
                if (container) {
                    const oneSetWidth = container.scrollWidth / 3;
                    container.scrollLeft = oneSetWidth;
                }
            });
        }
    }, [genreShows]);

    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            Object.keys(genreShows).forEach((genre, index) => {
                if (Math.random() > 0.7) {
                    const container = document.getElementById(`genre-${genre}`);
                    if (container) {
                        container.scrollTo({
                            left: container.scrollLeft + 200,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }, 15000);

        return () => clearInterval(autoScrollInterval);
    }, [genreShows]);

    useEffect(() => {
        if (topRatedShows.length > 1) {
            const interval = setInterval(() => {
                setCurrentCarouselIndex((prevIndex) => 
                    (prevIndex + 1) % topRatedShows.length
                );
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [topRatedShows]);

    useEffect(() => {
        console.log('Carousel index changed to:', currentCarouselIndex);
        if (topRatedShows[currentCarouselIndex]) {
            console.log('Current show:', topRatedShows[currentCarouselIndex].name);
        }
    }, [currentCarouselIndex, topRatedShows]);

    const handleCarouselPrev = () => {
        if (topRatedShows.length > 1) {
            const newIndex = currentCarouselIndex === 0 ? topRatedShows.length - 1 : currentCarouselIndex - 1;
            console.log('Prev clicked - Current:', currentCarouselIndex, 'New:', newIndex, 'Total shows:', topRatedShows.length);
            setCurrentCarouselIndex(newIndex);
        }
    };

    const handleCarouselNext = () => {
        if (topRatedShows.length > 1) {
            const newIndex = (currentCarouselIndex + 1) % topRatedShows.length;
            console.log('Next clicked - Current:', currentCarouselIndex, 'New:', newIndex, 'Total shows:', topRatedShows.length);
            setCurrentCarouselIndex(newIndex);
        }
    };

    const scrollGenre = (genre, direction) => {
        const container = document.getElementById(`genre-${genre}`);
        if (container) {
            const scrollAmount = 300;
            const itemWidth = 170;
            const containerWidth = container.clientWidth;
            const totalWidth = container.scrollWidth;
            const oneSetWidth = totalWidth / 3;
            
            let newScrollLeft;
            
            if (direction === 'left') {
                newScrollLeft = container.scrollLeft - scrollAmount;
                
                if (newScrollLeft <= 0) {
                    newScrollLeft = oneSetWidth * 2 - scrollAmount;
                    container.scrollLeft = oneSetWidth * 2;
                    setTimeout(() => {
                        container.scrollTo({
                            left: newScrollLeft,
                            behavior: 'smooth'
                        });
                    }, 10);
                    return;
                }
            } else {
                newScrollLeft = container.scrollLeft + scrollAmount;
                
                if (newScrollLeft >= oneSetWidth * 2.8) {
                    newScrollLeft = oneSetWidth + scrollAmount;
                    container.scrollLeft = oneSetWidth;
                    setTimeout(() => {
                        container.scrollTo({
                            left: newScrollLeft,
                            behavior: 'smooth'
                        });
                    }, 10);
                    return;
                }
            }
            
            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
            
            setScrollPositions(prev => ({
                ...prev,
                [genre]: newScrollLeft
            }));
        }
    };

    const handleScroll = (genre) => {
        const container = document.getElementById(`genre-${genre}`);
        if (container) {
            const totalWidth = container.scrollWidth;
            const oneSetWidth = totalWidth / 3;
            const currentScroll = container.scrollLeft;
            
            if (currentScroll <= oneSetWidth * 0.1) {
                container.scrollLeft = oneSetWidth * 2 - (oneSetWidth * 0.1 - currentScroll);
            } else if (currentScroll >= oneSetWidth * 2.9) {
                container.scrollLeft = oneSetWidth + (currentScroll - oneSetWidth * 2.9);
            }
            
            setScrollStates(prev => ({
                ...prev,
                [genre]: { isAtStart: false, isAtEnd: false }
            }));
        }
    };

    const handleSeriesClick = (seriesId) => {
        router.push(`/series/${seriesId}`);
    };

    return (
        <div className={styles.container}>
            <Header />
            
            {loading ? (
                <SkeletonCarousel />
            ) : topRatedShows.length > 0 && (
                <div className={styles.carouselContainer}>
                    <div className={styles.carouselBanner} onClick={() => handleSeriesClick(topRatedShows[currentCarouselIndex]?.id)}>
                        {topRatedShows[currentCarouselIndex]?.image && (
                            <Image
                                src={topRatedShows[currentCarouselIndex].image.original}
                                alt={topRatedShows[currentCarouselIndex].name}
                                fill
                                className={styles.carouselImage}
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        )}
                        <div className={styles.carouselOverlay}></div>
                        <div className={styles.carouselInfo}>
                            <h2 className={styles.carouselTitle}>
                                {topRatedShows[currentCarouselIndex]?.name}
                            </h2>
                            <p className={styles.carouselRating}>
                                <span className={styles.starIcon}>★</span> {topRatedShows[currentCarouselIndex]?.rating?.average}
                            </p>
                            <p className={styles.carouselGenres}>
                                {topRatedShows[currentCarouselIndex]?.genres?.join(' • ')}
                            </p>
                            <p className={styles.carouselCounter}>
                                {currentCarouselIndex + 1} de {topRatedShows.length} séries
                            </p>
                        </div>
                    </div>
                    <button 
                        className={styles.carouselButton} 
                        onClick={handleCarouselPrev}
                    >
                        ‹
                    </button>
                    <button 
                        className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
                        onClick={handleCarouselNext}
                    >
                        ›
                    </button>
                    <div className={styles.carouselIndicators}>
                        {topRatedShows.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.indicator} ${index === currentCarouselIndex ? styles.activeIndicator : ''}`}
                                onClick={() => setCurrentCarouselIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            <div className={styles.content}>
                {loading ? (
                    <>
                        <SkeletonGrid count={21} />
                        <SkeletonPagination />
                    </>
                ) : (
                    <div className={styles.genresContainer}>
                        {Object.entries(genreShows).map(([genre, shows]) => (
                            <div key={genre} className={styles.genreSection}>
                                <h2 className={styles.genreTitle}>{genre}</h2>
                                <div className={styles.genreRow}>
                                    <button 
                                        className={`${styles.scrollButton} ${styles.scrollButtonLeft}`}
                                        onClick={() => scrollGenre(genre, 'left')}
                                        title="Anterior"
                                    >
                                        ‹
                                    </button>
                                    <div 
                                        id={`genre-${genre}`}
                                        className={styles.genreScroll}
                                        onScroll={() => handleScroll(genre)}
                                    >
                                        {shows.map((show) => (
                                            <div key={`${show.id}-1`} className={styles.genreCard} onClick={() => handleSeriesClick(show.id)}>
                                                {show.image && (
                                                    <Image
                                                        src={show.image.medium}
                                                        alt={show.name}
                                                        width={150}
                                                        height={210}
                                                        className={styles.genreImage}
                                                    />
                                                )}
                                            </div>
                                        ))}

                                        {shows.map((show) => (
                                            <div key={`${show.id}-2`} className={styles.genreCard} onClick={() => handleSeriesClick(show.id)}>
                                                {show.image && (
                                                    <Image
                                                        src={show.image.medium}
                                                        alt={show.name}
                                                        width={150}
                                                        height={210}
                                                        className={styles.genreImage}
                                                    />
                                                )}
                                            </div>
                                        ))}

                                        {shows.map((show) => (
                                            <div key={`${show.id}-3`} className={styles.genreCard} onClick={() => handleSeriesClick(show.id)}>
                                                {show.image && (
                                                    <Image
                                                        src={show.image.medium}
                                                        alt={show.name}
                                                        width={150}
                                                        height={210}
                                                        className={styles.genreImage}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        className={`${styles.scrollButton} ${styles.scrollButtonRight}`}
                                        onClick={() => scrollGenre(genre, 'right')}
                                        title="Próximo"
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
