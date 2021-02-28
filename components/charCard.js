import Link from 'next/link'
const CharacterCard = ({ item, bg, text }) => {
    return (
        <div className="col-sm-6 col-md-4 col-lg-3 p-2">
            <Link href={'/characters/' + item.name}>
                <div
                    className={
                        'w-100 h-100 rounded-lg border ' + bg + ' ' + text
                    }
                    style={{ cursor: 'pointer' }}
                >
                    <img className="w-100" src={item.image} />
                    <h5 className="p-2" style={{ lineHeight: 1.6 }}>
                        <span style={{ fontSize: '15px' }}>
                            {item.origin.dimension}
                        </span>
                        <br />
                        {item.name}
                        <br />
                        <span style={{ fontSize: '15px' }}>
                            {'Gender: ' + item.gender}
                        </span>
                    </h5>
                </div>
            </Link>
        </div>
    )
}

export default CharacterCard
