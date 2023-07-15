import React from 'react';
import Head from 'next/head';
import {
	BrowserRouter as Router,
	Switch as Routes,
	Route,
	Redirect
 } from 'react-router-dom';
import AuthGuard from '../../guards/authGuard';
import { links } from '../../utils/data';
import { GenericHeader } from '../../components';
import Admin from '../../container';
import { SocketProvider } from '../../context/socket';


type UserType = {
	createdAt: string;
	email: string;
	error: boolean;
	id: number;
	type: string;
	updatedAt: string;
	username: string;
}


const AppIndex = () => {

	return (
		<Router>
			<Head>
        		<title>Travelmate</title>
      		</Head>
			<AuthGuard>
				{(user: UserType)=>{
					return (
						<Routes>
							<Route key="admin" path={'/app/admin'}>
								<>
									<SocketProvider>
										<GenericHeader links={links}/>
										<Admin/>
									</SocketProvider>
								</>
							</Route>
						</Routes>
					);
				}}
			</AuthGuard>
		</Router>
	);
};

export default AppIndex;
