import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { CATEGORIAS } from '../utils/categorias';

function GraficaTop5({ items }) {
    const datos = useMemo(() => {
        return items
            .filter(i => i.puntuacion !== null && i.puntuacion !== undefined)
            .sort((a, b) => b.puntuacion - a.puntuacion)
            .slice(0, 5)
            .map(i => {
                const cat = CATEGORIAS.find(c => c.id === i.categoriaId);
                return {
                    nombre: i.nombre,
                    puntuacion: i.puntuacion,
                    color: cat?.color ?? '#1D6E7E',
                };
            });
    }, [items]);

    if (datos.length === 0) {
        return (
            <div className="graficaBloque">
                <p className="subtituloGrafica">Top 5 destinos mejor calificados</p>
                <p className="sinDatos">Agrega puntuaciones a tus destinos para ver esta gráfica</p>
            </div>
        );
    }

    return (
        <div className="graficaBloque">
            <p className="subtituloGrafica">Top 5 destinos mejor calificados</p>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={datos} layout="vertical">
                    <XAxis type="number" domain={[0, 10]} />
                    <YAxis type="category" dataKey="nombre" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="puntuacion" name="Puntuación" radius={[0, 4, 4, 0]}>
                        {datos.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraficaTop5;