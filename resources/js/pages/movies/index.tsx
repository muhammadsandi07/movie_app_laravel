import { Button } from '@/components/ui/button';
import { CustomPagination } from '@/components/ui/customPagination';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { handleChangePerPage } from '@/lib/utils';
import { BreadcrumbItem, Movie } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { RefreshCcw, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Movie',
        href: '/data-movie',
    },
];
const index = () => {
    const { movies }: any = usePage().props;
    const meta = movies.meta;
    const path = meta.path;
    const [search, setSearch] = useState('');
    useEffect(() => {
        console.log(movies);
    }, []);

    const searchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(path, { search: search }, { preserveState: true, replace: true });
    };
    const clearSearch = () => {
        setSearch('');
        router.get(path, {  }, { preserveState: true, replace: true });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Movie" />
            <h1>Movies </h1>
            <div className="my-2 flex gap-x-3">
                <select
                    name=""
                    id=""
                    className="rounded-md border px-3"
                    onChange={(e) => handleChangePerPage(parseInt(e.target.value), path)}
                    defaultValue={meta.per_page}
                >
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <div className="flex gap-x-2">
                    <Input
                        type="text"
                        placeholder="Cari..."
                        className="max-w-lg flex-shrink"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <Button size={'icon'} variant={'outline'} onClick={searchSubmit}>
                        <Search size={16} />
                    </Button>
                    <Button size={'icon'} variant={'outline'} onClick={clearSearch}>
                        <RefreshCcw size={16} />
                    </Button>
                </div>
            </div>
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
                            <TableCell className="text-left">{movie.title}</TableCell>
                            <TableCell className="text-left">{movie.genre}</TableCell>
                            <TableCell className="text-left">{movie.duration}</TableCell>
                            <TableCell className="text-left">{movie.release_date}</TableCell>
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
