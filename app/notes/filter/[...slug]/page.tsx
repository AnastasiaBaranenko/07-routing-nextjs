import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPages({ params }: NotesPageProps){
const {slug} = await params;
const queryClient = new QueryClient();

const tag = (slug?.[0] && slug[0].toLowerCase() !== 'all') ? slug[0] : undefined;

const search="";
const page=1;  
await queryClient.prefetchQuery({
    queryKey: ['notes', search, page, tag],
      queryFn: () => fetchNotes(search, page, tag ?? ''),     
  });
  
    return(
      <section>
        <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient 
         tag={tag} key={tag ?? ""}>
         </NotesClient>
         </HydrationBoundary>
        </section>
    )
      
}