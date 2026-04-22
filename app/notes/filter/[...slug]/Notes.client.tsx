'use client'

import{useQuery, keepPreviousData } from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './NotesPage.module.css'
import toast, { Toaster } from 'react-hot-toast';

export interface NotesClientProps{
    tag: string;
}

export default function NotesClient({tag}: NotesClientProps){
 const [search, setSearch] = useState('');
 const [page, setPage] = useState(1);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const debouncedSearch = useDebouncedCallback(
    (value) => {
      setSearch(value);
    }, 500);

const handleSearch = (newValue:string) => {
    setPage(1);
    debouncedSearch(newValue);
};

const { data, isSuccess } = useQuery({
    queryKey: ['notes',search, page, tag],
    queryFn: () => fetchNotes(search, page, tag),
    enabled: true,
    placeholderData: keepPreviousData,
  });
 useEffect(() => {
    if(isSuccess && data?.notes.length === 0 && search !== ''){
toast.error('No notes found for your request.', {
      id: 'no-notes-found',});
 }},[isSuccess, data, search]);

    return(
        <div className={css.app}>
          <Toaster position="top-right" reverseOrder={false} />
	<header className={css.toolbar}> 
		<SearchBox onChange={handleSearch} />     
		  {data && data?.totalPages > 1 && 
      (<Pagination     
    totalPages={data.totalPages} 
      currentPage={page}
    onPageChange={setPage}/> 
    )}
		<button className={css.button} onClick={() => setIsModalOpen(true)} >
      Create note +</button>
  </header>

  {isSuccess && data?.notes.length > 0 && (
  <NoteList 
    notes={data.notes} />
     
    )}
    {isModalOpen && (
          <Modal isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)}    
            />
            </Modal>
    )}
            </div>
        );
}