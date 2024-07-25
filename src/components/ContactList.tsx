// 파일명: ContactList.tsx
// 확장자: .tsx (TypeScript React)
// 기능: 연락처 목록을 표시하는 컴포넌트
// 연결: App.tsx에서 import하여 사용, types.ts의 Contact와 Page 타입 사용

import React from 'react';
import { Contact, Page } from '../types';
import { Edit } from 'lucide-react';

// Props 타입 정의
type ContactListProps = {
  contacts: Contact[];
  setSelectedContact: (contact: Contact) => void;
  setCurrentPage: (page: Page) => void;
};

const ContactList: React.FC<ContactListProps> = ({ contacts, setSelectedContact, setCurrentPage }) => {
  // 컴포넌트 렌더링
  return (
    <div className="contact-list">
      {contacts.length === 0 ? ( //검색 기능 추가 하면서 추가 결과가 없을 경우 적절한 메시지가 표시됩니다.
        <p>검색 결과가 없습니다.</p>
      ) : (
        (contacts.map(contact => (
          <div key={contact.id} className="contact-item">
            {/* 연락처 정보 표시 및 상세 페이지로 이동 */}
            <span onClick={() => { setSelectedContact(contact); setCurrentPage(Page.Detail); }}>
              {contact.name} - {contact.phone}
            </span>
            {/* 수정 버튼 */}
            <button onClick={() => { setSelectedContact(contact); setCurrentPage(Page.Edit); }}>
              <Edit size={16} />
            </button>
          </div>
        ))))}
    </div>
  );
};

export default ContactList;