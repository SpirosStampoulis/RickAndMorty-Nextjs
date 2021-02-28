import Logo from '../../components/logo'
import HeadTag from '../../components/headTag'
import EpisodeCard from '../../components/epiCard'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../libs/apollo'
import { getEpisodes } from '../../gql/queries'
import { Description, logoPath } from '../../components/data'

const EpisodeOs = ({ bg, text }) => {
    const router = useRouter()
    const [pager, setPager] = useState(1)
    const [epiName, setEpiName] = useState('')

    if (router.query.slug) {
        const { loading, error, data } = useQuery(
            getEpisodes(1, router.query.slug[0])
        )
        if (error)
            return (
                <div
                    className="w-100 d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '80vh' }}
                >
                    <h1>Oops! Not Found :]</h1>
                    <Logo style={{ height: '200px' }} />
                </div>
            )
        if (loading)
            return (
                <div
                    className={`w-100 d-flex flex-column align-items-center justify-content-center ${bg}`}
                    style={{ height: '80vh' }}
                >
                    <h1 className={text}>Loading...</h1>
                    <Logo style={{ height: '200px' }} />
                </div>
            )
        const Background =
            data.episodes.results[0].id % 2 == 0
                ? '/dumbEasier.jpg'
                : '/episodePaper.png'
        let newTitle =
            data.episodes.results[0].episode +
            ' - ' +
            data.episodes.results[0].name +
            ' |  Rick and Morty'

        return (
            <>
                <HeadTag
                    Suffix={'episodes/' + router.query.slug[0]}
                    Title={newTitle}
                    logoPath={logoPath}
                    Description={Description}
                />
                <div
                    className={
                        'pt-5 container-fluid d-flex flex-column ' +
                        bg +
                        ' ' +
                        text
                    }
                >
                    <div
                        className="mt-3 container rounded py-5"
                        style={{
                            backgroundImage: `linear-gradient(#00000080, #00000080), url(${Background})`,
                            backgroundSize: 'cover',
                            minHeight: '300px',
                            backgroundPosition: 'center, center',
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
                    <div className="py-5 container d-flex flex-column">
                        <h4 className="ml-2">Starring</h4>
                        <div
                            className={
                                'd-flex flex-row flex-wrap align-items-start align-items-stretch justify-content-start'
                            }
                        >
                            {data.episodes.results[0].characters.map(
                                (data, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="col-6 col-sm-4 col-md-3 col-lg-2 p-2"
                                        >
                                            <Link
                                                href={
                                                    '/characters/' + data.name
                                                }
                                            >
                                                <div
                                                    className={
                                                        'w-100 h-100 rounded-lg border ' +
                                                        bg +
                                                        ' ' +
                                                        text
                                                    }
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <img
                                                        className="w-100"
                                                        src={data.image}
                                                    />
                                                    <h5
                                                        className="p-2"
                                                        style={{
                                                            lineHeight: 1.6,
                                                        }}
                                                    >
                                                        {data.name}
                                                    </h5>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        const { loading, error, data } = useQuery(getEpisodes(pager, epiName))

        let newTitle = 'Episodes |  Rick and Morty'

        return (
            <>
                <HeadTag
                    Suffix={'episodes'}
                    Title={newTitle}
                    logoPath={logoPath}
                    Description={Description}
                />
                <div className={'container-fluid ' + bg + ' ' + text}>
                    <div className="py-5 container d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <h1>Episodes</h1>
                        <input
                            placeholder="Input Episode"
                            className="mt-3 mt-md-0 form-control"
                            style={{ maxWidth: '150px' }}
                            value={epiName}
                            type="text"
                            onChange={(e) => setEpiName(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div
                            className="w-100 d-flex flex-column align-items-center justify-content-center"
                            style={{ height: '80vh' }}
                        >
                            <h1>Oops! Not Found :]</h1>
                            <Logo style={{ height: '200px' }} />
                        </div>
                    )}
                    {loading && (
                        <div
                            className={`w-100 d-flex flex-column align-items-center justify-content-center ${bg}`}
                            style={{ height: '80vh' }}
                        >
                            <h1 className={text}>Loading...</h1>
                            <Logo style={{ height: '200px' }} />
                        </div>
                    )}
                    {data && (
                        <div className="pb-5 container d-flex flex-row flex-wrap">
                            {data.episodes.results.map((item, index) => (
                                <EpisodeCard
                                    key={index}
                                    item={item}
                                    bg={bg}
                                    text={text}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {data && (
                    <div
                        className={
                            'd-flex align-items-center justify-content-center pb-3 ' +
                            bg +
                            ' ' +
                            text
                        }
                    >
                        {data.episodes.info.prev && (
                            <button
                                className={
                                    'p-2 border rounded-lg ' + bg + ' ' + text
                                }
                                onClick={() => {
                                    setPager(pager - 1)
                                }}
                            >
                                Prev
                            </button>
                        )}
                        {data.episodes.info.next && (
                            <button
                                className={
                                    'p-2 border rounded-lg ' +
                                    bg +
                                    ' ' +
                                    text +
                                    (data.episodes.info.prev ? ' ml-3' : '')
                                }
                                onClick={() => {
                                    setPager(pager + 1)
                                }}
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}
                {data && pager && (
                    <div
                        className={
                            'd-flex align-items-center justify-content-center pb-3 ' +
                            bg +
                            ' ' +
                            text
                        }
                    >
                        <span>
                            {pager}/{data.episodes.info.pages}
                        </span>
                    </div>
                )}
            </>
        )
    }
}

export default withApollo({ ssr: false })(EpisodeOs)
