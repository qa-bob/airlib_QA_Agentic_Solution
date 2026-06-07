/**
 * Site constants — URLs, expected titles, and route definitions.
 */

export const BASE_URL = 'https://www.airlib.co';

export interface PageRoute {
  path: string;
  urlPattern: RegExp;
  label: string;
}

export const SITE_ROUTES: readonly PageRoute[] = [
  { path: '/',               urlPattern: /airlib\.co\/?$/,          label: 'Home' },
  { path: '/about-us',       urlPattern: /about-us/,                label: 'About Us' },
  { path: '/how-it-works',   urlPattern: /how-it-works/,            label: 'How It Works' },
  { path: '/airqualitymaps', urlPattern: /airqualitymaps/,          label: 'Air Quality Maps' },
  { path: '/maps',           urlPattern: /airlib\.co\/maps/,        label: 'Maps' },
  { path: '/news',           urlPattern: /\/news/,                  label: 'News' },
  { path: '/contact-us',     urlPattern: /contact-us/,              label: 'Contact Us' },
  { path: '/privacypolicy',  urlPattern: /privacypolicy/,           label: 'Privacy Policy' },
] as const;

/**
 * Known broken routes — included in tests that document existing defects.
 * /automotive redirects to /automotive2 which returns 404.
 */
export const KNOWN_BROKEN_ROUTES: readonly PageRoute[] = [
  { path: '/automotive', urlPattern: /automotive/, label: 'Automotive (known 404)' },
] as const;

export const SMOKE_ROUTES: readonly PageRoute[] = SITE_ROUTES.filter(r =>
  ['Home', 'About Us', 'How It Works', 'Contact Us'].includes(r.label)
);
