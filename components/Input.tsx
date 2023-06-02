import { cva, VariantProps } from "class-variance-authority";
import { ElementType, HTMLAttributes } from "react";

const inputStyles = cva(
    'block px-2.5 pb-2.5 pt-4 w-full text-sm text-zinc-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white focus:outline-none focus:ring-1 peer',
    {
        variants: {
            state: {
                default: 'border-zinc-300 dark:border-zinc-600 dark:focus:border-zinc-500 focus:ring-zinc-600 dark:focus:ring-zinc-500 focus:border-zinc-600',
                success: 'dark:border-green-500 border-green-600 dark:focus:border-green-500 focus:border-green-600 focus:ring-green-600 dark:focus:ring-green-500',
                error: 'dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:border-red-600 focus:ring-red-600 dark:focus:ring-red-500'
            },
            handleInvalid: {
                true: 'invalid:dark:border-red-500 invalid:border-red-600 invalid:dark:focus:border-red-500 invalid:focus:border-red-600 invalid:focus:ring-red-600 invalid:dark:focus:ring-red-500'
            },
            disabled: {
                true: 'border-zinc-300 dark:border-zinc-600'
            }
        },
        defaultVariants: {
            state: 'default',
            handleInvalid: true
        }
    }
)

const labelStyles = cva(
    'bg-white pointer-events-none cursor-text absolute text-sm transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-placeholder-shown:px-3 peer-focus:px-2 peer-valid:peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1',
    {
        variants: {
            state: {
                default: 'text-zinc-500 dark:text-zinc-400',
                success: 'text-green-500 dark:text-green-400',
                error: 'text-red-500 dark:text-red-400'
            },
            handleInvalid: {
                true: 'peer-invalid:text-red-500 peer-invalid:dark:text-red-400'
            },
            disabled: {
                true: 'text-zinc-400 dark:text-zinc-500'
            },
            darkBg: {
                900: 'dark:bg-zinc-900',
                800: 'dark:bg-zinc-800'
            }
        },
        defaultVariants: {
            state: 'default',
            handleInvalid: true,
            darkBg: 900
        }
    }
)

type Props = {
    as?: ElementType
    value?: string
    type?: string
    required?: boolean
    autoFocus?: boolean
    darkBg?: 800 | 900
}

interface InputProps extends HTMLAttributes<HTMLInputElement>, Props, VariantProps<typeof inputStyles> { }

export default function Input({ state, children, placeholder, type, handleInvalid, as, disabled, darkBg, ...props }: InputProps) {
    as ??= "input"
    type ??= "text"
    darkBg ??= 900
    let Component = as

    return (
        <div className="relative">
            <Component name="input" className={inputStyles({ state, handleInvalid, disabled })} placeholder=" " type={type} disabled={disabled} {...props} />
            <label htmlFor="input" className={labelStyles({ state, handleInvalid, disabled, darkBg })}>{placeholder}</label>
        </div>
    )
}