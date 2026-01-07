# SSCC Web Frontend

SSCC 공식 웹사이트 프론트엔드 레포지토리입니다. <br>
모바일 퍼스트 기반의 PWA 웹앱으로, React + TypeScript + Tailwind CSS를 사용합니다.

---

### Tech Stack <br>
	•	Framework: React 19
	•	Language: TypeScript
	•	Build Tool: Vite
	•	Styling: Tailwind CSS
	•	Routing: React Router
	•	Data Fetching: React Query, Axios
	•	Lint / Format: ESLint, Prettier
	•	PWA: vite-plugin-pwa
	•	Package Manager: npm
	•	Node.js: 20 LTS
  
---
### Project Structure

src/ <br>
	•	app/ <br>
앱 전역 설정 (router, queryClient 등) <br>
	•	pages/ <br>
페이지 단위 컴포넌트 (URL 기준) <br>
	•	features/ <br>
기능 단위 비즈니스 로직 (API, hooks 등) <br>
	•	shared/ <br>
공통 레이아웃, UI 컴포넌트, 유틸 <br>
	•	assets/ <br>
이미지, 아이콘 등 정적 리소스 <br>
	•	styles/ <br>
글로벌 스타일 (Tailwind entry) <br>

---
### Development Setup

	1.	Node 버전 맞추기 $ nvm use

	2.	환경 변수 파일 생성 $ cp .env.example .env

	3.	패키지 설치 $ npm install

	4.	개발 서버 실행 $ npm run dev

	5.	브라우저 접속 $ http://localhost:5173

---

### Development Rules
	•	pages/*/index.tsx 파일은 반드시 export default
	•	shared/layout 컴포넌트는 named export 사용
	•	라우팅은 src/app/router.tsx에서만 관리
	•	공통 설정(app/, shared/) 수정 시 팀원 공유 필수
	•	.env, node_modules는 커밋 금지

---

### Git Workflow
	•	본 레포지토리를 fork 후 작업
	•	base branch: v1
	•	작업 브랜치 생성 후 개발
	•	feat/* : 기능 개발
	•	chore/* : 설정, 환경 작업
	•	fix/* : 버그 수정
	•	작업 완료 후 PR 생성
	•	리뷰 후 merge

---

### Available Scripts

npm run dev      # 개발 서버 실행 <br>
npm run build    # 프로덕션 빌드 <br>
npm run preview  # 빌드 결과 미리보기 <br>
npm run lint     # ESLint 검사 <br>
npm run format   # Prettier 포맷 <br>


---

### Notes
	•	모바일 화면 기준으로 개발합니다.
	•	공통 UI 컴포넌트는 shared/ui에만 추가합니다.
	•	프로젝트 초기 세팅은 chore/project-setup 브랜치에서 진행되었습니다.

--- 

### Quick Start

nvm use <br>
cp .env.example .env <br>
npm install <br>
npm run dev <br>

---
