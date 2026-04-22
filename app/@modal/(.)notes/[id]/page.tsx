'use client'

import { useParams, useRouter } from 'next/navigation';
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import {NoteDetailsClient} from '../../../notes/[id]/NoteDetails.client';
import { useEffect } from 'react';

export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    console.log("!!! PREVIEW COMPONENT MOUNTED !!! ID:", id);
  }, [id]);
const handleClose = () => router.back();

return(
    <Modal isOpen={true} onClose={handleClose}>
    <button className={css.closeBtn} onClick={handleClose}>Close</button>
    <NoteDetailsClient id={id} stylesPreview={css}/>
    </Modal>
)
}