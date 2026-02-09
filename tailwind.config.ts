import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* point 컬러 */
        point: {
          DEFAULT: '#62C6C6',
        },
        /* background 컬러 */
        bg: {
          default: '#000000', // 전체 페이지 배경
          white: '#FFFFFF', //흰색 배경
          muted: '#1F1F1F', // 진회색 톤 배경
          section: '#303030', // 카드/섹션 배경
        },
        border: {
          default: '#303030', // 기본 테두리
          emphasis: '#525252', // 신청서 작성 카드 테두리
        },
        /* text 컬러 */
        text: {
          default: '#FFFFFF', // 기본 글자 색
          black: '#000000', //검정색 글자
          placeholder: '#696969', // place holder 글자 색
          error: '#F44336', // 빨간 색 에러 글자
        },
      },
      fontSize: {
        '2xs': ['8px', { lineHeight: '12px' }],
        xs: ['10px', { lineHeight: '14px' }],
        sm: ['15px', { lineHeight: '22px' }],
        md: ['18px', { lineHeight: '26px' }],
        lg: ['22px', { lineHeight: '30px' }],
        xl: ['25px', { lineHeight: '34px' }],
        '2xl': ['36px', { lineHeight: '44px' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
