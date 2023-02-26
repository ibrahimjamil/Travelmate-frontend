import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { AxiosResponse } from 'axios';
import { QueryFunctionContext, QueryObserverResult, useQuery } from 'react-query';
import emotionStyled from '@emotion/styled';
import { Group, Skeleton, Table, Grid, createStyles } from '@mantine/core';
import { travelerApi } from '../../../api';
import TableComponent from '../../../components/Table';
import { DemoGender, DemoLocation, tableData } from '../../../utils/data';
import { RecommendedTravelerSearchRowWrapper } from '../../../components/RecommendedTravelerSearchRowWrapper';
import { SideBarFiltersWrapper } from '../../../components/SideBarFiltersWrapper';
import { AdminSitePagination } from '../../../components/AdminSitePagination';

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
  font-size: 1.65em;
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
	const [productsData, setProductsData] = useState<any[]>([]);
	const [pageNo, setPageNo] = useState('1');
	const [pageSize, setPageSize] = useState('25');
	const [totalProducts, setTotalProducts] = useState(0);
	const [isSearchBegin, setIsSearchBegin] = useState(false);
    const [travelerGender, setTravelerGender] = useState<string[]>(DemoGender.data);
    const [travelerLocation, setTravelerLocation] = useState<string[]>(DemoLocation.data);
	const [minimumQuantity, setMinimumQuantity] = useState<number | undefined>();

	const [locations, setLocation] = useState<Array<{ label: any; value: number }>>([]);
	const [gender, setGenders] = useState<Array<{ label: any; value: number }>>([]);
	const [query, setQuery] = useState<string>('');
	const [doFetchNow, setDoFetchNow] = useState(false);
	const sliceMenuData = 10;


	const clearAllFilters = () => {
		setPageNo('1');
		setPageSize('25');
		setQuery('');
		setSearchProduct('');
		setMinimumQuantity(undefined);
		setTravelerGender([]);
        setTravelerLocation([]);
	};

	// get product filter query
	const { refetch: refetchProductsByFilterQuery, isFetching } = useQuery(
		[
			'getRecommendations',
			'recommendations',
			pageNo,
			pageSize,
			query,
			travelerLocation,
			travelerGender,
		],
		async (params: QueryFunctionContext<any, any>) => {
			return await travelerApi.getRecommendedTravelers({
				path: params.queryKey[1],
				pageNo: params.queryKey[2],
				pageSize: params.queryKey[3],
				query: params.queryKey[4],
				travelerLocation: JSON.stringify(params.queryKey[5]),
				travelerGender: JSON.stringify(params.queryKey[6]),
			});
		},
		{
			enabled: false,
		}
	);

	// get products first time
	useEffect(() => {
		const fetchQuery = async () => {
			const [
				productsInfo,
			] = await Promise.allSettled([
			  refetchProductsByFilterQuery(),
			]);
		  
			if (productsInfo.status === 'fulfilled') {
			  setProductsData(productsInfo.value.data?.data.hits);
			  setTotalProducts(productsInfo.value.data?.data?.estimatedTotalHits);
			}
		  };
		fetchQuery();
	}, []);

	useEffect(() => {
		const fetchQuery = async () => {
			const productsInfo: QueryObserverResult<
				AxiosResponse<any, any>,
				any
			> = await refetchProductsByFilterQuery();
			setProductsData(productsInfo.data?.data.hits);
			setTotalProducts(productsInfo.data?.data?.estimatedTotalHits);
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
        travelerLocation
	]);

	// product mapping with head data
	const filterRecommendedTravelerColumnMapping = useMemo(() => (productData: any) => {
		return productData?.map((product: any, index: number) => {
			return {
				Image: product?.imageFront,
				Name: product?.productStyle?.styleName,
				Description:
					product?.productStyle?.vendorDescription?.split('.')[0] || 'No description for this recommended traveler',
                Gender: product?.productStyle?.description,
				Color: {
					name: product?.productColor?.name,
					colorSwatch: product?.productColor?.colorSwatch ?? '',
				},
				MatchPercentage: product?.productSize?.symbol,
				Status: '',
				Visits: ''
			};
		});
	}, [productsData])

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
	}

	return (
		<>
			<FilterContainer>
				<Group align="center" mb={50} pt={20} sx={{ width: '100%' }}>
					<RecommendedTravelerTitle>Recommended Traveler Search</RecommendedTravelerTitle>
					<Grid align="center" justify={"start"} columns={12}  sx={{ width: '100%', paddingLeft: "35px", paddingTop: '5px'}}>
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
								LocationIsLoading={!!travelerLocation.length ? false : true}
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
								GenderIsLoading={travelerGender.length > 1 ? false : true}
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
                                tableBodyData={filterRecommendedTravelerColumnMapping(productsData)}
                            />
						)}
					</RecommendedTravelerTableContainer>
				</RecommendedTravelerContainer>
			</FilterContainer>

			<AdminSitePagination
				pageSizeValue={Number(pageSize)}
				pageSizeOnChange={handlePageSizeChange}
				paginationTotal={Math.ceil(totalProducts / parseInt(pageSize))}
				paginationPage={parseInt(pageNo)}
				paginationOnChange={(number: any) => setPageNo(String(number))}
				pageNoMax={Math.floor(totalProducts / parseInt(pageSize))}
				pageNoValue={Number(pageNo)}
				pageNoOnChange={(number: any) => {
					if (number) {
						if (number > Math.floor(totalProducts / parseInt(pageSize))) {
							let parsedNumber = String(Math.floor(totalProducts / parseInt(pageSize)));
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
		</>
	);
}
