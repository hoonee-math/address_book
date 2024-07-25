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
          버튼 타입을 submit으로 지정
          "submit" 타입의 버튼은 폼 내에서 클릭되었을 때 해당 폼의 데이터를 제출(submit)하는 역할을 합니다.
          이전에 사용되었을 수 있는 type="button"과는 다릅니다. "button" 타입은 단순히 클릭 이벤트만 발생시키고 폼 제출을 하지 않습니다.
      */}
      {/*<button type="submit">*/}
      {/* className="w-full p-2 bg-blue-500 text-white rounded"
          
          이 부분은 Tailwind CSS 클래스를 사용하여 버튼의 스타일을 지정합니다.
          w-full: 버튼의 너비를 부모 요소의 전체 너비로 설정합니다.
          p-2: 버튼에 패딩(여백)을 추가합니다.
          bg-blue-500: 버튼의 배경색을 파란색으로 설정합니다.
          text-white: 버튼의 텍스트 색상을 흰색으로 설정합니다.
          rounded: 버튼의 모서리를 둥글게 만듭니다.
      */}     
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        {contact ? '수정' : '추가'}
      </button>
    </form>
  );
};

export default ContactForm;