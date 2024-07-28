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
  const [formData, setFormData] = useState(contact || { id: 0, name: '', phone: '', group: '기타' }); // 그룹화를 위해 formData의 초기값에 'group' 필드 추가
  // hover 효과를 위해 상태 추가
  const [isHovered, setIsHovered] = useState(false);


  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Contact);
  };

  const buttonStyle = { // 호버 효과를 위해 버튼 스타일 상태 추가
    width: '100%',
    padding: '0.5rem',
    backgroundColor: isHovered ? '#2563eb' : '#3b82f6', // 호버 시 더 진한 파란색
    color: 'white',
    borderRadius: '0.25rem',
    transition: 'background-color 0.15s ease-in-out',
    cursor: 'pointer',
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
        min="1900-01-01"  //사용자가 선택할 수 있는 연도 범위가 1900년부터 2099년까지로 제한됩니다
        max="2099-12-31"
        className="w-full p-2 border rounded"
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

      {/* 그룹 선택 필드 추가, 그룹 선택을 위한 <select> 요소 추가 */}
      <select
        name="group"
        value={formData.group}
        onChange={e => setFormData({...formData, group: e.target.value})}
        className="w-full p-2 border rounded"
      >
        <option value="가족">가족</option>
        <option value="친구">친구</option>
        <option value="직장">직장</option>
        <option value="기타">기타</option>
      </select>


      {/* 버튼 타입 수정     
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">*/} 
      <button
        type="submit"
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {contact ? '수정' : '추가'}
      </button>
    </form>
  );
};

export default ContactForm;