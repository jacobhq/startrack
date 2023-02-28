import { cva, VariantProps } from "class-variance-authority";
import { HtmlAttributes } from "csstype";
import { ComponentPropsWithoutRef, ElementType, HTMLAttributes } from "react";

const buttonStyles = cva(
    'select-none inline-flex justify-center items-center rounded-lg border border-transparent text-sm font-medium focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-offset-2',
    {
        variants: {
            variant: {
                primary: 'px-4 py-2 bg-yellow-900 dark:bg-yellow-100 text-yellow-100 dark:text-yellow-900 hover:enabled:bg-yellow-800 dark:hover:enabled:bg-yellow-200 focus-visible:ring-yellow-300 dark:focus-visible:ring-yellow-700',
                secondary: 'px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 hover:enabled:bg-yellow-200 dark:hover:enabled:bg-yellow-800 focus-visible:ring-yellow-700 dark:focus-visible:ring-yellow-300',
                ghost: 'px-4 py-2 bg-white dark:bg-gray-900 hover:bg-gray-100 hover:dark:bg-gray-800 text-black dark:text-white',
                link: 'py-1 text-black dark:text-white'
            },
            loading: {
                true: 'cursor-wait'
            },
            disabled: {
                true: 'cursor-not-allowed'
            },
            fullWidth: {
                true: 'w-full'
            }
        },
        defaultVariants: {
            variant: "secondary",
        }
    }
)

type Props<T extends ElementType> = {
    as?: T
    withForwardArrow?: boolean
}

export default function Button<T extends ElementType = "button">({ variant, fullWidth, children, type, as, loading, disabled, withForwardArrow, ...props }: Props<T> & VariantProps<typeof buttonStyles> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>) {
    let Component = as || "button"

    return (
        <Component type={type} className={buttonStyles({ variant, fullWidth, loading, disabled })} disabled={loading || disabled} {...props}>
            {loading && <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-yellow-900 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#fef08a" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>}
            {!loading ? children : "Loading..."}
            {withForwardArrow && !loading && <svg aria-hidden="true" className="pl-2 -mr-1 w-5 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>}
        </Component>
    )
}