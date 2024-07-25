// 파일명: ContactForm.tsx
// 확장자: .tsx (TypeScript React)
// 기능: 연락처 추가 및 수정을 위한 폼 컴포넌트
// 연결: App.tsx에서 import하여 사용, types.ts의 Contact 타입 사용

import React, { useState } from 'react';
import { Contact } from '../types';

// Props 타입 정의
type ContactFormProps = {
  contact: Contact | null;
  onSubmit: (contact: Contact) => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ contact, onSubmit }) => {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState(contact || { id: 0, name: '', phone: '' });

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Contact);
  };

  // 컴포넌트 렌더링
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text" name="name" value={formData.name}
        onChange={e => setFormData({...formData, name: e.target.value})}
        placeholder="이름" required
      />
      <input
        type="tel" name="phone" value={formData.phone}
        onChange={e => setFormData({...formData, phone: e.target.value})}
        placeholder="전화번호" required
      />
      <input
        type="email" name="email" value={formData.email || ''}
        onChange={e => setFormData({...formData, email: e.target.value})}
        placeholder="이메일"
      />
      <input
        type="date" name="birthday" value={formData.birthday || ''}
        onChange={e => setFormData({...formData, birthday: e.target.value})}
      />
      <input
        type="text" name="company" value={formData.company || ''}
        onChange={e => setFormData({...formData, company: e.target.value})}
        placeholder="직장"
      />
      <textarea
        name="memo" value={formData.memo || ''}
        onChange={e => setFormData({...formData, memo: e.target.value})}
        placeholder="메모"
      />
      <button type="submit">
        {contact ? '수정' : '추가'}
      </button>
    </form>
  );
};

export default ContactForm;