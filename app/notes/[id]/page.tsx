import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import {NoteDetailsClient} from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

export type NotesProps = {
  params: Promise<{ id: string }>;
};

export default async function Notes({ params }: NotesProps){
  const queryClient = new QueryClient();
const {id} = await params;
await queryClient.prefetchQuery({
  queryKey: ['memos', id],
    queryFn: () => fetchNoteById(id),
});

 return(
   <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient id={id}/>
      </HydrationBoundary>
      </>
 )
};