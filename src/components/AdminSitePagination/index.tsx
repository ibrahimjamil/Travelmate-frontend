import { createStyles, Grid, NumberInput, Pagination } from "@mantine/core";

const useStyles = createStyles(() => ({
    pagination: {
		width: '100%',
		justifyContent: 'center',
		paddingRight: '20px',
	},
}))

type AdminSitePagination = {
    pageSizeValue: number;
    pageSizeOnChange: any;
    paginationTotal: number
    paginationPage: number;
    paginationOnChange: (number: any) => void;
    pageNoMax: number;
    pageNoValue: number;
    pageNoOnChange: (number: any) => void;
}

export function AdminSitePagination(props: AdminSitePagination){
    const { classes } = useStyles();
    const {
        pageSizeValue,
        pageSizeOnChange,
        paginationTotal,
        paginationPage,
        paginationOnChange,
        pageNoMax,
        pageNoValue,
        pageNoOnChange,
    } = props;
    return(
        <>
            <Grid className={classes.pagination}>
                <NumberInput
                    size="sm"
                    radius="md"
                    min={5}
                    defaultValue={25}
                    value={pageSizeValue}
                    onChange={pageSizeOnChange}
                    placeholder="set Page Size"
                />
                <Pagination
                    mr={6}
                    ml={6}
                    size={'xs'}
                    total={paginationTotal}
                    page={paginationPage}
                    onChange={paginationOnChange}
                    initialPage={1}
                />
                <NumberInput
                    size="sm"
                    radius="md"
                    defaultValue={1}
                    min={1}
                    max={pageNoMax}
                    value={pageNoValue}
                    onChange={pageNoOnChange}
                    placeholder="set Page Number"
                />{' '}
            </Grid>
        </>
    );
}