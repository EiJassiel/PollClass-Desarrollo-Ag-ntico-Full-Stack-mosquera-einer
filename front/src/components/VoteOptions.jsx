export default function VoteOptions({ options, onVote, disabled, voted }) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onVote(index)}
          disabled={disabled}
          className={`
            w-full p-4 border-4 border-black text-left font-black uppercase tracking-wide transition-all duration-150
            ${voted 
              ? 'bg-[#bdbdbd] text-black cursor-not-allowed opacity-50' 
              : 'bg-[#f9f236] text-black hover:bg-[#00f5ff]'
            }
            ${disabled && !voted ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          style={{
            boxShadow: voted ? 'none' : '6px 6px 0 #000',
            transform: voted ? 'none' : 'translate(-1px, -1px)'
          }}
        >
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="option"
              disabled={disabled}
              className="w-5 h-5"
              onChange={() => {}}
              checked={false}
            />
            <span>{option}</span>
          </div>
        </button>
      ))}
      {voted && (
        <div className="p-3 bg-[#00ff7f] text-black border-4 border-black text-sm text-center font-black">
          ✓ Tu voto ha sido registrado
        </div>
      )}
    </div>
  )
}
