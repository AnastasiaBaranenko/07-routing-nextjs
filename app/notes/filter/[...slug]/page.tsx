import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPages({ params }: NotesPageProps){
const {slug} = await params;
const queryClient = new QueryClient();
  const tag = slug?.[0] || 'all';
  const formattedTag = tag === 'all' ? 'all' : tag.charAt(0).toUpperCase() +tag.slice(1).toLowerCase();
 
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, formattedTag],
      queryFn: () => fetchNotes('', 1, formattedTag)     
  });
  
    return(
      <section>
        <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient 
         tag={formattedTag}>
         </NotesClient>
         </HydrationBoundary>
        </section>
    )
      
}