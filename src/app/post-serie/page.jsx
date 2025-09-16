"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './PostSerie.module.css';

export default function PostSerie() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        rating: {
            average: ''
        },
        genres: '',
        premiered: '',
        status: 'Running',
        network: {
            name: ''
        },
        runtime: '',
        averageRuntime: '',
        language: 'English',
        image: {
            medium: '',
            original: ''
        },
        summary: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome da série é obrigatório';
        }

        if (!formData.rating.average || parseFloat(formData.rating.average) <= 0) {
            newErrors['rating.average'] = 'Rating deve ser um número maior que 0';
        }

        if (!formData.genres.trim()) {
            newErrors.genres = 'Pelo menos um gênero é obrigatório';
        }

        if (!formData.premiered) {
            newErrors.premiered = 'Data de estreia é obrigatória';
        }

        if (!formData.network.name.trim()) {
            newErrors['network.name'] = 'Nome da rede é obrigatório';
        }

        if (!formData.runtime && !formData.averageRuntime) {
            newErrors.runtime = 'Runtime ou Average Runtime é obrigatório';
        }

        if (!formData.language.trim()) {
            newErrors.language = 'Idioma é obrigatório';
        }

        if (!formData.image.medium.trim() && !formData.image.original.trim()) {
            newErrors['image.medium'] = 'Pelo menos uma URL de imagem é obrigatória';
        }

        if (!formData.summary.trim()) {
            newErrors.summary = 'Resumo é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        setLoading(true);

        try {
            const dataToSend = {
                ...formData,
                rating: {
                    average: parseFloat(formData.rating.average)
                },
                genres: formData.genres.split(',').map(genre => genre.trim()),
                runtime: formData.runtime ? parseInt(formData.runtime) : null,
                averageRuntime: formData.averageRuntime ? parseInt(formData.averageRuntime) : null
            };

            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Dados que seriam enviados:', dataToSend);
            
            toast.success('Série cadastrada com sucesso!');
            
            setTimeout(() => {
                router.push('/series');
            }, 2000);

        } catch (error) {
            console.error('Erro ao cadastrar série:', error);
            
            if (error.response) {
                toast.error(`Erro: ${error.response.data.message || 'Erro no servidor'}`);
            } else if (error.request) {
                toast.error('Erro de conexão. Verifique sua internet.');
            } else {
                toast.error('Erro inesperado. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/series');
    };

    return (
        <div className={styles.container}>
            <Header />
            
            <div className={styles.content}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Cadastrar Nova Série</h1>
                    
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="name" className={styles.label}>Nome da Série *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                    placeholder="Ex: Breaking Bad"
                                />
                                {errors.name && <span className={styles.error}>{errors.name}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="rating.average" className={styles.label}>Rating *</label>
                                <input
                                    type="number"
                                    id="rating.average"
                                    name="rating.average"
                                    value={formData.rating.average}
                                    onChange={handleInputChange}
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    className={`${styles.input} ${errors['rating.average'] ? styles.inputError : ''}`}
                                    placeholder="Ex: 8.5"
                                />
                                {errors['rating.average'] && <span className={styles.error}>{errors['rating.average']}</span>}
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="genres" className={styles.label}>Gêneros * (separados por vírgula)</label>
                                <input
                                    type="text"
                                    id="genres"
                                    name="genres"
                                    value={formData.genres}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${errors.genres ? styles.inputError : ''}`}
                                    placeholder="Ex: Drama, Crime, Thriller"
                                />
                                {errors.genres && <span className={styles.error}>{errors.genres}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="premiered" className={styles.label}>Data de Estreia *</label>
                                <input
                                    type="date"
                                    id="premiered"
                                    name="premiered"
                                    value={formData.premiered}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${errors.premiered ? styles.inputError : ''}`}
                                />
                                {errors.premiered && <span className={styles.error}>{errors.premiered}</span>}
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="status" className={styles.label}>Status *</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className={styles.select}
                                >
                                    <option value="Running">Em Exibição</option>
                                    <option value="Ended">Finalizada</option>
                                    <option value="To Be Determined">A Definir</option>
                                    <option value="In Development">Em Desenvolvimento</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="network.name" className={styles.label}>Rede/Canal *</label>
                                <input
                                    type="text"
                                    id="network.name"
                                    name="network.name"
                                    value={formData.network.name}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${errors['network.name'] ? styles.inputError : ''}`}
                                    placeholder="Ex: HBO, Netflix, AMC"
                                />
                                {errors['network.name'] && <span className={styles.error}>{errors['network.name']}</span>}
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="runtime" className={styles.label}>Runtime (minutos)</label>
                                <input
                                    type="number"
                                    id="runtime"
                                    name="runtime"
                                    value={formData.runtime}
                                    onChange={handleInputChange}
                                    min="1"
                                    className={`${styles.input} ${errors.runtime ? styles.inputError : ''}`}
                                    placeholder="Ex: 45"
                                />
                                {errors.runtime && <span className={styles.error}>{errors.runtime}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="averageRuntime" className={styles.label}>Average Runtime (minutos)</label>
                                <input
                                    type="number"
                                    id="averageRuntime"
                                    name="averageRuntime"
                                    value={formData.averageRuntime}
                                    onChange={handleInputChange}
                                    min="1"
                                    className={styles.input}
                                    placeholder="Ex: 42"
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="language" className={styles.label}>Idioma *</label>
                                <select
                                    id="language"
                                    name="language"
                                    value={formData.language}
                                    onChange={handleInputChange}
                                    className={styles.select}
                                >
                                    <option value="English">Inglês</option>
                                    <option value="Portuguese">Português</option>
                                    <option value="Spanish">Espanhol</option>
                                    <option value="French">Francês</option>
                                    <option value="German">Alemão</option>
                                    <option value="Italian">Italiano</option>
                                    <option value="Japanese">Japonês</option>
                                    <option value="Korean">Coreano</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="image.medium" className={styles.label}>URL da Imagem (Média) *</label>
                                <input
                                    type="url"
                                    id="image.medium"
                                    name="image.medium"
                                    value={formData.image.medium}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${errors['image.medium'] ? styles.inputError : ''}`}
                                    placeholder="https://exemplo.com/imagem-media.jpg"
                                />
                                {errors['image.medium'] && <span className={styles.error}>{errors['image.medium']}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="image.original" className={styles.label}>URL da Imagem (Original)</label>
                                <input
                                    type="url"
                                    id="image.original"
                                    name="image.original"
                                    value={formData.image.original}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder="https://exemplo.com/imagem-original.jpg"
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="summary" className={styles.label}>Resumo *</label>
                            <textarea
                                id="summary"
                                name="summary"
                                value={formData.summary}
                                onChange={handleInputChange}
                                className={`${styles.textarea} ${errors.summary ? styles.inputError : ''}`}
                                placeholder="Digite o resumo da série..."
                                rows="5"
                            />
                            {errors.summary && <span className={styles.error}>{errors.summary}</span>}
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className={styles.cancelButton}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={loading}
                            >
                                {loading ? 'Cadastrando...' : 'Cadastrar Série'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}
