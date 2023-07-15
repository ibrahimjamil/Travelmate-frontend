import React, { Fragment, useState, useContext, useEffect } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import emotionStyled from '@emotion/styled';
import { useRouter } from 'next/router';
import { UserContext, UserType } from '../../guards/authGuard';
import InviteUserModal from './InviteUserModal';
import { useLocation } from "react-router-dom";
import { Badge, Divider, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useSocket } from '../../context/socket';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';


const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
	root: {
		position: 'relative',
		zIndex: 1,
		backgroundColor: '#fbfbfb',
		borderBottom: 'none',
		marginBottom: '0px !important',
		paddingLeft: '8px',
		paddingRight: '8px',
		height: '10vh',
	},

	dropdown: {
		position: 'absolute',
		top: HEADER_HEIGHT,
		left: 0,
		right: 0,
		zIndex: 0,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: 'hidden',

		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
		maxWidth: 'none',
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: '#000000',
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,
		[theme.fn.smallerThan('sm')]: {
			borderRadius: 0,
			padding: theme.spacing.md,
		},
	},

	linkActive: {
		backgroundColor: 'auto',
		'&, &:hover': {
			backgroundColor: 'auto',
			color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
		},
	},
}));

const LogoText = emotionStyled.h1`
  color: #1C7ED6;
  font-family: 'Montserrat';
  margin-left: 10px
`;

type GenericHeaderProps = {
	links: {
		link: string;
		label: string;
	}[];
};

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export function GenericHeader(props: GenericHeaderProps) {
	const { links } = props;
	const {socket} = useSocket();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	  });
	
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [messages, setMessage] = useState<Array<{message: string}>>([])
	const location = useLocation();
	const { classes, cx } = useStyles();
	const [active, setActive] = useState(links[0].link);
	const user: UserType | null = useContext(UserContext);
	const [opened, toggleOpened] = useBooleanToggle(false);
	const [showInviteModal, setShowInviteModal] = useState(false);

	const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, ['right']: open });
    };

	const list = (anchor: Anchor) => (
		<Box
		  sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
		  role="presentation"
		  onClick={toggleDrawer('right', false)}
		  onKeyDown={toggleDrawer('right', false)}
		>
		  <List>
			{messages.map(({message}: any, index: any) => (
			  <ListItem key={message} disablePadding>
				<ListItemButton>
				  <ListItemText primary={message} />
				</ListItemButton>
				<Divider />
			  </ListItem>
			))}
		  </List>
		</Box>
	  );

	useEffect(() => {
		const parts = location.pathname.split("/");
  		const word = parts[parts.length - 1];
		if (location.pathname === '/app/admin') {
			setActive(`/`);
		}else{
			setActive(`/${word}`)
		}

		
	}, [])

	useEffect(() => {
		if (socket == null) return;
		socket.on('notify-message', ({ message }: any) => {
			setMessage([...messages, {message}])
		})
	}, [socket])


	const items = links.map((link) => {
		if (link.label === 'Login') {
			if (!!user?.id) {
				<></>;
			} else {
				return (
					<a
						key={link.label}
						href={link.link}
						className={cx(classes.link, { [classes.linkActive]: active === link.link })}
						onClick={(event) => {
							router.push('/login');
							event.preventDefault();
							setActive(link.link);
							toggleOpened(false);
						}}
					>
						{link.label}
					</a>
				);
			}
		} else if (link.label === 'Logout') {
			if (user?.id) {
				return (
					<a
						key={link.label}
						href={link.link}
						className={cx(classes.link, { [classes.linkActive]: active === link.link })}
						onClick={(event) => {
							localStorage.removeItem('accessToken');
							localStorage.removeItem('idToken');
							router.push('/login');
							event.preventDefault();
							setActive(link.link);
							toggleOpened(false);
						}}
					>
						{link.label}
					</a>
				);
			}
		} else if (link.label === 'Invite') {
			return (
				<a
					key={link.label}
					href={link.link}
					className={cx(classes.link, { [classes.linkActive]: active === link.link })}
					onClick={(event) => {
						event.preventDefault();
						setActive(link.link);
						setShowInviteModal(true);
					}}
				>
					{link.label}
				</a>
			);
		} else if(link.label === 'notification'){
			return (
				<IconButton onClick={() => {
						setOpen(!open)
						toggleDrawer('right', true)
					}}>
					<Badge variant='dot' color="primary" anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}>
						<MailIcon color="action" />
						{open ? 
							<>
								<React.Fragment key={'right'}>
									<Drawer
										anchor={'right'}
										open={state['right']}
										onClose={toggleDrawer('right', false)}
									>
										{list('right')}
									</Drawer>
									</React.Fragment>
							</>
						: ''}
					</Badge>
				</IconButton>
			)
		} else {
			return (
				<a
					key={link.label}
					href={link.link}
					className={cx(classes.link, { [classes.linkActive]: active === link.link })}
					onClick={(event) => {
						event.preventDefault();
						setActive(link.link);
						toggleOpened(false);
						window.location.href = `https://travelmate-frontend.vercel.app/app/admin/${link.link}`
					}}
				>
					{link.label}
				</a>
			);
		}
	});

	return (
		<Fragment>
			<Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
				<Container className={classes.header}>
					<LogoText>Travelmate</LogoText>
					<Group spacing={5} className={classes.links}>
						{items}
					</Group>

					<Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />

					<Transition transition="pop-top-right" duration={200} mounted={opened}>
						{(styles) => (
							<Paper className={classes.dropdown} withBorder style={styles}>
								{items}
							</Paper>
						)}
					</Transition>
				</Container>
			</Header>
			<InviteUserModal opened={showInviteModal} setOpened={setShowInviteModal} />
		</Fragment>
	);
}
