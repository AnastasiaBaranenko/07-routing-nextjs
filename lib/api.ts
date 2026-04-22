import type { NoteValues } from '../components/NoteForm/NoteForm';
import type {Note} from '../types/note';
import axios from "axios";

export interface Notes{
notes: Note[];
totalPages: number;
}

const key = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const url = 'https://notehub-public.goit.study/api'

export async function fetchNotes(search: string, page: number): Promise<Notes>{

const response = await axios.get<Notes>(`${url}/notes`, {
    params: {
        search: search,
        page: page,
},
headers: {
Authorization: `Bearer ${key}`,
  },
});
   return response.data;
}

      export async function createNote(newNote:NoteValues):Promise<Note>{
        const results = await axios.post<Note>(`${url}/notes`, newNote, {
      headers: {
Authorization: `Bearer ${key}`,
  }});
  return results.data;
      }
      
     export async function deleteNote(id:string):Promise<Note>{
      const response = await axios.delete<Note>(`${url}/notes/${id}`, {
        headers: {
Authorization: `Bearer ${key}`,
  },
   });
   return response.data;
     }
      
     export async function fetchNoteById (id: string):Promise<Note>{
      const response =  await axios.get<Note>(`${url}/notes/${id}`, {
        headers: {
Authorization: `Bearer ${key}`,
     }, 
    });
   return response.data;
     }

     export async function fetchNotesByTag( page?: number, tag?:string,): Promise<Notes>{
  const result = await axios.get(`${url}/notes`, {
    params: {
      page: page,
      tag: tag,
},
headers: {
Authorization: `Bearer ${key}`,
  },
});
   return result.data;
}