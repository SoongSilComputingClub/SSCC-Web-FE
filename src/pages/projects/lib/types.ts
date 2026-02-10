export type ProjectCategory = 'news' | 'activity' | 'social';

export type Project = {
  /* URL에 들어갈 고유 ID (/projects/:id) */
  id: string;

  /* 탭 필터용 카테고리 */
  category: ProjectCategory;

  /* 카드/상세 제목 */
  title: string;

  /* 카드에 보이는 타입 라벨 (예: APP, WEB 등 자유 형식 문자열) */
  typeLabel: string;

  /* 카드 본문  */
  content: string;

  /* 목록 카드 썸네일 */
  coverImage: string;

  /* 정렬/표시용 날짜 (YYYY-MM-DD) (선택) */
  date?: string;

  /* 상세 상단/갤러리 이미지들 (선택) */
  galleryImages?: string[];
};
