import type { Plan } from "@/types";

/** Los dos servicios reales de coaching (precios en COP, pago único). */
export const plans: Plan[] = [
  {
    slug: "programa-entrenamiento",
    name: "Programa de Entrenamiento",
    tagline: "Rutina estructurada basada en tu requerimiento y objetivo.",
    price: 500000,
    priceNote: "pago único",
    features: [
      "Entrenamiento estructurado según tu requerimiento",
      "Asesoría de nutrición y suplementación",
      "Seguimiento y ajustes constantes",
    ],
    icon: "dumbbell",
    iconTone: "violet",
    whatsappMessage: "Hola Lina, quiero información sobre el Programa de Entrenamiento ($500.000).",
  },
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
    slug: "plan-integral",
    name: "Plan Integral",
    tagline: "Plan nutricional y programa de entrenamiento en un solo servicio.",
    price: 800000,
    priceNote: "pago único",
    features: [
      "Valoración corporal",
      "Plan de alimentación personalizado",
      "Entrenamiento estructurado según tu requerimiento",
      "Guía de suplementación",
      "Seguimiento y ajustes constantes",
    ],
    icon: "mix",
    iconTone: "pink",
    highlight: "Más completo",
    whatsappMessage: "Hola Lina, quiero información sobre el Plan Integral ($800.000).",
  },
];
