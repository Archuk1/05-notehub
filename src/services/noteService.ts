import axios from "axios";
import type { Note, NoteTag} from "../types/note";

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;


interface FetchNotesParams {
    search: string,
    page: number,
    perPage?: number,
}

interface FetchNotesResponse{
    notes: Note[],
    totalPages: number
}


export async function fetchNotes({search = '',page= 1,perPage = 12}: FetchNotesParams): Promise<FetchNotesResponse> {
    const response = await axios.get<FetchNotesResponse>('/notes', {
        params:{
            search: search,
            page: page,
            perPage: perPage
        }
    })
    return response.data;
}

interface CreateNoteParams {
    title: string,
    content: string,
    tag: NoteTag
}


export async function createNote (noteData : CreateNoteParams ) {
    
    const response = await axios.post<Note>('/notes', noteData)
    return response.data;
}

export async function deleteNote (noteId: string) {
    const response = await axios.delete<Note>(`/notes/${noteId}`);
    return response.data
}