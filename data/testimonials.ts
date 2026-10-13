// ============================================================
// Depoimentos de clientes.
// A lista começa vazia: os cartões só aparecem no site quando
// houver pelo menos um depoimento real aqui.
//
// Modelo:
// {
//   name: "Nome do cliente",
//   city: "Cidade, UF",
//   quote: "O que a pessoa disse.",
//   product: "Letreiro personalizado",
//   initials: "NC",
//   color: "#ff8ad1",
// },
// ============================================================

export type Testimonial = {
  name: string;
  city: string;
  quote: string;
  product: string;
  initials: string;
  color: string;
};

export const testimonials: Testimonial[] = [];
