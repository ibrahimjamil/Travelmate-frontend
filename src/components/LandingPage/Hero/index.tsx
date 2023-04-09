import { createStyles, Image, Container, Title, Button, Group, Text, List, ThemeIcon } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
	hero: {
		backgroundColor: '#FAFAFF',
	},

	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: theme.spacing.xl * 4,
		paddingBottom: theme.spacing.xl * 4,
	},

	content: {
		marginRight: theme.spacing.xl * 3,
		marginLeft: theme.spacing.xl * 3,

		[theme.fn.smallerThan('md')]: {
			maxWidth: '100%',
			marginRight: 0,
		},
	},

	title: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 44,
		lineHeight: 1.2,
		fontWeight: 900,

		[theme.fn.smallerThan('xs')]: {
			fontSize: 28,
		},
	},

	control: {
		[theme.fn.smallerThan('xs')]: {
			flex: 1,
		},
	},

	imageContainer: {
		flex: 1,
		minWidth: '45%',

		[theme.fn.smallerThan('md')]: {
			display: 'none',
		},
	},

	image: {
		borderTopLeftRadius: '32px',
		borderBottomLeftRadius: '32px',
		boxShadow: '0 4px 16px 4px rgba(0, 0, 0, 0.075)',
		minHeight: '500px',
		maxHeight: '600px',
		objectPosition: 'left top',
	},

	highlight: {
		position: 'relative',
		backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
		borderRadius: theme.radius.sm,
		padding: '4px 12px',
	},
}));

export function Hero() {
	const { classes } = useStyles();
	return (
		<div className={classes.hero}>
			<Container fluid pr={0}>
				<div className={classes.inner}>
					<div className={classes.content}>
						<Title className={classes.title}>
							Find <span className={classes.highlight}>in-stock</span> apparel the easy way
						</Title>
						<Text color="dimmed" mt="md">
							No more hopping between supplier websites. Quickly search inventory levels of products
							across the promotional apparel industry and find alternatives to out of stock items.
						</Text>
						<Group mt={30}>
							<Link href="/signup">
								<Button radius="md" size="md" className={classes.control}>
									Find Products Now
								</Button>
							</Link>
						</Group>
					</div>
					<Image
						src="https://merchflow.nyc3.digitaloceanspaces.com/landing-page/screenshot_cropped5.png"
						className={classes.imageContainer}
						classNames={{ image: classes.image }}
						alt="search screenshot"
					/>
				</div>
			</Container>
		</div>
	);
}
