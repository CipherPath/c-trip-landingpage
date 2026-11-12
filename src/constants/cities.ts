/**
 * Main navigation. `href` is a route ('/sobre') or a landing section ('/#servicos');
 * `spy` is the landing section that highlights the link while scrolling the home page.
 */
export const NAV_LINKS = [
  { label: 'Reservas', href: '/#reservas', spy: 'reservas', x: 0 },
  { label: 'Sobre', href: '/sobre', spy: 'sobre', x: 125.22 },
  { label: 'Serviços', href: '/#servicos', spy: 'servicos', x: 222.06 },
  { label: 'Promoções', href: '/#novidades', spy: 'novidades', x: 320.86 },
  { label: 'Notícias', href: '/noticias', spy: null, x: 470.53 },
] as const

export const CITIES = [
  'Luanda',
  'Huambo',
  'Benguela',
  'Lubango',
  'Cabinda',
  'Soyo',
  "M'banza Kongo",
  'Uíge',
  'Dundo',
  'Caxito',
  'Malanje',
  'Saurimo',
  "N'dalatando",
  'Sumbe',
  'Luena',
  'Cuito',
  'Namibe',
  'Menongue',
  'Ondjiva',
] as const