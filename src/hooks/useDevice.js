import { useEffect, useState } from "react"

const getIsMobile = () => window.innerWidth <= 767.98
const getIsLaptop = () => window.innerWidth > 767.98 && window.innerWidth <= 991.98

const useDevice = () => {

    const [isMobile, setIsMobile] = useState(getIsMobile())
    const [isLaptop, setisLaptop] = useState(getIsLaptop())

    useEffect(() => {

        const onResize = () => {
            setIsMobile(getIsMobile())
            setisLaptop(getIsLaptop())
        }

        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener("resize", onResize)
        }

    }, [])

    return { isMobile, isLaptop }
}

export default useDevice