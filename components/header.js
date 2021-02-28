import Link from 'next/link'
import Logo from './logo'

const Header = ({ onClick, bg, text, mode }) => {
    return (
        <div className={'border-bottom container-fluid ' + bg}>
            <div
                className={
                    'py-1 container d-flex flex-row align-items-center justify-content-between ' +
                    text
                }
            >
                <Link href="/">
                    <a>
                        <Logo style={{ height: '35px' }} />
                    </a>
                </Link>
                <span>
                    <Link href="/">
                        <a
                            style={{ fontSize: 25 }}
                            className={'d-none d-md-block ' + text}
                        >
                            Rick And Morty
                        </a>
                    </Link>
                </span>
                <span onClick={() => onClick()}>
                    {mode == 1 && (
                        <svg
                            width="25"
                            height="25"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="lightbulb-on"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                        >
                            <path
                                fill="#ffffff"
                                d="M240.06,454.34A32,32,0,0,0,245.42,472l17.1,25.69c5.23,7.91,17.17,14.28,26.64,14.28h61.7c9.47,0,21.41-6.37,26.64-14.28L394.59,472A37.47,37.47,0,0,0,400,454.34L400,416H240ZM319.45,0C217.44.31,144,83,144,176a175,175,0,0,0,43.56,115.78c16.52,18.85,42.36,58.22,52.21,91.44,0,.28.07.53.11.78H400.12c0-.25.07-.5.11-.78,9.85-33.22,35.69-72.59,52.21-91.44A175,175,0,0,0,496,176C496,78.63,416.91-.31,319.45,0ZM320,96a80.09,80.09,0,0,0-80,80,16,16,0,0,1-32,0A112.12,112.12,0,0,1,320,64a16,16,0,0,1,0,32ZM112,192a24,24,0,0,0-24-24H24a24,24,0,0,0,0,48H88A24,24,0,0,0,112,192Zm504-24H552a24,24,0,0,0,0,48h64a24,24,0,0,0,0-48ZM131.08,55.22l-55.42-32a24,24,0,1,0-24,41.56l55.42,32a24,24,0,1,0,24-41.56Zm457.26,264-55.42-32a24,24,0,1,0-24,41.56l55.42,32a24,24,0,0,0,24-41.56Zm-481.26-32-55.42,32a24,24,0,1,0,24,41.56l55.42-32a24,24,0,0,0-24-41.56ZM520.94,100a23.8,23.8,0,0,0,12-3.22l55.42-32a24,24,0,0,0-24-41.56l-55.42,32a24,24,0,0,0,12,44.78Z"
                            ></path>
                        </svg>
                    )}
                    {mode == 0 && (
                        <svg
                            width="25"
                            height="25"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="lightbulb-slash"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                        >
                            <path
                                fill="#000000"
                                d="M633.82 458.1L439.73 308.09c4.51-6.26 8.87-11.94 12.71-16.31C479.55 260.85 496 220.37 496 176 496 78.8 417.2 0 320 0 208.69 0 164.65 92.77 163.64 94.71L45.47 3.37C38.49-2.05 28.43-.8 23.01 6.18L3.37 31.45C-2.05 38.42-.8 48.47 6.18 53.9l588.36 454.73c6.98 5.43 17.03 4.17 22.46-2.81l19.64-25.27c5.41-6.97 4.16-17.02-2.82-22.45zM320 96c-37.14 0-68.17 25.56-77.14 59.94l-26.89-20.78C232.36 93.59 272.69 64 320 64c8.84 0 16 7.16 16 16s-7.16 16-16 16zm-79.99 320l.04 38.35c.01 6.29 1.87 12.45 5.36 17.69l17.09 25.69a31.99 31.99 0 0 0 26.64 14.28h61.71a31.99 31.99 0 0 0 26.64-14.28l17.09-25.69a31.989 31.989 0 0 0 5.36-17.69l.02-15.21L370.03 416H240.01zm-76.28-159.44c6.57 12.69 14.49 24.57 23.83 35.22 16.52 18.85 42.36 58.23 52.21 91.45.04.26.07.52.11.78h88.74L163.73 256.56z"
                            ></path>
                        </svg>
                    )}
                </span>
            </div>
        </div>
    )
}

export default Header
