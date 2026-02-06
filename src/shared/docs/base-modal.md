## **Modal 공용 컴포넌트(BaseModal) & 도메인 모달 사용 가이드**

어드민 페이지(테이블/분포/상세 등)에서 **모달 UI를 일관되게 적용**하기 위해 아래 구조를 사용합니다.

- **BaseModal (공용 UI 컴포넌트)**: 오버레이/ESC 닫기/중앙 정렬/공통 레이아웃 제공
- **도메인 모달(페이지 전용)**: 성별 분포/코딩 분포/상세 정보 등 **실제 콘텐츠 + 집계 로직**

---

### **1) 사용 목적**

모달 UI를 페이지마다 중복 구현하지 않고 공통화하여

- 모달 디자인/동작(오버레이, 닫기 버튼, ESC 등)을 **일괄 통일**
- 통계/상세 등 **도메인 로직은 페이지 단위로 분리**하여 유지보수 용이
- 모달이 늘어도 **파일 추가 + index에서 상태만 연결**하면 확장 가능

---

### **2) 폴더 구조**

```txt
src/
  shared/
    ui/
      modal/
        base-modal.tsx

  pages/<page>/
    modals/
      gender-stats-modal.tsx
      coding-stats-modal.tsx
      member-detail-modal.tsx
      index.ts
```

- `BaseModal`은 `shared`에 둬서 전 페이지에서 재사용
- 각 모달은 해당 페이지의 `modals/`에 두어 도메인 로직을 해당 페이지에 유지

### **3) Import 경로**

```tsx
import { BaseModal } from '@/shared/ui/modal';

import { GenderStatsModal, CodingStatsModal, MemberDetailModal } from '@/pages/<page>/modals';
```

### **4) 기본 사용법 (권장 패턴)**

#### **4-1. index(페이지)에서 모달 상태를 단일 관리**

모달 제어는 페이지에서만 합니다.

- 어떤 모달이 열렸는지: `activeModal`
- 상세 모달에 필요한 선택 row: `selectedRow`

```tsx
type ActiveModal = 'none' | 'gender' | 'coding' | 'detail';

const [activeModal, setActiveModal] = useState<ActiveModal>('none');
const [selectedRow, setSelectedRow] = useState<Row | null>(null);

const openGender = () => setActiveModal('gender');
const openCoding = () => setActiveModal('coding');

const openDetail = (row: Row) => {
  setSelectedRow(row);
  setActiveModal('detail');
};

const closeModal = () => {
  setActiveModal('none');
  setSelectedRow(null);
};
```

#### **4-2. Grid/Table에서 이벤트로 모달 열기**

Grid 버튼 클릭 / Table row 클릭으로 페이지의 open 함수를 호출합니다.

```tsx
<GridSection
  onOpenGender={openGender}
  onOpenCoding={openCoding}
/>

<TableSection
  rows={pageItems}
  onRowClick={openDetail}
/>
```

#### **4-3. 모달은 index에서 조건부로 렌더링**

isOpen만 넘겨서 열고, 닫기는 공통 closeModal로 처리합니다.

```tsx
<GenderStatsModal isOpen={activeModal === 'gender'} rows={rows} onClose={closeModal} />
<CodingStatsModal isOpen={activeModal === 'coding'} rows={rows} onClose={closeModal} />
<MemberDetailModal isOpen={activeModal === 'detail'} row={selectedRow} onClose={closeModal} />
```

### **5) 동작 방식 요약**

#### BaseModal이 하는 일

- `isOpen`이 `true`일 때만 렌더링
- 오버레이 클릭 시 닫기
- `ESC` 키 입력 시 닫기
- 중앙 정렬된 패널 UI 제공 (`title`, `children`)

#### 도메인 모달이 하는 일

- `rows` 또는 `row`를 받아서 집계/상세 데이터를 구성
- 구성된 내용을 `BaseModal`의 `children`으로 렌더링
- 닫기 액션은 `onClose`를 그대로 위임

### **6) 주의사항**

- 모달 열림/닫힘 상태는 **페이지(index)에서 단일 관리**합니다.
  (각 모달 내부에서 상태를 따로 관리하면 제어가 분산됩니다.)
- 통계 모달의 집계 기준은 정책에 따라 선택합니다.
  - 전체 기준: rows 전달
  - 필터/검색 결과 기준: filteredRows 전달
  - 현재 페이지 기준: pageItems 전달
    (원하는 UX 기준에 맞춰 index에서 어떤 배열을 넘길지 결정)
- 도메인 모달에서 사용하는 필드가 표에 없더라도, 서버 데이터(Row)에 포함되어 있으면 문제 없습니다.
