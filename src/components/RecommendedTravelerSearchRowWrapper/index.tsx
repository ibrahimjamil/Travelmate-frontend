import { Box, Button, createStyles, Grid, NumberInput, SegmentedControl } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import InputWrapper from "../InputWrapper";

const useStyles = createStyles((theme) => ({
    searchPlace: {
		input: {
			width: '100%',
			fontWeight: 300,
			':focus': {
				border: '2px solid #187eff !important',
			},
			'::placeholder': {
				color: 'dimmed',
			},
		},
	},
    minimumQtyBtn: {
		input: {
			height: '38px !important',
			fontWeight: 300,
			':focus': {
				border: '2px solid #187eff !important',
			},
			'::placeholder': {
				color: 'dimmed',
			},
		},
	},
	primaryButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
        marginRight: "10px"
	},
    segmentControlButton: {
        height: '38px !important',
    }
}))

type RecommendedTravelerSearchRowWrapper = {
    setMinimumQuantity: any;
    minimumQuantity: number | undefined;
    clearAllFilters: () => void;
    handleSetIsSearchBegin: (searchState: string) => void;
    onKeyDown: (e: any, searchParams: any) => void;
}

export function RecommendedTravelerSearchRowWrapper (props: RecommendedTravelerSearchRowWrapper){
    const {classes} = useStyles();
    const [searchParam, setSearchProduct] = useState('');
    const largeScreen = useMediaQuery('(min-width: 1307px)');

    const {
        minimumQuantity, 
        setMinimumQuantity,
        onKeyDown, 
        clearAllFilters,
        handleSetIsSearchBegin,
    } = props;
    return (
        <>
            <Grid.Col span={largeScreen ? 5 : 3}>
                <InputWrapper
                    label=""
                    value={searchParam}
                    placeholder="Deep search recommended travelers"
                    handleChange={(e: any) => {
                        setSearchProduct(e.target.value);
                    }}
                    size="sm"
                    className={classes.searchPlace}
                    onKeyDown={(e: any) => {
                            onKeyDown(e, searchParam)
                        }
                    }
                />
            </Grid.Col>
            <Grid.Col span={2}>
                <Box mt={-23}>
                    <div style={{ marginBottom: '8px', fontSize: '1em', fontWeight: 600 }}>
                        {largeScreen  ? 'Desired Quantity' : 'Quantity'}
                    </div>
                    <NumberInput
                        height={44}
                        value={minimumQuantity}
                        onChange={setMinimumQuantity}
                        placeholder="Quantity"
                        className={classes.minimumQtyBtn}
                        min={0}
                    />
                </Box>
            </Grid.Col>
            <Grid.Col span={largeScreen ? 4 : 7} sx={{display: 'flex', flexDirection: 'row', padding: "0px"}}>
                    <Button
                        size={'sm'}
                        className={classes.primaryButton}
                        onClick={() => handleSetIsSearchBegin(searchParam)}
                    >
                        Search
                    </Button>
                    <Button
                        size={'sm'}
                        className={classes.primaryButton}
                        onClick={() => {
                                setSearchProduct('')
                                clearAllFilters();
                            }
                        }
                    >
                        Clear All
                    </Button>
            <Box mt={-23}>
                        <div style={{ marginBottom: '8px', fontSize: '1em', fontWeight: 600 }}>
                            {'Desired Index'}
                        </div>
                        <SegmentedControl
                            color={"blue"}
                            className={classes.segmentControlButton}
                            value={'Traveler-style'}
                            data={[
                                { value: 'Traveler-variant', label: 'Traveler-variant' },
                                { value: 'Traveler-style', label: 'Traveler-style' },
                            ]}
                        />
                    </Box>
            </Grid.Col>
        </>
    )
}