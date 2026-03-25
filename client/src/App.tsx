import React, { useState, useMemo } from 'react';
import { 
  Menu, X, Sun, Wind, Droplets, Flame, Waves, 
  Atom, FlaskConical, Leaf, Zap, BookOpen, 
  Lightbulb, Hammer, BarChart3, TreePine, Car, 
  Moon, SunMedium, ChevronRight, Activity, Globe
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedEnergy, setSelectedEnergy] = useState<any>(null);
  const [activeProjectTab, setActiveProjectTab] = useState(0);
  
  // Estados de los Simuladores
  const [bill, setBill] = useState('');
  const [renewMix, setRenewMix] = useState(30);
  const [cityTech, setCityTech] = useState({
    solar: false, wind: false, nuclear: false, hydrogen: false
  });

  // Base de datos completa (8 Energías) con estructura pedagógica y 3 PROYECTOS CADA UNA
  const tecnologias = [
    {
      id: "solar", titulo: "Energía Solar", icono: Sun, color: "text-amber-500", bg: "bg-amber-100/50",
      explicacion: "Energía obtenida directamente de la radiación electromagnética del Sol.",
      comoFunciona: "Usa el efecto fotovoltaico (luz a electricidad) o térmico (luz a calor para mover turbinas).",
      proyectos: [
        {
          nombre: "1. Horno Solar Casero",
          materiales: ["Caja de pizza", "Papel aluminio", "Cartulina negra", "Plástico transparente"],
          pasos: [
            "Haz una 'ventana' en la tapa de la caja y fórrala con aluminio.",
            "Forra el fondo interior con cartulina negra para absorber calor.",
            "Cubre el hueco de la ventana con el plástico para atrapar el aire caliente.",
            "Orienta la tapa reflectante hacia el sol y coloca un malvavisco adentro."
          ]
        },
        {
          nombre: "2. Desalinizador de Agua",
          materiales: ["Tazón grande", "Vaso pequeño", "Agua con sal", "Plástico film", "Una moneda"],
          pasos: [
            "Pon el vaso vacío en el centro del tazón y vierte agua salada alrededor.",
            "Cubre todo el tazón con plástico film asegurándolo bien en los bordes.",
            "Pon la moneda en el centro del plástico (justo sobre el vaso vacío).",
            "El sol evaporará el agua, condensándose en el plástico y goteando agua dulce al vaso."
          ]
        },
        {
          nombre: "3. Demostración Fotovoltaica",
          materiales: ["Calculadora solar vieja", "Linterna o celular", "Cartón grueso"],
          pasos: [
            "Cubre completamente el panelcito de la calculadora con el cartón.",
            "Escribe unos números y observa cómo la pantalla se apaga al quedarse sin energía.",
            "Quita el cartón e ilumina directamente el panel con la linterna.",
            "Comprueba cómo los fotones artificiales también generan electricidad inmediata."
          ]
        }
      ]
    },
    {
      id: "eolica", titulo: "Energía Eólica", icono: Wind, color: "text-sky-500", bg: "bg-sky-100/50",
      explicacion: "Energía cinética generada por el movimiento de las masas de aire (viento).",
      comoFunciona: "El viento mueve grandes aspas que hacen girar un rotor magnético dentro de un generador de cobre.",
      proyectos: [
        {
          nombre: "1. Mini Generador LED",
          materiales: ["Motor DC pequeño", "Botella plástica", "1 foco LED"],
          pasos: [
            "Corta la botella para crear hélices inclinadas.",
            "Conecta las hélices al eje giratorio del motor DC.",
            "Conecta las patas del LED a los cables del motor.",
            "Sopla fuerte o usa un secador para girar las aspas e iluminar el LED."
          ]
        },
        {
          nombre: "2. Anemómetro Casero",
          materiales: ["4 Vasos desechables", "2 Pajillas (popotes)", "Chincheta", "Lápiz con goma"],
          pasos: [
            "Cruza las pajillas en forma de 'X' y únelas en el centro con la chincheta.",
            "Clava la chincheta en la goma del lápiz para que funcione como eje giratorio.",
            "Pega un vaso en cada extremo de la 'X', todos apuntando en la misma dirección.",
            "Ponlo al viento y cuenta cuántas vueltas da por minuto para medir la velocidad."
          ]
        },
        {
          nombre: "3. Vehículo de Viento",
          materiales: ["Cartón", "Palillos largos", "4 Tapas de botella", "Papel bond (vela)"],
          pasos: [
            "Arma una base de cartón y usa los palillos como ejes para las ruedas (tapas).",
            "Clava un palillo verticalmente en el centro del cartón.",
            "Corta el papel en forma de rectángulo y perfóralo para ensartarlo en el mástil.",
            "Usa un ventilador; la energía cinética empujará la vela y moverá el vehículo."
          ]
        }
      ]
    },
    {
      id: "hidro", titulo: "Hidroeléctrica", icono: Droplets, color: "text-blue-500", bg: "bg-blue-100/50",
      explicacion: "Aprovechamiento de la energía potencial y cinética del agua de ríos o presas.",
      comoFunciona: "El agua cae por gravedad y golpea una turbina Kaplan o Pelton, convirtiendo la presión en rotación eléctrica.",
      proyectos: [
        {
          nombre: "1. Noria de Cucharas",
          materiales: ["8 Cucharas de plástico", "Corcho", "Palito de madera"],
          pasos: [
            "Clava las cucharas simétricamente alrededor del corcho.",
            "Atraviesa el corcho con el palito para que funcione de eje.",
            "Coloca tu rueda bajo el chorro de agua del grifo.",
            "Observa cómo la fuerza hidráulica se convierte en energía mecánica."
          ]
        },
        {
          nombre: "2. Molino de Botella",
          materiales: ["Botella de plástico", "Hilo resistente", "Agua", "Clavo para perforar"],
          pasos: [
            "Haz 4 agujeros en la parte inferior de la botella, todos en ángulo inclinado.",
            "Amarra el hilo al cuello de la botella para poder colgarla.",
            "Tapa los agujeros con tus dedos y llena la botella de agua.",
            "Cuélgala y suelta los dedos; la salida del agua hará que la botella gire velozmente."
          ]
        },
        {
          nombre: "3. Bomba de Arquímedes",
          materiales: ["Tubo de PVC o cartón grueso", "Manguera transparente", "Cinta adhesiva", "Dos recipientes"],
          pasos: [
            "Enrolla la manguera en espiral alrededor del tubo y fíjala con cinta.",
            "Pon el recipiente lleno de agua más abajo que el vacío.",
            "Sumerge un extremo del tubo/manguera en el agua baja.",
            "Gira el tubo inclinadamente y verás cómo el agua sube venciendo la gravedad."
          ]
        }
      ]
    },
    {
      id: "geo", titulo: "Geotérmica", icono: Flame, color: "text-orange-500", bg: "bg-orange-100/50",
      explicacion: "Energía que utiliza el calor interno del planeta Tierra (magma y rocas calientes).",
      comoFunciona: "Se inyecta agua fría al subsuelo; esta se evapora por el calor de la Tierra y el vapor sube para mover turbinas.",
      proyectos: [
        {
          nombre: "1. Espiral de Convección",
          materiales: ["Papel", "Tijeras", "Hilo", "Vela o lámpara caliente"],
          pasos: [
            "Dibuja y corta una espiral en el papel.",
            "Amarra un hilo en el centro de la espiral y cuélgala.",
            "Colócala con cuidado sobre una fuente de calor (sin tocarla).",
            "El aire caliente sube (como en la geotermia) y hace girar la espiral."
          ]
        },
        {
          nombre: "2. Turbina de Vapor",
          materiales: ["Lata de refresco vacía", "Agua", "Vela", "Rehilete de papel"],
          pasos: [
            "Haz un pequeño agujero en la parte superior de la lata y vacía el líquido.",
            "Pon un poco de agua limpia dentro de la lata y colócala sobre una vela.",
            "Sostén el rehilete cerca del agujero de la lata.",
            "Al hervir, el vapor saldrá a presión girando el rehilete (principio de turbina)."
          ]
        },
        {
          nombre: "3. Géiser de Botella",
          materiales: ["Botella de plástico", "Agua muy caliente", "Colorante alimentario", "Recipiente transparente grande con agua fría"],
          pasos: [
            "Llena la botella pequeña con agua muy caliente y colorante.",
            "Llena el recipiente grande con agua fría.",
            "Sumerge la botella caliente abierta dentro del recipiente frío.",
            "Observa cómo el agua caliente 'erupciona' hacia arriba al ser menos densa."
          ]
        }
      ]
    },
    {
      id: "biomasa", titulo: "Biomasa", icono: Leaf, color: "text-green-500", bg: "bg-green-100/50",
      explicacion: "Obtención de energía a través de materia orgánica y desechos biológicos.",
      comoFunciona: "Las bacterias descomponen la basura orgánica sin oxígeno (anaeróbica) produciendo gas metano combustible.",
      proyectos: [
        {
          nombre: "1. Biogestor de Globo",
          materiales: ["Botella de plástico", "Cáscaras de fruta", "Agua", "Globo"],
          pasos: [
            "Tritura las cáscaras y mételas en la botella hasta la mitad.",
            "Agrega un poco de agua tibia (no la llenes toda).",
            "Coloca el globo desinflado en la boca de la botella sellándola bien.",
            "Espera unos días; la fermentación producirá gas que inflará el globo."
          ]
        },
        {
          nombre: "2. Briquetas Ecológicas",
          materiales: ["Papel periódico viejo", "Aserrín o cáscaras secas", "Agua", "Molde pequeño (tubo PVC)"],
          pasos: [
            "Haz una pasta remojando el periódico y mezclándolo con el aserrín.",
            "Mete la mezcla en el molde y prénsala muy fuerte para sacar toda el agua.",
            "Desmolda y deja secar la briqueta al sol por un par de días.",
            "El resultado es un bloque de biomasa sólida que arde como el carbón."
          ]
        },
        {
          nombre: "3. Composta Visual",
          materiales: ["Botella transparente cortada", "Tierra", "Restos orgánicos", "Hojas secas"],
          pasos: [
            "Haz capas en la botella: tierra, luego materia orgánica, luego hojas secas.",
            "Humedece la mezcla y tapa la botella (dejando huecos para respirar).",
            "Observa durante semanas cómo la materia se reduce y genera calor.",
            "Aprenderás cómo la descomposición libera energía y nutrientes."
          ]
        }
      ]
    },
    {
      id: "mareo", titulo: "Mareomotriz", icono: Waves, color: "text-teal-500", bg: "bg-teal-100/50",
      explicacion: "Energía obtenida del ascenso y descenso de las mareas oceánicas.",
      comoFunciona: "Se colocan turbinas en el fondo marino. La diferencia de presión entre marea alta y baja las hace girar generando electricidad.",
      proyectos: [
        {
          nombre: "1. Simulador de Presión",
          materiales: ["2 Vasos grandes", "Manguera delgada transparente", "Agua con colorante"],
          pasos: [
            "Llena un vaso con agua coloreada y el otro déjalo vacío.",
            "Conecta ambos con la manguera llena de agua (haciendo sifón).",
            "Sube y baja el vaso lleno imitando el cambio de marea.",
            "Observa cómo la diferencia de altura fuerza al agua a fluir (energía cinética)."
          ]
        },
        {
          nombre: "2. Generador de Olas",
          materiales: ["Recipiente largo de vidrio", "Agua", "Un trozo de madera o plástico plano"],
          pasos: [
            "Llena el recipiente a la mitad con agua.",
            "Coloca la tabla plana en un extremo del recipiente, parcialmente sumergida.",
            "Mueve la tabla de atrás hacia adelante rítmicamente.",
            "Analiza cómo la fuerza mecánica se transfiere al agua creando energía ondulatoria."
          ]
        },
        {
          nombre: "3. Compuerta de Flujo",
          materiales: ["Botella partida a la mitad", "Cartón grueso", "Plastilina", "Agua"],
          pasos: [
            "Usa la mitad de la botella como un túnel o embalse horizontal.",
            "Haz una pequeña 'puerta' (compuerta) de cartón y séllala con plastilina.",
            "Llena un lado de agua (simulando marea alta).",
            "Abre la compuerta y observa la velocidad de la corriente que movería una turbina."
          ]
        }
      ]
    },
    {
      id: "nuclear", titulo: "Nuclear", icono: Atom, color: "text-purple-500", bg: "bg-purple-100/50",
      explicacion: "Energía liberada al dividir el núcleo de átomos pesados como el Uranio.",
      comoFunciona: "La fisión genera calor extremo que hierve agua. El vapor mueve turbinas masivas sin emitir CO2.",
      proyectos: [
        {
          nombre: "1. Fisión en Cadena",
          materiales: ["Fichas de dominó", "Mesa plana o piso"],
          pasos: [
            "Coloca un dominó que golpee a dos.",
            "Esos dos deben estar alineados para golpear a cuatro, y esos a ocho.",
            "Tira el primer dominó (simula un neutrón libre golpeando un núcleo).",
            "Observa la reacción en cadena exponencial (simulación de fisión)."
          ]
        },
        {
          nombre: "2. Simulador de Blindaje",
          materiales: ["Linterna potente", "Hoja de papel", "Lámina de aluminio", "Libro muy grueso"],
          pasos: [
            "Enciende la linterna (simula radiación) en un cuarto oscuro.",
            "Pon el papel frente a la luz (simula detener partículas Alfa).",
            "Pon el aluminio (simula bloquear partículas Beta).",
            "Pon el libro grueso (simula el plomo deteniendo Rayos Gamma)."
          ]
        },
        {
          nombre: "3. Reactor Térmico",
          materiales: ["Termo con tapa", "Agua muy caliente", "Termómetro", "Vaso normal"],
          pasos: [
            "Sirve la misma cantidad de agua caliente en el termo (reactor) y en el vaso.",
            "Toma la temperatura de ambos después de 15 minutos.",
            "Comprende cómo el termo conserva la energía térmica igual que el núcleo de un reactor.",
            "La contención del calor es vital para hervir agua constantemente."
          ]
        }
      ]
    },
    {
      id: "hidrogeno", titulo: "Hidrógeno", icono: FlaskConical, color: "text-indigo-500", bg: "bg-indigo-100/50",
      explicacion: "El elemento más abundante. Funciona como batería para almacenar energía.",
      comoFunciona: "Se separan las moléculas del agua (H2O) con electricidad. El hidrógeno resultante se puede quemar o usar en pilas.",
      proyectos: [
        {
          nombre: "1. Electrólisis con Lápiz",
          materiales: ["Pila 9V", "2 Lápices tajados por ambos lados", "Agua y sal", "Cartón"],
          pasos: [
            "Haz dos agujeros en el cartón y pasa los lápices.",
            "Sumerge las puntas inferiores en el vaso con agua salada.",
            "Toca las puntas superiores con los dos polos de la pila.",
            "Observa las burbujas separándose: una es Oxígeno y la otra Hidrógeno."
          ]
        },
        {
          nombre: "2. Captura de Gas",
          materiales: ["Experimento anterior", "Un tubo de ensayo pequeño o jeringa sin aguja"],
          pasos: [
            "Llena el tubo de ensayo con agua salada e inviértelo dentro del vaso.",
            "Colócalo justo encima de la punta del lápiz que está conectada al polo negativo.",
            "Aplica la corriente y observa cómo las burbujas suben al tubo.",
            "Verás que el gas (Hidrógeno) empuja el agua hacia abajo capturándose limpio."
          ]
        },
        {
          nombre: "3. Pila Metálica Básica",
          materiales: ["Monedas de cobre", "Arandelas de zinc", "Cartón empapado en vinagre", "Multímetro"],
          pasos: [
            "Apila: Moneda, cartón con vinagre, arandela... y repite la torre.",
            "Mide el voltaje conectando los cables arriba y abajo de la torre.",
            "Comprende cómo un electrolito permite el flujo de electrones.",
            "Es el principio base de las celdas de combustible de hidrógeno."
          ]
        }
      ]
    }
  ];

  // Cálculos dinámicos
  const impactStats = useMemo(() => {
    const cost = parseFloat(bill) || 0;
    const kwh = cost * 0.52; 
    const co2Anual = kwh * 0.434 * 12;
    return {
      co2: Math.round(co2Anual).toLocaleString(),
      arboles: Math.round(co2Anual / 22), 
      kmAuto: Math.round(co2Anual / 0.19) 
    };
  }, [bill]);

  const cityImpact = useMemo(() => {
    let emissions = 100;
    let stability = 100;
    if (cityTech.solar) { emissions -= 20; stability -= 15; }
    if (cityTech.wind) { emissions -= 20; stability -= 15; }
    if (cityTech.nuclear) { emissions -= 45; stability += 35; }
    if (cityTech.hydrogen) { emissions -= 15; stability += 10; }
    return { emissions: Math.max(emissions, 0), stability: Math.min(stability, 100) };
  }, [cityTech]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 border-b backdrop-blur-md px-6 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 font-black text-2xl">
            <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg"><Zap size={24}/></div>
            <span>EcoEnergía <span className="text-emerald-500 text-sm tracking-widest uppercase ml-2">Lab</span></span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2">{isDarkMode ? <SunMedium className="text-amber-400"/> : <Moon/>}</button>
            <button onClick={() => setIsMenuOpen(true)} className="p-2"><Menu size={28}/></button>
          </div>
        </div>
      </nav>

      {/* MENÚ LATERAL */}
      <div className={`fixed inset-0 bg-black/60 z-50 transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-80 z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${isDarkMode ? 'bg-slate-900 border-l border-slate-800' : 'bg-white'} p-8 shadow-2xl overflow-y-auto`}>
        <div className="flex justify-end mb-10"><button onClick={() => setIsMenuOpen(false)}><X size={32}/></button></div>
        <div className="flex flex-col gap-6 text-xl font-black italic">
          <a href="#enciclopedia" onClick={() => setIsMenuOpen(false)}>1. Enciclopedia & Proyectos</a>
          <a href="#planner" onClick={() => setIsMenuOpen(false)}>2. City Planner</a>
          <a href="#red" onClick={() => setIsMenuOpen(false)}>3. Matriz de Red</a>
          <a href="#calc" onClick={() => setIsMenuOpen(false)}>4. Calculadora CO2</a>
        </div>
      </div>

      {/* HERO */}
      <header className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
          Laboratorio <span className="text-emerald-500">InnovaMotivaTech</span>.
        </h1>
        <p className="text-lg text-slate-500 font-medium mb-10">
          Aprende teoría, construye 8 prototipos y simula redes eléctricas reales.
        </p>
      </header>

      {/* 1. ENCICLOPEDIA Y PROYECTOS (8 ENERGÍAS) */}
      <section id="enciclopedia" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-emerald-500" size={32}/>
          <h2 className="text-3xl font-black uppercase tracking-tight">1. Manual de Proyectos</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tecnologias.map((tec) => (
            <button 
              key={tec.id} onClick={() => { setSelectedEnergy(tec); setActiveProjectTab(0); }}
              className={`p-6 rounded-3xl border-2 text-left transition-all hover:scale-105 group ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-500 hover:shadow-xl'}`}
            >
              <div className={`w-14 h-14 ${tec.bg} ${tec.color} rounded-2xl flex items-center justify-center mb-6`}><tec.icono size={28}/></div>
              <h3 className="text-xl font-black mb-2">{tec.titulo}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4 font-medium">{tec.explicacion}</p>
              <div className="text-xs font-black text-emerald-500 flex items-center gap-1 uppercase tracking-widest group-hover:translate-x-2 transition-transform">Ver Proyecto <ChevronRight size={14}/></div>
            </button>
          ))}
        </div>
      </section>

      {/* MODAL PEDAGÓGICO CON BITÁCORA */}
      {selectedEnergy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/70 animate-in fade-in">
          <div className={`relative max-w-4xl w-full p-8 md:p-12 rounded-[3rem] shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}>
            <button onClick={() => { setSelectedEnergy(null); setActiveProjectTab(0); }} className="absolute top-8 right-8 p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full"><X/></button>
            
            <div className="flex items-center gap-6 mb-10">
              <div className={`w-20 h-20 ${selectedEnergy.bg} ${selectedEnergy.color} rounded-[2rem] flex items-center justify-center`}><selectedEnergy.icono size={40}/></div>
              <h3 className="text-4xl font-black">{selectedEnergy.titulo}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-widest mb-3"><BookOpen size={16}/> 1. ¿Qué es?</h4>
                  <p className="text-lg font-medium opacity-80">{selectedEnergy.explicacion}</p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-widest mb-3"><Lightbulb size={16}/> 2. ¿Cómo funciona?</h4>
                  <p className="text-base font-medium italic opacity-70 border-l-4 border-emerald-500 pl-4">{selectedEnergy.comoFunciona}</p>
                </div>
              </div>

              <div className={`p-8 rounded-[2rem] flex flex-col ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-100/50 border border-slate-200'}`}>
                <h4 className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-widest mb-4"><Hammer size={16}/> 3. Proyectos en Casa</h4>
                
                {/* SELECTOR DE PROYECTOS (PESTAÑAS) */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                  {selectedEnergy.proyectos.map((proj: any, idx: number) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveProjectTab(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${activeProjectTab === idx ? 'bg-emerald-500 text-white shadow-md' : 'bg-white/50 dark:bg-black/20 text-slate-500 hover:bg-emerald-500/10'}`}
                    >
                      Proyecto {idx + 1}
                    </button>
                  ))}
                </div>

                <div className="flex-1">
                  <p className="text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">{selectedEnergy.proyectos[activeProjectTab].nombre}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedEnergy.proyectos[activeProjectTab].materiales.map((m: string, i: number) => (
                      <span key={i} className="text-[10px] font-black bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                  <div className="space-y-4 mb-8">
                    {selectedEnergy.proyectos[activeProjectTab].pasos.map((p: string, i: number) => (
                      <div key={i} className="flex gap-4">
                        <span className="w-6 h-6 rounded bg-emerald-500 text-white flex items-center justify-center font-black text-xs flex-shrink-0">{i+1}</span>
                        <p className="text-sm font-bold opacity-80">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BITÁCORA RECUPERADA (Alineada siempre al fondo) */}
                <div className="p-4 border-2 border-dashed border-emerald-500/30 rounded-2xl bg-white/5 dark:bg-black/20 mt-auto">
                   <p className="text-[10px] font-black uppercase text-center mb-2 tracking-widest opacity-50">Ficha de Resultados</p>
                   <textarea placeholder="¿Qué observaste en este experimento? Anótalo aquí..." className="w-full bg-transparent border-none focus:ring-0 text-sm italic font-medium min-h-[60px] resize-none outline-none"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CITY PLANNER (SIMULADOR RECUPERADO) */}
      <section id="planner" className={`py-24 px-6 ${isDarkMode ? 'bg-slate-800/20' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-emerald-500" size={32}/>
              <h2 className="text-3xl font-black uppercase tracking-tight">2. City Planner</h2>
            </div>
            <p className="text-lg text-slate-500 mb-8 font-medium">Enciende tecnologías para bajar emisiones, pero mantén la red estable.</p>
            <div className="grid grid-cols-2 gap-4">
              {(['solar', 'wind', 'nuclear', 'hydrogen'] as const).map((tech) => (
                <button key={tech} onClick={() => setCityTech(prev => ({ ...prev, [tech]: !prev[tech] }))} 
                  className={`p-6 rounded-2xl border-2 transition-all font-black text-lg capitalize ${cityTech[tech] ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-200 dark:border-slate-700'}`}>
                  {tech === 'nuclear' ? 'Central Nuclear' : tech === 'hydrogen' ? 'Planta H2' : tech === 'wind' ? 'Parque Eólico' : 'Granja Solar'}
                </button>
              ))}
            </div>
          </div>
          <div className={`p-10 rounded-[3rem] shadow-xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
             <div className="space-y-10">
                <div>
                  <div className="flex justify-between font-black mb-2 uppercase text-xs tracking-widest text-slate-400"><span>Contaminación CO2</span><span className="text-emerald-500">{cityImpact.emissions}%</span></div>
                  <div className="w-full h-4 bg-slate-200 dark:bg-slate-900 rounded-full"><div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${cityImpact.emissions}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between font-black mb-2 uppercase text-xs tracking-widest text-slate-400"><span>Estabilidad Red Eléctrica</span><span className={cityImpact.stability < 60 ? 'text-rose-500' : 'text-sky-500'}>{cityImpact.stability}%</span></div>
                  <div className="w-full h-4 bg-slate-200 dark:bg-slate-900 rounded-full"><div className={`h-full transition-all duration-700 ${cityImpact.stability < 60 ? 'bg-rose-500' : 'bg-sky-500'}`} style={{ width: `${cityImpact.stability}%` }} /></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. MATRIZ DE RED (SLIDER RECUPERADO) */}
      <section id="red" className="py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Activity className="text-emerald-500" size={32}/>
          <h2 className="text-3xl font-black uppercase tracking-tight">3. Mezcla Energética</h2>
        </div>
        <p className="text-lg text-slate-500 mb-12 font-medium">Mueve el slider. Si dependes 100% de sol/viento, ¿qué pasa de noche o sin viento?</p>
        <div className={`p-12 rounded-[4rem] shadow-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="flex justify-between font-black mb-8">
            <div className="text-left"><p className="text-emerald-500 text-xs uppercase tracking-widest">Renovables</p><p className="text-6xl">{renewMix}%</p></div>
            <div className="text-right text-slate-400"><p className="text-xs uppercase tracking-widest">Fósiles</p><p className="text-4xl">{100 - renewMix}%</p></div>
          </div>
          <input type="range" min="0" max="100" value={renewMix} onChange={(e) => setRenewMix(parseInt(e.target.value))} className="w-full h-4 bg-slate-200 rounded-full appearance-none accent-emerald-500 cursor-pointer"/>
          <p className={`mt-8 font-black uppercase tracking-widest text-sm ${renewMix > 80 ? "text-rose-500 animate-pulse" : "text-emerald-500"}`}>
            {renewMix > 80 ? "⚠️ Peligro: Riesgo de apagón por intermitencia" : "✅ Red balanceada y estable"}
          </p>
        </div>
      </section>

      {/* 4. CALCULADORA (DISEÑO VERDE RECUPERADO EXACTO) */}
      <section id="calc" className={`py-24 px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/3">
             <div className="flex items-center gap-3 mb-6">
               <BarChart3 className="text-emerald-500" size={32}/>
               <h2 className="text-3xl font-black uppercase tracking-tight">4. Calculadora</h2>
             </div>
             <p className="text-slate-500 font-bold mb-8">¿Cuánto pagas de luz? Calcula el impacto real.</p>
             <div className="bg-emerald-500/10 p-10 rounded-[3rem] border-2 border-emerald-500/30">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">Ingresa monto ($)</p>
                <div className="flex items-center gap-2">
                   <span className="text-5xl font-black text-emerald-500">$</span>
                   <input type="number" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="0" className="bg-transparent text-6xl font-black outline-none w-full placeholder:text-emerald-500/20"/>
                </div>
             </div>
          </div>

          <div className="lg:w-2/3 w-full p-10 md:p-16 rounded-[4rem] shadow-2xl bg-[#2E7D5A] flex flex-col gap-10">
            {/* CO2 */}
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-white"><BarChart3 size={36} /></div>
              <div><p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">CO2 Emitido Anual</p>
                <div className="flex items-baseline gap-2"><p className="text-6xl md:text-7xl font-black text-white">{bill ? impactStats.co2 : '0'}</p><p className="text-3xl font-black text-white/80">kg</p></div>
              </div>
            </div>
            {/* ÁRBOLES */}
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-emerald-300"><TreePine size={36} /></div>
              <div><p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Bosque Necesario</p>
                <div className="flex items-baseline gap-2"><p className="text-6xl md:text-7xl font-black text-emerald-300">{bill ? impactStats.arboles : '0'}</p><p className="text-3xl font-black text-emerald-300/80 italic">Árboles</p></div>
              </div>
            </div>
            {/* AUTO */}
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-sky-300"><Car size={36} /></div>
              <div><p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Equivalencia en Auto</p>
                <div className="flex items-baseline gap-2"><p className="text-6xl md:text-7xl font-black text-sky-300">{bill ? impactStats.kmAuto : '0'}</p><p className="text-3xl font-black text-sky-300/80 italic">km</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center border-t border-slate-200 dark:border-slate-800">
        <p className="font-black text-3xl tracking-tighter">InnovaMotivaTech</p>
        <p className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mt-2">By Easy InnovA+</p>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 32px; width: 32px; border-radius: 50%; background: #10b981; cursor: pointer; border: 4px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.2);}
        input[type=range]::-moz-range-thumb { height: 32px; width: 32px; border-radius: 50%; background: #10b981; cursor: pointer; border: 4px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.2); }
        .animate-in { animation: fadeIn 0.4s ease-out backwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
