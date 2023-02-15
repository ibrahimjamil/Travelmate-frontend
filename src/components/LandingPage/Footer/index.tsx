import { createStyles, Container, Group, Anchor, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	footer: {
		// marginTop: 120,
		padding: '18px 0',
		borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
		backgroundColor: `${theme.colorScheme === 'dark' ? theme.colors.dark[5] : '#FAFAFF'}`,
	},

	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,

		[theme.fn.smallerThan('xs')]: {
			flexDirection: 'column',
		},
	},

	links: {
		[theme.fn.smallerThan('xs')]: {
			marginTop: theme.spacing.md,
		},
	},

	logo: {
		color: '#2270E5',
		fontFamily: 'Montserrat',
		margin: 0,
	},
}));

const links = [
	{
		link: '/terms',
		label: 'Terms & Conditions',
	},
	{
		link: '/privacy',
		label: 'Privacy',
	},
];

export function Footer() {
	const { classes } = useStyles();
	const items = links.map((link) => (
		<Anchor<'a'>
			color="dimmed"
			key={link.label}
			href={link.link}
			onClick={(event) => event.preventDefault()}
			size="sm"
		>
			{link.label}
		</Anchor>
	));

	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<Group align="end">
					<h2 className={classes.logo}>MerchFlow</h2>
					<Text size="sm" color="dimmed">
						© 2022 MerchFlow, Inc. All rights reserved.
					</Text>
				</Group>

				<Group className={classes.links}>{items}</Group>
			</Container>
		</div>
	);
}
