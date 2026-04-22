import {fetchNotesByTag} from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type NotesPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesPages({ params }: NotesPageProps){
const {slug} = await params;
const queryClient = new QueryClient();
  const category = slug?.[0] || 'all';
  const formattedTag = category === 'all' ? 'all' : category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
 
  await queryClient.prefetchQuery({
    queryKey: ['memos', '', 1, formattedTag],
      queryFn: () => formattedTag === 'all' ?
       fetchNotes('', 1)
       : fetchNotesByTag(1, formattedTag),
  });
  
    return(
      <section>
        <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient 
         category={formattedTag}>
         </NotesClient>
         </HydrationBoundary>
        </section>
    )
      
}