import Head from 'next/head'
import Footer from '../components/footer'
import Header from '../components/header'
import HeadTag from '../components/headTag'
import styles from '../styles.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react'
import { Title, logoPath, Description } from '../components/data'

const App = ({ Component, pageProps }) => {
    const [darkMode, setDarkMode] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setDarkMode(
            localStorage.getItem('mode')
                ? parseInt(localStorage.getItem('mode'))
                : 0
        )
        setIsMobile(
            navigator.userAgent.match(
                /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
            )
        )
        var family = 'Dosis'
        var headID = document.getElementsByTagName('head')[0]
        let link = document.createElement('link')
        link.type = 'text/css'
        link.rel = 'stylesheet'
        link.media = 'print'
        link.onload = function () {
            this.media = 'all'
        }
        headID.appendChild(link)
        link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`
    }, [])

    const toggleMode = function () {
        localStorage.setItem('mode', (1 - darkMode).toString())
        setDarkMode(1 - darkMode)
    }

    return (
        <div
            style={{ fontFamily: 'Dosis' }}
            className="parent d-flex flex-column"
        >
            <Head>
                <link rel="icon" href={logoPath} />
            </Head>
            <HeadTag
                Suffix={''}
                Title={Title}
                logoPath={logoPath}
                Description={Description}
            />
            <Header
                onClick={() => toggleMode()}
                mode={darkMode}
                text={darkMode ? styles.textSnow : styles.textBlack}
                bg={darkMode ? styles.bgBlack : styles.bgSnow}
            />
            <Component
                {...pageProps}
                isMobile={isMobile}
                mode={darkMode}
                styles={styles}
                text={darkMode ? styles.textSnow : styles.textBlack}
                bg={darkMode ? styles.bgBlack : styles.bgSnow}
            />
            <Footer
                text={darkMode ? styles.textSnow : styles.textBlack}
                bg={darkMode ? styles.bgBlack : styles.bgSnow}
            />
        </div>
    )
}

export default App
