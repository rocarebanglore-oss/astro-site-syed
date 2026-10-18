import type { PageRoute } from '@/types';

export interface BrandTheme {
  primary: string;
  darkBg: string;
  accent: string;
  lightBg: string;
  border: string;
  bannerBg: string;
  gradientFrom: string;
  gradientTo: string;
}

const DEFAULT_THEME: BrandTheme = {
  primary: '#0b5cbe',
  darkBg: '#094796',
  accent: '#1874e0',
  lightBg: '#f0f5fb',
  border: '#e1e9f2',
  bannerBg: '#002b66',
  gradientFrom: '#0b5cbe',
  gradientTo: '#1874e0',
};

const BRAND_THEMES: Record<string, BrandTheme> = {
  '/kent-service': {
    primary: '#1B3F8C',
    darkBg: '#0f2c69',
    accent: '#38bdf8',
    lightBg: '#f0f7ff',
    border: '#bfdbfe',
    bannerBg: '#1B3F8C',
    gradientFrom: '#1B3F8C',
    gradientTo: '#38bdf8',
  },
  '/aquaguard-service': {
    primary: '#0072BC',
    darkBg: '#073356',
    accent: '#06b6d4',
    lightBg: '#f0f9ff',
    border: '#bae6fd',
    bannerBg: '#0072BC',
    gradientFrom: '#0072BC',
    gradientTo: '#06b6d4',
  },
  '/pureit-service': {
    primary: '#1e40af',
    darkBg: '#141f47',
    accent: '#38bdf8',
    lightBg: '#f5f3ff',
    border: '#ddd6fe',
    bannerBg: '#2B2A6B',
    gradientFrom: '#1e40af',
    gradientTo: '#38bdf8',
  },
  '/aosmith-service': {
    primary: '#047857',
    darkBg: '#053225',
    accent: '#10b981',
    lightBg: '#f0fdf4',
    border: '#bbf7d0',
    bannerBg: '#00843D',
    gradientFrom: '#047857',
    gradientTo: '#10b981',
  },
  '/livpure-service': {
    primary: '#581c87',
    darkBg: '#211042',
    accent: '#a855f7',
    lightBg: '#faf5ff',
    border: '#e9d5ff',
    bannerBg: '#581c87',
    gradientFrom: '#581c87',
    gradientTo: '#a855f7',
  },
};

export function getBrandTheme(
  currentRoute?: PageRoute | string,
  lastBrandRoute?: PageRoute | null
): BrandTheme {
  if (currentRoute && BRAND_THEMES[currentRoute]) {
    return BRAND_THEMES[currentRoute];
  }

  if (lastBrandRoute && BRAND_THEMES[lastBrandRoute]) {
    return BRAND_THEMES[lastBrandRoute];
  }

  return DEFAULT_THEME;
}

export function getThemeByBrandId(brandId?: string): BrandTheme {
  if (!brandId) return DEFAULT_THEME;

  const cleanId = brandId.toLowerCase().replace(/-service$/, '');

  if (cleanId.includes('kent')) return BRAND_THEMES['/kent-service'];
  if (cleanId.includes('aquaguard')) return BRAND_THEMES['/aquaguard-service'];
  if (cleanId.includes('pureit')) return BRAND_THEMES['/pureit-service'];
  if (cleanId.includes('smith') || cleanId.includes('ao-smith'))
    return BRAND_THEMES['/aosmith-service'];
  if (cleanId.includes('livpure')) return BRAND_THEMES['/livpure-service'];

  return DEFAULT_THEME;
}