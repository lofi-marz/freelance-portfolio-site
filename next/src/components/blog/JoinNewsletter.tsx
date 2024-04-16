import { HiArrowRight, HiCheck } from 'react-icons/hi2';
import { Dot } from '../Dot';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
type FormInputs = {
    email: string;
};
export function JoinNewsletter() {
    const { mutate, status } = useMutation({
        mutationFn: (email: string) => {
            const params = new URLSearchParams({ email });
            return axios.post('/api/email?' + params.toString());
        },
    });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormInputs>();
    const onSubmit: SubmitHandler<FormInputs> = (data) => mutate(data.email);
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl bg-theme-invert p-6 py-8 text-theme">
            <div className="heading text-xl lowercase">
                Like the content? Join the newsletter
                <Dot />
            </div>
            <form
                className="flex h-10 w-1/2 flex-row gap-2 text-sm "
                onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('email', { required: true })}
                    type="email"
                    placeholder="email"
                    className=" grow rounded-full bg-theme px-6 text-theme-invert placeholder:text-theme-invert placeholder:opacity-90 "
                />
                <button
                    type="submit"
                    className="flex aspect-square  h-full items-center justify-center rounded-full bg-primary text-light transition-all active:brightness-150 hover:bg-theme hover:text-theme-invert">
                    {status === 'idle' ? (
                        <HiArrowRight />
                    ) : status === 'success' ? (
                        <HiCheck />
                    ) : (
                        'error'
                    )}
                </button>
            </form>
        </div>
    );
}
