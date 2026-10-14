import type { LegalPageData } from "@/types";

/** Política de privacidad — copiada de belikelina.com/privacy-policy. */
export const privacidadPage: LegalPageData = {
  slug: "politica-de-privacidad",
  title: "Política de privacidad",
  description:
    "Cómo Be Like Lina recopila, usa y protege tus datos: comentarios, cookies, contenido incrustado y tus derechos.",
  intro: "www.belikelina.com",
  sections: [
    {
      id: "comentarios",
      title: "Comentarios",
      blocks: [
        {
          type: "p",
          text: "Cuando los visitantes dejan comentarios en la web, recopilamos los datos que se muestran en el formulario de comentarios, así como la dirección IP del visitante y la cadena de agentes de usuario del navegador para ayudar a la detección de spam.",
        },
        {
          type: "p",
          text: "Una cadena anónima creada a partir de tu dirección de correo electrónico (también llamada hash) puede ser proporcionada al servicio de Gravatar para ver si la estás usando. La política de privacidad del servicio Gravatar está disponible aquí: [https://automattic.com/privacy/](https://automattic.com/privacy/). Después de la aprobación de tu comentario, la imagen de tu perfil es visible para el público en el contexto de tu comentario.",
        },
      ],
    },
    {
      id: "medios",
      title: "Medios",
      blocks: [
        {
          type: "p",
          text: "Si subes imágenes a la web, deberías evitar subir imágenes con datos de ubicación (GPS EXIF) incluidos. Los visitantes de la web pueden descargar y extraer cualquier dato de ubicación de las imágenes de la web.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        {
          type: "p",
          text: "Si dejas un comentario en nuestro sitio puedes elegir guardar tu nombre, dirección de correo electrónico y web en cookies. Esto es para tu comodidad, para que no tengas que volver a rellenar tus datos cuando dejes otro comentario. Estas cookies tendrán una duración de un año.",
        },
        {
          type: "p",
          text: "Si tienes una cuenta y te conectas a este sitio, instalaremos una cookie temporal para determinar si tu navegador acepta cookies. Esta cookie no contiene datos personales y se elimina al cerrar el navegador.",
        },
        {
          type: "p",
          text: "Cuando accedas, también instalaremos varias cookies para guardar tu información de acceso y tus opciones de visualización de pantalla. Las cookies de acceso duran dos días, y las cookies de opciones de pantalla duran un año. Si seleccionas «Recuérdarme», tu acceso perdurará durante dos semanas. Si sales de tu cuenta, las cookies de acceso se eliminarán.",
        },
        {
          type: "p",
          text: "Si editas o publicas un artículo se guardará una cookie adicional en tu navegador. Esta cookie no incluye datos personales y simplemente indica el ID del artículo que acabas de editar. Caduca después de 1 día.",
        },
      ],
    },
    {
      id: "contenido-incrustado",
      title: "Contenido incrustado",
      blocks: [
        {
          type: "p",
          text: "Los artículos de este sitio pueden incluir contenido incrustado (por ejemplo, vídeos, imágenes, artículos, etc.). El contenido incrustado de otras webs se comporta exactamente de la misma manera que si el visitante hubiera visitado la otra web.",
        },
        {
          type: "p",
          text: "Esta web puede recopilar datos sobre ti, utilizar cookies, incrustar un seguimiento adicional de terceros, y supervisar tu interacción con ese contenido incrustado, incluido el seguimiento de tu interacción con el contenido incrustado si tienes una cuenta y estás conectado a esa web.",
        },
      ],
    },
    {
      id: "con-quien-compartimos-tus-datos",
      title: "¿Con quién compartimos tus datos?",
      blocks: [
        {
          type: "p",
          text: "Si solicitas un restablecimiento de contraseña, tu dirección IP será incluida en el correo electrónico de restablecimiento.",
        },
      ],
    },
    {
      id: "cuanto-tiempo-conservamos-tus-datos",
      title: "¿Cuánto tiempo conservamos tus datos?",
      blocks: [
        {
          type: "p",
          text: "Si dejas un comentario, el comentario y sus metadatos se conservan indefinidamente. Esto es para que podamos reconocer y aprobar comentarios sucesivos automáticamente, en lugar de mantenerlos en una cola de moderación.",
        },
        {
          type: "p",
          text: "De los usuarios que se registran en nuestra web (si los hay), también almacenamos la información personal que proporcionan en su perfil de usuario. Todos los usuarios pueden ver, editar o eliminar su información personal en cualquier momento (excepto que no pueden cambiar su nombre de usuario). Los administradores de la web también pueden ver y editar esa información.",
        },
      ],
    },
    {
      id: "que-derechos-tienes-sobre-tus-datos",
      title: "¿Qué derechos tienes sobre tus datos?",
      blocks: [
        {
          type: "p",
          text: "Si tienes una cuenta o has dejado comentarios en esta web, puedes solicitar recibir un archivo de exportación de los datos personales que tenemos sobre ti, incluyendo cualquier dato que nos hayas proporcionado. También puedes solicitar que eliminemos cualquier dato personal que tengamos sobre ti. Esto no incluye ningún dato que estemos obligados a conservar con fines administrativos, legales o de seguridad.",
        },
      ],
    },
    {
      id: "donde-se-envian-tus-datos",
      title: "¿Dónde se envían tus datos?",
      blocks: [
        {
          type: "p",
          text: "Los comentarios de los visitantes puede que los revise un servicio de detección automática de spam.",
        },
      ],
    },
  ],
};
