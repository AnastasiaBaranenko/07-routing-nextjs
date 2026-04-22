'use client'

import defaultCss from './NoteDetails.module.css';
import {fetchNoteById} from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export interface NoteDetailsClientProps{
id: string;
stylesPreview?: Record<string, string>; 
}

export function NoteDetailsClient({id, stylesPreview }: NoteDetailsClientProps){
const s = stylesPreview || defaultCss;

const {data: note, isLoading, error} = useQuery({
    queryKey: ['memos',id],
    queryFn: () => fetchNoteById(id, ),
    enabled: true,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })

  if(isLoading){
    return <p>Loading, please wait...</p>;
  }

  if(error || !note){
    return <p>Something went wrong.</p>;
  }

    return(
    <div className={s.container}>
	<div className={s.item}>
	  <div className={s.header}>
	    <h2>{note.title}</h2>
	  </div>
      <p className={s.tag}>{note.tag}</p>
	  <p className={s.content}>{note.content}</p>
	  <p className={s.date}>{note.createdAt}</p>
	</div>
</div>
    )
}