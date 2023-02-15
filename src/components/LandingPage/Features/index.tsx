import { ThemeIcon, Text, Title, Container, SimpleGrid, useMantineTheme, createStyles } from '@mantine/core';
import {
	IconGauge,
	IconCookie,
	IconUser,
	IconMessage2,
	IconLock,
	TablerIcon,
	IconNumber1,
	IconBox,
	IconShirt,
	IconInputSearch,
} from '@tabler/icons';

export const MOCKDATA = [
	{
		icon: IconInputSearch,
		title: 'Search our extensive catalog',
		description:
			'Our product catalog is an aggregated list of products available from various suppliers across the industry.',
	},
	{
		icon: IconBox,
		title: 'Quickly view up-to-date stock levels',
		description:
			'The combined stock availability is displayed directly in the search results and you can hover to see stock info by vendor. No clicks or page loads required.',
	},
	{
		icon: IconShirt,
		title: 'Get the info you need for orders',
		description:
			'Vendor specific info is displayed for each product, such as style and color name, so you have the info you need to place a PO with the supplier you want.',
	},
];

interface FeatureProps {
	icon: TablerIcon;
	title: React.ReactNode;
	description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
	const theme = useMantineTheme();
	return (
		<div>
			<ThemeIcon variant="light" size={40} radius="md">
				<Icon size={20} stroke={1.5} />
			</ThemeIcon>
			<Text style={{ marginTop: theme.spacing.sm, marginBottom: 7, fontWeight: 600 }}>{title}</Text>
			<Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
				{description}
			</Text>
		</div>
	);
}

const useStyles = createStyles((theme) => ({
	wrapper: {
		paddingTop: theme.spacing.xl * 4,
		paddingBottom: theme.spacing.xl * 4,
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 900,
		marginBottom: theme.spacing.md,
		textAlign: 'center',

		[theme.fn.smallerThan('sm')]: {
			fontSize: 28,
			textAlign: 'left',
		},
	},

	description: {
		textAlign: 'center',

		[theme.fn.smallerThan('sm')]: {
			textAlign: 'left',
		},
	},

	supTitle: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: 800,
		fontSize: theme.fontSizes.sm,
		color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
		letterSpacing: 0.5,
		paddingBottom: theme.spacing.xl,
	},
}));

interface FeaturesGridProps {
	title: React.ReactNode;
	supTitle: React.ReactNode;
	description: React.ReactNode;
	data?: FeatureProps[];
}

export function FeaturesGrid({ title, description, supTitle, data = MOCKDATA }: FeaturesGridProps) {
	const { classes, theme } = useStyles();
	const features = data.map((feature, index) => <Feature {...feature} key={index} />);

	return (
		<Container className={classes.wrapper}>
			<Title className={classes.supTitle}>{supTitle}</Title>
			<Title className={classes.title}>{title}</Title>

			<Container size={560} p={0}>
				<Text size="sm" className={classes.description}>
					{description}
				</Text>
			</Container>

			<SimpleGrid
				mt={60}
				cols={3}
				spacing={theme.spacing.xl * 2}
				breakpoints={[
					{ maxWidth: 980, cols: 2, spacing: 'xl' },
					{ maxWidth: 755, cols: 1, spacing: 'xl' },
				]}
			>
				{features}
			</SimpleGrid>
		</Container>
	);
}
