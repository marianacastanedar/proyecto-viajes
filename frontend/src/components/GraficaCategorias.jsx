import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORIAS } from '../utils/categorias';

function GraficaCategorias({ items }) {
    const datos = useMemo(() => {
        return CATEGORIAS
            .map(cat => ({
                name: `${cat.emoji} ${cat.nombre}`,
                value: items.filter(i => i.categoriaId === cat.id).length,
                color: cat.color,
            }))
            .filter(d => d.value > 0);
    }, [items]);

    if (datos.length === 0) {
        return (
            <div className="graficaBloque">
                <p className="subtituloGrafica">Distribución por categoría</p>
                <p className="sinDatos">No hay destinos para mostrar</p>
            </div>
        );
    }

    return (
        <div className="graficaBloque">
            <p className="subtituloGrafica">Distribución por categoría</p>
            <ResponsiveContainer width="100%" height={230}>
                <PieChart>
                    <Pie data={datos} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                        {datos.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraficaCategorias;