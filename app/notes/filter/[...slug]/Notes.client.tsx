'use client'

import NoteList from '@/components/NoteList/NoteList';
import type {Note} from '@/types/note';

export interface NotesClientProps{
    category: string;
    initialNotes: Note[];
}

export default function NotesClient({category, initialNotes}: NotesClientProps){
    return(
        <NoteList notes={initialNotes} />
    )
}