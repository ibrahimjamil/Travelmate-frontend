import React, { useContext, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { AxiosResponse } from 'axios';
import { QueryFunctionContext, QueryObserverResult, useQuery } from 'react-query';
import emotionStyled from '@emotion/styled';
import { Group, Skeleton, Table, Grid, createStyles, Modal, Title, Card } from '@mantine/core';
import { builderApi, travelerApi } from '../../../api';
import TableComponent from '../../../components/Table';
import { DemoGender, DemoLocation, tableData } from '../../../utils/data';
import { RecommendedTravelerSearchRowWrapper } from '../../../components/RecommendedTravelerSearchRowWrapper';
import { SideBarFiltersWrapper } from '../../../components/SideBarFiltersWrapper';
import { AdminSitePagination } from '../../../components/AdminSitePagination';
import MultiSelectComponent from '../../../components/MultiSearch';
import SelectComponent from '../../../components/Select';
import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type InfiniteOnChangeType = {
	label: any;
	actualLabel: string;
	value: number;
}[];

const useStyles = createStyles(() => ({
	productFilters: {
		margin: '0px !important',
		width: '100%',
	},
	emptyProductsGrid: {
		display: 'flex',
		marginTop: "10px",
		height: "100%",
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		fontWeight: 700,
	},
}));

const FilterContainer = emotionStyled.div`
  height: 100%;
	background-color: #fbfbfb;
	font-size: 0.8em;
`;

const RecommendedTravelerTitle = emotionStyled.div`
  color: #505050;
  font-weight: 500;
  font-size: 1.3em;
  padding-left: 35px !important;
`;

const RecommendedTravelerContainer = emotionStyled.div`
  display: flex;
  background-color: #fbfbfb;
`;

const RecommendedTravelerSideBarContainer = emotionStyled.div`
  flex: 0.16;
  background-color: #fbfbfb;
	min-width: 230px;
	padding-left: 15px;
  @media only screen and (max-width: 700px) {
    flex: 0;
    display: none;
  }
`;

const RecommendedTravelerTableContainer = emotionStyled.div`
  flex: 0.84;
  background-color: white;
  overflow-Y: scroll;
	border-radius: 10px;
  @media only screen and (max-width: 700px) {
    flex: 1;
  }
`;

const RecommendedTravelerSideBarFilter = emotionStyled.div`
  display: flex;
  flex-direction: column;
	gap: 20px;
  padding: 0 40px 20px 20px;
`;

export function AdminDashboard() {
	const { classes } = useStyles();
	const [searchParam, setSearchProduct] = useState('');
	const [travelersData, setTravelersData] = useState<any[]>([]);
	const [pageNo, setPageNo] = useState('1');
	const [pageSize, setPageSize] = useState('25');
	const [totalTravelers, setTotalTravelers] = useState(0);
	const [isSearchBegin, setIsSearchBegin] = useState(false);
    const [travelerGender, setTravelerGender] = useState<string[]>(DemoGender.data);
    const [travelerLocation, setTravelerLocation] = useState<string[]>(DemoLocation.data);
	const [minimumQuantity, setMinimumQuantity] = useState<number | undefined>();
	const [religion, setReligion] = useState('');
	const [ridePreference, setRidePreference] = useState([]);

	const [locations, setLocation] = useState<Array<{ label: any; value: number }>>([]);
	const [gender, setGenders] = useState<Array<{ label: any; value: number }>>([]);

	const [recommendedTravelerGender,setRecommendedTravelerGender] = useState<string[]>([])
	const [recommendedTravelerLocation,setRecommendedTravelerLocation] = useState<string[]>([]);
	const [query, setQuery] = useState<string>('');
	const [doFetchNow, setDoFetchNow] = useState(false);
	const [travelerStatus, setTravelerStatus] = useState('');
	const [toTravelPlaces, setToTravelPlaces] = useState([]);
	const [matchBuilder, setMatchBuilder] = useState(false);
	const [builderData, setBuilderData] = useState([]);
	const sliceMenuData = 10;

	const clearAllFilters = () => {
		setPageNo('1');
		setPageSize('25');
		setQuery('');
		setSearchProduct('');
		setMinimumQuantity(undefined);
		setTravelerGender([]);
        setTravelerLocation([]);
		setToTravelPlaces([])
		setTravelerStatus('');
	};

	// get product filter query
	const { refetch: refetchTravelersByFilterQuery, isFetching } = useQuery(
		[
			'getRecommendations',
			'travelerRecommendations/search',
			pageNo,
			pageSize,
			query,
			recommendedTravelerLocation,
			recommendedTravelerGender,
			travelerStatus,
			toTravelPlaces,
			minimumQuantity,
			religion,
			ridePreference
		],
		async (params: QueryFunctionContext<any, any>) => {
			return await travelerApi.getRecommendedTravelers({
				path: params.queryKey[1],
				pageNo: params.queryKey[2],
				pageSize: params.queryKey[3],
				query: params.queryKey[4],
				travelerLocation: JSON.stringify(params.queryKey[5]),
				travelerGender: JSON.stringify(params.queryKey[6]),
				travelerStatus: params.queryKey[7],
				toTravelPlaces: JSON.stringify(params.queryKey[8]),
				minimumQuantity: params.queryKey[9],
				religion: params.queryKey[10],
				ridePreference: JSON.stringify(params.queryKey[11])
			});
		},
		{
			enabled: false,
		}
	);

	const { refetch: refetchBuilder, isFetching: isFetchingBuilder } = useQuery(
		['builder'],
		async (params: QueryFunctionContext<any, any>) => {
			return await builderApi.getBuilderHistory();
		},
		{
			enabled: false,
		}
	);

	// get products first time
	useEffect(() => {
		const fetchQuery = async () => {
			const [
				travelerInfo,
				builderInfo
			] = await Promise.allSettled([
			  refetchTravelersByFilterQuery(),
			  refetchBuilder()
			]);
		  
			if (travelerInfo.status === 'fulfilled' && builderInfo.status === 'fulfilled') {
				console.log(travelerInfo.value.data?.data.hits);
			  setTravelersData(travelerInfo.value.data?.data.hits);
			  setTotalTravelers(travelerInfo.value.data?.data?.estimatedTotalHits);
			  setBuilderData(builderInfo.value.data?.data?.builder);
			}
		  };
		fetchQuery();
	}, []);

	useEffect(() => {
		const fetchQuery = async () => {
			const travelerInfo: QueryObserverResult<
				AxiosResponse<any, any>,
				any
			> = await refetchTravelersByFilterQuery();
			setTravelersData(travelerInfo.data?.data.hits);
			setTotalTravelers(travelerInfo.data?.data?.estimatedTotalHits);
		};
		fetchQuery();
	}, [doFetchNow]);

	// get Products on state change
	useEffect(() => {
		const newQuery = searchParam.trim();
		setQuery(newQuery);
		setDoFetchNow(!doFetchNow);
	}, [
		pageNo,
		pageSize,
		isSearchBegin,
        travelerGender,
        travelerLocation,
		travelerStatus,
		toTravelPlaces
	]);

	// product mapping with head data
	const filterRecommendedTravelerColumnMapping = useMemo(() => (travelerData: any) => {
		return travelerData?.map((data: any, index: number) => {
			return {
				Id: data?.id,
				Name: data?.firstName + data?.lastName,
				Age: data?.age,
				Location: data?.location,
				OwnGender: data?.gender,
                GenderPreference: data?.genderPreference?.join(),
				RidePreference: data?.ridePreference?.join(),
				Religion: data?.religion,
				Status: data?.status || 'active',
				PlacesToVisit: data?.expectedVisitingPlaces?.join(),
				MateAge: `above ${+data?.expectedMateAge[0]} below ${+data?.expectedMateAge[0] + 10}`
			};
		});
	}, [travelersData])

	const handlePageSizeChange =_.debounce((size) => {
		if (size) {
			if (size === 0) {
				setPageSize('25');
			} else {
				setPageSize(String(size));
			}
		} else if (size === undefined) {
			setPageSize('25');
		}
	  }, 1000);

	const handleInfiniteGenderOnChange = (data: InfiniteOnChangeType) => {
		setPageNo('1');
		setTravelerGender([...data.map((c) => c.actualLabel || c.label)]);
		setGenders([
			...data.map((c) => {
				return {
					label: c.actualLabel || c.label,
					value: c.value,
				};
			}),
		]);
		setRecommendedTravelerGender([
			...data.map((c) => c.actualLabel || c.label),
		])
	}

	const handleInfiniteLocationOnChange = (data: InfiniteOnChangeType) => {
		setPageNo('1');
		setTravelerLocation([...data.map((c) => c.actualLabel || c.label)]);
		setLocation([
			...data.map((c) => {
				return {
					label: c.actualLabel || c.label,
					value: c.value,
				};
			}),
		]);
		setRecommendedTravelerLocation([
			...data.map((c) => c.actualLabel || c.label),
		])
	}

	return (
		<>
			<FilterContainer>
				<Group align="center" mb={50} pt={20} sx={{ width: '100%', height: '7vh' }}>
					<RecommendedTravelerTitle>Recommended Traveler Search</RecommendedTravelerTitle>
					<Grid align="center" justify={"start"} columns={12}  sx={{ width: '100%', paddingLeft: "35px"}}>
						<RecommendedTravelerSearchRowWrapper
							minimumQuantity={minimumQuantity}
							setMinimumQuantity={setMinimumQuantity}
							handleSetIsSearchBegin={(searchState: string) => {
									setSearchProduct(searchState);
									setIsSearchBegin(!isSearchBegin)
								}
							}
							clearAllFilters={clearAllFilters}
							onKeyDown={(e: any, searchParams: any) => {
								if (e.key === 'Enter'){
									setSearchProduct(searchParams);
									setIsSearchBegin(!isSearchBegin)
								}
							}}
						/>
					</Grid>
				</Group>

				<RecommendedTravelerContainer>
					<RecommendedTravelerSideBarContainer>
						<RecommendedTravelerSideBarFilter>
							<SideBarFiltersWrapper
								// location infinite portion
								selectLocationValue={locations}
								selectLocationSliceData={sliceMenuData}
								LocationPlaceholder={"Select Location"}
								LocationClassName={"globalInfiniteScrollCustom1"}
								LocationIsLoading={false}
								initialLocationRenderData={
									!!travelerLocation?.length
									? [
										...travelerLocation.map((data, index) => ({
											label: data,
											actualLabel: data,
											value: index,
										})),
									  ]
									: []
								}
								isInitialLocationHasMore={false}
								LocationData={
									useMemo(() =>
									!!travelerLocation.length ? travelerLocation.map((data, index) => ({
										label: data,
										actualLabel: data,
										value: index,
									  })) : [], [travelerLocation])
									}
								handleLocationOnChange={handleInfiniteLocationOnChange}

								// gender infinite portion
								selectGenderValue={gender}
								selectGenderSliceData={sliceMenuData}
								GenderPlaceholder={"Select Gender"}
								GenderClassName={"globalInfiniteScrollCustom2"}
								GenderIsLoading={false}
								initialGenderRenderData={
									!!travelerGender?.length
										? [
											...travelerGender
												.slice(0, sliceMenuData)
												.map((data, index) => ({
													label: data,
                                                    actualLabel: data,
                                                    value: index,
												})),
											]
										: []
								}
								isInitialGenderHasMore={travelerGender.length > sliceMenuData}
								GenderData={
									useMemo(() =>
										!!travelerGender.length ?
                                            travelerGender.map((data, index) => ({
                                                label: data,
                                                actualLabel: data,
                                                value: index,
											})):
											[],
										[travelerGender]
									)
								}
								handleGenderOnChange={handleInfiniteGenderOnChange}
							/>
							<SelectComponent
								data={['active', 'not-active']}
								label={'Status'}
								placeholder={'Select Status'}
								handleChange={(data: any) => setTravelerStatus(data)}
							/>
							<MultiSelectComponent
								cdata={[
									{ label: 'United States', value: 'United States' },
									{ label: 'Great Britain', value: 'Great Britain' },
									{ label: 'Pakistan', value: 'Pakistan' }
									]}
								label={'Places To Visit'}
								placeholder={'Places to visit'}
								handleChange={(data: any) => setToTravelPlaces(data)}
							/>
							<SelectComponent
								data={['Muslim', 'Christianity', 'Hinduism']}
								label={'Religion Pref'}
								placeholder={'Select Religion'}
								handleChange={(data: any) => setReligion(data)}
							/>
							<Button variant='outlined' onClick={() => setMatchBuilder(true)}>
								<a>
									Match Builder
								</a>
							</Button>
							<Modal
								opened={matchBuilder}
								onClose={() => {
									setMatchBuilder(false)
								}}
								centered={true}
								title={
									<Title order={3}>Match Builder</Title>
								}
								size="calc(70%)"
							>
								<Grid>
									<h1>More Filters</h1>
									<Grid.Col span={12}>
										<SelectComponent
											data={['Muslim', 'Christianity', 'Hinduism']}
											label={'Religion Pref'}
											placeholder={'Select Religion'}
											handleChange={(data: any) => setReligion(data)}
										/>
									</Grid.Col>
									<Grid.Col span={12}>
										<MultiSelectComponent
											cdata={[
												{ label: 'bike', value: 'bike' },
												{ label: 'car', value: 'car' },
												{ label: 'bus', value: 'bus' },
												{ label: 'airplane', value: 'airplane' },
											]}
											label={'Choose Ride Pref'}
											placeholder={'choose ride preference'}
											handleChange={(data: any) => setRidePreference(data)}
										/>
									</Grid.Col>
									<Grid.Col span={12}>
											<Button variant='outlined' onClick={() => setMatchBuilder(false)}>
												Apply
											</Button>
									</Grid.Col>
									<Grid.Col span={12}>
										<h4>
											User Specific Search History
										</h4>
											{builderData?.length && builderData?.map(({history}: any, index) => (
												<Accordion>
													<AccordionSummary
														expandIcon={<ExpandMoreIcon />}
														aria-controls="panel1a-content"
														id="panel1a-header"
														>
														<Typography>{index} - {history}</Typography>
													</AccordionSummary>
													<AccordionDetails>
														<Typography>
														This search history include previous collected search.
														</Typography>
														<Typography>
															history: {history}
														</Typography>
													</AccordionDetails>
												</Accordion>
											))}
									</Grid.Col>
								</Grid>
							</Modal>
							<p><span style={{color: '#1976d2'}}>Note</span> match builder is history storing capability of additional filters so you can use in your next session</p>
						</RecommendedTravelerSideBarFilter>
					</RecommendedTravelerSideBarContainer>

					<RecommendedTravelerTableContainer>
						{isFetching ? (
							<>
								<Table
									horizontalSpacing={'xs'}
									verticalSpacing={'sm'}
									striped={true}
									highlightOnHover
									style={{ width: '100%' }}
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
											{tableData.tableHead.map((headData, index) => {
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
									{Array.from(Array(parseInt(pageSize)).keys())?.map((data: any, index: number) => {
										return (
											<Skeleton ml={25} height={50} mt={1} key={index}/>
										);
									})}
								</Grid>
							</>
						) : (
                            <TableComponent
                                striped={true}
                                verticalSpacing="xs"
                                horizontalSpacing="sm"
                                minimumQty={minimumQuantity}
                                tableHead={tableData.tableHead}
                                tableBodyData={filterRecommendedTravelerColumnMapping(travelersData)}
                            />
						)}
					</RecommendedTravelerTableContainer>
				</RecommendedTravelerContainer>
				<AdminSitePagination
				pageSizeValue={Number(pageSize)}
				pageSizeOnChange={handlePageSizeChange}
				paginationTotal={Math.ceil(totalTravelers / parseInt(pageSize))}
				paginationPage={parseInt(pageNo)}
				paginationOnChange={(number: any) => setPageNo(String(number))}
				pageNoMax={Math.floor(totalTravelers / parseInt(pageSize))}
				pageNoValue={Number(pageNo)}
				pageNoOnChange={(number: any) => {
					if (number) {
						if (number > Math.floor(totalTravelers / parseInt(pageSize))) {
							let parsedNumber = String(Math.floor(totalTravelers / parseInt(pageSize)));
							setPageNo(parsedNumber);
						} else if (number === 0) {
							setPageNo('1');
						} else {
							setPageNo(String(number));
						}
					} else if (number == undefined) {
						setPageNo('1');
					}
				}}
			/>
			</FilterContainer>
		</>
	);
}
