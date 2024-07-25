// 파일명: App.tsx
// 확장자: .tsx (TypeScript React)
// 기능: 주소록 애플리케이션의 메인 컴포넌트
// 연결: types.ts, ContactForm.tsx, ContactList.tsx, App.css를 import하여 사용
// xlsx 파일을 이용해 다운로드 및 업로드를 위해서 라이브러리 설치 npm install xlsx file-saver

import React, { useState, useEffect } from 'react';
import { X, Plus, List, LogOut, Download, Upload } from 'lucide-react'; // 데이터 백업 및 복원 기능을 구현하기 위해 Download, Upload 변수 추가
import { Contact, Page, SortOption } from './types'; //정렬을 위해 SortOption 변수 추가
import ContactForm from './components/ContactForm'; //ContactForm은 연락처 추가/수정 폼을 담당하는 컴포넌트입니다.
import ContactList from './components/ContactList'; //ContactList는 연락처 목록을 표시하는 컴포넌트입니다.
import SearchBar from './components/SearchBar'; // 주소록 검색 기능을 구현하기 위해 SearchBar.tsx 파일 추가 후 import
import * as XLSX from 'xlsx'; // 데이터 백업 및 복원 기능을 구현하기 위해 추가
import { saveAs } from 'file-saver';  // 데이터 백업 및 복원 기능을 구현하기 위해, file-saver의 타입 정의를 설치 > npm install --save-dev @types/file-saver
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
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.NameAsc); // 정렬을 위해 추가
  const [selectedGroup, setSelectedGroup] = useState<string>('모든 그룹'); // 그룹화를 위해 추가

  // 데이터 내보내기 함수
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(contacts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'contacts.xlsx');
  };

   // 데이터 가져오기 함수
   const importFromExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Contact[];
        setContacts(prevContacts => [...prevContacts, ...jsonData]);
      };
      reader.readAsArrayBuffer(file);
    }
  };

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

  // 정렬된 연락처 계산
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    switch (sortOption) {
      case SortOption.NameAsc:
        return a.name.localeCompare(b.name);
      case SortOption.NameDesc:
        return b.name.localeCompare(a.name);
      case SortOption.DateAdded:
        return b.id - a.id;  // ID가 큰 순서대로 (최근에 추가된 순)
      default:
        return 0;
    }
  });
  // 그룹 필터링 적용
  const groupFilteredContacts = selectedGroup === '모든 그룹' 
  ? sortedContacts 
  : sortedContacts.filter(contact => contact.group === selectedGroup);

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
            
            {/* 데이터 백업 및 복원 기능을 구현하기 위해 버튼 추가*/}
            <button onClick={exportToExcel} className="p-2 bg-green-500 text-white rounded">
              <Download size={20} />
            </button>
            <label className="p-2 bg-blue-500 text-white rounded cursor-pointer">
              <Upload size={20} />
              <input type="file" onChange={importFromExcel} className="hidden" accept=".xlsx" />
            </label>

          </div>



          {/* 현재 페이지에 따른 컴포넌트 렌더링 -검색, 정렬 기능을 추가를 위해 코드 수정*/}
          {currentPage === Page.List && (
            <>
              {/* 검색 바 추가 */}
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              {/* 정렬 옵션 선택 */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="mb-4 p-2 border rounded"
              >
                {Object.values(SortOption).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* 그룹 필터 선택 */}
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="mb-4 ml-2 p-2 border rounded"
              >
                <option value="모든 그룹">모든 그룹</option>
                <option value="가족">가족</option>
                <option value="친구">친구</option>
                <option value="직장">직장</option>
                <option value="기타">기타</option>
              </select>
              {/* 필터링, 정렬, 그룹화된 연락처 목록 */}
              <ContactList 
                contacts={groupFilteredContacts} // 그룹화를 추가하기 위해 filteredContacts > groupFilteredContacts 로 변경
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