import { cn } from '@/utils/index';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type PaginationBarProps = {
    current: number;
    start: number;
    end: number;
};

const toNearest10 = (n: number) => Math.floor(n / 10) * 10;

export function PaginationBar({ current, start, end }: PaginationBarProps) {
    const pages = [...new Array(Math.min(end - start + 1, 10))].map(
        (_, i, arr) => i + toNearest10(current) + 1
    );

    return (
        <nav className=" mx-auto w-fit overflow-clip rounded-3xl">
            <ul className="flex h-12 flex-row gap-2">
                <PaginationLink
                    key="prev"
                    href={'/blog/posts/' + (current - 10)}
                    disabled={pages[0] < start + 10}>
                    <FaChevronLeft />
                </PaginationLink>
                {pages.map((page) => (
                    <PaginationLink
                        key={page}
                        href={'/posts/' + page}
                        isCurrent={current === page}>
                        {page}
                    </PaginationLink>
                ))}
                <PaginationLink
                    key="next"
                    href={'/posts/' + (current + 10)}
                    disabled={pages[pages.length - 1] > end - 10}>
                    <FaChevronRight />
                </PaginationLink>
            </ul>
        </nav>
    );
}

function PaginationLink({
    isCurrent = false,
    href,
    children,
    disabled = false,
}: {
    isCurrent?: boolean;
    href: string;
    disabled?: boolean;
} & PropsWithChildren) {
    return (
        <li
            className={cn(
                'aspect-square h-full items-center justify-center  rounded-full transition-all hover:bg-theme-invert hover:text-theme',
                isCurrent && 'bg-primary',
                disabled && 'opacity-[.1]'
            )}>
            {disabled ? (
                <div className="flex h-full w-full items-center justify-center">
                    {children}
                </div>
            ) : (
                <Link
                    className="flex h-full w-full items-center justify-center  rounded-full "
                    href={href}>
                    {children}
                </Link>
            )}
        </li>
    );
}
