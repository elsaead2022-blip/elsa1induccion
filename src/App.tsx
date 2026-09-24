import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  Mail, 
  Settings, 
  User, 
  Users,
  Clock,
  BookOpen, 
  UserCheck, 
  Compass, 
  Scale, 
  Building2, 
  ShieldCheck, 
  Bot, 
  CheckSquare, 
  HelpCircle, 
  UserPlus, 
  RefreshCw, 
  MapPin, 
  RotateCcw, 
  Send, 
  Sparkles, 
  ChevronRight, 
  Award, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  Menu, 
  X, 
  Play,
  Pause,
  Volume2,
  BarChart3,
  Calendar,
  CloudRain,
  Upload,
  Download,
  Laptop,
  Sprout,
  Wrench,
  Briefcase,
  HeartPulse,
  BookMarked,
  HelpCircle as HelpIcon,
  Trophy,
  ArrowRight,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react';
import { 
  PERFILES_INGRESO, 
  NORMATIVA_ACUERDO_009, 
  AREAS_CONOCIMIENTO, 
  REGIONALES_SENA, 
  CASOS_SIMULACION, 
  CHECKLIST_INDUCCION 
} from './data/senaData';
import { ACUERDO_009_JSON, QUIZ_DERECHOS_DEBERES, QuizPregunta } from './data/acuerdo009Data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'perfiles' | 'ruta' | 'normativa' | 'institucional' | 'derechos' | 'checklist' | 'admin'>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme & Blur States
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBlurred, setIsBlurred] = useState(false);

  // Normativa / Derechos Interactive Module States
  const [normativaSubTab, setNormativaSubTab] = useState<'capitulos' | 'quiz'>('capitulos');
  const [quizSelections, setQuizSelections] = useState<{ [key: number]: string }>({});
  const [showQuizCelebration, setShowQuizCelebration] = useState(false);

  // Quiz Registration, Timer & Repository States
  const [traineeInfo, setTraineeInfo] = useState({ nombre: '', documento: '', email: '', programa: '' });
  const [isTraineeRegistered, setIsTraineeRegistered] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<QuizPregunta[]>(() => {
    const shuffled = [...QUIZ_DERECHOS_DEBERES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5).map(q => ({
      ...q,
      opciones: [...q.opciones].sort(() => 0.5 - Math.random())
    }));
  });
  const [quizRepository, setQuizRepository] = useState<any[]>(() => {
    const saved = localStorage.getItem('sena_quiz_repository');
    return saved ? JSON.parse(saved) : [];
  });
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [emailReportSent, setEmailReportSent] = useState(false);

  // Calendar File State (Resolución 1190 de 2026 / Academic Calendar)
  const [calendarFile, setCalendarFile] = useState<{ name: string; size: string; type: string; url?: string }>(() => {
    const saved = localStorage.getItem('sena_calendar_file');
    return saved ? JSON.parse(saved) : { name: 'resolucion_sena_1190_2026.pdf', size: '2.4 MB', type: 'application/pdf' };
  });

  const [showCalendarJsonModal, setShowCalendarJsonModal] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  const CALENDARIO_ACADEMICO_RESOLUCION_1190_JSON = {
    "resolucion": "Resolución 1-01190 de 2026",
    "fecha": "16 de abril de 2026",
    "entidad": "Servicio Nacional de Aprendizaje (SENA)",
    "objeto": "Modificación de los artículos 1o y 2o de la Resolución 1-03775 de 2025 (Calendario académico y de labores 2026)",
    "trimestralizacion": [
      { "actividad": "Alistamiento primer trimestre", "fechas": "Del 26 al 28 de enero" },
      { "actividad": "Primer trimestre", "fechas": "Desde el 29 de enero hasta el 14 de abril" },
      { "actividad": "Alistamiento para el segundo trimestre", "fechas": "Del 15 al 17 de abril" },
      { "actividad": "Segundo trimestre", "fechas": "Desde el 20 de abril hasta 4 de julio" },
      { "actividad": "Alistamiento para el tercer trimestre", "fechas": "Del 6 al 8 de julio" },
      { "actividad": "Semana de confraternidad", "fechas": "Del 13 al 18 de julio (no se programará formación titulada)" },
      { "actividad": "Tercer trimestre", "fechas": "Del 9 al 11 de julio y el día 21 de julio hasta el 28 de septiembre" },
      { "actividad": "Alistamiento para el cuarto trimestre", "fechas": "29 y 30 de septiembre hasta el 1º de octubre" },
      { "actividad": "Cuarto trimestre", "fechas": "Desde el 2 de octubre al 16 de diciembre" },
      { "actividad": "Balance a la ejecución de los programas de formación de la vigencia", "fechas": "17 y 18 de diciembre de 2026" }
    ],
    "actividadesFormacionJornadaLaboral": {
      "totalDias": "Doscientos cuarenta y cinco (245) días hábiles (lunes a sábado)",
      "distribucion": [
        { "trimestre": "Primer Trimestre", "dias": "Sesenta y dos (62) días" },
        { "trimestre": "Segundo Trimestre", "dias": "Sesenta y uno (61) días" },
        { "trimestre": "Tercer Trimestre", "dias": "Sesenta y uno (61) días" },
        { "trimestre": "Cuarto Trimestre", "dias": "Sesenta y uno (61) días" }
      ],
      "paragrafo1": "Potencial de horas instructor de planta: 201 días hábiles del 29 de enero al 16 de diciembre de 2026."
    }
  };

  const handleCalendarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const fileData = {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          type: file.type || 'application/pdf',
          url: uploadEvent.target?.result as string
        };
        setCalendarFile(fileData);
        localStorage.setItem('sena_calendar_file', JSON.stringify(fileData));
        alert(`Archivo "${file.name}" cargado exitosamente sobre el título del Calendario Académico.`);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    let timer: any;
    if (isTraineeRegistered && quizStartTime && !quizCompleted && !showQuizCelebration) {
      timer = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - quizStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTraineeRegistered, quizStartTime, quizCompleted, showQuizCelebration]);

  const handleValidateQuiz = () => {
    setQuizCompleted(true); // Stop timer

    const score = activeQuizQuestions.filter(q => {
      const sel = quizSelections[q.id];
      const cor = q.opciones.find(o => o.esCorrecta);
      return sel && cor && sel === cor.id;
    }).length;

    const resultRecord = {
      id: Date.now(),
      nombre: traineeInfo.nombre || 'Aprendiz Anónimo',
      documento: traineeInfo.documento || 'S/D',
      email: traineeInfo.email || 'aprendiz@sena.edu.co',
      programa: traineeInfo.programa || 'Formación Profesional Integral',
      score,
      total: activeQuizQuestions.length,
      elapsedSeconds,
      date: new Date().toLocaleDateString(),
    };

    const updatedRepo = [resultRecord, ...quizRepository].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.elapsedSeconds - b.elapsedSeconds;
    });

    setQuizRepository(updatedRepo);
    localStorage.setItem('sena_quiz_repository', JSON.stringify(updatedRepo));
    setEmailReportSent(true);

    const allCorrect = score === activeQuizQuestions.length;
    if (allCorrect) {
      setShowQuizCelebration(true);
    } else {
      alert(`Resultados registrados en el repositorio.\nPuntaje: ${score}/${activeQuizQuestions.length}\n⏱️ Cronómetro detenido en: ${elapsedSeconds} segundos\n📧 Reporte enviado por correo a: ${traineeInfo.email}`);
    }
  };

  const handleResetForNewTrainee = () => {
    setTraineeInfo({ nombre: '', documento: '', email: '', programa: '' });
    setIsTraineeRegistered(false);
    setQuizStartTime(null);
    setElapsedSeconds(0);
    setQuizCompleted(false);
    setQuizSelections({});
    setEmailReportSent(false);
    setShowQuizCelebration(false);
    const shuffled = [...QUIZ_DERECHOS_DEBERES].sort(() => 0.5 - Math.random());
    setActiveQuizQuestions(shuffled.slice(0, 5).map(q => ({
      ...q,
      opciones: [...q.opciones].sort(() => 0.5 - Math.random())
    })));
  };

  // Checklist State with localStorage
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(() => {
    const saved = localStorage.getItem('sena_checklist');
    return saved ? JSON.parse(saved) : {};
  });

  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('sena_checklist', JSON.stringify(checkedItems));
    const completed = CHECKLIST_INDUCCION.filter(item => checkedItems[item.id]).length;
    if (completed === CHECKLIST_INDUCCION.length && completed > 0) {
      setShowCompletionModal(true);
    }
  }, [checkedItems]);

  const toggleChecklist = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateChecklistProgress = () => {
    const total = CHECKLIST_INDUCCION.length;
    const completed = CHECKLIST_INDUCCION.filter(item => checkedItems[item.id]).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'bg-[#0a140a] text-slate-100' : 'bg-slate-50 text-slate-900'} ${isBlurred ? 'backdrop-blur-md filter blur-[1px]' : ''} flex flex-col font-['Plus_Jakarta_Sans',sans-serif]`}>
      
      {/* Top Navigation Bar */}
      <header className={`border-b sticky top-0 z-40 shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('inicio')}>
            <div className={`w-12 h-12 rounded-xl p-1 flex items-center justify-center border shadow-md ${isDarkMode ? 'bg-[#172e17] border-emerald-800/60 shadow-emerald-900/30' : 'bg-emerald-50 border-emerald-200 shadow-emerald-100'}`}>
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" style={{'enableBackground':'new 0 0 1000 1000'} as any} xmlSpace="preserve" className="w-full h-full">
                <style type="text/css">{`.st0{fill:#39a900;}`}</style>
                <path id="path47-5" className="st0" d="M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6 c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6 c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3 c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1 l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4 c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2 c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1 l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z M280.6,268.9 l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z M557.5,269c0,0-51.9,0-77.9,0l0,137.7 l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7 l13.9,24.9l68.8,0L874,269.2L805.6,269.2z M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z M10.6,445.6l0.5,75l280.1-1 c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9 c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699 c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z"/>
              </svg>
            </div>
            <div>
              <h1 className={`text-sm font-extrabold tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>SENA 360° DASHBOARD</h1>
              <p className="text-[10px] text-[#39a900] font-extrabold mt-1">Inducción & Acuerdo 009 de 2024</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className={`hidden xl:flex items-center gap-1 p-1.5 rounded-2xl border ${isDarkMode ? 'bg-[#172e17] border-emerald-900/50' : 'bg-emerald-50/80 border-emerald-200'}`}>
            {[
              { id: 'inicio', label: 'Home', icon: Home },
              { id: 'perfiles', label: 'Perfiles', icon: UserCheck },
              { id: 'ruta', label: 'Ruta', icon: Compass },
              { id: 'normativa', label: 'Acuerdo 009', icon: Scale },
              { id: 'institucional', label: 'Contexto', icon: Building2 },
              { id: 'derechos', label: 'Derechos', icon: ShieldCheck },

              { id: 'checklist', label: 'Checklist', icon: CheckSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-[#39a900] text-white shadow-md shadow-emerald-900/40' 
                      : isDarkMode 
                        ? 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white' 
                        : 'text-emerald-900 hover:bg-emerald-100 hover:text-emerald-950'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Top Right Controls (Theme & Blur) + Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-center cursor-pointer shadow-sm ${
                isDarkMode 
                  ? 'bg-[#172e17] border-emerald-800 text-amber-400 hover:bg-emerald-900/50' 
                  : 'bg-emerald-50 border-emerald-200 text-amber-600 hover:bg-emerald-100'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-[#39a900]" />}
            </button>

            <button
              onClick={() => setIsBlurred(!isBlurred)}
              title={isBlurred ? "Quitar Efecto Blur" : "Aplicar Efecto Blur"}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-sm ${
                isBlurred 
                  ? 'bg-[#39a900] text-white border-[#39a900]' 
                  : isDarkMode
                    ? 'bg-[#172e17] text-emerald-300 border-emerald-800 hover:bg-emerald-900/50'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">{isBlurred ? 'Blur Activo' : 'Efecto Blur'}</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              title="Panel de Administrador & Analítica"
              className={`px-3 py-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-sm ${
                activeTab === 'admin'
                  ? 'bg-[#39a900] text-white border-[#39a900]'
                  : isDarkMode
                    ? 'bg-[#172e17] text-emerald-300 border-emerald-800 hover:bg-emerald-900/50'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#39a900]" />
              <span className="hidden sm:inline">Panel Admin</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl border xl:hidden ${isDarkMode ? 'bg-[#172e17] border-emerald-800 text-slate-200 hover:bg-emerald-900/50' : 'bg-emerald-50 border-emerald-200 text-slate-700 hover:bg-emerald-100'}`}
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`xl:hidden border-b px-4 py-3 space-y-1 shadow-2xl ${isDarkMode ? 'bg-[#102210] border-emerald-900' : 'bg-white border-emerald-100'}`}>
            {[
              { id: 'inicio', label: 'Home (Inicio)', icon: Home },
              { id: 'perfiles', label: 'Perfiles de Ingreso', icon: UserCheck },
              { id: 'ruta', label: 'Ruta Pedagógica', icon: Compass },
              { id: 'normativa', label: 'Acuerdo 009 de 2024', icon: Scale },
              { id: 'institucional', label: 'Contexto Institucional', icon: Building2 },
              { id: 'derechos', label: 'Derechos y Deberes', icon: ShieldCheck },
              { id: 'simulador', label: 'Simulador de Casos', icon: HelpCircle },

              { id: 'checklist', label: 'Checklist de Inducción', icon: CheckSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-[#39a900] text-white' 
                      : isDarkMode 
                        ? 'text-slate-300 hover:bg-emerald-900/40' 
                        : 'text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Dashboard Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ================= TAB: INICIO (DASHBOARD BENTO STYLE + RUTA GUIADA) ================= */}
        {activeTab === 'inicio' && (
          <div className="space-y-6">
            
            {/* Guided Onboarding Banner */}
            <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${isDarkMode ? 'bg-gradient-to-r from-emerald-950/60 via-[#102210] to-[#172e17] border-emerald-700/40' : 'bg-gradient-to-r from-emerald-50 via-white to-emerald-50/50 border-emerald-300'}`}>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-[#39a900]/20 text-[#39a900] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#39a900]/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ruta Recomendada de Inducción</span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>¿Nuevo en el SENA? Sigue estos 4 pasos clave</h3>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Te recomendamos explorar tu perfil, seguir la ruta pedagógica, leer el Acuerdo 009 y verificar tu checklist.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('perfiles')}
                  className="bg-[#39a900] hover:bg-[#329600] text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-900/30"
                >
                  <span>1. Ver Perfiles</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Top Welcome Card */}
            <div className="grid grid-cols-1 gap-6">
              
              <div className={`rounded-3xl p-8 border shadow-xl relative overflow-hidden flex flex-col justify-between ${isDarkMode ? 'bg-gradient-to-br from-[#102210] to-[#172e17] border-emerald-900/40' : 'bg-gradient-to-br from-white to-emerald-50/30 border-emerald-100'}`}>
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#39a900]/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="space-y-4 relative z-10">
                  <div className="inline-flex items-center gap-2 bg-[#39a900]/15 text-[#39a900] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#39a900]/30">
                    <GraduationCap className="w-4 h-4" />
                    <span>Formación Profesional Integral SENA</span>
                  </div>

                  <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Inducción Institucional & <span className="text-[#39a900]">Acuerdo 009 de 2024</span>
                  </h2>

                  <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Plataforma oficial institucional para orientar a aprendices en la normatividad, derechos, deberes y herramientas de la Formación Profesional Integral.
                  </p>
                </div>

                <div className="pt-8 flex flex-wrap gap-4 relative z-10">
                  <button
                    onClick={() => setActiveTab('checklist')}
                    className="bg-[#39a900] hover:bg-[#329600] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30 flex items-center gap-2 cursor-pointer"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Ver Checklist de Inducción</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('derechos')}
                    className={`font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 border cursor-pointer ${isDarkMode ? 'bg-[#172e17] hover:bg-[#1f3b1f] text-emerald-300 border-emerald-800' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'}`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Ver Derechos & Deberes</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Bento Grid Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: '1. Perfiles de Ingreso',
                  desc: 'Aspirante nuevo, reingreso, traslado y retiro anterior.',
                  icon: UserCheck,
                  tab: 'perfiles',
                  accent: 'text-[#39a900]',
                  border: isDarkMode ? 'border-emerald-700/40' : 'border-emerald-200'
                },
                {
                  title: '2. Ruta Pedagógica',
                  desc: 'Fases, FPI, Sofia Plus y ambientes de aprendizaje.',
                  icon: Compass,
                  tab: 'ruta',
                  accent: 'text-emerald-400',
                  border: isDarkMode ? 'border-emerald-700/40' : 'border-emerald-200'
                },
                {
                  title: '3. Acuerdo 009 de 2024',
                  desc: 'Derechos, deberes, evaluación y debido proceso.',
                  icon: Scale,
                  tab: 'normativa',
                  accent: 'text-amber-400',
                  border: isDarkMode ? 'border-emerald-700/40' : 'border-emerald-200'
                },
                {
                  title: '4. Contexto Institucional',
                  desc: 'Redes de conocimiento y regionales en Colombia.',
                  icon: Building2,
                  tab: 'institucional',
                  accent: 'text-[#39a900]',
                  border: isDarkMode ? 'border-emerald-700/40' : 'border-emerald-200'
                }
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveTab(card.tab as any)}
                    className={`rounded-3xl p-6 border ${card.border} transition-all cursor-pointer group flex flex-col justify-between space-y-6 shadow-lg ${isDarkMode ? 'bg-[#102210] hover:bg-[#152c15]' : 'bg-white hover:bg-emerald-50/50'}`}
                  >
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-[#172e17]' : 'bg-emerald-50'}`}>
                        <Icon className={`w-6 h-6 ${card.accent}`} />
                      </div>
                      <h3 className={`text-base font-extrabold transition-colors ${isDarkMode ? 'text-white group-hover:text-[#39a900]' : 'text-slate-900 group-hover:text-[#39a900]'}`}>
                        {card.title}
                      </h3>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {card.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[#39a900] group-hover:translate-x-1 transition-transform">
                      <span>Acceder al módulo</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checklist Progress Status Bar */}
            <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-4 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#39a900] uppercase tracking-wider">
                    <CheckSquare className="w-4 h-4" />
                    <span>Progreso de Inducción Institucional</span>
                  </div>
                  <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Estado de Actividades del Aprendiz</h3>
                </div>
                <button
                  onClick={() => setActiveTab('checklist')}
                  className="bg-[#39a900] hover:bg-[#329600] text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  Gestionar Checklist
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Progreso completado</span>
                  <span className="text-[#39a900]">{calculateChecklistProgress()}%</span>
                </div>
                <div className={`w-full h-3 rounded-full overflow-hidden border ${isDarkMode ? 'bg-[#172e17] border-emerald-950' : 'bg-emerald-50 border-emerald-200'}`}>
                  <div 
                    className="h-full bg-gradient-to-r from-[#39a900] to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${calculateChecklistProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 1: PERFILES ================= */}
        {activeTab === 'perfiles' && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#39a900]/15 text-[#39a900] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#39a900]/30">
                <UserCheck className="w-4 h-4" />
                <span>Apartado 1</span>
              </div>
              <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Caracterización del Aprendiz y Perfiles de Ingreso
              </h2>
              <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                El SENA acoge aspirantes con diversas trayectorias y necesidades de formación. Identifica tu perfil para conocer las directrices específicas de tu proceso de inducción.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setShowCalendarJsonModal(true)}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Calendario Académico (Resolución 1190 / JSON)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PERFILES_INGRESO.map((perfil) => {
                return (
                  <div key={perfil.id} className={`rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col justify-between space-y-6 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider bg-[#39a900]/20 text-[#39a900] px-3 py-1 rounded-full border border-[#39a900]/30">
                          Perfil SENA
                        </span>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${isDarkMode ? 'bg-[#172e17] text-[#39a900]' : 'bg-emerald-50 text-[#39a900]'}`}>
                          {perfil.id === 'nuevo' && <UserPlus className="w-5 h-5" />}
                          {perfil.id === 'reingreso' && <RefreshCw className="w-5 h-5" />}
                          {perfil.id === 'traslado' && <MapPin className="w-5 h-5" />}
                          {perfil.id === 'retiro' && <RotateCcw className="w-5 h-5" />}
                        </div>
                      </div>

                      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{perfil.titulo}</h3>
                      <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{perfil.descripcion}</p>

                      <div className={`space-y-2 pt-2 border-t ${isDarkMode ? 'border-emerald-900/40' : 'border-emerald-100'}`}>
                        <h4 className="text-xs font-bold text-[#39a900] uppercase tracking-wide">Necesidades Específicas:</h4>
                        <ul className="space-y-1.5">
                          {perfil.necesidades.map((nec, i) => (
                            <li key={i} className={`text-xs flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#39a900] mt-1.5 shrink-0"></span>
                              <span>{nec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-[#172e17] border-emerald-900/40' : 'bg-emerald-50/50 border-emerald-200'}`}>
                      <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wide">Ruta Recomendada:</span>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{perfil.rutaSugerida}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: RUTA ================= */}
        {activeTab === 'ruta' && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#39a900]/15 text-[#39a900] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#39a900]/30">
                <Compass className="w-4 h-4" />
                <span>Apartado 2</span>
              </div>
              <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Ruta Pedagógica de Inducción
              </h2>
              <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                La inducción SENA es un proceso obligatorio y formativo estructurado en etapas secuenciales que garantizan tu familiarización con la Formación Profesional Integral (FPI).
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  paso: '01',
                  titulo: 'Bienvenida Institucional y Contextualización',
                  desc: 'Reconocimiento de la misión, visión, símbolos patrios institucionales y el impacto del SENA en el desarrollo económico y social de Colombia.',
                  detalles: ['Historia del SENA y origen (Fundado en 1957).', 'Himno y emblemas institucionales.', 'Oferta de servicios y programas titulados y complementarios.']
                },
                {
                  paso: '02',
                  titulo: 'Modelo de Formación Profesional Integral (FPI)',
                  desc: 'Comprensión del enfoque por competencias, donde el saber ser, saber hacer y saber conocer se integran mediante proyectos formativos.',
                  detalles: ['Aprendizaje basado en proyectos.', 'Desarrollo de competencias técnicas y transversales.', 'Ambientes de aprendizaje pluritecnológicos.']
                },
                {
                  paso: '03',
                  titulo: 'Manejo de Herramientas Tecnológicas (Sofia Plus & LMS)',
                  desc: 'Dominio de la plataforma Sofia Plus para gestión académica y la plataforma LMS (Territorium) para el desarrollo de actividades y evidencias.',
                  detalles: ['Creación y actualización de perfil en Sofia Plus.', 'Acceso al correo institucional y Office 365.', 'Navegación en guías de aprendizaje y cargue de evidencias.']
                },
                {
                  paso: '04',
                  titulo: 'Bienestar al Aprendiz y Estímulos',
                  desc: 'Conocimiento de los programas de apoyo socioeconómico, liderazgo, cultura, deporte, salud y estímulos a la excelencia académica.',
                  detalles: ['Apoyo de sostenimiento y monitorias.', 'Liderazgo y representación de aprendices.', 'Participación en semilleros SENNOVA y WorldSkills.']
                },
                {
                  paso: '05',
                  titulo: 'Familiarización con el Acuerdo 009 de 2024',
                  desc: 'Estudio detallado del Reglamento del Aprendiz, comprendiendo derechos, deberes, estímulos, faltas y el debido proceso.',
                  detalles: ['Conocimiento de los canales de atención y comités.', 'Compromiso ético y convivencia institucional.']
                }
              ].map((item, idx) => (
                <div key={idx} className={`rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col md:flex-row gap-6 items-start ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                  <div className="w-16 h-16 rounded-2xl bg-[#39a900] text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-emerald-900/40">
                    {item.paso}
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.titulo}</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.desc}</p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {item.detalles.map((det, i) => {
                        const isHistoria = det.includes('Historia del SENA');
                        const isHimno = det.includes('Himno y emblemas');
                        const isOferta = det.includes('Oferta de servicios y programas');
                        if (isHistoria) {
                          return (
                            <a
                              key={i}
                              href="https://youtu.be/B3b7T6-h8i4"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-xs px-3 py-1 rounded-xl font-medium border inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                                isDarkMode 
                                  ? 'bg-[#172e17] text-[#39a900] border-emerald-800 hover:bg-emerald-900/50' 
                                  : 'bg-emerald-50 text-[#39a900] border-emerald-300 hover:bg-emerald-100'
                              }`}
                              title="Ver video: Historia del SENA"
                            >
                              <span>{det}</span>
                              <Play className="w-3 h-3 fill-current" />
                            </a>
                          );
                        }
                        if (isHimno) {
                          return (
                            <a
                              key={i}
                              href="https://youtu.be/KD5wULG4PcY"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-xs px-3 py-1 rounded-xl font-medium border inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                                isDarkMode 
                                  ? 'bg-[#172e17] text-[#39a900] border-emerald-800 hover:bg-emerald-900/50' 
                                  : 'bg-emerald-50 text-[#39a900] border-emerald-300 hover:bg-emerald-100'
                              }`}
                              title="Ver video: Himno y emblemas institucionales"
                            >
                              <span>{det}</span>
                              <Play className="w-3 h-3 fill-current" />
                            </a>
                          );
                        }
                        if (isOferta) {
                          return (
                            <a
                              key={i}
                              href="https://serviciosfinancierosena.blogspot.com/p/oferta-academica-del-centro-de.html"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-xs px-3 py-1 rounded-xl font-medium border inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                                isDarkMode 
                                  ? 'bg-[#172e17] text-[#39a900] border-emerald-800 hover:bg-emerald-900/50' 
                                  : 'bg-emerald-50 text-[#39a900] border-emerald-300 hover:bg-emerald-100'
                              }`}
                              title="Ver oferta académica del centro"
                            >
                              <span>{det}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          );
                        }
                        return (
                          <span key={i} className={`text-xs px-3 py-1 rounded-xl font-medium border ${isDarkMode ? 'bg-[#172e17] text-emerald-300 border-emerald-950' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
                            {det}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: NORMATIVA & DERECHOS/DEBERES INTERACTIVO ================= */}
        {activeTab === 'normativa' && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#39a900]/15 text-[#39a900] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#39a900]/30">
                <Scale className="w-4 h-4" />
                <span>Apartado 3 — Marco Normativo & Módulo Interactivo</span>
              </div>
              <div>
                <a
                  href="https://normograma.sena.edu.co/compilacion/docs/acuerdo_sena_0009_2024.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#39a900] hover:underline bg-[#39a900]/10 px-3.5 py-2 rounded-xl border border-[#39a900]/30 mb-2 transition-all cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Marco normativo: Acuerdo 009 de 2024 (Normograma Oficial)</span>
                </a>
              </div>
              <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Derechos, Deberes y Módulo Interactivo del Aprendiz
              </h2>
              <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Explora el reglamento convertido en formato JSON, analiza los capítulos de derechos y deberes con imágenes institucionales, y pon a prueba tus conocimientos con refuerzo pedagógico y festejo.
              </p>
            </div>

            {/* Sub-navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b pb-4 border-emerald-900/30">
              <button
                onClick={() => setNormativaSubTab('capitulos')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  normativaSubTab === 'capitulos'
                    ? 'bg-[#39a900] text-white shadow-md shadow-emerald-900/30'
                    : isDarkMode ? 'bg-[#102210] text-slate-300 hover:bg-[#172e17]' : 'bg-emerald-50 text-slate-700 hover:bg-emerald-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>1. Capítulos (Derechos y Deberes)</span>
              </button>
              <button
                onClick={() => setNormativaSubTab('quiz')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  normativaSubTab === 'quiz'
                    ? 'bg-[#39a900] text-white shadow-md shadow-emerald-900/30'
                    : isDarkMode ? 'bg-[#102210] text-slate-300 hover:bg-[#172e17]' : 'bg-emerald-50 text-slate-700 hover:bg-emerald-100'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>2. Prueba Interactiva con Refuerzo</span>
              </button>
            </div>

            {/* SubTab 1: Capítulos (Derechos y Deberes con imágenes) */}
            {normativaSubTab === 'capitulos' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {ACUERDO_009_JSON.capitulos.map((cap) => (
                    <div key={cap.id} className={`rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col md:flex-row gap-6 items-center ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                      <div className="w-full md:w-72 h-52 rounded-2xl overflow-hidden shrink-0 shadow-md">
                        <img src={cap.imagen} alt={cap.titulo} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="space-y-4 flex-1 w-full">
                        <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-4 ${isDarkMode ? 'border-emerald-900/40' : 'border-emerald-100'}`}>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider bg-[#39a900]/20 text-[#39a900] px-3 py-1 rounded-full border border-[#39a900]/30">
                              {cap.capitulo}
                            </span>
                            <h3 className={`text-xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cap.titulo}</h3>
                          </div>
                          <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border ${isDarkMode ? 'bg-[#172e17] text-[#39a900] border-emerald-950' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
                            {cap.articulos}
                          </span>
                        </div>

                        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{cap.resumen}</p>

                        <div className={`p-4 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-[#172e17] border-emerald-900/40' : 'bg-emerald-50/50 border-emerald-200'}`}>
                          <h4 className="text-xs font-bold text-[#39a900] uppercase tracking-wide">Puntos Clave del Capítulo:</h4>
                          <ul className="space-y-1.5">
                            {cap.detalles.map((det, i) => (
                              <li key={i} className={`text-xs flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                <CheckCircle2 className="w-4 h-4 text-[#39a900] shrink-0 mt-0.5" />
                                <span>{det}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SubTab 2: Interactive Quiz with Registration, Timer, Repository & Email Report */}
            {normativaSubTab === 'quiz' && (
              <div className="space-y-6">
                {!isTraineeRegistered ? (
                  <div className={`rounded-3xl p-8 border shadow-xl max-w-xl mx-auto space-y-6 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                    <div className="space-y-2 text-center">
                      <div className="inline-flex items-center gap-2 bg-[#39a900]/20 text-[#39a900] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#39a900]/30">
                        <UserCheck className="w-4 h-4" />
                        <span>Registro de Aprendiz</span>
                      </div>
                      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Ingresa tus Datos para la Evaluación</h3>
                      <p className="text-xs text-slate-500">Tus respuestas, puntaje y tiempo de respuesta serán almacenados en el repositorio oficial y se te enviará un reporte por correo.</p>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!traineeInfo.nombre || !traineeInfo.email) {
                        alert('Por favor completa al menos tu nombre y correo electrónico.');
                        return;
                      }
                      setIsTraineeRegistered(true);
                      setQuizStartTime(Date.now());
                      setElapsedSeconds(0);
                    }} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Nombre Completo</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Carlos Alberto Pérez"
                          value={traineeInfo.nombre}
                          onChange={(e) => setTraineeInfo(prev => ({ ...prev, nombre: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#39a900] ${isDarkMode ? 'bg-[#172e17] border-emerald-800 text-white' : 'bg-emerald-50/50 border-emerald-200 text-slate-900'}`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Documento de Identidad</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. 1098765432"
                          value={traineeInfo.documento}
                          onChange={(e) => setTraineeInfo(prev => ({ ...prev, documento: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#39a900] ${isDarkMode ? 'bg-[#172e17] border-emerald-800 text-white' : 'bg-emerald-50/50 border-emerald-200 text-slate-900'}`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Correo Electrónico (Para recibir reporte)</label>
                        <input
                          type="email"
                          required
                          placeholder="Ej. aprendiz@sena.edu.co"
                          value={traineeInfo.email}
                          onChange={(e) => setTraineeInfo(prev => ({ ...prev, email: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#39a900] ${isDarkMode ? 'bg-[#172e17] border-emerald-800 text-white' : 'bg-emerald-50/50 border-emerald-200 text-slate-900'}`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Programa de Formación / Centro</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. ADSO / Centro de Servicios Financieros"
                          value={traineeInfo.programa}
                          onChange={(e) => setTraineeInfo(prev => ({ ...prev, programa: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#39a900] ${isDarkMode ? 'bg-[#172e17] border-emerald-800 text-white' : 'bg-emerald-50/50 border-emerald-200 text-slate-900'}`}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#39a900] hover:bg-[#329600] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30 cursor-pointer"
                      >
                        Comenzar Evaluación e Iniciar Cronómetro
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Trainee Banner & Timer + Repository Toggle */}
                    <div className={`rounded-3xl p-6 border shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 ${isDarkMode ? 'bg-[#102210] border-emerald-600/40' : 'bg-white border-emerald-300'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#39a900]/20 flex items-center justify-center text-[#39a900] font-bold text-lg">
                          👤
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{traineeInfo.nombre}</h4>
                          <p className="text-xs text-slate-500">{traineeInfo.programa} • ⏱️ Tiempo: <span className="font-mono font-bold text-[#39a900]">{elapsedSeconds}s</span></p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setShowLeaderboard(!showLeaderboard)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${showLeaderboard ? 'bg-[#39a900] text-white border-[#39a900]' : isDarkMode ? 'bg-[#172e17] text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}
                        >
                          🏆 Ver Repositorio y Ranking ({quizRepository.length})
                        </button>
                        <button
                          onClick={() => handleValidateQuiz()}
                          className="bg-[#39a900] hover:bg-[#329600] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                        >
                          Validar y Enviar Reporte
                        </button>
                        <button
                          onClick={handleResetForNewTrainee}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${isDarkMode ? 'bg-amber-950/50 text-amber-300 border-amber-800 hover:bg-amber-900/50' : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'}`}
                        >
                          🔄 Nuevo Aprendiz
                        </button>
                      </div>
                    </div>

                    {emailReportSent && (
                      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#39a900]" />
                          <span>Reporte de evaluación enviado exitosamente por correo a <strong>{traineeInfo.email}</strong> y guardado en el repositorio.</span>
                        </div>
                        <button onClick={() => setEmailReportSent(false)} className="text-emerald-400 hover:underline">Ocultar</button>
                      </div>
                    )}

                    {/* Leaderboard / Repository View */}
                    {showLeaderboard && (
                      <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-4 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                        <div className="flex items-center justify-between border-b pb-3 border-emerald-900/30">
                          <div>
                            <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>🏆 Repositorio y Ranking de Aprendices</h3>
                            <p className="text-xs text-slate-500">Ordenado de mayor a menor puntaje y menor tiempo de respuesta.</p>
                          </div>
                          <button onClick={() => setShowLeaderboard(false)} className="text-xs text-[#39a900] font-bold hover:underline">Cerrar</button>
                        </div>

                        {quizRepository.length === 0 ? (
                          <p className="text-xs text-slate-500 text-center py-6">Aún no hay evaluaciones registradas en el repositorio.</p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-emerald-900 text-emerald-400' : 'border-emerald-200 text-emerald-800'}`}>
                                  <th className="py-2.5 px-3">#</th>
                                  <th className="py-2.5 px-3">Aprendiz</th>
                                  <th className="py-2.5 px-3">Programa</th>
                                  <th className="py-2.5 px-3">Puntaje</th>
                                  <th className="py-2.5 px-3">Tiempo</th>
                                  <th className="py-2.5 px-3">Fecha</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-emerald-900/20">
                                {quizRepository.map((item, idx) => (
                                  <tr key={item.id} className={idx === 0 ? 'bg-[#39a900]/10 font-bold' : ''}>
                                    <td className="py-2.5 px-3">{idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : idx + 1}</td>
                                    <td className="py-2.5 px-3">{item.nombre} <span className="text-[10px] text-slate-400">({item.documento})</span></td>
                                    <td className="py-2.5 px-3 text-slate-400">{item.programa}</td>
                                    <td className="py-2.5 px-3 text-[#39a900]">{item.score} / {item.total}</td>
                                    <td className="py-2.5 px-3 font-mono">{item.elapsedSeconds}s</td>
                                    <td className="py-2.5 px-3 text-slate-400">{item.date}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quiz Questions */}
                    <div className="space-y-6">
                      {activeQuizQuestions.map((q, idx) => {
                        const selectedOptId = quizSelections[q.id];
                        const isAnswered = selectedOptId !== undefined;
                        const correctOpt = q.opciones.find(o => o.esCorrecta);
                        const isCorrect = isAnswered && correctOpt && selectedOptId === correctOpt.id;

                        return (
                          <div 
                            key={q.id} 
                            className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 transition-all ${
                              isAnswered 
                                ? isCorrect 
                                  ? 'border-emerald-500 shadow-emerald-500/20 shadow-xl' 
                                  : 'border-rose-500 shadow-rose-500/20 shadow-xl'
                                : isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider bg-[#39a900]/20 text-[#39a900] px-3 py-1 rounded-full border border-[#39a900]/30">
                                Pregunta #{idx + 1} ({q.categoria})
                              </span>
                              {isAnswered && (
                                <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${isCorrect ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'bg-rose-950 text-rose-300 border border-rose-500'}`}>
                                  {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                                  {isCorrect ? 'Efecto Positivo: ¡Acertado!' : 'Efecto Negativo: Error detectado'}
                                </span>
                              )}
                            </div>

                            <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{q.pregunta}</h3>

                            <div className="space-y-3">
                              {q.opciones.map((op) => {
                                const isSelected = selectedOptId === op.id;
                                let btnClass = isDarkMode ? 'bg-[#172e17] border-emerald-950 text-slate-200' : 'bg-emerald-50/50 border-emerald-200 text-slate-800';
                                
                                if (isAnswered) {
                                  if (op.esCorrecta) {
                                    btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                                  } else if (isSelected && !op.esCorrecta) {
                                    btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
                                  }
                                }

                                return (
                                  <button
                                    key={op.id}
                                    onClick={() => {
                                      setQuizSelections(prev => ({ ...prev, [q.id]: op.id }));
                                    }}
                                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnClass}`}
                                  >
                                    <span className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 bg-[#102210] border-emerald-800 text-[#39a900]">
                                      {op.id}
                                    </span>
                                    <span className="flex-1">{op.texto}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {isAnswered && !isCorrect && (
                              <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs sm:text-sm space-y-1">
                                <div className="font-bold flex items-center gap-1.5 text-rose-300">
                                  <AlertCircle className="w-4 h-4" />
                                  <span>Refuerzo Pedagógico (En dónde estuvo tu error):</span>
                                </div>
                                <p>{q.opciones.find(o => o.id === selectedOptId)?.refuerzoPedagogico}</p>
                              </div>
                            )}

                            {isAnswered && isCorrect && (
                              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm space-y-1">
                                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>¡Excelente comprensión!</span>
                                </div>
                                <p>{correctOpt?.refuerzoPedagogico}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: INSTITUCIONAL ================= */}
        {activeTab === 'institucional' && (
          <div className="space-y-10">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#39a900]/15 text-[#39a900] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#39a900]/30">
                <Building2 className="w-4 h-4" />
                <span>Apartado 4</span>
              </div>
              <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Contexto Institucional: Áreas y Cobertura Nacional
              </h2>
              <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                El SENA opera a lo largo y ancho de Colombia mediante redes de conocimiento especializadas y centros de formación que responden a las necesidades del sector productivo.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <BookMarked className="w-5 h-5 text-[#39a900]" />
                <span>Áreas de Conocimiento y Redes Sectoriales</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AREAS_CONOCIMIENTO.map((area, idx) => {
                  return (
                    <div key={idx} className={`rounded-3xl p-6 border shadow-xl space-y-4 flex flex-col justify-between ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                      <div className="space-y-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-[#172e17] text-[#39a900]' : 'bg-emerald-50 text-[#39a900]'}`}>
                          {area.icono === 'Laptop' && <Laptop className="w-5 h-5" />}
                          {area.icono === 'Sprout' && <Sprout className="w-5 h-5" />}
                          {area.icono === 'Wrench' && <Wrench className="w-5 h-5" />}
                          {area.icono === 'Briefcase' && <Briefcase className="w-5 h-5" />}
                          {area.icono === 'HeartPulse' && <HeartPulse className="w-5 h-5" />}
                        </div>
                        <h4 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{area.nombre}</h4>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{area.descripcion}</p>
                      </div>

                      <div className={`pt-3 border-t space-y-1.5 ${isDarkMode ? 'border-emerald-900/40' : 'border-emerald-100'}`}>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Programas Principales:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {area.ejemplosProgramas.map((prog, i) => (
                            <span key={i} className={`text-[11px] px-2.5 py-1 rounded-xl font-medium border ${isDarkMode ? 'bg-[#172e17] text-emerald-300 border-emerald-950' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
                              {prog}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`space-y-6 pt-6 border-t ${isDarkMode ? 'border-emerald-900/40' : 'border-emerald-100'}`}>
              <h3 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <MapPin className="w-5 h-5 text-[#39a900]" />
                <span>Cobertura en Regionales Principales</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REGIONALES_SENA.map((reg, idx) => (
                  <div key={idx} className={`rounded-3xl p-6 border shadow-xl space-y-2 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                    <h4 className="text-base font-bold text-[#39a900]">Regional {reg.region}</h4>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{reg.centros}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 5: DERECHOS ================= */}
        {activeTab === 'derechos' && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#39a900]/15 text-[#39a900] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#39a900]/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Apartado 5</span>
              </div>
              <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Derechos y Deberes Clave del Aprendiz SENA
              </h2>
              <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Conforme al Acuerdo 009 de 2024, ser aprendiz SENA implica un equilibrio entre las garantías institucionales para tu aprendizaje y tu compromiso ético.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Derechos */}
              <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 ${isDarkMode ? 'bg-[#102210] border-emerald-600/40' : 'bg-white border-emerald-300'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#39a900] text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-900/40">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Derechos Fundamentales</h3>
                    <p className="text-xs text-[#39a900] font-semibold">Garantías del Aprendiz (Cap. IV)</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {[
                    'Recibir inducción integral al iniciar el programa de formación.',
                    'Disfrutar de ambientes de aprendizaje adecuados, dotados y seguros.',
                    'Utilizar los servicios de bienestar al aprendiz (apoyos, salud, cultura).',
                    'Ser evaluado objetivamente y recibir retroalimentación oportuna de evidencias.',
                    'Hacer uso del debido proceso, derecho de defensa y contradicción.',
                    'Presentar solicitudes, peticiones y apelaciones respetuosas.'
                  ].map((der, i) => (
                    <li key={i} className={`text-xs sm:text-sm flex items-start gap-2.5 p-3.5 rounded-2xl border ${isDarkMode ? 'bg-[#172e17] border-emerald-950 text-slate-300' : 'bg-emerald-50/50 border-emerald-200 text-slate-700'}`}>
                      <span className="w-2 h-2 rounded-full bg-[#39a900] mt-1.5 shrink-0"></span>
                      <span>{der}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deberes */}
              <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${isDarkMode ? 'bg-[#172e17] text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Deberes Esenciales</h3>
                    <p className="text-xs text-slate-500 font-semibold">Responsabilidades del Aprendiz</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {[
                    'Cumplir puntualmente con las actividades presenciales o virtuales de la ruta.',
                    'Actuar con absoluta honestidad académica, evitando plagio o fraude.',
                    'Respetar la dignidad, opiniones y derechos de instructores y compañeros.',
                    'Cuidar y hacer uso responsable de los equipos y ambientes de formación.',
                    'Mantener actualizado su registro y datos de contacto en Sofia Plus.',
                    'Portar adecuadamente el carné y cumplir las normas de seguridad.'
                  ].map((deb, i) => (
                    <li key={i} className={`text-xs sm:text-sm flex items-start gap-2.5 p-3.5 rounded-2xl border ${isDarkMode ? 'bg-[#172e17] border-emerald-950 text-slate-300' : 'bg-emerald-50/50 border-emerald-200 text-slate-700'}`}>
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                      <span>{deb}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}





        {/* ================= TAB 8: CHECKLIST ================= */}
        {activeTab === 'checklist' && (
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#39a900]/15 text-[#39a900] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#39a900]/30">
                <CheckSquare className="w-4 h-4" />
                <span>Checklist de Inducción</span>
              </div>
              <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Lista de Verificación de Actividades del Aprendiz
              </h2>
              <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Marca cada tarea a medida que la completes. Tu progreso se guarda automáticamente para orientar tu proceso de inducción.
              </p>
            </div>

            {/* Progress Card */}
            <div className={`rounded-3xl p-6 border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 ${isDarkMode ? 'bg-[#102210] border-emerald-600/40' : 'bg-white border-emerald-300'}`}>
              <div className="space-y-1 text-center sm:text-left">
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Progreso General de Inducción</h3>
                <p className="text-xs text-slate-500">Completa todas las tareas para obtener tu certificación de inducción</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-[#39a900]">
                  {calculateChecklistProgress()}%
                </div>
                <div className="w-32 h-3 bg-emerald-950/40 rounded-full overflow-hidden border border-emerald-800">
                  <div className="h-full bg-[#39a900] transition-all duration-500 rounded-full" style={{ width: `${calculateChecklistProgress()}%` }}></div>
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="grid grid-cols-1 gap-4">
              {CHECKLIST_INDUCCION.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer flex items-center justify-between gap-4 shadow-sm ${
                      isChecked 
                        ? isDarkMode ? 'bg-[#172e17]/50 border-emerald-800/60 opacity-80' : 'bg-emerald-50/60 border-emerald-200' 
                        : isDarkMode ? 'bg-[#102210] border-emerald-900/40 hover:border-emerald-600' : 'bg-white border-emerald-100 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all ${
                        isChecked 
                          ? 'bg-[#39a900] border-[#39a900] text-white shadow-sm shadow-emerald-900/40' 
                          : isDarkMode ? 'bg-[#172e17] border-emerald-700' : 'bg-emerald-50 border-emerald-300'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#39a900]">{item.categoria}</span>
                        <h4 className={`text-sm sm:text-base font-bold ${isChecked ? 'line-through opacity-70' : ''} ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {item.tarea}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 10: PANEL DE ADMINISTRADOR ================= */}
        {activeTab === 'admin' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 bg-[#39a900]/15 text-[#39a900] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#39a900]/30">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Panel Institucional de Administración</span>
                </div>
                <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Repositorio de Respuestas & Analítica de Evaluaciones
                </h2>
                <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Monitorea el rendimiento de los aprendices, revisa tiempos de respuesta, puntajes y genera reportes analíticos del Acuerdo 009 de 2024.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quizRepository, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", `sena_quiz_repository_${Date.now()}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#39a900] hover:bg-[#329600] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar Repositorio (JSON)</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de vaciar todo el repositorio de respuestas? Esta acción no se puede deshacer.')) {
                      setQuizRepository([]);
                      localStorage.removeItem('sena_quiz_repository');
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${isDarkMode ? 'bg-rose-950/40 border-rose-800 text-rose-300 hover:bg-rose-900/50' : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'}`}
                >
                  Limpiar Repositorio
                </button>
              </div>
            </div>

            {/* Analytics KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`rounded-3xl p-6 border shadow-xl space-y-2 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Evaluados</span>
                  <div className="w-10 h-10 rounded-xl bg-[#39a900]/20 text-[#39a900] flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#39a900]">{quizRepository.length}</div>
                <p className="text-xs text-slate-500">Aprendices registrados en el sistema</p>
              </div>

              <div className={`rounded-3xl p-6 border shadow-xl space-y-2 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Promedio de Puntaje</span>
                  <div className="w-10 h-10 rounded-xl bg-[#39a900]/20 text-[#39a900] flex items-center justify-center font-bold">
                    <Trophy className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#39a900]">
                  {quizRepository.length > 0 ? (quizRepository.reduce((acc, curr) => acc + (curr.score / curr.total), 0) / quizRepository.length * 100).toFixed(1) : 0}%
                </div>
                <p className="text-xs text-slate-500">Acierto global en pruebas</p>
              </div>

              <div className={`rounded-3xl p-6 border shadow-xl space-y-2 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tiempo Promedio</span>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-amber-400">
                  {quizRepository.length > 0 ? Math.round(quizRepository.reduce((acc, curr) => acc + curr.elapsedSeconds, 0) / quizRepository.length) : 0}s
                </div>
                <p className="text-xs text-slate-500">Duración media por evaluación</p>
              </div>

              <div className={`rounded-3xl p-6 border shadow-xl space-y-2 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tasa de Aprobación</span>
                  <div className="w-10 h-10 rounded-xl bg-[#39a900]/20 text-[#39a900] flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#39a900]">
                  {quizRepository.length > 0 ? Math.round((quizRepository.filter(r => r.score === r.total).length / quizRepository.length) * 100) : 0}%
                </div>
                <p className="text-xs text-slate-500">Aprendices con puntaje perfecto</p>
              </div>
            </div>

            {/* Repository Table */}
            <div className={`rounded-3xl border shadow-xl overflow-hidden ${isDarkMode ? 'bg-[#102210] border-emerald-900/40' : 'bg-white border-emerald-100'}`}>
              <div className={`px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDarkMode ? 'bg-[#172e17] border-emerald-900/40 text-white' : 'bg-emerald-50 border-emerald-200 text-slate-900'}`}>
                <div>
                  <h3 className="text-base font-bold">Listado de Evaluaciones & Ranking</h3>
                  <p className="text-xs text-[#39a900] font-bold">Ordenados por mayor puntaje y menor tiempo de respuesta</p>
                </div>
                <span className="text-xs font-mono bg-[#39a900]/20 text-[#39a900] px-3 py-1 rounded-xl border border-[#39a900]/30 font-bold">
                  Total Registros: {quizRepository.length}
                </span>
              </div>

              {quizRepository.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
                  <h4 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No hay evaluaciones registradas aún</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Cuando los aprendices completen la prueba interactiva de derechos y deberes, sus datos, puntajes y tiempos aparecerán automáticamente aquí.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? 'border-emerald-900/60 bg-[#172e17]/50 text-emerald-300' : 'border-emerald-200 bg-emerald-50/50 text-emerald-900'}`}>
                        <th className="p-4 font-bold"># Ranking</th>
                        <th className="p-4 font-bold">Aprendiz</th>
                        <th className="p-4 font-bold">Documento & Email</th>
                        <th className="p-4 font-bold">Programa</th>
                        <th className="p-4 font-bold">Puntaje</th>
                        <th className="p-4 font-bold">Tiempo</th>
                        <th className="p-4 font-bold">Fecha</th>
                        <th className="p-4 font-bold text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-emerald-950 text-slate-300' : 'divide-emerald-100 text-slate-700'}`}>
                      {quizRepository.map((item, index) => (
                        <tr key={item.id || index} className={`transition-colors ${isDarkMode ? 'hover:bg-[#172e17]/30' : 'hover:bg-emerald-50/30'}`}>
                          <td className="p-4 font-bold font-mono">
                            <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs ${
                              index === 0 ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 
                              index === 1 ? 'bg-slate-300 text-slate-950 font-black' : 
                              index === 2 ? 'bg-amber-700 text-white font-black' : 
                              isDarkMode ? 'bg-[#172e17] text-emerald-300 border border-emerald-900' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              #{index + 1}
                            </span>
                          </td>
                          <td className="p-4 font-bold">{item.nombre}</td>
                          <td className="p-4">
                            <div className="font-mono text-xs">{item.documento}</div>
                            <div className="text-slate-500 text-[11px]">{item.email}</div>
                          </td>
                          <td className="p-4 text-xs max-w-xs truncate">{item.programa}</td>
                          <td className="p-4 font-bold font-mono text-[#39a900]">
                            {item.score} / {item.total}
                          </td>
                          <td className="p-4 font-mono font-bold text-amber-400">
                            ⏱️ {item.elapsedSeconds}s
                          </td>
                          <td className="p-4 text-slate-500 font-mono text-xs">{item.date}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => {
                                const updated = quizRepository.filter((_, i) => i !== index);
                                setQuizRepository(updated);
                                localStorage.setItem('sena_quiz_repository', JSON.stringify(updated));
                              }}
                              title="Eliminar registro"
                              className={`p-2 rounded-xl transition-all cursor-pointer ${isDarkMode ? 'text-rose-400 hover:bg-rose-950/50' : 'text-rose-600 hover:bg-rose-100'}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-md w-full rounded-3xl p-8 border shadow-2xl space-y-6 text-center ${isDarkMode ? 'bg-[#102210] border-emerald-500' : 'bg-white border-emerald-300'}`}>
            <div className="w-16 h-16 rounded-3xl bg-[#39a900] text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-900/50">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>¡Felicitaciones, Aprendiz!</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Has completado con éxito el 100% de tu ruta de inducción y el estudio del Acuerdo 009 de 2024. Estás preparado para triunfar en tu Formación Profesional Integral SENA.
              </p>
            </div>

            <button
              onClick={() => setShowCompletionModal(false)}
              className="w-full bg-[#39a900] hover:bg-[#329600] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/40 cursor-pointer"
            >
              Cerrar y Continuar
            </button>
          </div>
        </div>
      )}

      {/* Quiz Success Celebration Modal with Images */}
      {showQuizCelebration && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`max-w-lg w-full rounded-3xl overflow-hidden border shadow-2xl space-y-6 ${isDarkMode ? 'bg-[#102210] border-emerald-500' : 'bg-white border-emerald-300'}`}>
            <div className="w-full h-48 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80" 
                alt="Festejo y celebración" 
                className="w-full h-full object-cover animate-pulse"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex items-end p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#39a900] text-white flex items-center justify-center font-bold shadow-lg">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">¡Prueba Superada con Éxito!</h3>
                    <p className="text-xs text-[#39a900] font-bold">Derechos y Deberes del Aprendiz SENA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-4 text-center">
              <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                ¡Excelente trabajo! Has respondido satisfactoriamente todas las preguntas de la prueba de conocimientos sobre el Acuerdo 009 de 2024. Demuestras un dominio excepcional de tus derechos y deberes fundamentales como aprendiz SENA.
              </p>

              <button
                onClick={() => setShowQuizCelebration(false)}
                className="w-full bg-[#39a900] hover:bg-[#329600] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/40 cursor-pointer"
              >
                Continuar con el Proceso Formativo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar JSON Modal */}
      {showCalendarJsonModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-2xl w-full rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-[#102210] border-emerald-500 text-slate-100' : 'bg-white border-emerald-300 text-slate-900'}`}>
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Calendario Académico SENA</h3>
                  <p className="text-xs text-amber-400 font-bold">Resolución 1-01190 de 2026</p>
                </div>
              </div>
              <button
                onClick={() => setShowCalendarJsonModal(false)}
                className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-emerald-900/50 text-slate-300' : 'hover:bg-emerald-100 text-slate-700'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Visualización de datos oficiales institucionales estructurados en formato JSON.
              </div>
              <button
                onClick={() => setShowRawJson(!showRawJson)}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold px-3 py-1.5 rounded-xl text-xs border border-emerald-500/40 transition-all cursor-pointer"
              >
                {showRawJson ? 'Ver Vista Formateada' : 'Ver Código JSON Bruto'}
              </button>
            </div>

            {showRawJson ? (
              <pre className={`p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-96 ${isDarkMode ? 'bg-[#0a140a] text-emerald-300 border border-emerald-900' : 'bg-slate-900 text-emerald-300'}`}>
                {JSON.stringify(CALENDARIO_ACADEMICO_RESOLUCION_1190_JSON, null, 2)}
              </pre>
            ) : (
              <div className="space-y-6 text-xs">
                <div className={`p-4 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-[#172e17] border-emerald-900' : 'bg-emerald-50 border-emerald-200'}`}>
                  <div className="font-bold text-amber-400 uppercase">Objeto de la Resolución:</div>
                  <p>{CALENDARIO_ACADEMICO_RESOLUCION_1190_JSON.objeto}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-sm uppercase tracking-wide text-[#39a900]">Trimestralización 2026</h4>
                  <div className="space-y-2">
                    {CALENDARIO_ACADEMICO_RESOLUCION_1190_JSON.trimestralizacion.map((item, idx) => (
                      <div key={idx} className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${isDarkMode ? 'bg-[#172e17]/50 border-emerald-950' : 'bg-emerald-50/40 border-emerald-100'}`}>
                        <span className="font-bold">{item.actividad}</span>
                        <span className="font-mono text-amber-400 text-[11px]">{item.fechas}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-sm uppercase tracking-wide text-[#39a900]">Actividades de Formación y Jornada Laboral</h4>
                  <p className="font-bold">{CALENDARIO_ACADEMICO_RESOLUCION_1190_JSON.actividadesFormacionJornadaLaboral.totalDias}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CALENDARIO_ACADEMICO_RESOLUCION_1190_JSON.actividadesFormacionJornadaLaboral.distribucion.map((dist, idx) => (
                      <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-[#172e17]/50 border-emerald-950' : 'bg-emerald-50/40 border-emerald-100'}`}>
                        <span>{dist.trimestre}</span>
                        <span className="font-mono text-amber-400 font-bold">{dist.dias}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 italic">*{CALENDARIO_ACADEMICO_RESOLUCION_1190_JSON.actividadesFormacionJornadaLaboral.paragrafo1}</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowCalendarJsonModal(false)}
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Cerrar Ventana
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`border-t py-8 mt-16 transition-colors duration-300 ${isDarkMode ? 'bg-[#102210] border-emerald-900/40 text-slate-400' : 'bg-emerald-50/50 border-emerald-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#39a900] text-white flex items-center justify-center font-black text-xs">S</div>
            <span className="font-bold">SENA 360° — Servicio Nacional de Aprendizaje</span>
          </div>
          <p>© 2026 Inducción Institucional & Acuerdo 009 de 2024. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}
