// src/pages/activities/lib/data.ts
import type { Activity } from './types';

export const ACTIVITIES: Activity[] = [
  /* news 카테고리 */
  {
    id: 'activity-1',
    category: 'news',
    title: 'SSCC 홈페이지 리뉴얼',
    typeLabel: 'WEB',
    content: 'SSCC 공식 홈페이지를 리뉴얼한 프로젝트입니다.',
    coverImage: '../src/assets/images/home/pic-scroll7.jpg',
    date: '2025-01-10',
    galleryImages: [
      '../src/assets/images/home/pic-scroll6.jpg',
      '/images/activities/thumb2.png',
      '/images/activities/thumb3.jpg',
    ],
  },

  /* academics 카테고리 */
  {
    id: 'academics-1',
    category: 'academics',
    title: '미래 콘서트',
    typeLabel: '세미나',
    content: '연사님들 모시고 세미나 했습니다.',
    coverImage: '../src/assets/images/home/pic-scroll5.jpg',
    date: '2025-01-10',
    galleryImages: ['../src/assets/images/home/pic-scroll6.jpg'],
  },
  {
    id: 'academics-2',
    category: 'academics',
    title: 'C 스터디',
    typeLabel: '스터디',
    content: '학기 중 진행한 스터디입니다.',
    coverImage: '../src/assets/images/home/pic-side2.jpg',
    date: '2025-01-10',
    galleryImages: [],
  },

  /* events 카테고리 */
  {
    id: 'events-1',
    category: 'events',
    title: '친목 활동 진행',
    typeLabel: '번개',
    content:
      '공간 대여해서 친목 활동 진행하였습니다.\n 동아리원들 간의 친목을 다지는 시간이었습니다. 바쁜 일정에도 모여주신 친구들 감사~ 나는 안감 까비',
    coverImage: '../src/assets/images/home/pic-side3.jpg',
    date: '2025-01-10',
    galleryImages: [],
  },
];
