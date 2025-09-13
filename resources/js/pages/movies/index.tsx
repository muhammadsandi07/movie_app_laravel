import { CustomPagination } from '@/components/ui/customPagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Movie } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Movie',
        href: '/data-movie',
    },
];
const index = () => {
    const { movies }: any = usePage().props;
    const meta = movies.meta;
    useEffect(() => {
        console.log(movies);
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Movie" />
            <h1>Ini Halaman Data Pasien </h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10 text-center">No</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Release Date</TableHead>
                        <TableHead className="w-32 text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {movies.data.map((movie: Movie, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="text-center">{index + 1}</TableCell>
                            <TableCell className="text-center">{movie.title}</TableCell>
                            <TableCell className="text-center">{movie.genre}</TableCell>
                            <TableCell className="text-center">{movie.duration}</TableCell>
                            <TableCell className="text-center">{movie.release_date}</TableCell>
                            <TableCell className="text-center"></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>
                <CustomPagination meta={meta} />
            </div>
        </AppLayout>
    );
};

export default index;
