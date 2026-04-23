import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPages({ params }: NotesPageProps){
const {slug} = await params;
const queryClient = new QueryClient();
const rawTag = slug?.[0];
const tag = rawTag && rawTag.toLowerCase() !== 'all' ? rawTag : undefined;


const search="";
const page=1;  
await queryClient.prefetchQuery({
    queryKey: ['notes', search, page, tag],
      queryFn: () => fetchNotes(search, page, tag as string),     
  });
  
    return(
      <section>
        <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient 
         tag={tag as string} key={tag || 'all'}>
         </NotesClient>
         </HydrationBoundary>
        </section>
    )
      
}