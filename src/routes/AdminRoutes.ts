import {AdminDashboard} from "../container/Admin/AdminDashboard";
import Chat from "../container/Chat";
import MatchedTraveler from "../container/MatchedTraveler";
import Payment from "../container/Payment";

export const BASE_URL = '/app/admin';

const AdminRoutes = [
	{
		path: BASE_URL + '/payment',
		title: 'Matched Traveler payment',
		component: Payment,
	},
	{
		path: BASE_URL + '/chats',
		title: 'Matched Traveler Chat',
		component: Chat,
	},
	{
		path: BASE_URL + '/matched-travelers',
		title: 'Matched Traveler',
		component: MatchedTraveler,
	},
	{
		path: BASE_URL,
		title: 'Admin Dashboard',
		component: AdminDashboard,
	},
];

export default AdminRoutes;
