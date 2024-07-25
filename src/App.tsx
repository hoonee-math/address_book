import React, { useState, useEffect } from 'react';
import { X, Plus, List, Edit, LogOut } from 'lucide-react';

type Contact = {
  id: number;
  name: string;
  phone: string;
  email?: string;
  birthday?: string;
  company?: string;
  memo?: string;
};

enum Page { List, Add, Edit, Detail, Login }

const AddressBook = () => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const login = (email: string, password: string) => {
    // 간단한 로그인 검증 (실제 환경에서는 이렇게 하면 안 됩니다!)
    if (email === "test@example.com" && password === "password") {
      setIsAuthenticated(true);
      setCurrentPage(Page.List);
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage(Page.Login);
  };

  const addContact = (newContact: Omit<Contact, 'id'>) => {
    setContacts(prev => [...prev, { ...newContact, id: Date.now() }]);
    setCurrentPage(Page.List);
  };

  const updateContact = (updatedContact: Contact) => {
    setContacts(prev => prev.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ));
    setCurrentPage(Page.List);
  };

  const deleteContact = (id: number) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    setCurrentPage(Page.List);
  };

  const ContactForm = ({ contact, onSubmit }: { contact: Contact | null, onSubmit: (contact: Contact) => void }) => {
    const [formData, setFormData] = useState(contact || { id: 0, name: '', phone: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData as Contact);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text" name="name" value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          placeholder="이름" required className="w-full p-2 border rounded"
        />
        <input
          type="tel" name="phone" value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
          placeholder="전화번호" required className="w-full p-2 border rounded"
        />
        <input
          type="email" name="email" value={formData.email || ''}
          onChange={e => setFormData({...formData, email: e.target.value})}
          placeholder="이메일" className="w-full p-2 border rounded"
        />
        <input
          type="date" name="birthday" value={formData.birthday || ''}
          onChange={e => setFormData({...formData, birthday: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text" name="company" value={formData.company || ''}
          onChange={e => setFormData({...formData, company: e.target.value})}
          placeholder="직장" className="w-full p-2 border rounded"
        />
        <textarea
          name="memo" value={formData.memo || ''}
          onChange={e => setFormData({...formData, memo: e.target.value})}
          placeholder="메모" className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {contact ? '수정' : '추가'}
        </button>
      </form>
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">주소록</h1>
      {isAuthenticated ? (
        <>
          <div className="flex justify-between mb-4">
            <button onClick={() => setCurrentPage(Page.List)} className="p-2 bg-gray-200 rounded"><List size={20} /></button>
            <button onClick={() => { setSelectedContact(null); setCurrentPage(Page.Add); }} className="p-2 bg-gray-200 rounded"><Plus size={20} /></button>
            <button onClick={logout} className="p-2 bg-red-500 text-white rounded"><LogOut size={20} /></button>
          </div>
          {currentPage === Page.List && (
            <div>
              {contacts.map(contact => (
                <div key={contact.id} className="mb-2 p-2 border rounded flex justify-between items-center">
                  <span onClick={() => { setSelectedContact(contact); setCurrentPage(Page.Detail); }} className="cursor-pointer">
                    {contact.name} - {contact.phone}
                  </span>
                  <button onClick={() => { setSelectedContact(contact); setCurrentPage(Page.Edit); }} className="text-blue-500"><Edit size={16} /></button>
                </div>
              ))}
            </div>
          )}
          {currentPage === Page.Add && <ContactForm contact={null} onSubmit={addContact} />}
          {currentPage === Page.Edit && selectedContact && <ContactForm contact={selectedContact} onSubmit={updateContact} />}
          {currentPage === Page.Detail && selectedContact && (
            <div>
              <h2 className="text-xl font-bold mb-4">{selectedContact.name}</h2>
              <p><strong>전화번호:</strong> {selectedContact.phone}</p>
              {selectedContact.email && <p><strong>이메일:</strong> {selectedContact.email}</p>}
              {selectedContact.birthday && <p><strong>생일:</strong> {selectedContact.birthday}</p>}
              {selectedContact.company && <p><strong>직장:</strong> {selectedContact.company}</p>}
              {selectedContact.memo && <p><strong>메모:</strong> {selectedContact.memo}</p>}
              <div className="mt-4 space-x-2">
                <button onClick={() => setCurrentPage(Page.Edit)} className="p-2 bg-blue-500 text-white rounded">수정</button>
                <button onClick={() => deleteContact(selectedContact.id)} className="p-2 bg-red-500 text-white rounded">삭제</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); login(e.currentTarget.email.value, e.currentTarget.password.value); }} className="space-y-4">
          <input type="email" name="email" placeholder="이메일" required className="w-full p-2 border rounded" />
          <input type="password" name="password" placeholder="비밀번호" required className="w-full p-2 border rounded" />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">로그인</button>
        </form>
      )}
    </div>
  );
};

export default AddressBook;