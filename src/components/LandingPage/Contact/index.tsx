import { createStyles, Text, Title, SimpleGrid, TextInput, Textarea, Button, Group, ActionIcon } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import AppConfig from "../../../constants/AppConfig";


const useStyles = createStyles((theme) => ({
	wrapper: {
		minHeight: 400,
		boxSizing: 'border-box',
		backgroundImage: `${theme.colors[theme.primaryColor][4]}`,
		borderRadius: theme.radius.md,
		padding: theme.spacing.xl * 2.5,

		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: theme.spacing.xl * 1.5,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		color: theme.colors.gray[8],
		lineHeight: 1,
	},

	description: {
		maxWidth: 300,

		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			maxWidth: '100%',
		},
	},

	form: {
		backgroundColor: theme.white,
		padding: theme.spacing.xl,
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.lg,
	},

	social: {
		color: theme.white,

		'&:hover': {
			color: theme.colors[theme.primaryColor][1],
		},
	},

	input: {
		backgroundColor: theme.white,
		borderColor: theme.colors.gray[4],
		color: theme.black,

		'&::placeholder': {
			color: theme.colors.gray[5],
		},
	},

	inputLabel: {
		color: theme.black,
	},

	control: {
		backgroundColor: theme.colors[theme.primaryColor][6],
	},
}));

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

type FormInputType = {
	email: string;
	name?: string;
	message: string;
};

export function ContactUs() {
	const { classes } = useStyles();

	const { register, handleSubmit, formState, reset } = useForm<FormInputType>({
		mode: 'onChange',
	});

	const sendMessageToSlack: SubmitHandler<FormInputType> = async (formData) => {
		try {
			const { name, email, message } = formData;
			await axios.post(AppConfig.SLACK_WEBHOOK as string,  {
				channel: AppConfig.SLACK_PUBLIC_CHANNEL,
				username: email,
				blocks: [
					{
						"type": "section",
						"fields": [
							{
								"type": "plain_text",
								"text": `name: ${name}`,
								"emoji": true
							}
						]
					},
					{
						"type": "section",
						"fields": [
							{
								"type": "plain_text",
								"text": `email: ${email}`,
								"emoji": true
							}
						]
					},
					{
						"type": "section",
						"text": {
							"type": "plain_text",
							"text": `message: ${message}`,
							"emoji": true
						}
					}
				]
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		
			reset({
				email: '',
				name: '',
				message: '',
			});
		} catch (error) {
			console.log(error);
		}
	};

	const icons = social.map((Icon, index) => (
		<ActionIcon key={index} size={28} className={classes.social} variant="transparent">
			<Icon size={22} stroke={1.5} />
		</ActionIcon>
	));

	return (
		<div className={classes.wrapper}>
			<SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
				<div>
					<Title className={classes.title}>Contact us</Title>
					<Text color="dimmed" className={classes.description} mt="sm" mb={30}>
						We love hearing from you.
						<br />
						<br />
						{
							"If you have questions, feedback, or just want to say hello, don't hesitate to drop us a message and we'll get back to you as soon as we can."
						}
					</Text>

					<Group mt="xl">{icons}</Group>
				</div>
				<form className={classes.form} onSubmit={handleSubmit(sendMessageToSlack)}>
					<TextInput
						label="Email"
						placeholder="your@email.com"
						required
						type='email'
						classNames={{ input: classes.input, label: classes.inputLabel }}
						{...register('email', { required: true })}
					/>
					<TextInput
						label="Name"
						placeholder="John Doe"
						mt="md"
						classNames={{ input: classes.input, label: classes.inputLabel }}
						{...register('name')}
					/>
					<Textarea
						required
						label="Your message"
						placeholder="Your comment or inquiry here"
						minRows={4}
						mt="md"
						classNames={{ input: classes.input, label: classes.inputLabel }}
						{...register('message', { required: true })}
					/>
					{/* TODO: Add message sending functionality */}
					<Group position="right" mt="md">
						<Button type='submit' className={classes.control} disabled={!formState.isValid || !formState.isDirty}>Send message</Button>
					</Group>
				</form>
			</SimpleGrid>
		</div>
	);
}
