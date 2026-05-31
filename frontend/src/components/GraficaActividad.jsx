import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function GraficaActividad({ items }) {
    // cuenta cuántos destinos se registraron cada día de la última semana
    const datos = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const dia = d.toISOString().split('T')[0];
            return {
                fecha: d.toLocaleDateString('es', { weekday: 'short', day: 'numeric' }),
                destinos: items.filter(item => item.fechaRegistro?.startsWith(dia)).length,
            };
        });
    }, [items]);

    return (
        <div className="graficaBloque">
            <p className="subtituloGrafica">Destinos registrados esta semana</p>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={datos}>
                    <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="destinos" name="Destinos" fill="var(--acentoPrincipal)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraficaActividad;