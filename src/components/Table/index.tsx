import { Table, Image, Grid, createStyles, Box} from '@mantine/core';
import { memo, useEffect, useState } from 'react';
import RecommendedTravelerDescriptionModal from '../Modal/index';
import axios from 'axios';
import AppConfig from '../../constants/AppConfig';

type TableComponentProps = {
	striped?: boolean;
	tableHead: string[];
	tableBodyData: any;
	verticalSpacing?: any;
	headLineHeight?: string;
	horizontalSpacing?: any;
	minimumQty: number | undefined;
};

const useStyles = createStyles(() => ({
	emptyProductsGrid: {
		display: 'flex',
		height: '70vh',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tableRow: {
		cursor: 'pointer',
		fontSize: '0.8em',
	},
}));

const TableComponent = (props: TableComponentProps) => {
	const [openModal, setOpenModal] = useState(false);
	const [selectedRow, setSelectedRow] = useState({});
	const [currentUser, setCurrentUser] = useState<any>();
	const {
		striped,
		tableHead,
		tableBodyData,
		verticalSpacing,
		horizontalSpacing,
	} = props;

	const { classes } = useStyles();
	const renderSwitch = (data: any, key: string) => {
		switch (key) {
			case 'Image':
				return (
					<Grid pl={40}>
						<Image src={data[key]} radius="sm" height={50} width={50} fit="contain" withPlaceholder />
					</Grid>
				);
			default:
				return data[key];
		}
	};

	const openProductDescriptionModal = (data: any) => {
		setSelectedRow({ ...data });
		setOpenModal(true);
	};
	const closeRecommendedTravelerDescriptionModal = () => {
		setOpenModal(false);
		setSelectedRow({});
	};
	useEffect(() => {
		async function setUser() {
			const currentUserPromise = await axios.get(`${AppConfig.APP_URL}user/`, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					idToken: localStorage.getItem('idToken') || '',
				},
			})
			setCurrentUser(currentUserPromise.data);
		}
		setUser()
	}, [])
	return (
		<>
			{!!tableBodyData?.length ? (
				<>
					<Table
						horizontalSpacing={horizontalSpacing}
						verticalSpacing={verticalSpacing}
						striped={striped ? striped : false}
						highlightOnHover
						style={{ padding: '100px', height: '80%' }}
					>
						<thead
							style={{
								top: 0,
								position: 'sticky',
								background: '#f3f3f3',
								opacity: 1,
								zIndex: 1,
							}}
						>
							<tr>
								{tableHead.map((headData, index) => {
									return (
										<th style={{ color: '#505050' }} key={index}>
											{headData}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{currentUser?.id ? tableBodyData?.map((data: any, outerIndex: number) => {
								if (data['Id'] !== currentUser?.id){
									return (
										<tr
											className={classes.tableRow}
											key={outerIndex}
											onClick={() => openProductDescriptionModal(data)}
										>
											{Object.keys(data).map((key: any, index) => {
												if (tableHead.includes(key)) {
													return (
														<td style={{ borderBottom: 'none', fontSize: '1.2em' }} key={index}>
															{renderSwitch(data, key)}
														</td>
													);
												}
											})}
										</tr>
									);
								}
							}) : <></>}
						</tbody>
					</Table>
				</>
			) : (
				<>
					<Table
						horizontalSpacing={horizontalSpacing}
						verticalSpacing={verticalSpacing}
						striped={striped ? striped : false}
						highlightOnHover
						style={{ padding: '100px' }}
					>
						<thead
							style={{
								top: 0,
								position: 'sticky',
								background: '#f3f3f3',
								opacity: 1,
								zIndex: 1,
							}}
						>
							<tr>
								{tableHead.map((headData, index) => {
									return (
										<th style={{ color: '#505050' }} key={index}>
											{headData}
										</th>
									);
								})}
							</tr>
						</thead>
					</Table>
					<Grid className={classes.emptyProductsGrid}>
						<Box
							sx={(theme) => ({
								backgroundColor: theme.colors.gray[0],
								textAlign: 'center',
								padding: theme.spacing.lg,
								borderRadius: theme.radius.md,
								color: '#495057',
							})}
						>
							{'No Recommended Traveler Found'}
						</Box>
					</Grid>
				</>
			)}
			<RecommendedTravelerDescriptionModal
				open={openModal}
				close={closeRecommendedTravelerDescriptionModal}
				data={selectedRow}
			/>
		</>
	);
};

export default memo(TableComponent);
