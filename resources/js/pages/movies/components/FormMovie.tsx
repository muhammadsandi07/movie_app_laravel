import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Movie, MovieFormData } from '@/types';
import { useForm } from '@inertiajs/react';
import { Edit2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface FormMovieProps {
    movie?: Movie;
}
const FormMovie = ({ movie }: FormMovieProps) => {
    const method = movie ? 'put' : 'post';
    const route = movie ? `/data-movies/${movie.id}` : '/data-movies';
    const [open, setOpen] = useState<boolean>(false);
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<MovieFormData>({
        title: movie?.title || '',
        genre: movie?.genre || '',
        release_date: movie?.release_date || '',
        duration: movie?.duration || '',
        description: movie?.description || '',
        poster: null,
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (method === 'post') {
                post(route, {
                    onSuccess: () => {
                        setOpen(false);
                        clearErrors();
                        reset();
                    },
                });
            } else {
                put(route, {
                    onSuccess: () => {
                        setOpen(false);
                        clearErrors();
                        reset();
                    },
                });
            }
        } catch (error) {
            toast.error('Terjadi kesalahan saat menyimpan data movie');
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={movie ? 'outline' : 'default'} size={movie ? 'icon' : 'default'}>
                    {movie ? <Edit2Icon size={16} /> : 'Add Movie'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Form Movie</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <form action="" className="flex flex-col space-x-2 gap-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mt-4 flex flex-col gap-y-2">
                                    <Label>Title</Label>
                                    <Input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                                    <InputError message={errors.title} className="m-1" />
                                </div>
                                <div className="mt-4 flex flex-col gap-y-2">
                                    <Label>Image</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files?.[0]) {
                                                setData('poster', e.target.files[0]);
                                            }
                                        }}
                                    />
                                    <InputError message={errors.poster} className="m-1" />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label>Genre</Label>
                                    <Input type="text" value={data.genre} onChange={(e) => setData('genre', e.target.value)} />
                                    <InputError message={errors.genre} className="m-1" />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label>release data</Label>
                                    <Input type="date" value={data.release_date} onChange={(e) => setData('release_date', e.target.value)} />
                                    <InputError message={errors.release_date} className="m-1" />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label>Duration</Label>
                                    <Input type="number" value={data.duration} onChange={(e) => setData('duration', e.target.value)} />
                                    <InputError message={errors.duration} className="m-1" />
                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <Label>Description</Label>
                                    <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                    <InputError message={errors.description} className="m-1" />
                                </div>
                                <Button className="w-full" disabled={processing}>
                                    {movie ? 'Update' : 'Save'}
                                </Button>
                            </form>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default FormMovie;
