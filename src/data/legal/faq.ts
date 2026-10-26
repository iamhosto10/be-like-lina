import type { FaqItem } from "@/types";

/** Preguntas frecuentes — copiadas de belikelina.com/elements/accordions. */
export const faqPage = {
  slug: "preguntas-frecuentes",
  title: "Preguntas frecuentes",
  description:
    "Respuestas sobre envíos a todo Colombia, tiempos de entrega, pagos seguros, productos y servicios de Be Like Lina.",
};

export const faqItems: FaqItem[] = [
  {
    question: "¿Ofrecen servicios a todo el país?",
    answer: [
      {
        type: "p",
        text: "Sí, realizamos envíos a todas las regiones de Colombia. Trabajamos con varias empresas de logística para asegurarnos de que tu pedido llegue de manera rápida y segura, sin importar tu ubicación.",
      },
    ],
  },
  {
    question: "¿Cúanto tarda el envío en llegar?",
    answer: [
      {
        type: "p",
        text: "El tiempo de entrega depende de tu ubicación. Para las principales ciudades, el tiempo estimado es de 1 a 3 días hábiles, mientras que para zonas rurales puede tardar entre 3 y 5 días hábiles.",
      },
    ],
  },
  {
    question: "¿Cómo se que mi compra es segura en su web?",
    answer: [
      {
        type: "p",
        text: "Trabajamos con pasarelas de pago certificadas y seguras, que garantizan la confidencialidad de tu información, la cual incluye ePayco.",
      },
    ],
  },
  {
    question: "¿Qué tipo de productos ofrece Belikelina?",
    answer: [
      {
        type: "ul",
        items: [
          "**Proteína Shaker:** Nuestra proteína es aislada de suero, tiene los aminoácidos (BCAAS), esenciales como (Leucina, Valina, Isoleucina), Prebióticos.",
          "**Pre Entreno:** Nuestro Pre entreno es de frutos silvestres: Guaraná, Maca, Borojó y Chontaduro.",
          "**Stevia:** Nuestra Stevia es totalmente orgánica: hoja (Stevia) y agua.",
          "**Ropa Deportiva:** Nuestros sets deportivos fue diseñado pensando en realizar la belleza de la mujer con características específicas: Presión de abdomen, Levantamiento de glúteos.",
          "**Santtina:** Es un potente antioxidante que cuenta con múltiples beneficios, Salud de la piel, Cardiovascular, Resistencia muscular, Función inmune, Salud cerebral, Salud gástrica, Agudeza visual, Salud ocular.",
          "**Guía de Alimentación Saludable:** Estructurada en los Macronutrientes y Micronutrientes que nuestro cuerpo necesita para el buen funcionamiento.",
          "**Recetario de Batidos Orgánicos Con Función:** Cuenta con 5 batidos estandarizados para mejorar la función del cuerpo.",
        ],
      },
      {
        type: "ul",
        items: ["Desinflamatorio", "Ditox", "Antioxidantes", "Hidratante", "Aloe Vera"],
      },
    ],
  },
  {
    question: "¿Qué tipo de servicios ofrece Belikelina?",
    answer: [
      { type: "p", text: "**Planes Nutricionales:** Totalmente personalizado, consta de:" },
      {
        type: "ul",
        items: [
          "Valoración Corporal",
          "Plan de Alimentación Personalizado",
          "Guía de Entrenamiento",
        ],
      },
      {
        type: "p",
        text: "**Programa de Entrenamiento:** Entrenamiento estructurado que ayuda a mejorar la condición del cuerpo basado en las características físicas de cada persona teniendo en cuenta los objetivos específicos y su seguimiento.",
      },
    ],
  },
  {
    question: "¿Métodos de pago? Contraentrega?",
    answer: [
      { type: "p", text: "Contamos con todos los métodos de pago:" },
      {
        type: "ul",
        items: ["Tarjetas de crédito o débito (PSE) por medio de la tienda online. ePayco."],
      },
    ],
  },
];
