"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './[id].module.css';
import { IconMap } from "antd/es/result";

export default function SeriesDetail() {
    const params = useParams();
    const router = useRouter();
    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSeries = async () => {
            if (!params.id) return;

            setLoading(true);
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${params.id}`);
                setSeries(response.data);
            } catch (error) {
                console.error("Erro ao buscar série:", error);
                setError("Série não encontrada");
            } finally {
                setLoading(false);
            }
        };

        fetchSeries();
    }, [params.id]);

    const handleBackClick = () => {
        router.back();
    };

    const stripHtml = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html || "";
        return tmp.textContent || tmp.innerText || "";
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Carregando...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !series) {
        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.error}>
                    <h2>Erro</h2>
                    <p>{error || "Série não encontrada"}</p>
                    <button onClick={handleBackClick} className={styles.backButton}>
                        Back
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.content}>
                <button onClick={handleBackClick} className={styles.backButton}>
                    <svg 
                        className={styles.arrowIcon} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M19 12H5M12 19L5 12L12 5" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className={styles.seriesHeader}>
                    <div className={styles.imageContainer}>
                        {series.image && (
                            <Image
                                src={series.image.original}
                                alt={series.name}
                                width={300}
                                height={450}
                                className={styles.seriesImage}
                            />
                        )}
                    </div>

                    <div className={styles.seriesInfo}>
                        <h1 className={styles.seriesTitle}>{series.name}</h1>

                        {series.rating?.average && (
                            <div className={styles.rating}>
                                <span className={styles.starIcon}>★</span>
                                <span className={styles.ratingValue}>{series.rating.average}</span>
                            </div>
                        )}

                        <div className={styles.genres}>
                            {series.genres?.map((genre) => (
                                <span key={genre} className={styles.genre}>
                                    {genre}
                                </span>
                            ))}
                        </div>

                        <div className={styles.details}>
                            {series.premiered && (
                                <div className={styles.detail}>
                                    <strong>Estreou em:</strong> {new Date(series.premiered).getFullYear()}
                                </div>
                            )}

                            {series.status && (
                                <div className={styles.detail}>
                                    <strong>Status:</strong> {series.status === 'Ended' ? 'Finalizada' :
                                        series.status === 'Running' ? 'Em exibição' :
                                            series.status}
                                </div>
                            )}

                            {series.network?.name && (
                                <div className={styles.detail}>
                                    <strong>Rede:</strong> {series.network.name}
                                </div>
                            )}

                            {series.runtime && (
                                <div className={styles.detail}>
                                    <strong>Duração:</strong> {series.runtime} minutos
                                </div>
                            )}

                            {series.language && (
                                <div className={styles.detail}>
                                    <strong>Idioma:</strong> {series.language}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {series.summary && (
                    <div className={styles.summary}>
                        <h2>Sinopse</h2>
                        <p>{stripHtml(series.summary)}</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
