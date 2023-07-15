import { QueryClient } from 'react-query';
import AppConfig from '../../constants/AppConfig';
import { Network } from '../../utils/network';

const client = new QueryClient();
const network = new Network(AppConfig.APP_URL);

type RecommendedTravelerFetchingFiltersType = {
	path: string; // /product
	pageNo: string;
	pageSize: string;
	query: string;
	travelerLocation: string;
	travelerGender: string;
	travelerStatus: string;
	toTravelPlaces: string;
	minimumQuantity: number;
	religion: string;
	ridePreference: string,
};

const getRecommendedTravelers = async (RecommendedTravelerFetchingFiltersTypeFetchingFilters: RecommendedTravelerFetchingFiltersType) => {
	return await client.fetchQuery(
		'getRecommendedTravelers',
		async () =>
			await network.get(
				RecommendedTravelerFetchingFiltersTypeFetchingFilters.path,
				{
					authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					idToken: localStorage.getItem('idToken') as string,
				},
				{
					pageNo: RecommendedTravelerFetchingFiltersTypeFetchingFilters.pageNo,
					pageSize: RecommendedTravelerFetchingFiltersTypeFetchingFilters.pageSize,
					query: RecommendedTravelerFetchingFiltersTypeFetchingFilters.query,
					travelerLocation: RecommendedTravelerFetchingFiltersTypeFetchingFilters.travelerLocation,
					travelerGender: RecommendedTravelerFetchingFiltersTypeFetchingFilters.travelerGender,
					travelerStatus: RecommendedTravelerFetchingFiltersTypeFetchingFilters.travelerStatus,
					toTravelPlaces: RecommendedTravelerFetchingFiltersTypeFetchingFilters.toTravelPlaces,
					minimumQuantity: RecommendedTravelerFetchingFiltersTypeFetchingFilters.minimumQuantity,
					religion: RecommendedTravelerFetchingFiltersTypeFetchingFilters.religion,
					ridePreference: RecommendedTravelerFetchingFiltersTypeFetchingFilters.ridePreference
				}
			),
		{
			retry: false,
		}
	);
};
const travelerApi = {
	getRecommendedTravelers,
};

export default travelerApi;
