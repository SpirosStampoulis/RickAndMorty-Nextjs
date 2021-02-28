import Link from 'next/link'
import Logo from '../components/logo'
import EpisodeCard from '../components/epiCard'
import CharacterCard from '../components/charCard'
import { withApollo } from '../libs/apollo'
import { useQuery } from '@apollo/react-hooks'
import { listRandomEpi } from '../components/data'
import { getCharacters, getEpisodes } from '../gql/queries'

const randomEpisode =
    listRandomEpi[Math.floor(Math.random() * listRandomEpi.length)]

const IndexPage = ({ isMobile, bg, text }) => {
    const { loading, error, data } = useQuery(
        getEpisodes(1, randomEpisode.name)
    )
    const { loading: loadingE, error: errorE, data: dataE } = useQuery(
        getEpisodes(1, '')
    )
    const { loading: loadingC, error: errorC, data: dataC } = useQuery(
        getCharacters(1, '')
    )

    return (
        <>
            <div
                className={
                    'pt-5 container-fluid d-flex flex-column ' + bg + ' ' + text
                }
            >
                <div className="container">
                    <h2>Watch Now</h2>
                </div>
                {error && (
                    <div
                        className="w-100 d-flex flex-column align-items-center justify-content-center"
                        style={{ height: '100px' }}
                    >
                        <h1>Oops! Not Found :]</h1>
                        <Logo style={{ height: '100px' }} />
                    </div>
                )}
                {loading && (
                    <div
                        className="w-100 d-flex flex-column align-items-center justify-content-center"
                        style={{ height: '100px' }}
                    >
                        <h1>Loading...</h1>
                        <Logo style={{ height: '100px' }} />
                    </div>
                )}
                {data && (
                    <Link href={'/episodes/' + data.episodes.results[0].name}>
                        <div
                            className="mt-3 container rounded py-5"
                            style={{
                                backgroundImage: `linear-gradient(#00000080, #00000080), url(${
                                    data.episodes.results[0].id % 2 == 0
                                        ? '/dumbEasier.jpg'
                                        : '/episodePaper.png'
                                })`,
                                backgroundSize: 'cover',
                                minHeight: '300px',
                                backgroundPosition: 'center, center',
                                cursor: 'pointer',
                            }}
                        >
                            <div className="d-flex flex-column">
                                <span
                                    className="text-white"
                                    style={{ fontSize: '20px' }}
                                >
                                    {data.episodes.results[0].episode}
                                </span>
                                <h1
                                    className="py-3 text-white"
                                    style={{ wordBreak: 'break-word' }}
                                >
                                    {data.episodes.results[0].name}
                                </h1>
                                <span
                                    className="text-white"
                                    style={{ fontSize: '15px' }}
                                >
                                    {'Air Date: ' +
                                        data.episodes.results[0].air_date}
                                </span>
                                <br />
                            </div>
                        </div>
                    </Link>
                )}
                {errorE && (
                    <div
                        className="w-100 d-flex flex-column align-items-center justify-content-center"
                        style={{ height: '80vh' }}
                    >
                        <h1>Oops! Not Found :]</h1>
                        <Logo style={{ height: '200px' }} />
                    </div>
                )}
                {loadingE && (
                    <div
                        className="w-100 d-flex flex-column align-items-center justify-content-center"
                        style={{ height: '80vh' }}
                    >
                        <h1>Loading...</h1>
                        <Logo style={{ height: '200px' }} />
                    </div>
                )}
                {dataE && (
                    <div className="py-5 container d-flex flex-column">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            {!isMobile && <h2 className="ml-2">Episodes</h2>}
                            {isMobile && <h6 className="ml-2">Episodes</h6>}
                            {!isMobile && (
                                <Link href="/episodes">
                                    <h2 style={{ cursor: 'pointer' }}>
                                        View all episodes &rarr;
                                    </h2>
                                </Link>
                            )}
                            {isMobile && (
                                <Link href="/episodes">
                                    <h6>View all episodes &rarr;</h6>
                                </Link>
                            )}
                        </div>
                        <div className="py-3 d-flex flex-row flex-wrap">
                            {dataE.episodes.results.map(
                                (item, index) =>
                                    index < (isMobile ? 4 : 8) && (
                                        <EpisodeCard
                                            key={index}
                                            item={item}
                                            bg={bg}
                                            text={text}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                )}
                {errorC && (
                    <div
                        className="w-100 d-flex flex-column align-items-center justify-content-center"
                        style={{ height: '80vh' }}
                    >
                        <h1>Oops! Not Found :]</h1>
                        <Logo style={{ height: '200px' }} />
                    </div>
                )}
                {loadingC && (
                    <div
                        className="w-100 d-flex flex-column align-items-center justify-content-center"
                        style={{ height: '80vh' }}
                    >
                        <h1>Loading...</h1>
                        <Logo style={{ height: '200px' }} />
                    </div>
                )}
                {dataC && (
                    <div className="pb-5 container d-flex flex-column">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            {!isMobile && <h2 className="ml-2">Characters</h2>}
                            {isMobile && <h6 className="ml-2">Characters</h6>}
                            {!isMobile && (
                                <Link href="/characters">
                                    <h2 style={{ cursor: 'pointer' }}>
                                        View all characters &rarr;
                                    </h2>
                                </Link>
                            )}
                            {isMobile && (
                                <Link href="/characters">
                                    <h6>View all characters &rarr;</h6>
                                </Link>
                            )}
                        </div>
                        <div className="d-flex flex-row flex-wrap">
                            {dataC.characters.results.map(
                                (item, index) =>
                                    index < (isMobile ? 4 : 8) && (
                                        <CharacterCard
                                            key={index}
                                            item={item}
                                            bg={bg}
                                            text={text}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default withApollo({ ssr: false })(IndexPage)
