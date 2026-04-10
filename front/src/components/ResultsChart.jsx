import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ResultsChart({ results, options }) {
  if (!results || !results.votes) {
    return <p className="font-black">Cargando resultados...</p>
  }

  const totalVotes = results.votes.reduce((sum, v) => sum + v.count, 0)

  const data = options.map((option, index) => ({
    name: option,
    votes: results.votes[index]?.count || 0,
    percentage: totalVotes > 0 ? ((results.votes[index]?.count || 0) / totalVotes * 100).toFixed(1) : 0
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#ff00a8] p-4 border-4 border-black shadow-[6px_6px_0_#000]">
          <p className="text-sm font-black">Total de votos</p>
          <p className="text-4xl font-black">{totalVotes}</p>
        </div>
        <div className="bg-[#f97316] p-4 border-4 border-black shadow-[6px_6px_0_#000]">
          <p className="text-sm font-black">Opciones</p>
          <p className="text-4xl font-black">{options.length}</p>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="bg-[#f9f236] p-4 border-4 border-black shadow-[6px_6px_0_#000]">
            <div className="flex justify-between items-start mb-2">
              <p className="font-black">{item.name}</p>
              <span className="text-sm font-black">
                {item.votes} votos ({item.percentage}%)
              </span>
            </div>
            <div className="w-full bg-black h-3 border-2 border-black">
              <div
                className="bg-[#00f5ff] h-full transition-all duration-300"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {totalVotes > 0 && (
        <div className="mt-6 bg-[#ffffff] border-4 border-black p-3 shadow-[8px_8px_0_#000]">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="4 4" stroke="#000000" />
              <XAxis dataKey="name" tick={{ fill: '#000000', fontWeight: 700 }} />
              <YAxis tick={{ fill: '#000000', fontWeight: 700 }} />
              <Tooltip
                contentStyle={{ border: '3px solid #000', borderRadius: 0, fontWeight: 700 }}
                cursor={{ fill: '#ffec99' }}
              />
              <Bar dataKey="votes" fill="#ff00a8" stroke="#000000" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
