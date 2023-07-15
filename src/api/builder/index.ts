import { QueryClient } from 'react-query';
import AppConfig from '../../constants/AppConfig';
import { Network } from '../../utils/network';

const client = new QueryClient();
const network = new Network(AppConfig.APP_URL);


const getBuilderHistory = async () => {
	return await client.fetchQuery(
		'getRecommendedTravelers',
		async () =>
			await network.get(
				'builder-history',
				{
					authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					idToken: localStorage.getItem('idToken') as string,
				}
			),
		{
			retry: false,
		}
	);
};
const builderApi = {
	getBuilderHistory,
};

export default builderApi;
