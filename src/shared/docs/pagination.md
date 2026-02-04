## **Pagination 공용 컴포넌트 & 커스텀 훅 사용 가이드**

프로젝트 목록/공지/미디어 등 **리스트 페이지에서 페이지네이션을 일관되게 적용**하기 위해 아래 두 가지 공용 모듈을 제공합니다.

- usePagination (커스텀 훅): **page 쿼리 관리 + 페이지 계산 + slice**
- Pagination (UI 컴포넌트): **페이지 이동 버튼 UI**

### **1) 사용 목적**

한 페이지에 N개씩 카드/리스트를 보여주고 URL 쿼리스트링 ?page=...로 페이지 상태를 관리하여

- 새로고침해도 같은 페이지 유지
- 링크 공유 시 같은 페이지로 진입 가능
- 페이지네이션 UI를 페이지마다 중복 구현하지 않도록 통일합니다.

---

### **2) Import 경로**

```tsx
import { usePagination } from '@/shared/lib/use-pagination';
import { Pagination } from '@/shared/ui/pagination';
```

### **3) 기본 사용법 (권장 패턴)**

**3-1. 데이터 필터링 → usePagination으로 pageItems 만들기**

```tsx
const filtered = PROJECTS.filter((p) => p.category === category);

const { page, totalPages, pageItems, setPage } = usePagination({
  items: filtered,
  pageSize: 6, // 한 페이지당 표시 개수
});
```

**3-2. pageItems로 렌더링 + Pagination UI 연결**

```tsx
<ul>
  {pageItems.map((item) => (
    <li key={item.id}>{/* Card */}</li>
  ))}
</ul>

<Pagination page={page} totalPages={totalPages} onChange={setPage} />
```

### **4) 동작 방식 요약**

**usePagination이 하는 일**

- URLSearchParams에서 page 값을 읽습니다.
- page가 없거나 잘못된 값이면 1로 보정합니다.
- page가 totalPages보다 크면 마지막 페이지로 보정합니다.
- items 배열을 기준으로 현재 페이지의 데이터(pageItems)를 잘라 제공합니다.
- setPage(n) 호출 시 URL의 page 쿼리를 갱신합니다.
  (다른 쿼리 값은 유지됩니다)

**Pagination이 하는 일**

- page, totalPages를 기반으로
  - 이전/다음 버튼
  - 페이지 번호 버튼
  - 현재 페이지(active) 스타일
    을 렌더링합니다.
- 버튼 클릭 시 onChange(nextPage)를 호출합니다.

---

### **5) 빈 목록(Empty State) 처리 권장**

페이지네이션은 “목록이 없을 때” 표시할 필요가 없으므로, 아래처럼 처리합니다.

```tsx
if (filtered.length === 0) {
  return <div>등록된 콘텐츠가 없습니다.</div>;
}
```

---

### **6) 예시: Projects 페이지 적용 코드**

```tsx
import { usePagination } from '@/shared/lib/use-pagination';
import { Pagination } from '@/shared/ui/pagination';

import { PROJECTS } from '../lib/data';
import type { ProjectCategory } from '../lib/types';
import { ProjectCard } from './project-card';

type ProjectListProps = {
  category: ProjectCategory;
};

export function ProjectList({ category }: ProjectListProps) {
  const filtered = PROJECTS.filter((p) => p.category === category);

  const { page, totalPages, pageItems, setPage } = usePagination({
    items: filtered,
    pageSize: 6,
  });

  if (filtered.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-16 text-md text-text-default">
        등록된 콘텐츠가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <ul className="grid w-full grid-cols-1 justify-items-center gap-3 lg:grid-cols-[repeat(3,minmax(0,420px))] lg:justify-center lg:gap-6">
        {pageItems.map((project) => (
          <li key={project.id} className="w-full">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
```

---

### **7) 주의사항**

- usePagination은 URL의 page 쿼리를 사용하므로, 동일 페이지에서 다른 쿼리를 사용 중이어도 충돌하지 않도록 **page 키는 공통으로 유지**합니다.
- 페이지/카테고리 등을 쿼리로 함께 관리하는 경우 (tab, search 등)에도 setSearchParams(prev => ...) 방식으로 기존 쿼리를 유지하도록 구현되어 있습니다.
- SSR 환경이 아닌 일반 SPA(React Router) 기준입니다.

---
