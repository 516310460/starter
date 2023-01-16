import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives({
      // 为了与 vanilla CSS 兼容
      varStyle: '--w-at-',
    }),
    transformerVariantGroup(),
  ],
  theme: {
    // 初始化默认主题
    darkSelector: ".dark-mode",
    colors: {
      
    },
    screens: {
      ipad: "768px",
      pc: "1200px"
    },
    fontSize: {
      'fs12': '0.75rem',
      'fs14': '0.875rem',
      'fs16': '1rem',
      'fs18': '1.125rem',
      'fs20': '1.25rem',
      'fs22': '1.375rem',
      'fs24': '1.5rem',
      'fs26': '1.625rem',
      'fs28': '1.75rem',
      'fs30': '1.875rem',
      'fs32': '2rem',
      'fs34': '2.125rem',
      'fs36': '2.25rem',
      'fs38': '2.375rem',
      'fs40': '2.5rem',
      'fs42': '2.625rem',
      'fs44': '2.75rem',
      'fs46': '2.875rem',
      'fs48': '3rem',
      'fs50': '3.125rem',
      'fs52': '3.25rem',
      'fs54': '3.375rem',
      'fs56': '3.5rem',
      'fs58': '3.625rem',
      'fs60': '3.75rem',
      'fs62': '3.875rem',
      'fs64': '4rem',
      'fs66': '4.125rem',
    },
  }
})