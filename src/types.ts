// 파일명: types.ts
// 확장자: .ts (TypeScript)
// 기능: 애플리케이션에서 사용되는 타입 정의
// 연결: App.tsx, ContactForm.tsx, ContactList.tsx에서 import하여 사용

// 연락처 타입 정의
export type Contact = {
    id: number;
    name: string;
    phone: string;
    email?: string;
    birthday?: string;
    company?: string;
    memo?: string;
  };
  
  // 페이지 열거형 정의
  export enum Page { List, Add, Edit, Detail, Login }