import me from 'assets/me-brighton.jpg';
import Image from 'next/image';
export function AuthorTag() {
    return (
        <div className="not-prose my-6 flex h-12 flex-row items-center justify-start  gap-4">
            <div className="relative aspect-square h-full gap-2 overflow-hidden rounded">
                <Image
                    src={me}
                    alt="Picture of me, Omari"
                    fill
                    className="m-0 size-full max-w-none object-cover"
                />
            </div>
            <div className="flex flex-col text-sm">
                <span className="font-semibold">Omari Thompson-Edwards</span>
            </div>
        </div>
    );
}
