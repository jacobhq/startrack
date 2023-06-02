import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementType } from "react";

const buttonStyles = cva("flex items-center gap-1 h-10 py-2.5 px-5 text-sm select-none font-semibold text-gray-900 focus:outline-none bg-white rounded-full border focus:z-10 ring-0 focus:ring-4 transition-shadow duration-75 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white", {
  variants: {
    variant: {
      primary: "border-yellow-500 focus:ring-yellow-200",
      subtle: "border-gray-700 hover:border-yellow-500 focus:border-yellow-500 focus:ring-yellow-200",
      ghost: "border-none focus:ring-yellow-200"
    },
    hasArrow: {
      true: "group"
    }
  },
  defaultVariants: {
    variant: "primary",
    hasArrow: true
  },
});

type Props<T extends ElementType> = {
  as?: T
}

export default function MarketingButton<T extends ElementType = "button">({ variant, as, children, hasArrow, ...props }: Props<T> & VariantProps<typeof buttonStyles> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>) {
  let Component = as || "button"

  hasArrow ??= true

  return <Component type="button" className={buttonStyles({ variant })} {...props}>
    {children}
    {hasArrow && <svg width="16px" height="16px" viewBox="0 0 16 16" fill="none" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-yellow-500" aria-hidden="true" role="img">
      <path className="origin-center scale-x-0 transition-transform group-hover:scale-x-100" d="M12 8H4"></path>
      <path className="transition-transform group-hover:translate-x-[2px]" d="M6.5 11.5L9.64645 8.35355C9.84171 8.15829 9.84171 7.84171 9.64645 7.64645L6.5 4.5"></path>
    </svg>}
  </Component>;
};