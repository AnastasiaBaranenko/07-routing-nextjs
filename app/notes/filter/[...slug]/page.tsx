import {fetchNotesByTag} from '@/lib/api';
import NotesClient from './Notes.client';
import type { Note } from '@/types/note';

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPages({ params }: NotesPageProps){
const {slug} = await params;
  const category = slug?.[0] || 'all';
  const formattedTag = category === 'all' ? 'all' : category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const data = await fetchNotesByTag(1, formattedTag === 'all' ? undefined : formattedTag);
  const notesData: Note[] = Array.isArray(data) ? data : (data?.notes || []);
  
    return(
      <section>
        <NotesClient initialNotes={notesData} category={formattedTag}></NotesClient>
        </section>
    )
      
}