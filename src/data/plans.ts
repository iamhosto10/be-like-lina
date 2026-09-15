import type { Plan } from "@/types";

/** Los dos servicios reales de coaching (precios en COP, pago único). */
export const plans: Plan[] = [
  {
    slug: "plan-nutricional",
    name: "Plan Nutricional",
    tagline: "Plan de alimentación personalizado, hecho para tu cuerpo y tus metas.",
    price: 350000,
    priceNote: "pago único",
    features: [
      "Valoración corporal",
      "Plan de alimentación personalizado",
      "Guía de nutrición",
      "Guía de suplementación",
      "Guía de entrenamiento",
    ],
    icon: "apple",
    iconTone: "pink",
    whatsappMessage: "Hola Lina, quiero información sobre el Plan Nutricional ($350.000).",
  },
  {
    slug: "programa-entrenamiento",
    name: "Programa de Entrenamiento",
    tagline: "Rutinas estructuradas según tu nivel y tu objetivo, con seguimiento.",
    price: 500000,
    priceNote: "pago único",
    features: [
      "Entrenamiento estructurado según tus características físicas",
      "Progresión semanal",
      "Seguimiento y ajustes por WhatsApp",
    ],
    icon: "dumbbell",
    iconTone: "violet",
    highlight: "Más completo",
    whatsappMessage: "Hola Lina, quiero información sobre el Programa de Entrenamiento ($500.000).",
  },
];
