"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Home.module.css';

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(21);
    const [sequenceStart, setSequenceStart] = useState(1);

    const buscarSeries = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://api.tvmaze.com/shows");
            setData(response.data);
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

    const totalPages = Math.ceil(data.length / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        
        const maxVisiblePages = 7;
        let currentStartPage = sequenceStart;
        let currentEndPage = Math.min(sequenceStart + maxVisiblePages - 1, totalPages);
        
        if (page === currentEndPage && page < totalPages) {
            const newSequenceStart = Math.min(sequenceStart + 1, totalPages - maxVisiblePages + 1);
            setSequenceStart(newSequenceStart);
        }
        
        else if (page === currentStartPage && page > 1) {
            const newSequenceStart = Math.max(sequenceStart - 1, 1);
            setSequenceStart(newSequenceStart);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSequencePrev = () => {
        if (sequenceStart > 1) {
            setSequenceStart(sequenceStart - 1);
        }
    };

    const handleSequenceNext = () => {
        const maxVisiblePages = 7;
        if (sequenceStart + maxVisiblePages - 1 < totalPages) {
            setSequenceStart(sequenceStart + 1);
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        const maxVisiblePages = 7;
        
        let startPage = sequenceStart;
        let endPage = Math.min(sequenceStart + maxVisiblePages - 1, totalPages);
        
        if (endPage - startPage + 1 < maxVisiblePages && totalPages >= maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        pages.push(
            <button
                key="prev-sequence"
                onClick={handleSequencePrev}
                disabled={sequenceStart <= 1}
                className={`${styles.paginationButton} ${sequenceStart <= 1 ? styles.disabled : ''}`}
                title="Mostrar páginas anteriores"
            >
                ‹
            </button>
        );

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`${styles.paginationButton} ${currentPage === i ? styles.active : ''}`}
                >
                    {i}
                </button>
            );
        }

        pages.push(
            <button
                key="next-sequence"
                onClick={handleSequenceNext}
                disabled={sequenceStart + maxVisiblePages - 1 >= totalPages}
                className={`${styles.paginationButton} ${sequenceStart + maxVisiblePages - 1 >= totalPages ? styles.disabled : ''}`}
                title="Mostrar próximas páginas"
            >
                ›
            </button>
        );

        return pages;
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                {loading && (
                    <div className={styles.loadingContainer}>
                        <p className={styles.loadingText}>Carregando séries...</p>
                    </div>
                )}
                <div className={styles.grid}>
                    {currentData.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                {item.image && (
                                    <Image
                                        src={item.image.medium}
                                        alt={item.name}
                                        width={300}
                                        height={192}
                                        className={styles.image}
                                    />
                                )}
                            </div>
                            <h3 className={styles.cardTitle}>{item.name}</h3>
                            <p className={styles.cardInfo}>
                                <strong>Gêneros:</strong> {item.genres?.join(', ') || 'N/A'}
                            </p>
                            <p className={styles.cardInfo}>
                                <strong>Nota:</strong> {item.rating?.average || 'N/A'}
                            </p>
                            <div
                                className={styles.cardSummary}
                                dangerouslySetInnerHTML={{ __html: item.summary || 'Sem resumo disponível' }}
                            />
                        </div>
                    ))}
                </div>
                
                {data.length > 0 && (
                    <div className={styles.paginationContainer}>
                        {renderPagination()}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}