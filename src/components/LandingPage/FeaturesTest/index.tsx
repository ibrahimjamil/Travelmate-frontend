import { createStyles, Title, SimpleGrid, Text, Button, ThemeIcon, Grid, Col } from '@mantine/core';
import { IconChecks, IconLayoutGridAdd, IconHammer, IconFilter } from '@tabler/icons';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
	wrapper: {
		// padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
		padding: '100px 80px',
		backgroundColor: '#FAFAFF',
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 36,
		fontWeight: 900,
		lineHeight: 1.1,
		marginBottom: theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
	},
}));

const features = [
	{
		icon: IconChecks,
		title: 'Instantly find stocked suppliers',
		description:
			'Stop guessing which suppliers have the inventory you need and quickly know who has what in stock.',
	},
	{
		icon: IconFilter,
		title: 'Filter by quantity',
		description: 'Save time by only showing products that have the quantity you need.',
	},
	{
		icon: IconHammer,
		title: 'Built for distributors and decorators',
		description:
			'Built exclusively for distributors and decorators in the promotional products industry. Verify your industry status to access exclusive data.',
	},
	{
		icon: IconLayoutGridAdd,
		title: 'Growing set of features',
		description:
			'Get access to our evolving features and tools to simplify your day to day operations as a distributor or decorator.',
	},
];

export function Features() {
	const { classes } = useStyles();

	const items = features.map((feature) => (
		<div key={feature.title}>
			<ThemeIcon size={44} radius="md" variant="filled" gradient={{ deg: 133, from: 'blue', to: 'cyan' }}>
				<feature.icon size={26} stroke={1.5} />
			</ThemeIcon>
			<Text size="lg" mt="sm" weight={500}>
				{feature.title}
			</Text>
			<Text color="dimmed" size="sm">
				{feature.description}
			</Text>
		</div>
	));

	return (
		<div className={classes.wrapper}>
			<Grid gutter={80}>
				<Col span={12} md={5}>
					<Title className={classes.title} order={2}>
						See inventory levels from suppliers across the industry for free
					</Title>
					<Text color="dimmed">
						Have the info at your fingertips to tell your clients what is available right now to fill their
						marketing needs, and avoid items that are unavailable, all at no cost.
					</Text>
					<Link href="/signup">
						<Button size="lg" radius="md" mt="xl">
							Get started
						</Button>
					</Link>
				</Col>
				<Col span={12} md={7}>
					<SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
						{items}
					</SimpleGrid>
				</Col>
			</Grid>
		</div>
	);
}
