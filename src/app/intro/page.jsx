"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { SkeletonProfile } from '../components/Skeleton';

export default function Intro() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const irParaPaginaSeries = () => {
        router.push('/home');
    };

    const tecnologiasImgs = [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1024px-HTML5_logo_and_wordmark.svg.png"
    ];

    return (
        <div className="min-h-screen bg-[#212121] pt-20">
            <Header />

            {loading ? (
                <SkeletonProfile />
            ) : (
                <div className="max-w-4xl mx-auto px-4 py-8 m-8">

                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#43b0f1] shadow-lg">
                            <img 
                                src="https://avatars.githubusercontent.com/u/157549897?v=4" 
                                alt="Enzo Turcovic" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-2xl font-bold text-white">Enzo Turcovic</p>
                    </div>

                    <Card 
                        title="Sobre mim" 
                        text="Olá! Meu nome é Enzo, tenho 17 anos, e atualmente estou cursando Desenvolvimento de sistema no SENAI Valinhos! Este site foi feito com o propósito de realizar a ativade de Front-End utilizando Next.JS!"
                    />
                    
                    <Card 
                        title="Tecnologias que utilizo:" 
                        imgs={tecnologiasImgs} 
                    />

                    <div className="mb-6">
                        <button 
                            onClick={irParaPaginaSeries} 
                            className="w-full bg-[#43b0f1] text-white px-8 py-3 rounded-lg hover:bg-blue-600 font-semibold transition-colors duration-300"
                        >
                            Página de Séries
                        </button>
                    </div>
                </div>
            </div>
            )}
            
            <Footer />
        </div>
    );
}
