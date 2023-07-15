import React from 'react';
import { Route, Switch as Routes } from 'react-router-dom';
import AdminRoutes from '../routes/AdminRoutes';
import { MantineProvider } from '@mantine/core';
import { SocketProvider } from '../context/socket';
import { GenericHeader } from '../components';
import { links } from '../utils/data';

function Admin() {
	
	return (
		<SocketProvider>
			<MantineProvider
				theme={{
					fontFamily:
						'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
					spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
				}}
			>
				<Routes>
					{AdminRoutes.map((adminRoute, index) => {
						const Component: React.FunctionComponent = adminRoute.component;
						return (
							<Route key={index} path={adminRoute.path}>
								<GenericHeader links={links}/>
								<Component />
							</Route>
						);
					})}
				</Routes>
			</MantineProvider>
		</SocketProvider>
	);
}

export default Admin;
