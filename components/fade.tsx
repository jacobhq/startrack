import { motion } from "framer-motion"

type FadeAndSlideProps = {
    children: any
    delay?: number
}

export function Fade({ children, delay }: FadeAndSlideProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: delay ? delay : 0 }}
            viewport={{ once: true, amount: 0.8 }}
        >
            {children}
        </motion.div>
    )
}