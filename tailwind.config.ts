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
          placeholder: '#696969', // place holder 글자 색
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
