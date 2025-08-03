import { Rule } from "sanity";

export default {
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Precio",
      type: "number",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Imagen",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      title: "Descripción",
      type: "text",
    },
  ],
};
