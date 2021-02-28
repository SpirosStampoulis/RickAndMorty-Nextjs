import Link from 'next/link'
const EpisodeCard = ({ item, bg, text }) => {
    return (
        <div className="col-sm-6 col-md-4 col-lg-3 p-2">
            <Link href={'/episodes/' + item.name}>
                <div
                    className={
                        'w-100 h-100 rounded-lg border ' + bg + ' ' + text
                    }
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        className="border-bottom w-100"
                        src={
                            item.id % 2 == 0
                                ? '/dumbEasier.jpg'
                                : '/episodePaper.png'
                        }
                    />
                    <h5 className="p-2" style={{ lineHeight: 1.6 }}>
                        <span style={{ fontSize: '15px' }}>{item.episode}</span>
                        <br />
                        {item.name}
                        <br />
                        <span style={{ fontSize: '15px' }}>
                            {'Air Date: ' + item.air_date}
                        </span>
                        <br />
                        <span style={{ fontSize: '15px' }}>
                            {'Characters: ' + item.characters.length}
                        </span>
                    </h5>
                </div>
            </Link>
        </div>
    )
}

export default EpisodeCard
