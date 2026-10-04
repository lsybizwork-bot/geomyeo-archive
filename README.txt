검여 유희강 K-Culture 프로젝트 아카이브 – 홈페이지 게시 안내
================================================================

1. 올리는 방법
   - 이 폴더(geomyeo-archive) 전체를 재단 웹서버에 그대로 업로드합니다.
     예) www.iscf.kr/geomyeo/  →  서버의 웹 루트 아래 geomyeo 폴더
   - 서버 프로그램(PHP, DB 등)이 필요 없는 정적 페이지입니다.
   - 폴더 안의 파일 구성과 이름은 바꾸지 마세요(상대 경로로 연결되어 있습니다).

2. 재단 홈페이지에 연결하는 방법 (둘 중 하나)
   ① 메뉴·배너 링크:  <a href="/geomyeo/">검여 유희강 아카이브</a>
   ② 기존 페이지 안에 넣기:
      <iframe src="/geomyeo/" title="검여 유희강 K-Culture 프로젝트 아카이브"
              style="width:100%;height:100vh;border:0"></iframe>

3. 유족 인터뷰 영상 넣기
   - 영상을 유튜브에 올린 뒤 assets/js/archive.js 파일 11번째 줄의
     INTERVIEW_VIDEO_URL = "";  따옴표 안에 유튜브 주소를 넣으면
     '기념행사' 섹션에 영상이 나타납니다. 비워 두면 표시되지 않습니다.

4. 구성
   index.html                    페이지 본문
   assets/css/archive.css        디자인
   assets/js/archive.js          사진 크게 보기, 필터, 도록 넘겨보기, 영상 설정
   assets/img/                   작품·행사 사진 (웹용 압축본)
   assets/catalog/pages/         도록 넘겨보기용 페이지 이미지 87면
   assets/catalog/geomyeo-catalog-2026.pdf   도록 PDF 웹용 압축본(35MB, 원본 190MB)

5. 참고
   - 글꼴: 제목 함렛(Hahmlet)·큰 한자 본명조(Noto Serif KR)는 Google Fonts,
     본문 프리텐다드(Pretendard)는 jsDelivr CDN에서 불러옵니다.
     외부 접속이 막힌 환경에서는 PC 기본 글꼴(바탕·맑은 고딕)로 표시됩니다.
   - 예산·기부금 내역은 포함하지 않았습니다.
   - 내용 출처: 「검여 유희강 K-Culture 프로젝트 결과보고」(2026.06.25.),
     「2026 검여 유희강 K-Culture 프로젝트 도록」(2026.06.15.)
