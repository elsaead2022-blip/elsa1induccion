export interface AcuerdoCapitulo {
  id: string;
  capitulo: string;
  titulo: string;
  articulos: string;
  tipo: 'derecho' | 'deber' | 'prohibicion' | 'estatuto';
  resumen: string;
  detalles: string[];
  imagen: string;
}

export interface QuizPregunta {
  id: number;
  pregunta: string;
  categoria: string;
  opciones: {
    id: string;
    texto: string;
    esCorrecta: boolean;
    refuerzoPedagogico: string;
  }[];
}

export const ACUERDO_009_JSON = {
  documento: "Acuerdo 009 de 2024",
  entidad: "Servicio Nacional de Aprendizaje - SENA",
  descripcion: "Reglamento del Aprendiz SENA",
  capitulos: [
    {
      id: "cap-4-derechos",
      capitulo: "Capítulo IV - Parte 1",
      titulo: "Derechos Fundamentales del Aprendiz",
      articulos: "Artículos 16 a 18",
      tipo: "derecho",
      resumen: "Prerrogativas, garantías y beneficios institucionales que aseguran una Formación Profesional Integral de alta calidad.",
      detalles: [
        "Recibir inducción integral, materiales de formación y ambientes seguros y dotados.",
        "Disfrutar de programas de bienestar al aprendiz, estímulos e incentivos.",
        "Utilizar canales de representación democrática y expresar libremente opiniones con respeto.",
        "Recibir elementos de protección personal (EPP) requeridos para talleres y laboratorios."
      ],
      imagen: "/sena_aprendices.jpg"
    },
    {
      id: "cap-4-deberes",
      capitulo: "Capítulo IV - Parte 2",
      titulo: "Deberes Éticos y Académicos",
      articulos: "Artículos 19 a 22",
      tipo: "deber",
      resumen: "Compromisos de conducta, responsabilidad académica y respeto mutuo que el aprendiz asume al matricularse.",
      detalles: [
        "Cumplir puntualmente con las actividades presenciales y virtuales programadas.",
        "Actuar con absoluta honestidad académica, evitando plagio y presentando evidencias propias.",
        "Cuidar y preservar los bienes, equipos, herramientas e instalaciones de la institución.",
        "Portar siempre el carné institucional en lugar visible y observar las normas de convivencia."
      ],
      imagen: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "cap-5-prohibiciones",
      capitulo: "Capítulo V",
      titulo: "Prohibiciones en la Actividad Formativa",
      articulos: "Artículos 23 a 28",
      tipo: "prohibicion",
      resumen: "Conductas y acciones prohibidas para garantizar la seguridad, la ética y el buen desarrollo de la formación.",
      detalles: [
        "Realizar fraude, falsificación o plagio en evaluaciones, trabajos o proyectos formativos.",
        "Ingresar, comercializar o consumir sustancias psicoactivas o bebidas embriagantes en los centros.",
        "Dañar intencionalmente equipos, material didáctico o infraestructura institucional.",
        "Realizar actos de acoso, matoneo o discriminación hacia compañeros o instructores."
      ],
      imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80"
    }
  ]
};

export const QUIZ_DERECHOS_DEBERES: QuizPregunta[] = [
  {
    id: 1,
    categoria: "Derechos del Aprendiz",
    pregunta: "Durante tu etapa lectiva, ¿cuál de los siguientes es un derecho fundamental garantizado por el Acuerdo 009 de 2024?",
    opciones: [
      {
        id: "A",
        texto: "Exigir que la institución le provea un computador personal de alta gama para uso exclusivo en casa.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: El SENA provee ambientes de formación dotados y materiales institucionales, pero la dotación de equipos personales de cómputo en casa no constituye un derecho obligatorio del reglamento."
      },
      {
        id: "B",
        texto: "Recibir inducción integral, materiales de formación y participar de los programas de bienestar al aprendiz.",
        esCorrecta: true,
        refuerzoPedagogico: "¡Correcto! El Art. 16 y 17 garantizan inducción, bienestar y ambientes seguros."
      },
      {
        id: "C",
        texto: "Elegir qué instructores dictan las clases y modificar unilateralmente el horario del programa.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: La asignación de instructores y horarios corresponde a la planeación académica institucional, no a decisiones unilaterales del aprendiz."
      }
    ]
  },
  {
    id: 2,
    categoria: "Deberes del Aprendiz",
    pregunta: "En relación con la honestidad académica y la presentación de evidencias de aprendizaje, el Acuerdo 009 establece que:",
    opciones: [
      {
        id: "A",
        texto: "Se pueden utilizar trabajos de internet siempre y cuando se cambien algunas palabras sin citar la fuente.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: Esto constituye plagio y falta académica grave según el reglamento. Las evidencias deben ser propias y originales."
      },
      {
        id: "B",
        texto: "El aprendiz debe actuar con absoluta honestidad académica, presentando evidencias propias y evitando cualquier forma de plagio o fraude.",
        esCorrecta: true,
        refuerzoPedagogico: "¡Excelente! La honestidad y el respeto por la autoría intelectual son deberes éticos fundamentales del aprendiz SENA."
      },
      {
        id: "C",
        texto: "El plagio solo es sancionable si ocurre en la evaluación final, durante las guías de aprendizaje está permitido.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: El deber de honestidad académica aplica de forma permanente en todas las evidencias, talleres y evaluaciones del proceso formativo."
      }
    ]
  },
  {
    id: 3,
    categoria: "Deberes de Convivencia",
    pregunta: "¿Qué compromiso asume el aprendiz al ingresar a los ambientes de formación y utilizar los equipos del SENA?",
    opciones: [
      {
        id: "A",
        texto: "Cuidar y preservar los bienes, equipos, herramientas e instalaciones institucionales, reportando cualquier novedad.",
        esCorrecta: true,
        refuerzoPedagogico: "¡Muy bien! El cuidado del patrimonio y la infraestructura SENA es un deber ciudadano y reglamentario ineludible."
      },
      {
        id: "B",
        texto: "Instalar software personal de videojuegos en los equipos del laboratorio para uso recreativo en descansos.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: Está prohibido modificar la configuración de los equipos institucionales o darles uso diferente al estrictamente académico y formativo."
      },
      {
        id: "C",
        texto: "Retirar herramientas del taller para uso personal en proyectos particulares fuera de la institución.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: Extraer bienes o herramientas de los centros de formación sin autorización constituye una falta grave contra los bienes institucionales."
      }
    ]
  },
  {
    id: 4,
    categoria: "Prohibiciones Académicas",
    pregunta: "De acuerdo con el Capítulo V sobre prohibiciones, ¿cuál de las siguientes conductas se considera una falta grave?",
    opciones: [
      {
        id: "A",
        texto: "Participar en actividades de representación estudiantil organizadas por el centro.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: La representación estudiantil es un derecho democrático fomentado por la institución."
      },
      {
        id: "B",
        texto: "Realizar fraude, falsificación o suplantación en evaluaciones, trabajos o proyectos de formación.",
        esCorrecta: true,
        refuerzoPedagogico: "¡Correcto! Suplantar o falsificar documentos y evidencias constituye una falta gravísima en el reglamento."
      },
      {
        id: "C",
        texto: "Asistir a las sesiones de formación con ropa de calle en lugar de uniforme de taller (cuando aplique).",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: Aunque hay pautas de presentación, la falsificación y el fraude son las faltas disciplinarias y académicas más graves."
      }
    ]
  },
  {
    id: 5,
    categoria: "Debido Proceso",
    pregunta: "Ante presuntas faltas disciplinarias o académicas, el reglamento del aprendiz garantiza:",
    opciones: [
      {
        id: "A",
        texto: "La expulsión inmediata sin previo aviso ni oportunidad de descargos por parte del comité.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: El SENA garantiza siempre el derecho a la defensa y el debido proceso antes de cualquier medida sancionatoria."
      },
      {
        id: "B",
        texto: "El debido proceso, el derecho a la defensa, presentar descargos y ser escuchado por el Comité de Evaluación y Seguimiento.",
        esCorrecta: true,
        refuerzoPedagogico: "¡Excelente! Ningún aprendiz puede ser sancionado sin que se le garantice el debido proceso y su derecho a ser oído."
      },
      {
        id: "C",
        texto: "Que el instructor del área tome decisiones definitivas y inapelables de manera unipersonal.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: Las decisiones disciplinarias se toman de manera colegiada a través del Comité de Evaluación y Seguimiento, siguiendo el debido proceso."
      }
    ]
  },
  {
    id: 6,
    categoria: "Estímulos e Incentivos",
    pregunta: "Según el Acuerdo 009 de 2024, los aprendices pueden postularse o recibir estímulos e incentivos cuando:",
    opciones: [
      {
        id: "A",
        texto: "Destacan por su rendimiento académico, liderazgo, proyectos de innovación o participación destacada en bienestar.",
        esCorrecta: true,
        refuerzoPedagogico: "¡Muy bien! El SENA premia el mérito académico, la investigación y el liderazgo institucional."
      },
      {
        id: "B",
        texto: "Solicitan la exoneración total de asistencia a las actividades lectivas durante el trimestre.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: La asistencia a las actividades de formación es un deber obligatorio y no puede ser exonerada como incentivo."
      },
      {
        id: "C",
        texto: "Presentan excusas médicas por más del 50% de inasistencias injustificadas.",
        esCorrecta: false,
        refuerzoPedagogico: "Refuerzo: Las excusas médicas justificaninasistencias pero no constituyen estímulos al rendimiento o la excelencia."
      }
    ]
  }
];
