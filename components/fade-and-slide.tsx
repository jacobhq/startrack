import { motion } from "framer-motion"

type FadeAndSlideProps = {
    children: any
    delay?: number
}

export function FadeAndSlide({ children, delay }: FadeAndSlideProps) {
    return (
        <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.6, delay: delay ? delay : 0 }}
            viewport={{ once: true, amount: 0.8 }}
        >
            {children}
        </motion.div>
    )
}