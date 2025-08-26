"use client";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="min-h-screen bg-[#212121]">
            <Header />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-white">TURCOFLIX</h1>
                <div className="text-center mb-8">
                    <div className="mb-6">
                        <button onClick={buscarSeries} disabled={loading} className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-semibold ">
                            {loading ? "Carregando..." : "Buscar Séries"}
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {data.map((item) => (
                        <div key={item.id} className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                            <div className="mb-3">
                                {item.image && (
                                    <Image
                                        src={item.image.medium}
                                        alt={item.name}
                                        width={300}
                                        height={192}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                )}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Gêneros:</strong> {item.genres?.join(', ') || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Nota:</strong> {item.rating?.average || 'N/A'}
                            </p>
                            <div
                                className="text-sm text-gray-700 line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: item.summary || 'Sem resumo disponível' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
