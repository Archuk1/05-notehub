import { ErrorMessage, Field, Form, Formik } from 'formik'
import css from './NoteForm.module.css'
import * as Yup from "yup";
import { QueryClient, useMutation } from '@tanstack/react-query';
import { createNote } from '../../sevices/noteService';
import type { NoteTag } from '../../types/note';

interface FormValues {
  title: string;
  content: string;
  tag: "" | NoteTag
}

const initialValues: FormValues = {
  title: "",
  content: "",
  tag: "" 
};

interface NoteFormProps {
    onSuccess: () => void,
    onCancel: () => void
}
export default function NoteForm ({onSuccess, onCancel}: NoteFormProps ){
const NoteFormSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required("Title is required"),
  content: Yup.string().max(500),
  tag: Yup.string().required("Please select a tag").oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag selected"),
});
    const queryClient = new QueryClient();

     const { mutate, isPending } = useMutation({
    mutationFn: (values: FormValues) => createNote({
      title: values.title,
      content: values.content,
      tag: values.tag as NoteTag
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
  });



    return(
        <Formik initialValues={initialValues} onSubmit={(values: FormValues) => mutate(values)} validationSchema={NoteFormSchema}>
            <Form className={css.form}>
        <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
             <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="">Select a tag</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel || onSuccess}>
            Cancel
            </button>
            <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
            >
            Create note
            </button>
        </div>
        </Form>

        </Formik>
        
    )
}