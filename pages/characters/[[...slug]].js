import Logo from '../../components/logo'
import CharacterCard from '../../components/charCard'
import HeadTag from '../../components/headTag'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../libs/apollo'
import { getCharacters } from '../../gql/queries'
import { Description, logoPath } from '../../components/data'

const Character = ({ bg, text }) => {
    const router = useRouter()
    const [pager, setPager] = useState(1)
    const [charName, setCharName] = useState('')

    if (router.query.slug) {
        const { loading, error, data } = useQuery(
            getCharacters(1, router.query.slug[0])
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

        let newTitle = data.characters.results[0].name + ' |  Rick and Morty'
        let newDescription =
            'Get to know about ' +
            data.characters.results.length +
            ' different ' +
            data.characters.results[0].name +
            ' | A portal to browse rick and morty with next & graphql.'

        return (
            <>
                <HeadTag
                    Suffix={'characters/' + router.query.slug[0]}
                    Title={newTitle}
                    logoPath={logoPath}
                    Description={newDescription}
                />
                <div className={'container-fluid ' + bg + ' ' + text}>
                    <h1 className="my-5 text-center">
                        {data.characters.results[0].name +
                            (data.characters.results.length > 1 ? '(s)' : '')}
                    </h1>
                    <div className="pb-5 container justify-content-center d-flex flex-row flex-wrap">
                        {data.characters.results.map((item) => (
                            <div
                                key={item.id}
                                className="mt-3 col-sm-6 col-md-4 d-flex flex-column"
                            >
                                <img
                                    className="rounded-lg w-100"
                                    src={item.image}
                                />
                                <div
                                    className={
                                        'mt-3 p-2 w-100 d-flex flex-column rounded-lg border ' +
                                        bg +
                                        ' ' +
                                        text
                                    }
                                >
                                    <h5
                                        className="p-2"
                                        style={{ lineHeight: 1.6 }}
                                    >
                                        {'Gender'}
                                        <br />
                                        <span style={{ fontSize: '15px' }}>
                                            {item.gender}
                                        </span>
                                        <br />
                                        <hr className="border" />
                                        {item.origin.type && (
                                            <span>
                                                {'Origin'}
                                                <br />
                                                <span
                                                    style={{ fontSize: '15px' }}
                                                >
                                                    {item.origin.dimension}
                                                </span>
                                                <br />
                                                <span
                                                    style={{ fontSize: '15px' }}
                                                >
                                                    {'Type: ' +
                                                        item.origin.type}
                                                </span>
                                                <br />
                                                <span
                                                    style={{ fontSize: '15px' }}
                                                >
                                                    {'Name: ' +
                                                        item.origin.name}
                                                </span>
                                                <br />
                                                <hr className="border" />
                                            </span>
                                        )}
                                        {item.species && (
                                            <span>
                                                {'Species'}
                                                <br />
                                                <span
                                                    style={{ fontSize: '15px' }}
                                                >
                                                    {item.species}
                                                </span>
                                                <br />
                                                <hr className="border" />
                                            </span>
                                        )}
                                        {item.status && (
                                            <span>
                                                {'Status'}
                                                <br />
                                                <span
                                                    style={{ fontSize: '15px' }}
                                                >
                                                    {item.status}
                                                </span>
                                            </span>
                                        )}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    } else {
        const { loading, error, data } = useQuery(
            getCharacters(pager, charName)
        )

        let newTitle = 'Characters |  Rick and Morty'

        return (
            <>
                <HeadTag
                    Suffix={'characters'}
                    Title={newTitle}
                    logoPath={logoPath}
                    Description={Description}
                />
                <div className={'container-fluid ' + bg + ' ' + text}>
                    <div className="py-5 container d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <h1>Characters</h1>
                        <input
                            placeholder="Input Character"
                            className="mt-3 mt-md-0 form-control"
                            style={{ maxWidth: '150px' }}
                            value={charName}
                            type="text"
                            onChange={(e) => setCharName(e.target.value)}
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
                            {data.characters.results.map((item, index) => (
                                <CharacterCard
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
                            'd-flex align-items-center justify-content-center pb-4 ' +
                            bg +
                            ' ' +
                            text
                        }
                    >
                        {data.characters.info.prev && (
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
                        {data.characters.info.next && (
                            <button
                                className={
                                    'p-2 border rounded-lg ' +
                                    bg +
                                    ' ' +
                                    text +
                                    (data.characters.info.prev ? ' ml-3' : '')
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
                            'd-flex align-items-center justify-content-center pb-4 ' +
                            bg +
                            ' ' +
                            text
                        }
                    >
                        <span>
                            {pager}/{data.characters.info.pages}
                        </span>
                    </div>
                )}
            </>
        )
    }
}

export default withApollo({ ssr: false })(Character)
