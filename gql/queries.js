import gql from 'graphql-tag';

export function getEpisodes(a, b){
	return gql`
		query getEpisodes {
			episodes(page: ${a}, filter: { name: "${b}"}) {
				info{
					prev
					next
					pages
				}
				results{
					id
					name
					created
					air_date
					episode
					characters{
						image
						name
					}
				}
			}
		}
	`;
}

export function getCharacters(a, b){
	return gql`
		query getCharacters {
			characters(page: ${a}, filter: { name: "${b}"}) {
				info{
					prev
					next
					pages
				}
				results{
					id
					name
					image
					status
					species
					gender
					origin{
						name
						dimension
						type
					}
				}
			}
		}
	`;
}