import Link from 'next/link'
import Logo from './logo'

const Footer = ({ bg, text }) => {
    return (
        <footer
            className={'border-top container-fluid py-5 ' + bg + ' ' + text}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <Link href="/">
                            <a>
                                <Logo
                                    style={{
                                        height: '120px',
                                        cursor: 'pointer',
                                    }}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="mt-5 mt-md-0 col-md">
                        <h5 style={{ lineHeight: 1.6 }}>
                            Rick and Morty is an American adult animated science
                            fiction sitcom created by Justin Roiland and Dan
                            Harmon for Cartoon Network's late-night programming
                            block Adult Swim.
                        </h5>
                        <hr className="border" />
                        <h4 style={{ lineHeight: 1.6 }}>
                            Made By:{' '}
                            <a
                                className={text + ' border-bottom'}
                                href="https://spirosstampoulis.github.io"
                                target="_blank"
                            >
                                Spiros Stampoulis
                            </a>
                        </h4>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
