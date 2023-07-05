import Vendors from "../components/Vendor";
import {AdminDashboard} from "../container/Admin/AdminDashboard";
import Chat from "../container/Chat";
import Invite from "../container/Invite";
import MatchedTraveler from "../container/MatchedTraveler";
import Payment from "../container/Payment";

export const BASE_URL = '/app/admin';

const AdminRoutes = [
	{
		path: BASE_URL + '/vendors',
		title: 'Vendors Api',
		component: Vendors,
	},
	{
		path: BASE_URL + '/payments',
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
		path: BASE_URL + '/invite',
		title: 'Invite',
		component: Invite,
	},
	{
		path: BASE_URL,
		title: 'Admin Dashboard',
		component: AdminDashboard,
	},
];

export default AdminRoutes;
