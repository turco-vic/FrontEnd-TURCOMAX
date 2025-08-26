"use client";
import axios from "axios";
import { useState } from "react";
import Header from '../components/Header';

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
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4x1 mx-auto>">
        <h1 className="text-3x1 font-bold text-center mb-8">TURCOFLIX</h1>
        <div className="text-center mb-8">
          <div className="mb-6">
            <button onClick={buscarSeries} disabled={loading} className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-semibold">
              {loading ? "Carregando..." : "Buscar Séries"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {data.map((item) => (
            <div key={item.id} className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="mb-3">
                {item.image && (
                  <img 
                    src={item.image.medium} 
                    alt={item.name}
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
    </div>
  );
}
