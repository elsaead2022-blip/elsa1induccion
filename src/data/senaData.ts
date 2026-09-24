export interface PerfilIngreso {
  id: string;
  titulo: string;
  icono: string;
  descripcion: string;
  necesidades: string[];
  rutaSugerida: string;
}

export interface NormativaAcuerdo {
  capitulo: string;
  titulo: string;
  articulos: string;
  resumen: string;
  detalles: string[];
  imagen?: string;
}

export interface AreaConocimiento {
  nombre: string;
  descripcion: string;
  ejemplosProgramas: string[];
  icono: string;
}

export interface CasoSimulacion {
  id: number;
  situacion: string;
  opciones: {
    texto: string;
    esCorrecta: boolean;
    explicacion: string;
  }[];
}

export const PERFILES_INGRESO: PerfilIngreso[] = [
  {
    id: 'nuevo',
    titulo: 'Aspirante Nuevo / Primer Ingreso',
    icono: 'UserPlus',
    descripcion: 'Aprendices que ingresan por primera vez a un programa de formación titulada (Técnico o Tecnólogo) en modalidad presencial o virtual.',
    necesidades: [
      'Familiarizarse con el modelo pedagógico de Formación Profesional Integral (FPI).',
      'Aprender a manejar la plataforma Sofia Plus, LMS (Territorium/LMS SENA) y correo institucional.',
      'Comprender los canales de comunicación y bienestar al aprendiz.'
    ],
    rutaSugerida: 'Completar 100% de la Inducción institucional, configurar credenciales y participar en los encuentros sincrónicos/presenciales.'
  },
  {
    id: 'reingreso',
    titulo: 'Aprendiz en Reingreso',
    icono: 'RefreshCw',
    descripcion: 'Aprendices que suspendieron su formación temporalmente y solicitan su reingreso para culminar el programa bajo el Acuerdo 009 de 2024.',
    necesidades: [
      'Revisar vigencia del programa y diseño curricular actualizado.',
      'Verificar estado de novedades académicas (aplazamientos, traslados previos).',
      'Actualización en herramientas tecnológicas y normatividad vigente.'
    ],
    rutaSugerida: 'Radicar solicitud formal de reingreso por Sofia Plus/Coordinación Académica y verificar homologación de resultados de aprendizaje previos.'
  },
  {
    id: 'traslado',
    titulo: 'Aprendiz con Traslado de Centro / Regional',
    icono: 'MapPin',
    descripcion: 'Aprendices que solicitan cambio de centro de formación o jornada manteniendo el mismo programa o afín.',
    necesidades: [
      'Verificar cupo disponible en el centro receptor.',
      'Certificar paz y salvo académico y disciplinario en el centro de origen.',
      'Homologación de competencias ya aprobadas.'
    ],
    rutaSugerida: 'Cumplir los requisitos del Art. del Acuerdo 009 sobre traslados y realizar trámite ante coordinación académica.'
  },
  {
    id: 'retiro',
    titulo: 'Aprendiz con Retiro / Cancelación Previa',
    icono: 'RotateCcw',
    descripcion: 'Aprendices que tuvieron cancelación o retiro voluntario y desean postularse nuevamente a convocatorias del SENA.',
    necesidades: [
      'Verificar tiempos de inhabilidad (si aplica según la causa de retiro anterior).',
      'Inscripción en nueva convocatoria mediante Sofia Plus.',
      'Revisar antecedentes en el sistema institucional.'
    ],
    rutaSugerida: 'Consultar estado de sanción/inhabilidad en el centro anterior y participar en convocatoria regular.'
  }
];

export const NORMATIVA_ACUERDO_009: NormativaAcuerdo[] = [
  {
    capitulo: 'Capítulo IV (Parte 1)',
    titulo: 'Derechos Fundamentales del Aprendiz SENA',
    articulos: 'Art. 16 - 18',
    resumen: 'Prerrogativas, garantías y beneficios institucionales que asisten a todo aprendiz durante sus etapas lectiva y productiva para asegurar una formación de alta calidad.',
    detalles: [
      'Recibir inducción integral, materiales de formación y ambientes seguros y dotados.',
      'Disfrutar de los programas de bienestar al aprendiz, estímulos e incentivos.',
      'Utilizar los canales de representación democrática y expresar libremente sus opiniones con respeto.',
      'Recibir los elementos de protección personal (EPP) requeridos para talleres y laboratorios.'
    ],
    imagen: '/sena_aprendices.jpg'
  },
  {
    capitulo: 'Capítulo IV (Parte 2)',
    titulo: 'Deberes Éticos y Académicos del Aprendiz',
    articulos: 'Art. 19 - 22',
    resumen: 'Compromisos de conducta, responsabilidad académica y respeto mutuo que cada aprendiz asume al matricularse en el SENA.',
    detalles: [
      'Cumplir puntualmente con las actividades presenciales o virtuales programadas en la ruta de aprendizaje.',
      'Actuar con absoluta honestidad académica, evitando el plagio y presentando evidencias propias.',
      'Cuidar y preservar los bienes, equipos, herramientas e instalaciones de la institución.',
      'Portar siempre el carné institucional en lugar visible y observar las normas de convivencia.'
    ],
    imagen: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80'
  },
  {
    capitulo: 'Capítulo V',
    titulo: 'Prohibiciones en la Actividad Formativa',
    articulos: 'Art. 23 - 28',
    resumen: 'Conductas y acciones prohibidas dentro de la comunidad educativa para garantizar la seguridad, la ética y el buen desarrollo de la formación.',
    detalles: [
      'Realizar fraude, falsificación o plagio en evaluaciones, trabajos o proyectos formativos.',
      'Ingresar, comercializar o consumir sustancias psicoactivas o bebidas embriagantes en los centros.',
      'Dañar intencionalmente equipos, material didáctico o infraestructura institucional.',
      'Realizar actos de acoso, matoneo o discriminación hacia compañeros, instructores o personal administrativo.'
    ],
    imagen: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80'
  },
  {
    capitulo: 'Capítulo VII',
    titulo: 'Estímulos e Incentivos al Mérito',
    articulos: 'Art. 40 - 48',
    resumen: 'Reconocimientos públicos y beneficios que otorga el SENA a los aprendices destacados por su rendimiento académico, liderazgo o innovación.',
    detalles: [
      'Designación como monitor en programas de formación para apoyar laboratorios y asesorías.',
      'Menciones de honor y reconocimiento público por excelencia académica o deportiva.',
      'Participación en semilleros de investigación (SENNOVA) y misiones tecnológicas.',
      'Representación del SENA en concursos de habilidades técnicas nacionales e internacionales (WorldSkills).'
    ],
    imagen: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80'
  },
  {
    capitulo: 'Capítulo IX al XI',
    titulo: 'El Debido Proceso y Garantías Disciplinarias',
    articulos: 'Art. 49 - 68',
    resumen: 'Procedimiento democrático y transparente que garantiza la defensa del aprendiz ante cualquier presunta falta disciplinaria o académica.',
    detalles: [
      'Garantía absoluta del derecho de defensa, contradicción y presunción de inocencia.',
      'Gradualidad de las medidas formativas y sancionatorias según la gravedad de la falta.',
      'Convocatoria y participación en las sesiones del Comité de Evaluación y Seguimiento.',
      'Instancias de apelación y revisión de las decisiones ante la Dirección del Centro.'
    ],
    imagen: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80'
  }
];

export const AREAS_CONOCIMIENTO: AreaConocimiento[] = [
  {
    nombre: 'Tecnologías de la Información y las Comunicaciones (TIC)',
    descripcion: 'Programas enfocados en desarrollo de software, análisis de datos, redes, ciberseguridad y multimedia.',
    ejemplosProgramas: ['Análisis y Desarrollo de Software (ADSO)', 'Multimedia y Web', 'Gestión de Redes de Datos'],
    icono: 'Laptop'
  },
  {
    nombre: 'Sector Agropecuario y Biotecnología',
    descripcion: 'Innovación en producción agrícola, pecuaria, procesamiento de alimentos y gestión ambiental.',
    ejemplosProgramas: ['Producción Agropecuaria Ecológica', 'Gestión de Empresas Agropecuarias', 'Control de Calidad de Alimentos'],
    icono: 'Sprout'
  },
  {
    nombre: 'Industria, Manufactura y Mantenimiento',
    descripcion: 'Automatización industrial, mecánica, diseño, confección y construcción sostenible.',
    ejemplosProgramas: ['Mantenimiento Mecatrónico', 'Diseño de Modas', 'Gestión de la Producción Industrial'],
    icono: 'Wrench'
  },
  {
    nombre: 'Comercio, Servicios y Gestión Empresarial',
    descripcion: 'Administración, contabilidad, mercadeo, logística internacional y gestión del talento humano.',
    ejemplosProgramas: ['Gestión Logística', 'Gestión del Talento Humano', 'Contabilidad y Finanzas'],
    icono: 'Briefcase'
  },
  {
    nombre: 'Salud, Bienestar y Servicios Personales',
    descripcion: 'Atención a la primera infancia, enfermería, estética, cosmetología y actividad física.',
    ejemplosProgramas: ['Enfermería', 'Atención Integral a la Primera Infancia', 'Cosmetología y Estética Integral'],
    icono: 'HeartPulse'
  }
];

export const REGIONALES_SENA = [
  { region: 'Distrito Capital', centros: 'Centros de Biotecnología, Electricidad, Materiales, Servicios Financieros, Diseño y Metrología (más de 16 centros).' },
  { region: 'Antioquia', centros: 'Centro de Tecnología de Manufactura Avanzada, Comercio, Textil, Agropecuario (Medellín, Rionegro, Urabá).' },
  { region: 'Valle del Cauca', centros: 'Centro de la Construcción, Electricidad y Automatización Industrial, Náutico Pesquero (Cali, Tuluá, Buga).' },
  { region: 'Cundinamarca', centros: 'Centro de Desarrollo Agroempresarial (Chía), Centro Agroindustrial (Mosquera), Villeta, Fusagasugá.' },
  { region: 'Atlántico', centros: 'Centro Nacional de Aprendizaje Industrial (CNAI), Comercio y Servicios, Minero (Barranquilla).' },
  { region: 'Santander', centros: 'Centro de Atención al Sector Agropecuario, Industrial y del Diseño (Bucaramanga, Floridablanca, Barrancabermeja).' }
];

export const CASOS_SIMULACION: CasoSimulacion[] = [
  {
    id: 1,
    situacion: 'Un aprendiz de tecnología no pudo asistir a dos sesiones consecutivas de su instructor técnico por quebrantos de salud, pero olvidó reportar la excusa médica en los primeros 3 días hábiles establecidos.',
    opciones: [
      {
        texto: 'A. El aprendiz pierde automáticamente la competencia sin derecho a reclamar.',
        esCorrecta: false,
        explicacion: 'Incorrecto. El Acuerdo 009 de 2024 contempla el derecho a justificar inasistencias presentando soportes válidos, aunque se debe notificar oportunamente; el instructor evaluará el plan de mejoramiento.'
      },
      {
        texto: 'B. El aprendiz debe presentar su excusa médica con el soporte correspondiente ante coordinación y su instructor para gestionar la justificación y recibir las evidencias pendientes.',
        esCorrecta: true,
        explicacion: '¡Correcto! El debido proceso y el reglamento permiten justificar inasistencias por fuerza mayor o salud, acordando actividades de recuperación.'
      },
      {
        texto: 'C. Como pasaron 3 días, la inasistencia se convierte en falta disciplinaria grave inmediata.',
        esCorrecta: false,
        explicacion: 'Incorrecto. La inasistencia injustificada reiterada genera llamados de atención, pero siempre mediando el debido proceso y la oportunidad de defensa.'
      }
    ]
  },
  {
    id: 2,
    situacion: 'Durante una evaluación práctica en ambientes de formación, un aprendiz utiliza el celular para buscar respuestas en internet sin autorización del instructor.',
    opciones: [
      {
        texto: 'A. El instructor expulsa definitivamente al aprendiz del SENA de forma inmediata.',
        esCorrecta: false,
        explicacion: 'Incorrecto. Ningún instructor puede tomar decisiones de expulsión sin agotar el debido proceso y el Comité de Evaluación y Seguimiento.'
      },
      {
        texto: 'B. El instructor le decomisa el teléfono permanentemente y anula su programa de formación.',
        esCorrecta: false,
        explicacion: 'Incorrecto. El SENA no confisca bienes personales de forma permanente ni cancela matrículas sin el procedimiento normativo del Acuerdo 009.'
      },
      {
        texto: 'C. Se tipifica presuntamente como fraude académico o falta disciplinaria según el Acuerdo 009 de 2024, dando lugar a un reporte formal y plan de mejoramiento o comité según corresponda.',
        esCorrecta: true,
        explicacion: '¡Correcto! El fraude académico es tratado con rigor bajo el reglamento, requiriendo el registro del hecho y la evaluación en el comité correspondiente.'
      }
    ]
  },
  {
    id: 3,
    situacion: 'Un aprendiz culminó satisfactoriamente su etapa lectiva y desea iniciar su etapa productiva mediante contrato de aprendizaje en una empresa aliada.',
    opciones: [
      {
        texto: 'A. Debe esperar a que el SENA le asigne obligatoriamente la empresa sin su consentimiento.',
        esCorrecta: false,
        explicacion: 'Incorrecto. El aprendiz tiene autonomía para postularse a ofertas de contrato de aprendizaje o utilizar las alternativas reguladas (pasantía, proyecto productivo, monitoria, etc.).'
      },
      {
        texto: 'B. Puede postularse a través del sistema de gestión, agencia pública de empleo o conseguir el contrato directamente, cumpliendo con las alternativas de etapa productiva del Acuerdo 009.',
        esCorrecta: true,
        explicacion: '¡Correcto! El Acuerdo 009 de 2024 contempla diversas alternativas válidas para la etapa productiva (contrato de aprendizaje, pasantía, proyecto productivo, vínculo laboral, monitoria).'
      },
      {
        texto: 'C. El contrato de aprendizaje es opcional y puede omitirse sin realizar ninguna otra alternativa.',
        esCorrecta: false,
        explicacion: 'Incorrecto. La etapa productiva es un requisito obligatorio y curricular para obtener el título en el SENA.'
      }
    ]
  }
];

export const CHECKLIST_INDUCCION = [
  { id: 'c1', tarea: 'Conocer el Modelo Pedagógico de Formación Profesional Integral (FPI)', categoria: 'Institucional' },
  { id: 'c2', tarea: 'Actualizar mis datos y verificar perfil en el aplicativo Sofia Plus', categoria: 'Tecnología' },
  { id: 'c3', tarea: 'Explorar la plataforma LMS / Territorium y conocer los ambientes virtuales de aprendizaje', categoria: 'Tecnología' },
  { id: 'c4', tarea: 'Leer y comprender los puntos clave del Acuerdo 009 de 2024 (Reglamento del Aprendiz)', categoria: 'Normativa' },
  { id: 'c5', tarea: 'Identificar a mi Instructor Líder, Coordinador Académico y canales de Bienestar al Aprendiz', categoria: 'Bienestar' },
  { id: 'c6', tarea: 'Conocer las alternativas para el desarrollo de la Etapa Productiva', categoria: 'Académica' }
];
