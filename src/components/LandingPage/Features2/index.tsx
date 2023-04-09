import { Image, Text, Container, ThemeIcon, Title, SimpleGrid, createStyles } from '@mantine/core';
import { IconGauge, IconCookie, IconUser, IconMessage2, IconLock, TablerIcon } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
	wrapper: {
		paddingTop: 80,
		paddingBottom: 50,
	},

	item: {
		display: 'flex',
	},

	itemIcon: {
		padding: theme.spacing.xs,
		marginRight: theme.spacing.md,
	},

	itemTitle: {
		marginBottom: theme.spacing.xs / 2,
	},

	supTitle: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: 800,
		fontSize: theme.fontSizes.sm,
		color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
		letterSpacing: 0.5,
	},

	title: {
		lineHeight: 1,
		textAlign: 'center',
		marginTop: theme.spacing.xl,
	},

	description: {
		textAlign: 'center',
		marginTop: theme.spacing.xs,
	},

	highlight: {
		backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
		padding: 5,
		paddingTop: 0,
		borderRadius: theme.radius.sm,
		display: 'inline-block',
		color: theme.colorScheme === 'dark' ? theme.white : 'inherit',
	},
}));

interface FeatureImage {
	image: string;
	title: React.ReactNode;
	description: React.ReactNode;
}

interface FeaturesImagesProps {
	supTitle: React.ReactNode;
	description: React.ReactNode;
	// data: FeatureImage[];
}

const data = [
	{
		image: 'auditors',
		title: 'Pharmacists',
		description: 'Azurill can be seen bouncing and playing on its big, rubbery tail',
	},
	{
		image: 'lawyers',
		title: 'Lawyers',
		description: 'Fans obsess over the particular length and angle of its arms',
	},
	{
		image: 'accountants',
		title: 'Bank owners',
		description: 'They divvy up their prey evenly among the members of their pack',
	},
	{
		image: 'others',
		title: 'Others',
		description: 'Phanpy uses its long nose to shower itself',
	},
];

export function FeaturesGrid({ supTitle, description }: FeaturesImagesProps) {
	const { classes } = useStyles();

	const items = data.map((item) => (
		<div className={classes.item} key={item.image}>
			<ThemeIcon variant="light" className={classes.itemIcon} size={60} radius="md">
				<IconGauge size={20} stroke={1.5} />
			</ThemeIcon>

			<div>
				<Text weight={700} size="lg" className={classes.itemTitle}>
					{item.title}
				</Text>
				<Text color="dimmed">{item.description}</Text>
			</div>
		</div>
	));

	return (
		<Container size={700} className={classes.wrapper}>
			<Text className={classes.supTitle}>{supTitle}</Text>

			<Title className={classes.title} order={2}>
				Get immediate access to aggregated inventory levels from suppliers across the industry
			</Title>

			<Container size={660} p={0}>
				<Text color="dimmed" className={classes.description}>
					{description}
				</Text>
			</Container>

			<SimpleGrid
				cols={2}
				spacing={50}
				breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
				style={{ marginTop: 30 }}
			>
				{items}
			</SimpleGrid>
		</Container>
	);
}
