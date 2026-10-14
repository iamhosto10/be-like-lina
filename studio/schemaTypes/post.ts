import {defineArrayMember, defineField, defineType} from 'sanity'
import {productOptions} from './productOptions'

/**
 * Artículo del blog. Todos usan la misma plantilla en el sitio (src/components/blog/PostArticle.tsx);
 * lo que hace distinto a cada uno es lo que se llena aquí.
 *
 * Los campos obligatorios llevan validación: un artículo con errores no debe publicarse.
 * Cambiar nombres de campos obliga a cambiar las consultas de src/lib/blog.ts.
 */
export default defineType({
  name: 'post',
  title: 'Artículo',
  type: 'document',
  groups: [
    {name: 'content', title: 'Contenido', default: true},
    {name: 'extras', title: 'Productos y CTA'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Enlace (slug)',
      type: 'slug',
      group: 'content',
      description: 'Es la dirección del artículo: be-like-lina…/blog/este-texto. Pulsa «Generate».',
      options: {source: 'title', maxLength: 80},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      group: 'content',
      options: {
        layout: 'radio',
        list: [
          {title: 'Nutrición', value: 'nutricion'},
          {title: 'Entrenamiento', value: 'entrenamiento'},
          {title: 'Recetas', value: 'recetas'},
          {title: 'Mentalidad', value: 'mentalidad'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'Una o dos frases. Se ve bajo el título, en Google y al compartir por WhatsApp (ideal: 120–160 caracteres).',
      validation: (rule) => rule.required().min(40).max(200),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Portada',
      type: 'image',
      group: 'content',
      description: 'Horizontal, mínimo 1200 px de ancho. También es la imagen al compartir.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Describe la imagen para quien no puede verla (y para Google).',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Párrafo', value: 'normal'},
            {title: 'Subtítulo', value: 'h2'},
            {title: 'Subtítulo pequeño', value: 'h3'},
            {title: 'Cita', value: 'blockquote'},
          ],
          lists: [
            {title: 'Viñetas', value: 'bullet'},
            {title: 'Numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrita', value: 'strong'},
              {title: 'Cursiva', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    description: 'Una web completa (https://…) o una página del sitio (/tienda).',
                    validation: (rule) =>
                      rule.uri({scheme: ['http', 'https', 'mailto'], allowRelative: true}),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'caption', title: 'Pie de foto', type: 'string'}),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Productos relacionados',
      type: 'array',
      group: 'extras',
      description:
        'Hasta 3 productos de la tienda que se muestran al final del artículo, con precio y enlace a su ficha.',
      of: [defineArrayMember({type: 'string'})],
      options: {list: productOptions},
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: 'cta',
      title: 'Botón de WhatsApp',
      type: 'object',
      group: 'extras',
      description:
        'Opcional. Si lo dejas vacío, el artículo usa un mensaje genérico («Escribirle a Lina»).',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'title',
          title: 'Título de la llamada',
          type: 'string',
          description: 'Ej.: «¿Quieres tu plan nutricional?»',
          validation: (rule) => rule.max(80),
        }),
        defineField({
          name: 'buttonLabel',
          title: 'Texto del botón',
          type: 'string',
          description: 'Ej.: «Quiero mi plan»',
          validation: (rule) => rule.max(30),
        }),
        defineField({
          name: 'message',
          title: 'Mensaje de WhatsApp',
          type: 'text',
          rows: 2,
          description: 'Lo que ya aparece escrito cuando se abre la conversación con Lina.',
          validation: (rule) => rule.max(250),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Más recientes',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', category: 'category', media: 'coverImage'},
    prepare: ({title, category, media}) => ({title, subtitle: category, media}),
  },
})
