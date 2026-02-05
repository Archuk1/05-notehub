
import css from './NoteList.module.css'
import type { Note, NoteId } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../sevices/noteService';

interface NoteListProps {
    notes: Note[],
}

export default function NoteList({notes}:NoteListProps){

const queryClient = useQueryClient();

  const deletMutation = useMutation({
    mutationFn: (id: NoteId) => deleteNote(id),
    onSuccess: () => {queryClient.invalidateQueries({queryKey: ['notes']})}
  })

    return (
        <ul className={css.list}>
            {notes.map((note: Note)  => (
                <li key={note.id} className={css.listItem}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button className={css.button} onClick={() => deletMutation.mutate(note.id)} >Delete</button>
                </div>
            </li>))}
            
        </ul>
    );
}