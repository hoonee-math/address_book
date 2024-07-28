// 파일명: ContactList.tsx
// 확장자: .tsx (TypeScript React)
// 기능: 연락처 목록을 표시하는 컴포넌트
// 연결: App.tsx에서 import하여 사용, types.ts의 Contact와 Page 타입 사용

import React, { useState } from 'react'; //hover 효과를 주기 위해 { useState } 추가
import { Contact, Page } from '../types';
import { Edit } from 'lucide-react';

// Props 타입 정의
type ContactListProps = {
  contacts: Contact[];
  setSelectedContact: (contact: Contact) => void;
  setCurrentPage: (page: Page) => void;
};

const ContactList: React.FC<ContactListProps> = ({ contacts, setSelectedContact, setCurrentPage }) => {
  // 수정: hoveredId의 타입을 number | string | null로 변경
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
 
  // 컴포넌트 렌더링
  return (
    <div className="contact-list">
      {contacts.length === 0 ? ( //검색 기능 추가 하면서 추가 결과가 없을 경우 적절한 메시지가 표시됩니다.
        <p>검색 결과가 없습니다.</p>
      ) : (
        // 연락처 목록 렌더링
        (contacts.map(contact => (
          <div 
            // 수정: key prop을 문자열로 변환하여 사용
            key={String(contact.id)}
            className="contact-item flex justify-between items-center p-2 cursor-pointer"
            // 인라인 스타일을 사용하여 호버 효과 구현
            style={{
              backgroundColor: hoveredId === contact.id ? '#777777' : 'transparent',
              transition: 'background-color 0.15s ease-in-out'
            }}
            // 마우스 이벤트 핸들러로 호버 상태 관리
            onMouseEnter={() => setHoveredId(contact.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* 연락처 정보 표시 및 상세 페이지로 이동 */}
            <span 
              onClick={() => { setSelectedContact(contact); setCurrentPage(Page.Detail); }}
              className="flex-grow"
            >
              {contact.name} - {contact.phone}
            </span>
            {/* 수정 버튼 */}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); // 이벤트 버블링 방지
                setSelectedContact(contact); 
                setCurrentPage(Page.Edit); 
              }}
              className="text-blue-500 hover:text-blue-600 active:text-blue-700 transition duration-150 ease-in-out"
              
              // 인라인 스타일을 사용하여 버튼 호버 효과 구현
              // 현재는 바로 위 줄 className="text-blue-500 hover:text-blue-600 active:text-blue-700 transition duration-150 ease-in-out"
              // 이 코드 대신에 밑에가 적용되는 중, 위 아래 둘 중 하나만 해도 됨!
              // 위에서 행에 hover 효과 줄때는 className으로 해결되지 않아서 스타일 onMouse로 해결함
              style={{
                color: '#3b82f6',
                transition: 'color 0.15s ease-in-out'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#3b82f6'}
            
            >
              <Edit size={16} />
            </button>
          </div>
        ))))}
    </div>
  );
};

export default ContactList;