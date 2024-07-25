// 파일명: App.tsx
// 확장자: .tsx (TypeScript React)
// 기능: 주소록 애플리케이션의 메인 컴포넌트
// 연결: types.ts, ContactForm.tsx, ContactList.tsx, App.css를 import하여 사용

import React, { useState, useEffect } from 'react';
import { X, Plus, List, LogOut } from 'lucide-react';
import { Contact, Page } from './types';
import ContactForm from './components/ContactForm'; //ContactForm은 연락처 추가/수정 폼을 담당하는 컴포넌트입니다.
import ContactList from './components/ContactList'; //ContactList는 연락처 목록을 표시하는 컴포넌트입니다.
import SearchBar from './components/SearchBar'; // 주소록 검색 기능을 구현하기 위해 SearchBar.tsx 파일 추가 후 import
import './App.css';

const AddressBook = () => {
  // 상태 관리
  const [contacts, setContacts] = useState<Contact[]>(() => {
    // localStorage에서 저장된 연락처 불러오기
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // 주소록 검색 기능을 구현하기 위해 SearchBar.tsx 파일 추가 후 import

  // 연락처 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // 로그인 함수
  const login = (email: string, password: string) => {
    if (email === "test@example.com" && password === "password") {
      setIsAuthenticated(true);
      setCurrentPage(Page.List);
    } else {
      alert("Invalid credentials");
    }
  };

  // 로그아웃 함수
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage(Page.Login);
  };

  // 연락처 추가 함수
  const addContact = (newContact: Omit<Contact, 'id'>) => {
    setContacts(prev => [...prev, { ...newContact, id: Date.now() }]);
    setCurrentPage(Page.List);
  };

  // 연락처 수정 함수
  const updateContact = (updatedContact: Contact) => {
    setContacts(prev => prev.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ));
    setCurrentPage(Page.List);
  };

  // 연락처 삭제 함수
  const deleteContact = (id: number) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    setCurrentPage(Page.List);
  };

  // 검색된 연락처 필터링
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 컴포넌트 렌더링
  return (
    <div className="address-book">
      <h1>주소록</h1>
      {isAuthenticated ? (
        <>
          {/* 네비게이션 버튼 */}
          <div className="nav-buttons">
            <button onClick={() => setCurrentPage(Page.List)}><List size={20} /></button>
            <button onClick={() => { setSelectedContact(null); setCurrentPage(Page.Add); }}><Plus size={20} /></button>
            <button onClick={logout}><LogOut size={20} /></button>
          </div>
          {/* {currentPage === Page.List && (
            <ContactList 
              contacts={contacts}
              setSelectedContact={setSelectedContact}
              setCurrentPage={setCurrentPage}
            />
          )} */}
          {/* 현재 페이지에 따른 컴포넌트 렌더링 -검색 기능 추가를 위해 코드 수정*/}
          {currentPage === Page.List && (
            <>
              {/* 검색 바 추가 */}
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              {/* 필터링된 연락처 목록으로 변경 */}
              <ContactList 
                contacts={filteredContacts}
                setSelectedContact={setSelectedContact}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        
          {currentPage === Page.Add && <ContactForm contact={null} onSubmit={addContact} />}
          {currentPage === Page.Edit && selectedContact && <ContactForm contact={selectedContact} onSubmit={updateContact} />}
          {currentPage === Page.Detail && selectedContact && (
            <div className="contact-detail">
              <h2>{selectedContact.name}</h2>
              <p><strong>전화번호:</strong> {selectedContact.phone}</p>
              {selectedContact.email && <p><strong>이메일:</strong> {selectedContact.email}</p>}
              {selectedContact.birthday && <p><strong>생일:</strong> {selectedContact.birthday}</p>}
              {selectedContact.company && <p><strong>직장:</strong> {selectedContact.company}</p>}
              {selectedContact.memo && <p><strong>메모:</strong> {selectedContact.memo}</p>}
              <div className="action-buttons">
                <button onClick={() => setCurrentPage(Page.Edit)}>수정</button>
                <button onClick={() => deleteContact(selectedContact.id)}>삭제</button>
              </div>
            </div>
          )}
        </>
      ) : (
        // 로그인 폼
        <form onSubmit={(e) => { e.preventDefault(); login(e.currentTarget.email.value, e.currentTarget.password.value); }} className="login-form">
          <input type="email" name="email" placeholder="이메일" required />
          <input type="password" name="password" placeholder="비밀번호" required />
          <button type="submit">로그인</button>
        </form>
      )}
    </div>
  );
};

export default AddressBook;