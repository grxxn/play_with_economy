# 경제야 놀자!
경제야 놀자는 경제와 제태크에 대해 공부를 하기 위한 서비스입니다.
오늘의 경제 지표에 대한 기록, 경제와 제태크에 대한 글과 오늘의 경제 뉴스를 살펴볼 수 있습니다. 

<br/>


## 📌 Link
[클릭시 해당 페이지로 이동합니다.](https://play-with-economy.vercel.app/diary, '경제야 놀자')

* (vercel postgres storage 사용 후 로딩 속도가 느립니다 .. 양해 부탁드립니다 ..🥲)

<br/>


## 🔎 Description
* 개발 기간: 2024.02 - 2024.05
* 개발 인원: 1명
* 배포: vercel
* 로컬에서는 <code>mySQL</code>을, 운영에서는 vercel에서 제공하는 postgres Storage를 이용했습니다.
* <code>Next.js App Router</code>를 사용했습니다.
* 프로젝트 기획, DB 설계 및 api 개발, 화면 개발, 배포 등 다양한 작업을 경험하였습니다.

<br/>


## 📝 Features
#### ✏️ 경제 다이어리
* 경제 지표나 기사 등에 대한 다이어리를 작성하고 확인할 수 있습니다.
* CRUD API를 사용하여 게시물을 조회, 작성, 수정, 삭제할 수 있습니다.
* TB_REC 테이블에는 다이어리 정보를, TB_REC_ARTCS 테이블에는 다이어리 속 기사 주소를 저장합니다.

#### ✏️ 경제 공부 게시판
* 경제, 재테크 기초에 대한 게시물을 볼 수 있습니다.
* 높은 가독성을 위해 카드 형식으로 배치하였습니다.
* react-infinite-scroll 라이브러리를 사용해 스크롤 시 게시글을 불러옵니다.
* 게시물 작성은 관리자만 가능합니다.

#### ✏️ 경제 기사 게시판
* Naver API를 사용해 기사 데이터 조회 후 출력합니다.
* 추후 기사 검색 기능 추가 예정입니다.


<br/>

## Getting Started
#### Installation
    npm install

#### Develop Mode
    npm run dev

#### Production
    npm run build


<br/>

## ⚙️ Stack  
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"> 
<img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white"> 
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"> 
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> 

* style: SCSS
* library: react-infinite-scroller, mysql2

<br/>


## 📂 Project Structure
```

├── app
│   ├── _lib
│   │    ├── common.ts
│   │    └── db.ts
│   ├── api
│   │    └── diary 
│   │          ├── getDiaryList/route.ts
│   │          └── setDiaryItem/route.ts
│   ├── article (page directory)
│   ├── diary (page directory)
│   ├── howtouse (page directory)
│   ├── learn (page directory)
│   ├── login (page directory)
│   ├── register (page directory)
│   ├── server
│   │    └── images
│   ├── components
│   │    ├── header.module.scss
│   │    └── Header.tsx
│   ├── api
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── utils
│       ├── types
│       └── utils
├── public
├── node_modules
├── .env.local
├── next.config.js
└── pagkage.json
```

## 