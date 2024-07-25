// 파일명: SearchBar.tsx
// 확장자: .tsx (TypeScript React)
// 기능: 연락처 검색을 위한 입력 필드를 제공하는 컴포넌트
// 연결: App.tsx에서 import하여 사용
/*컴포넌트의 주요 특징:

재사용성: 한 번 만든 컴포넌트를 여러 곳에서 재사용할 수 있습니다.
독립성: 각 컴포넌트는 독립적으로 동작하며, 자체적인 상태와 로직을 가질 수 있습니다.
조합 가능: 작은 컴포넌트들을 조합하여 더 큰 컴포넌트나 전체 애플리케이션을 만들 수 있습니다.
유지보수 용이성: UI를 작은 단위로 나누어 관리하므로 유지보수가 쉬워집니다.*/


import React from 'react';

// Props 타입 정의
type SearchBarProps = {
  searchTerm: string;            // 현재 검색어
  setSearchTerm: (term: string) => void;  // 검색어를 업데이트하는 함수
};

// SearchBar 컴포넌트 정의
const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="연락처 검색..."  // 플레이스홀더 텍스트
      value={searchTerm}          // 입력 필드의 현재 값
      onChange={(e) => setSearchTerm(e.target.value)}  // 값이 변경될 때 호출되는 함수
      className="w-full p-2 mb-4 border rounded"  // Tailwind CSS 클래스
    />
  );
};

export default SearchBar;