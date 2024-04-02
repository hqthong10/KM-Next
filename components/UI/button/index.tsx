import './styles.scss';
import clsx from 'clsx';

interface MyButtonProps {
    children?: string;
    disabled?: boolean;
    status?: string;
    onClick: any;
}

export default function KmButton({ children, disabled, status, onClick }: MyButtonProps) {
    return (
        <button className={clsx(
            'km-button h-[60px] inline-flex items-center rounded-full px-2 py-1 text-sm',
            {
                'bg-gray-100 text-gray-500': status === 'pending',
                'bg-green-500 text-white': status === 'paid',
            },
        )} onClick={onClick}>{children}</button>
    )
}