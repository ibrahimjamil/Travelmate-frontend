import { Box, createStyles, Title } from "@mantine/core";
import InfiniteSelectComponent from "../InfiniteSelect";

const useStyles = createStyles(() => ({
    label: {
		fontWeight: 700,
	},
}))

type InfiniteOnChangeType = {
	label: any; 
	actualLabel: string;
	value: number;
}[];

type SideBarFilterWrapper = {
    // Location type
    selectLocationValue: {
        label: any,
        value: number
    }[];
    selectLocationSliceData: number;
    LocationPlaceholder: string;
    LocationClassName: string;
    LocationIsLoading: boolean;
    initialLocationRenderData: {
        label: string,
        actualLabel: string,
        value: number,
    }[] | [] | undefined;
    isInitialLocationHasMore: boolean;
    LocationData: {
        label: string,
        actualLabel: string,
        value: number,
    }[] | [];
    handleLocationOnChange: (data: InfiniteOnChangeType) => void;

    // Gender Type
    selectGenderValue: {
        label: any,
        value: number
    }[];
    selectGenderSliceData: number;
    GenderPlaceholder: string;
    GenderClassName: string;
    GenderIsLoading: boolean;
    initialGenderRenderData: {
        label: any,
        actualLabel: string,
        value: number,
    }[] | [] | undefined;
    isInitialGenderHasMore: boolean;
    GenderData: {
        label: any,
        actualLabel: string,
        value: number,
    }[] | [];
    handleGenderOnChange: (data: InfiniteOnChangeType) => void;
}
export function SideBarFiltersWrapper (props: SideBarFilterWrapper){
    const {
        LocationData,
        LocationClassName,
        LocationIsLoading,
        selectLocationValue,
        LocationPlaceholder,
        selectLocationSliceData,
        initialLocationRenderData,
        isInitialLocationHasMore,
        handleLocationOnChange,

        GenderData,
        GenderClassName,
        GenderIsLoading,
        selectGenderValue,
        GenderPlaceholder,
        selectGenderSliceData,
        initialGenderRenderData,
        isInitialGenderHasMore,
        handleGenderOnChange,
    } = props;
    const { classes } = useStyles();
    return (
        <>
            <Title sx={{ fontWeight: 700, fontSize: '1.25em' }} order={3}>
                Filters
            </Title>
            <Box>
                <Box mb={6} className={classes.label}>
                    Location
                </Box>
                <Box>
                    <InfiniteSelectComponent
                        data={LocationData}
                        value={selectLocationValue}
                        className={LocationClassName}
                        isLoading={LocationIsLoading}
                        onChange={handleLocationOnChange}
                        placeholder={LocationPlaceholder}
                        sliceData={selectLocationSliceData}
                        initialRenderData={initialLocationRenderData}
                        isInitialHasMore={isInitialLocationHasMore}
                    />
                </Box>
            </Box>
            <Box>
                <Box mb={6} className={classes.label}>
                    Gender
                </Box>
                <Box>
                    <InfiniteSelectComponent
                        data={GenderData}
                        value={selectGenderValue}
                        className={GenderClassName}
                        isLoading={GenderIsLoading}
                        onChange={handleGenderOnChange}
                        placeholder={GenderPlaceholder}
                        sliceData={selectGenderSliceData}
                        initialRenderData={initialGenderRenderData}
                        isInitialHasMore={isInitialGenderHasMore}
                    />
                </Box>
            </Box>
            <Box>
                <Box mb={6} className={classes.label}>
                    Places
                </Box>
                <Box>
                    <InfiniteSelectComponent
                        data={LocationData}
                        value={selectLocationValue}
                        className={LocationClassName}
                        isLoading={LocationIsLoading}
                        onChange={handleLocationOnChange}
                        placeholder={LocationPlaceholder}
                        sliceData={selectLocationSliceData}
                        initialRenderData={initialLocationRenderData}
                        isInitialHasMore={isInitialLocationHasMore}
                    />
                </Box>
            </Box>
            <Box>
                <Box mb={6} className={classes.label}>
                    Status
                </Box>
                <Box>
                    <InfiniteSelectComponent
                        data={GenderData}
                        value={selectGenderValue}
                        className={GenderClassName}
                        isLoading={GenderIsLoading}
                        onChange={handleGenderOnChange}
                        placeholder={GenderPlaceholder}
                        sliceData={selectGenderSliceData}
                        initialRenderData={initialGenderRenderData}
                        isInitialHasMore={isInitialGenderHasMore}
                    />
                </Box>
            </Box>
            <Box>
                <Box mb={6} className={classes.label}>
                    Rating
                </Box>
                <Box>
                    <InfiniteSelectComponent
                        data={GenderData}
                        value={selectGenderValue}
                        className={GenderClassName}
                        isLoading={GenderIsLoading}
                        onChange={handleGenderOnChange}
                        placeholder={GenderPlaceholder}
                        sliceData={selectGenderSliceData}
                        initialRenderData={initialGenderRenderData}
                        isInitialHasMore={isInitialGenderHasMore}
                    />
                </Box>
            </Box>
        </>
    )
}