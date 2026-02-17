// src/pages/activities/news/lib/data.ts
import type { Activity } from './types';

// 카테고리(뉴스/학술/행사) 고정 타입
export type ActivityCategory = 'news' | 'academics' | 'events';

// 카테고리별로 묶어서 관리
export const ACTIVITIES_BY_CATEGORY: Record<ActivityCategory, Activity[]> = {
  news: [
    {
      id: 'embedded-sw-award-2025-12-05',
      category: 'news',
      title: '제23회 임베디드SW경진대회 스마트가전부문 금상 수상',
      typeLabel: '수상',
      content:
        '지난 12월 5일, 제23회 임베디드SW경진대회에서 SSCC 참가팀 "동방예의지국"이 스마트가전 부문 금상을 수상했습니다! 🏆\n\n동방예의지국 팀은 카메라나 별도의 웨어러블 기기 없이, Wi-Fi 신호만으로 사용자의 실내 활동과 수면 상태를 파악해 최적의 실내 환경을 제어하는 혁신적인 스마트가전 시스템을 선보였습니다! 📡\nLG전자가 후원하는 국내 최고 권위의 임베디드 SW 대회에서 당당히 1위를 차지하며 SSCC의 기술력을 널리 알린 팀원 분들 모두 진심으로 축하드립니다 😉',
      coverImage: '/images/2025/activities/news/embedded-sw-award-2025-12-05/cover.jpg',
      date: '2025-12-05',
      galleryImages: [
        '/images/2025/activities/news/embedded-sw-award-2025-12-05/cover.jpg',
        '/images/2025/activities/news/embedded-sw-award-2025-12-05/gallery-1.jpg',
        '/images/2025/activities/news/embedded-sw-award-2025-12-05/gallery-2.jpg',
        '/images/2025/activities/news/embedded-sw-award-2025-12-05/gallery-3.jpg',
        '/images/2025/activities/news/embedded-sw-award-2025-12-05/gallery-4.jpg',
      ],
    },
    {
      id: 'ssu-devcon-2025-11-22',
      category: 'news',
      title: 'IT 대학 X SSCC X YOURSSU 연합 세미나, DEVCON 진행',
      typeLabel: '세미나',
      content:
        '지난 11월 22일 14시, 정보과학관 기계창에서 IT대학 학생회 EDIT, SSCC, YOURSSU가 공동 개최한 "2025 SSU DEVCON"이 개최되었습니다!\n\n네 분의 연사님 중 SSCC 33기 이호연 선배님께서 연사로 참여하셔서 "오픈소스 기여하기"를 주제로 강연을 해주셨습니다! 🚀\n선배님의 생생한 강연을 통해 오픈소스 생태계를 깊이 이해하고, 성공적인 기여를 시작해 볼 수 있는 뜻깊은 기회가 되었습니다 😉',
      coverImage: '/images/2025/activities/news/ssu-devcon-2025-11-22/cover.png',
      date: '2025-11-22',
      galleryImages: [
        '/images/2025/activities/news/ssu-devcon-2025-11-22/cover.png',
        '/images/2025/activities/news/ssu-devcon-2025-11-22/gallery-1.jpg',
        '/images/2025/activities/news/ssu-devcon-2025-11-22/gallery-2.jpg',
      ],
    },
    {
      id: 'unithon-award-2025-08-13',
      category: 'news',
      title: "2025 스파르탄 위닝 창업 캠프 - 교내 연합 해커톤 UNITHON 우수상 수상",
      typeLabel: '수상',
      content:
        '지난 8월 13일, 2025 교내 연합 해커톤 "UNITHON"에서 SSCC 참가팀 "동방예의지국(숭방예의지국)"이 우수상을 수상했습니다! 🏆\n\n카메라나 별도 기기 없이 와이파이 신호 변화만으로 병실 내 안전사고를 감지하는 "Wi-Fi Sensing 기반 스마트 병실 안전 모니터링 시스템"을 개발하여 기술성을 입증하였습니다! 📡\n혁신적인 아이디어와 기술력으로 멋진 성과를 거두며 SSCC를 빛내준 팀원 분들 모두 진심으로 축하드립니다 😉',
      coverImage: '/images/2025/activities/news/unithon-award-2025-08-13/cover.jpg',
      date: '2025-08-13',
      galleryImages: [
        '/images/2025/activities/news/unithon-award-2025-08-13/cover.jpg',
        '/images/2025/activities/news/unithon-award-2025-08-13/gallery-1.png',
        '/images/2025/activities/news/unithon-award-2025-08-13/gallery-2.jpg',
        '/images/2025/activities/news/unithon-award-2025-08-13/gallery-3.jpg',
      ],
    },
    {
      id: 'large-scale-server-seminar-2025-06-25',
      category: 'news',
      title: '대용량 서비스를 위한 서버 개발의 기술 세미나',
      typeLabel: '세미나',
      content:
        '지난 6월 25일 18시 30분, 판교역 인근 세미나룸에서 "대용량 서비스를 위한 서버 개발의 기술 세미나"가 개최되었습니다!\n\nSSCC 20기 안정수 선배님께서 연사로 참여하셔서 "대용량 서비스 운영"과 "소프트웨어 엔지니어로 일한다는 것"을 주제로 강연을 해주셨습니다! 💻\n선배님의 풍부한 현업 경험을 통해 백엔드 인프라에 대해 깊이 이해하고, 실무에서의 소통과 협업 역량까지 키울 수 있는 뜻깊은 기회가 되었습니다 😉',
      coverImage: '/images/2025/activities/news/large-scale-server-seminar-2025-06-25/cover.jpg',
      date: '2025-06-25',
      galleryImages: [
        '/images/2025/activities/news/large-scale-server-seminar-2025-06-25/cover.jpg',
        '/images/2025/activities/news/large-scale-server-seminar-2025-06-25/gallery-1.jpg',
        '/images/2025/activities/news/large-scale-server-seminar-2025-06-25/gallery-2.jpg',
      ],
    },
    {
      id: 'future-concert-2025-05-17',
      category: 'news',
      title: 'IT대학 X UNICOSA 연합 세미나, 미래콘서트',
      typeLabel: '세미나',
      content:
        '지난 5월 17일 14시, 진리관에서 IT대학 X UNICOSA 연합 세미나 "미래콘서트"가 개최되었습니다!\n\n세 분의 연사님 중 SSCC 3기 이병기 선배님과 16기 유성재 선배님께서 참여하셔서, 각각 "곰플레이어 창업과 기업 운영 과정"과 "정보보안 업계 현황 및 비전"을 주제로 강연을 해주셨습니다! 🚀\n두 선배님의 생생한 현업 이야기를 통해 급변하는 IT 트렌드를 읽고, 보안 분야에 대한 시야를 넓힐 수 있는 뜻깊은 기회가 되었습니다 😉',
      coverImage: '/images/2025/activities/news/future-concert-2025-05-17/cover.png',
      date: '2025-05-17',
      galleryImages: [
        '/images/2025/activities/news/future-concert-2025-05-17/cover.png',
        '/images/2025/activities/news/future-concert-2025-05-17/gallery-1.jpg',
        '/images/2025/activities/news/future-concert-2025-05-17/gallery-2.webp',
        '/images/2025/activities/news/future-concert-2025-05-17/gallery-3.jpg',
        '/images/2025/activities/news/future-concert-2025-05-17/gallery-4.png',
      ],
    },
    {
      id: 'contest-preparation-seminar-2025-04-10',
      category: 'news',
      title: '공모전 분할정복 가이드 세미나',
      typeLabel: '세미나',
      content:
        '지난 4월 10일 19시 30분, 문화관에서 "공모전 노하우 및 준비 세미나"가 개최되었습니다!\n\nSSCC 39기 국혜경 선배님께서 연사로 참여하셔서 \"공모전 수상 노하우\"와 \"커리어 역량 강화\"를 주제로 강연을 해주셨습니다!🐝\n선배님의 생생한 경험담을 통해 공모전을 전략적으로 기획하고, 성공 타율을 높일 수 있는 뜻깊은 기회가 되었습니다 😉',
      coverImage: '/images/2025/activities/news/contest-preparation-seminar-2025-04-10/cover.jpg',
      date: '2025-04-10',
      galleryImages: [
        '/images/2025/activities/news/contest-preparation-seminar-2025-04-10/cover.jpg',
      ],
    },
    {
      id: 'sw-learning-seminar-2025-04-03',
      category: 'news',
      title: 'SW 학습법과 취업 준비 세미나',
      typeLabel: '세미나',
      content:
        '지난 4월 3일 22시, 온라인에서 "SW 학습법과 취업 준비 세미나"가 개최되었습니다!\n\nSSCC 36기 백승우 선배님께서 연사로 참여하셔서 \"SW 학습 노하우\"와 \"취업 준비 인사이트\"를 주제로 강연을 해주셨습니다! 📝\n선배님의 진솔한 발표를 통해 흔들림 없는 성장 로드맵을 그리고, 현실적인 취업 팁까지 얻어갈 수 있는 뜻깊은 기회가 되었습니다 😉',
      coverImage: '/images/2025/activities/news/sw-learning-seminar-2025-04-03/cover.png',
      date: '2025-04-03',
      galleryImages: [
        '/images/2025/activities/news/sw-learning-seminar-2025-04-03/cover.png',
      ],
    },
  ],

  academics: [
    {
      id: 'SSCCtal-system',
      category: 'academics',
      title: '동방 물품 대여 시스템',
      typeLabel: '프로젝트',
      content:
        '팀명: 동방예의지국\n팀원: 원영진(팀장, 임베디드), 김지성(백엔드), 송채원(프론트엔드), 정영인(프론트엔드)',
      coverImage: '/images/2025/activities/academics/SSCCtal-system/cover.png',
      date: '2025-03-29',
      galleryImages: [
        '/images/2025/activities/academics/SSCCtal-system/cover.png',
        '/images/2025/activities/academics/SSCCtal-system/gallery-1.png',
        '/images/2025/activities/academics/SSCCtal-system/gallery-2.jpg',
        '/images/2025/activities/academics/SSCCtal-system/gallery-3.png',
        '/images/2025/activities/academics/SSCCtal-system/gallery-4.png',
        '/images/2025/activities/academics/SSCCtal-system/gallery-5.png',
      ],
    },
    {
      id: 'public-data-idea-contest',
      category: 'academics',
      title: '공공데이터 활용 아이디어 공모전',
      typeLabel: '대외활동',
      content:
        '진행자: 원영진, 국혜경',
      coverImage: '/images/2025/activities/academics/public-data-idea-contest/cover.jpg',
      date: '2025-04-14',
      galleryImages: [
        '/images/2025/activities/academics/public-data-idea-contest/cover.jpg',
      ],
    },
    {
      id: 'spartan-winning-camp-unithon-2025',
      category: 'academics',
      title: '2025 스파르탄 위닝 창업 캠프 - 교내 연합 해커톤 UNITHON',
      typeLabel: '대외활동',
      content:
        '팀명: 숭방예의지국\n팀원: 원영진(팀장, 임베디드), 김지성(백엔드), 송채원(프론트엔드), 정영인(프론트엔드)',
      coverImage: '/images/2025/activities/academics/spartan-winning-camp-unithon-2025/cover.png',
      date: '2025-08-07',
      galleryImages: [
        '/images/2025/activities/academics/spartan-winning-camp-unithon-2025/cover.png',
        '/images/2025/activities/academics/spartan-winning-camp-unithon-2025/gallery-1.jpg',
        '/images/2025/activities/academics/spartan-winning-camp-unithon-2025/gallery-2.jpg',
        '/images/2025/activities/academics/spartan-winning-camp-unithon-2025/gallery-3.png',
      ],
    },
    {
      id: 'embedded-sw-contest-23-2025',
      category: 'academics',
      title: '제23회 임베디드SW경진대회',
      typeLabel: '대외활동',
      content:
        '팀명: 동방예의지국\n팀원: 원영진(팀장, 임베디드), 김지성(백엔드), 송채원(프론트엔드), 정영인(Full Stack)',
      coverImage: '/images/2025/activities/academics/embedded-sw-contest-23-2025/cover.png',
      date: '2025-04-30',
      galleryImages: [
        '/images/2025/activities/academics/embedded-sw-contest-23-2025/cover.png',
        '/images/2025/activities/academics/embedded-sw-contest-23-2025/gallery-1.png',
        '/images/2025/activities/academics/embedded-sw-contest-23-2025/gallery-2.png',
        '/images/2025/activities/academics/embedded-sw-contest-23-2025/gallery-3.png',
        '/images/2025/activities/academics/embedded-sw-contest-23-2025/gallery-4.png',
        '/images/2025/activities/academics/embedded-sw-contest-23-2025/gallery-5.png',
        '/images/2025/activities/academics/embedded-sw-contest-23-2025/gallery-6.png',
        '/images/2025/activities/academics/embedded-sw-contest-23-2025/gallery-7.png',
        '/images/2025/activities/academics/embedded-sw-contest-23-2025/gallery-8.png',
      ],
    },
    {
      id: 'spring-introduction-2025',
      category: 'academics',
      title: '스프링 입문',
      typeLabel: '스터디',
      content:
        '스터디장: 송채원\n\n기술 스택: Java, Spring',
      coverImage: '/images/2025/activities/academics/spring-introduction-2025/cover.png',
      date: '2025-11-18',
      galleryImages: [
        '/images/2025/activities/academics/spring-introduction-2025/cover.png',
        '/images/2025/activities/academics/spring-introduction-2025/gallery-1.png',
      ],
    },
    {
      id: 'robot-is-the-future-study-2025',
      category: 'academics',
      title: '로봇이 미래다',
      typeLabel: '스터디',
      content:
        '스터디장: 박현수\n기술 스택: 임베디드, C',
      coverImage: '/images/2025/activities/academics/robot-is-the-future-study-2025/cover.png',
      date: '2025-11-14',
      galleryImages: [
        '/images/2025/activities/academics/robot-is-the-future-study-2025/cover.png',
        '/images/2025/activities/academics/robot-is-the-future-study-2025/gallery-1.png',
        '/images/2025/activities/academics/robot-is-the-future-study-2025/gallery-2.jpg',
        '/images/2025/activities/academics/robot-is-the-future-study-2025/gallery-3.jpg',
      ],
    },
    {
      id: 'graduate-school-paper-review-study-2025',
      category: 'academics',
      title: '대학원 갈래? 논문 리뷰 스터디',
      typeLabel: '스터디',
      content:
        '스터디장: 김영준',
      coverImage: '/images/2025/activities/academics/graduate-school-paper-review-study-2025/cover.png',
      date: '2025-10-03',
      galleryImages: [
        '/images/2025/activities/academics/graduate-school-paper-review-study-2025/cover.png',
      ],
    },
    {
      id: 'BE-introduction-2025',
      category: 'academics',
      title: 'BE 입문',
      typeLabel: '스터디',
      content:
        '스터디장: 김지성\n기술 스택: MySQL, FastAPI',
      coverImage: '/images/2025/activities/academics/BE-introduction-2025/cover.png',
      date: '2025-09-29',
      galleryImages: [
        '/images/2025/activities/academics/BE-introduction-2025/cover.png',
      ],
    },
    {
      id: 'booklog-2025',
      category: 'academics',
      title: '책 사놓고 안읽는 사람들 구출 스터디',
      typeLabel: '스터디',
      content:
        '스터디장: 이호근',
      coverImage: '/images/2025/activities/academics/booklog-2025/cover.png',
      date: '2025-09-29',
      galleryImages: [
        '/images/2025/activities/academics/booklog-2025/cover.png',
        '/images/2025/activities/academics/booklog-2025/gallery-1.png',
        '/images/2025/activities/academics/booklog-2025/gallery-2.png',
        '/images/2025/activities/academics/booklog-2025/gallery-3.png',
      ],
    },
    {
      id: 'mobile-programming-major-study-2025',
      category: 'academics',
      title: '학술애융 전공 스터디(모바일 프로그래밍)',
      typeLabel: '스터디',
      content:
        '스터디장: 정주행\n기술 스택: Java, Android',
      coverImage: '/images/2025/activities/academics/mobile-programming-major-study-2025/cover.png',
      date: '2025-09-29',
      galleryImages: [
        '/images/2025/activities/academics/mobile-programming-major-study-2025/cover.png',
        '/images/2025/activities/academics/mobile-programming-major-study-2025/gallery-1.png',
        '/images/2025/activities/academics/mobile-programming-major-study-2025/gallery-2.png',
      ],
    },
    {
      id: 'aws-ccp-3week-study-2025',
      category: 'academics',
      title: '3주만에 준비하는 AWS Certified Cloud Practitioner',
      typeLabel: '스터디',
      content:
        '스터디장: 이호근\n기술 스택: AWS',
      coverImage: '/images/2025/activities/academics/aws-ccp-3week-study-2025/cover.png',
      date: '2025-07-23',
      galleryImages: [
        '/images/2025/activities/academics/aws-ccp-3week-study-2025/cover.png',
        '/images/2025/activities/academics/aws-ccp-3week-study-2025/gallery-1.png',
        '/images/2025/activities/academics/aws-ccp-3week-study-2025/gallery-2.png',
      ],
    },
    {
      id: 'C-introduction-2025',
      category: 'academics',
      title: 'C 입문 트랙',
      typeLabel: '트랙',
      content:
        '트랙장: 원영진\n기술 스택: C',
      coverImage: '/images/2025/activities/academics/C-introduction-2025/cover.png',
      date: '2025-04-02',
      galleryImages: [
        '/images/2025/activities/academics/C-introduction-2025/cover.png',
        '/images/2025/activities/academics/C-introduction-2025/gallery-1.png',
      ],
    },
    {
      id: 'operating-system-study-2025',
      category: 'academics',
      title: '모두해요 OS의 늪',
      typeLabel: '스터디',
      content:
        '스터디장: 권나현\n기술 스택: Linux',
      coverImage: '/images/2025/activities/academics/operating-system-study-2025/cover.png',
      date: '2025-03-31',
      galleryImages: [
        '/images/2025/activities/academics/operating-system-study-2025/cover.png',
        '/images/2025/activities/academics/operating-system-study-2025/gallery-1.png',
      ],
    },
    {
      id: 'python-introduction-2025',
      category: 'academics',
      title: 'Python 입문 트랙',
      typeLabel: '트랙',
      content:
        '트랙장: 김성규\n기술 스택: Python',
      coverImage: '/images/2025/activities/academics/python-introduction-2025/cover.png',
      date: '2025-03-31',
      galleryImages: [
        '/images/2025/activities/academics/python-introduction-2025/cover.png',
      ],
    },
    {
      id: 'js-FE-introduction-2025',
      category: 'academics',
      title: 'JavaScript FE 스터디',
      typeLabel: '스터디',
      content:
        '스터디장: 송채원\n기술 스택: Java Script',
      coverImage: '/images/2025/activities/academics/js-FE-introduction-2025/cover.png',
      date: '2025-03-28',
      galleryImages: [
        '/images/2025/activities/academics/js-FE-introduction-2025/cover.png',
        '/images/2025/activities/academics/js-FE-introduction-2025/gallery-1.png',
        '/images/2025/activities/academics/js-FE-introduction-2025/gallery-2.png',
        '/images/2025/activities/academics/js-FE-introduction-2025/gallery-3.png',
        '/images/2025/activities/academics/js-FE-introduction-2025/gallery-4.png',
      ],
    },
    {
      id: 'pytorch-AI-2025',
      category: 'academics',
      title: 'PyTorch AI 스터디',
      typeLabel: '스터디',
      content:
        '스터디장: 소현우\n기술 스택: AI, PyTorch',
      coverImage: '/images/2025/activities/academics/pytorch-AI-2025/cover.png',
      date: '2025-03-27',
      galleryImages: [
        '/images/2025/activities/academics/pytorch-AI-2025/cover.png',
      ],
    },
    {
      id: 'android-introduction-2025',
      category: 'academics',
      title: 'Android 입문 스터디',
      typeLabel: '스터디',
      content:
        '스터디장: 신민준\n기술 스택: Kotlin',
      coverImage: '/images/2025/activities/academics/android-introduction-2025/cover.png',
      date: '2025-03-26',
      galleryImages: [
        '/images/2025/activities/academics/android-introduction-2025/cover.png',
        '/images/2025/activities/academics/android-introduction-2025/gallery-1.png',
      ],
    },
    {
      id: 'python-BE-introduction-2025',
      category: 'academics',
      title: 'Python BE 스터디',
      typeLabel: '스터디',
      content:
        '스터디장: 김지성\n기술 스택: MySQL, FastAPI',
      coverImage: '/images/2025/activities/academics/python-BE-introduction-2025/cover.png',
      date: '2025-03-24',
      galleryImages: [
        '/images/2025/activities/academics/python-BE-introduction-2025/cover.png',
        '/images/2025/activities/academics/python-BE-introduction-2025/gallery-1.png',
        '/images/2025/activities/academics/python-BE-introduction-2025/gallery-2.png',
      ],
    },
  ],

  events: [
    {
      id: 'homecoming-2024',
      category: 'events',
      title: '2024년 홈커밍 데이',
      typeLabel: 'OB/YB 교류',
      content:
        '지난 1월 17일, 사당역 인근에서 2024년 SSCC 졸업 동문회 홈커밍 데이가 개최되었습니다!\n\n졸업하신 동문 선배님들과 재학생들이 한자리에 모여 반갑게 인사를 나누고, 선후배 간의 끈끈한 네트워크를 다지는 시간을 가졌습니다! 🤝\ 선배님들의 아낌없는 조언과 응원 덕분에 앞으로의 동아리 활동에 큰 원동력을 얻을 수 있는 뜻깊은 기회가 되었습니다 😉',
      coverImage: '/images/2025/activities/events/homecoming-2024/cover.png',
      date: '2025-01-17',
      galleryImages: [
        '/images/2025/activities/events/homecoming-2024/cover.png',
        '/images/2025/activities/events/homecoming-2024/gallery-1.png',
      ],
    },
    {
      id: '1st-semester-opening-general-meeting-2025',
      category: 'events',
      title: '2025년 1학기 개강총회',
      typeLabel: '행사',
      content:
        '지난 3월 21일, 숭덕경상관에서 2025년 1학기 SSCC 개강총회가 진행되었습니다!\n\n이번 개강총회에서는 신입 부원들을 위한 동아리 소개와 더불어, 2025년 한 해 동안 진행될 알찬 활동 계획들을 함께 나누는 시간을 가졌습니다! 🎉\ 총회 이후에는 \'짚동가리쌩주\'에서 즐거운 뒷풀이까지 이어지며, 서로 끈끈한 친목을 다지고 활기찬 한 학기를 시작할 수 있는 뜻깊은 시간이 되었습니다 😉',
      coverImage: '/images/2025/activities/events/1st-semester-opening-general-meeting-2025/cover.jpg',
      date: '2025-03-21',
      galleryImages: [
        '/images/2025/activities/events/1st-semester-opening-general-meeting-2025/cover.jpg',
        '/images/2025/activities/events/1st-semester-opening-general-meeting-2025/gallery-1.jpg',
        '/images/2025/activities/events/1st-semester-opening-general-meeting-2025/gallery-2.jpg',
        '/images/2025/activities/events/1st-semester-opening-general-meeting-2025/gallery-3.jpg',
        '/images/2025/activities/events/1st-semester-opening-general-meeting-2025/gallery-4.jpg',
      ],
    },
    {
      id: 'club-networking-event-2025',
      category: 'events',
      title: '2025년 슼쳐간 인연',
      typeLabel: '친목',
      content:
        '지난 3월 24일부터 5월 10일까지, SSCC 부원들을 위한 슼쳐간 인연이 진행되었습니다!\n\n선후배 및 동기들과 함께 밥약도 하고 미션도 수행하며, 동아리 안에서 소중하고 새로운 인연을 만들어가는 특별한 시간을 가졌습니다! ✨\n 이번 행사를 통해 서로 더욱 가까워지고, 끈끈한 유대감을 나눌 수 있는 뜻깊은 기회가 되었습니다 😉',
      coverImage: '/images/2025/activities/events/club-networking-event-2025/cover.jpg',
      date: '2025-03-24',
      galleryImages: [
        '/images/2025/activities/events/club-networking-event-2025/cover.jpg',
        '/images/2025/activities/events/club-networking-event-2025/gallery-1.jpg',
        '/images/2025/activities/events/club-networking-event-2025/gallery-2.jpg',
        '/images/2025/activities/events/club-networking-event-2025/gallery-3.jpg',
        '/images/2025/activities/events/club-networking-event-2025/gallery-4.jpg',
      ],
    },
    {
      id: '1st-semester-lightning-meetup-2025',
      category: 'events',
      title: '2025년 1학기 번개 활동',
      typeLabel: '행사',
      content:
        '지난 5월 9일, 신림역 인근 파티룸에서 번개 모임이 진행되었습니다!\n\n학업과 프로젝트로 바쁜 와중에도 삼삼오오 모여 맛있는 음식도 나누고 즐겁게 담소도 나누며, 스트레스를 훌훌 털어버리는 신나는 시간을 가졌습니다! 🍕\n 이번 모임을 통해 회원들끼리 격의 없이 소통하며, 서로 더욱 돈독한 우정을 다질 수 있는 뜻깊은 시간이 되었습니다 😉',
      coverImage: '/images/2025/activities/events/1st-semester-lightning-meetup-2025/cover.jpg',
      date: '2025-05-09',
      galleryImages: [
        '/images/2025/activities/events/1st-semester-lightning-meetup-2025/cover.jpg',
        '/images/2025/activities/events/1st-semester-lightning-meetup-2025/gallery-1.jpg',
        '/images/2025/activities/events/1st-semester-lightning-meetup-2025/gallery-2.jpg',
        '/images/2025/activities/events/1st-semester-lightning-meetup-2025/gallery-3.jpg',
        '/images/2025/activities/events/1st-semester-lightning-meetup-2025/gallery-4.jpg',
      ],
    },
    {
      id: 'unicosa-seminar-afterparty-2025',
      category: 'events',
      title: '유니코사 연합 세미나 뒤풀이',
      typeLabel: '친목',
      content:
        '지난 5월 17일, 2025 IT대학 X UNICOSA 연합 세미나 ‘미래콘서트’가 성황리에 마무리된 후 숯가마바베큐치킨에서 뒤풀이가 진행되었습니다!\n\n세미나의 열기를 그대로 이어가며, 맛있는 음식을 함께 유니코사 소속 동아리원들과 활발한 네트워킹을 진행했습니다! 🍗\n 이번 모임을 통해 다양한 사람들과 교류하며 한층 더 넓은 시야와 인연을 만들어갈 수 있는 뜻깊은 시간이 되었습니다 😉',
      coverImage: '/images/2025/activities/events/unicosa-seminar-afterparty-2025/cover.jpg',
      date: '2025-05-17',
      galleryImages: [
        '/images/2025/activities/events/unicosa-seminar-afterparty-2025/cover.jpg',
        '/images/2025/activities/events/unicosa-seminar-afterparty-2025/gallery-1.jpg',
      ],
    },
    {
      id: 'summer-MT-2025',
      category: 'events',
      title: '2025 여름 MT',
      typeLabel: '행사',
      content:
        '지난 6월 28일, 대성리 인근에서 여름 MT가 진행되었습니다!\n\n시원한 자연 속에서 맛있는 바베큐도 즐기고 재미있는 레크리에이션도 함께하며, 한 학기 동안의 학업 스트레스를 시원하게 날려버리는 시간을 가졌습니다! 🍉\n 이번 MT를 통해 선후배 간의 끈끈한 단합력과 잊지 못할 여름날의 소중한 추억을 만들어갈 수 있는 뜻깊은 시간이 되었습니다 😉',
      coverImage: '/images/2025/activities/events/summer-MT-2025/cover.jpeg',
      date: '2025-06-28',
      galleryImages: [
        '/images/2025/activities/events/summer-MT-2025/cover.jpeg',
        '/images/2025/activities/events/summer-MT-2025/gallery-1.jpg',
        '/images/2025/activities/events/summer-MT-2025/gallery-2.jpg',
      ],
    },
    {
      id: '2nd-semester-opening-general-meeting-2025',
      category: 'events',
      title: '2025년 2학기 개강총회',
      typeLabel: '행사',
      content:
        '지난 9월 10일, 숭덕경상관에서 2025년 2학기 개강총회가 진행되었습니다!\n\n2학기를 맞아 새롭게 합류한 신입 부원들을 환영하고, 하반기에 진행될 다양한 스터디와 동아리 활동 계획을 함께 나누는 알찬 시간을 가졌습니다! 🎉\ 이번 개강총회를 통해 새로운 학기의 목표를 다지고, 서로 반갑게 인사하며 활기찬 2학기를 시작할 수 있는 뜻깊은 시간이 되었습니다 😉',
      coverImage: '/images/2025/activities/events/2nd-semester-opening-general-meeting-2025/cover.png',
      date: '2025-09-10',
      galleryImages: [
        '/images/2025/activities/events/2nd-semester-opening-general-meeting-2025/cover.png',
        '/images/2025/activities/events/2nd-semester-opening-general-meeting-2025/gallery-1.jpg',
      ],
    },
    {
      id: 'wirangje-festival-booth-2025',
      category: 'events',
      title: '2025년 위량제 축제 주점 운영',
      typeLabel: '행사',
      content:
        '지난 9월 24일, 숭실대학교 가을 축제 "위량제"에서 SSCC 동아리 주점이 운영되었습니다!\n\n가을 축제의 뜨거운 열기 속에서 부원들이 다 함께 기획하고 준비한 맛있는 음식들을 선보이며, 캠퍼스의 낭만을 만끽하는 신나는 시간을 가졌습니다! 🍻\ 이번 주점 운영을 통해 끈끈한 단합력을 다지고, 축제를 찾아주신 많은 학우분들과 잊지 못할 추억을 쌓을 수 있는 뜻깊은 시간이 되었습니다 😉',
      coverImage: '/images/2025/activities/events/wirangje-festival-booth-2025/cover.png',
      date: '2025-09-24',
      galleryImages: [
        '/images/2025/activities/events/wirangje-festival-booth-2025/cover.png',
      ],
    },
    {
      id: 'closing-general-meeting-homecoming-day-2025',
      category: 'events',
      title: '2025년 종강총회 & 홈커밍 데이',
      typeLabel: '행사',
      content:
        '지난 12월 19일, 숭덕경상관에서 2025년 SSCC 졸업 동문회 홈커밍 데이 및 2학기 종강총회가 진행되었습니다!\n\n졸업하신 동문 선배님들과 재학생들이 한자리에 모여 2학기 활동을 성공적으로 마무리하고, 선후배 간의 따뜻한 연말을 함께 나누는 시간을 가졌습니다! 🎄\ 이번 행사를 통해 한 해 동안의 값진 추억을 되돌아보고, 다가올 2026년을 힘차게 맞이할 수 있는 뜻깊은 시간이 되었습니다 😉',
      coverImage: '/images/2025/activities/events/closing-general-meeting-homecoming-day-2025/cover.png',
      date: '2025-12-19',
      galleryImages: [
        '/images/2025/activities/events/closing-general-meeting-homecoming-day-2025/cover.png',
        '/images/2025/activities/events/closing-general-meeting-homecoming-day-2025/gallery-1.jpg',
        '/images/2025/activities/events/closing-general-meeting-homecoming-day-2025/gallery-2.jpg',
      ],
    },
    {
      id: 'operations-handover-lt-2026',
      category: 'events',
      title: '2026년 운영진 인수인계 & LT',
      typeLabel: '운영',
      content:
        '지난 1월 9일, 용산역 인근에서 2026년 운영진 인수인계 & LT가 진행되었습니다!\n\n2025년을 훌륭하게 이끌어주신 이전 운영진분들께 감사를 전하고, 2026년 SSCC를 새롭게 이끌어갈 신규 운영진들이 모여 한 해의 비전과 계획을 세우는 알찬 시간을 가졌습니다! ✨\ 이번 LT를 통해 운영진끼리 끈끈한 팀워크를 다지고, 부원들을 위해 더욱 발전하는 동아리를 만들어갈 원동력을 얻을 수 있는 뜻깊은 시간이 되었습니다 😉',
      coverImage: '/images/2026/activities/events/operations-handover-lt-2026/cover.png',
      date: '2026-01-09',
      galleryImages: [
        '/images/2026/activities/events/operations-handover-lt-2026/cover.png',
        '/images/2026/activities/events/operations-handover-lt-2026/gallery-1.png',
      ],
    },
  ],
};

// 전체 목록이 필요한 곳을 위해 flat 버전도 함께 제공
export const ACTIVITIES: Activity[] = Object.values(ACTIVITIES_BY_CATEGORY).flat();
