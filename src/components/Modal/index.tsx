import { useEffect, useState } from 'react';
import { Modal, createStyles, Image, Grid, Title, ScrollArea, Table, Button } from '@mantine/core';

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
  const [scrolled, setScrolled] = useState(false);
  const { classes, cx } = useStyles()
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
          <Title order={3}>Recommended Traveler Data</Title>
        }
        size="calc(60%)"
        className="product-modal"
      >
        <Grid pt={1} pr={0} mr={0}>
          <Grid.Col span={12}>
            <Image src={'/image.png'} radius="sm" height={200} fit="contain" withPlaceholder />
          </Grid.Col>
          <Grid.Col span={12}>
            <h1>Traveler Data</h1>
            <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                  <Table  className={classes.colorSizeTable} sx={{ minWidth: '100%' }} highlightOnHover striped>
                      <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                        <tr>
                          <th>Name</th>
                          <th>Age</th>
                          <th>Location</th>
                          <th>OwnGender</th>
                          <th>GenderPreference</th>
                          <th>Status</th>
                          <th>PlacesToVisit</th>
                          <th>MateAge</th>
                        </tr>
                      </thead>
                      <tbody>
                          <td style={{textAlign: 'center'}}>{`${data?.Name}`}</td>
                          <td style={{textAlign: 'center'}}>{`${data?.Age}`}</td>
                          <td style={{textAlign: 'center'}}>{`${data?.Location}`}</td>
                          <td style={{textAlign: 'center'}}>{`${data?.OwnGender}`}</td>
                          <td style={{textAlign: 'center'}}>{`${data?.GenderPreference}`}</td>
                          <td style={{textAlign: 'center'}}>{`${data?.Status}`}</td>
                          <td style={{textAlign: 'center'}}>{`${data?.PlacesToVisit}`}</td>
                          <td style={{textAlign: 'center'}}>{`${data?.MateAge}`}</td>
                      </tbody>
                    </Table>
                </ScrollArea>
          </Grid.Col>
          <Grid.Col span={3}>
            <Button>
            <a href='/app/admin/matched-traveler'>
              Match This Recommendation
            </a>
            </Button>
          </Grid.Col>
			  </Grid>
      </Modal>
  )
}

export default RecommendedTravelerDescriptionModal;