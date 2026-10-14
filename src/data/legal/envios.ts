import type { LegalPageData } from "@/types";

/** Pagos, envíos y devoluciones — copiado de belikelina.com/refund_returns. */
export const enviosPage: LegalPageData = {
  slug: "pagos-envios-y-devoluciones",
  title: "Pagos, envíos y devoluciones",
  description:
    "Condiciones de envío, tiempos de entrega, devoluciones, cambios y derecho de retracto de Be Like Lina.",
  // Único texto que no viene del sitio anterior: orienta a quien busca los métodos de pago.
  intro:
    "Los métodos de pago están en la sección 11 de los [Términos y condiciones](/terminos-y-condiciones#politicas-de-pago).",
  sections: [
    {
      id: "politicas-de-envios",
      title: "Políticas de envíos",
      blocks: [
        {
          type: "p",
          text: "Los envíos no serán gratuitos. Los despachos de los pedidos se harán efectivos siempre y cuando se cumpla las siguientes condiciones específicas:",
        },
        {
          type: "ul",
          items: [
            "Los envíos nacionales y domicilios en el área de valledupar serán realizados el mismo día, siempre y cuando el pedido sea confirmado antes de las 2 p.m. en días hábiles, de lo contrario sería programado para el día siguiente.",
            "Todos los pedidos realizados con métodos de pagos electrónicos se les realizará el respectivo envío una vez sea verificado el ingreso del dinero al sistema.",
            "Sí la información de envío suministrada por el comprador fuese dudosa, este será realizado una vez se hayan dispersado las dudas y exista seguridad de toda la información.",
            "Los pedidos por fuera de Valledupar y su área metropolitana serán enviados por medio de empresas transportadoras a conveniencia, en caso de ser requerido por el comprador un cambio de transportadora de su preferencia será efectuado.",
            "Para los envíos contra-entrega en el territorio nacional se realizarán por medio de la transportadora Coordinadora, Servientrega, Interrapidisimo o Domina.",
            "Los tiempos de entrega de los pedidos dependerán de la empresa por la cual se realice el despacho, así como también el destino final. Normalmente los tiempos de entrega estipulados por las empresas de transporte van de 24 a 48 horas hábiles para ciudades principales y de 72 a 150 horas para otros destinos.",
            "Una vez realizado el despacho del pedido, el comprador recibirá vía WhatsApp el número de guía del despacho, con el cual tanto usted como nosotros podremos realizar el seguimiento momento a momento del pedido. El seguimiento podrá verificarse en la página web de la empresa transportadora, el cual será hábil 12 horas después de suministrarte la guía de despacho.",
            "Tanto el despacho como entrega de los pedidos será efectiva de lunes a viernes el horario de 8 am- 6 pm y sábados de 8 am – 12 m, excepto los días festivos. Cabe mencionar que el horario de entrega de pedidos será determinado por la ruta de entregas de la empresa de transporte.",
            "Si la información de envío suministrada esta errada o incompleta podría ocasionar una devolución a bodega del pedido y en tal caso el comprador deberá asumir los costos adicionales que se generen.",
            "Nos reservamos el derecho a utilizar cualquier empresa de transporte para la entrega de su pedido.",
            "A pesar de que las transportadoras cuentan con tiempos promesa de entrega, estos tiempos no son directamente controlados por Be Like Lina, es decir, en ocasiones se pueden presentar retrasos en tus pedidos que se podrán deber a factores externos como novedades en la vía y transporte.",
          ],
        },
      ],
    },
    {
      id: "devoluciones-y-cambios",
      title: "Devoluciones y cambios",
      blocks: [
        {
          type: "p",
          text: "Las devoluciones y cambios de los pedidos se podrán realizar si se cumple con lo siguiente:",
        },
        {
          type: "ul",
          items: [
            "El reclamo se realice dentro de las siguientes 24 horas de entregado el pedido.",
            "La información suministrada por el cliente no haya estado errada.",
            "La reposición del pedido a bodega se realice en máximo 5 días.",
            "Los productos devueltos se encuentren en las mismas condiciones en las cuales fueron enviados (cerrados, sellados e intactos).",
            "El reclamante sea la misma persona quien realizó la compra.",
            "En ningún caso BE LIKE LINA devolverá el dinero cobrado por envíos y costos logísticos y el valor de los bonos de promoción.",
            "En caso de devolución el envío correrá por cuenta del comprador.",
            "La devolución del dinero se procesará dentro de los 30 días siguientes a la fecha del recibo de la mercancía devuelta.",
            "El solicitante de la devolución del dinero debe realizar una solicitud escrita con la justificación valida y adjuntar certificación bancaria.",
            "El trámite de reembolso del dinero toma de ocho (8) a quince (15) días hábiles después de recibida la solicitud.",
            "Al monto del reembolso se le descontará los costos de la transacción.",
            "Nos reservamos el derecho de rechazar cualquier pedido o de restringir las cantidades de cualquier pedido, sin explicar los motivos. Si rechazamos su pedido, intentaremos notificarlo por medio de la dirección de e-mail que indicó en el pedido. Cuando rechazamos un pedido, no solemos cargar el importe a la tarjeta de crédito o débito, pero si esto no fuese así, le gestionaremos un reembolso del 100%. La recepción de una confirmación del pedido, ya sea electrónica o por otro medio, no implica nuestra aceptación ni constituye una confirmación de nuestra oferta de venta. BE LIKE LINA, se reserva el derecho de aceptar o rechazar su pedido por cualquier motivo y en cualquier momento a partir de la recepción del encargo",
          ],
        },
      ],
    },
    {
      id: "derecho-de-retracto",
      title: "Derecho de retracto",
      blocks: [
        {
          type: "p",
          text: "En el caso de que el consumidor final decida ejercer el derecho de retracto, deberá hacerlo de conformidad con el artículo 47 del Estatuto del Consumidor, el cual establece qué: “En todos los contratos para la venta de bienes y prestación de servicios mediante sistemas de financiación otorgada por el productor o proveedor, venta de tiempos compartidos o ventas que utilizan métodos no tradicionales o a distancia, que por su naturaleza no deban consumirse o no hayan comenzado a ejecutarse antes de cinco (5) días, se entenderá pactado el derecho de retracto por parte del consumidor En el evento en que se haga uso de la facultad de retracto, se resolverá el contrato y se deberá reintegrar el dinero que el consumidor hubiese pagado.",
        },
        {
          type: "p",
          text: "El consumidor deberá devolver el producto al productor o proveedor por los mismos medios y en las mismas condiciones en que lo recibió. Los costos de transporte y los demás que conlleve la devolución del bien serán cubiertos por el consumidor.",
        },
        {
          type: "p",
          text: "El término máximo para ejercer el derecho de retracto será de cinco (5) días hábiles contados a partir de la entrega del bien o de la celebración del contrato en caso de la prestación de servicios.”",
        },
      ],
    },
  ],
};
