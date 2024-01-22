import Link from 'next/link';
import { FaCoffee } from 'react-icons/fa';
import { WithChildrenProps } from 'types';

export function Footer() {
    return (
        <footer className="flex w-full items-center justify-end gap-4 bg-theme-invert px-8 py-2 text-sm text-theme">
            <FooterLink href="/">hi</FooterLink>·
            <FooterLink href="https://ko-fi.com/Y8Y3KQQUY">
                <FaCoffee />
            </FooterLink>
        </footer>
    );
}

export function FooterLink({
    href,
    children,
}: { href: string } & WithChildrenProps) {
    return <Link href={href}>{children}</Link>;
}
