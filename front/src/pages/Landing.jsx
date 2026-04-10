export default function Landing({ onTeacherClick, onStudentClick }) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4">
            📊 PollClass
          </h1>
          <p className="text-2xl font-black mb-2">
            BRUTAL VOTING MACHINE
          </p>
          <p className="font-bold">
            Crea encuestas interactivas y obtén resultados en tiempo real
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card rotate-[-1deg] bg-[#00f5ff]">
            <div className="text-center">
              <div className="text-6xl mb-4">👨‍🏫</div>
              <h2 className="text-3xl font-black mb-3">
                Profesor
              </h2>
              <p className="font-bold mb-6">
                Crea encuestas, comparte códigos con tus estudiantes y visualiza resultados en tiempo real
              </p>
              <button 
                className="btn-primary w-full"
                onClick={onTeacherClick}
              >
                Entrar como Profesor
              </button>
            </div>
          </div>

          <div className="card rotate-[1deg] bg-[#ff00a8]">
            <div className="text-center">
              <div className="text-6xl mb-4">👨‍🎓</div>
              <h2 className="text-3xl font-black mb-3">
                Estudiante
              </h2>
              <p className="font-bold mb-6">
                Únete a una encuesta usando el código proporcionado y vota en tiempo real
              </p>
              <button 
                className="btn-secondary w-full"
                onClick={onStudentClick}
              >
                Entrar como Estudiante
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-[#f97316] border-4 border-black shadow-[10px_10px_0_#000]">
          <h3 className="font-black mb-3 text-xl">ℹ️ ¿Cómo funciona?</h3>
          <ol className="space-y-2 text-sm font-bold">
            <li><strong>1.</strong> El profesor crea una encuesta desde su dashboard</li>
            <li><strong>2.</strong> El profesor comparte el código con los estudiantes</li>
            <li><strong>3.</strong> Los estudiantes ingresan el código para unirse</li>
            <li><strong>4.</strong> Todos votan y ven los resultados actualizarse en tiempo real</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
