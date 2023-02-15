import { useEffect } from 'react';
import { Modal, createStyles, Image, Grid, Title } from '@mantine/core';

type ModalComponentProps = {
  open: boolean;
  close: () => void;
  data: any;
}

type ProductVendor = {
  id: number;
  vendorColorName: string;
  vendorId: number;
  vendorSizeName: string;
  stock: number;
}

const useStyles = createStyles((theme) => ({
  brandName: {
    marginBottom: '1rem',
  },
  styleName: {
    paddingLeft: '0.2rem',
  },
  nameWithSwatch: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  colorSizeTable: {
    '& tr th' : {
      minWidth:  '80px',
    },

    '& tr td:first-child': {
      minWidth:  '140px',
    }
  },

  header: {
    top: 0,
    zIndex: 1,
    position: 'sticky',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))


const RecommendedTravelerDescriptionModal = (props: ModalComponentProps) => {
  const { open, close, data } = props || {};
  useEffect(() => {
  }, [open])

  return (
      <Modal
        opened={open}
        onClose={() => {
          close();
        }}
        centered={true}
        title={
          <Title order={3}>Recommended Traveler Description</Title>
        }
        size="calc(60%)"
        className="product-modal"
      >
        <Grid pt={1} pr={0} mr={0}>
          <Grid.Col span={12}>
            <Image src={data["Image"]} radius="sm" height={200} fit="contain" withPlaceholder />
          </Grid.Col>
          <Grid.Col>
            <h1>Nothing in there till now</h1>
          </Grid.Col>
			  </Grid>
      </Modal>
  )
}

export default RecommendedTravelerDescriptionModal;