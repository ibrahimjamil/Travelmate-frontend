import { useState } from 'react';
import { AsyncPaginate as InfiniteSelect } from 'react-select-async-paginate';

type DataType = {
	label: any; // Modified label based on condition of list specific for color
	actualLabel: string; // Actual item label before any modification for filtering
	colorSwatch?: string;
	value: number;
}[];

type InfiniteSelectComponentProps = {
	value: any;
	onChange: any;
	data: DataType;
	placeholder?: string;
	sliceData: number; // How many products to slice at a time
	isLoading: boolean;
	className?: any;
	initialRenderData?: DataType;
	isInitialHasMore?: boolean;
};

const InfiniteSelectComponent = (props: InfiniteSelectComponentProps) => {
    const [fetchLoading, setFetchLoading] = useState(false);
    const [doFirstRender, setDoFirstRender] = useState(true);
    const { 
        value, onChange, data,
        placeholder, sliceData, 
        isLoading, className, initialRenderData,
        isInitialHasMore,
    } = props;
    const loadOptions = async (search: any, prevOptions: any) => {
        if (doFirstRender) {
            setDoFirstRender(false);
            return {
                options: initialRenderData || [],
                hasMore: isInitialHasMore
            }
        }
        setFetchLoading(true);
        const sleep = (ms: any) =>
            new Promise((resolve) => {
                setTimeout(() => {
                resolve('');
                }, ms);
            });
        await sleep(200);
        let filteredOptions;
        if (!search) {
            filteredOptions = data;
        } else {
            const searchLower = search.toLowerCase();
            filteredOptions = data
                .filter(({ actualLabel }: any) => actualLabel.toLowerCase().includes(searchLower));
        }
        const hasMore = filteredOptions.length > prevOptions.length + sliceData;
        const slicedData = filteredOptions
            .slice(prevOptions.length,prevOptions.length + sliceData);
        setFetchLoading(false);
        return {
            options: slicedData,
            hasMore
        };
    };

	return (
		<InfiniteSelect
			isMulti
			value={value}
			onChange={onChange}
			closeMenuOnSelect={true}
			loadOptions={loadOptions}
			className={className ? className : 'globalInfiniteScroll'}
			placeholder={placeholder}
			isLoading={isLoading || fetchLoading}
			isDisabled={isLoading}
			styles={{ placeholder: (provided, state) => ({ ...provided, fontWeight: 300, opacity: '0.5' }) }}
		/>
	);
};

export default InfiniteSelectComponent;
