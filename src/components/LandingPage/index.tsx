import type { NextPage } from 'next';
import { links } from '../../utils/data';
import { GenericHeader } from '../Header';
import { ContactUs } from './Contact';
import { FeaturesGrid } from './Features';
import { Features } from './FeaturesTest';
import { Footer } from './Footer';
import { Hero } from './Hero';

const LandingPage: NextPage = () => {
	return (
		<>
			<GenericHeader links={links} />
			<Hero />
			<FeaturesGrid
				title="Find out which suppliers have the apparel you need"
				supTitle="How It Works"
				description="Use our free and simple web app to find the blank apparel you're looking for. You will have instant access to the inventory information you need as a promotional products distributor or decorator."
			/>
			<Features />
			<ContactUs />
			<Footer />
		</>
	);
};

export default LandingPage;
