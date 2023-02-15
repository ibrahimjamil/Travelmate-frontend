const links = [
    {
      link: '/',
      label: "Home"
    },
    {
      link: '/about',
      label: "About"
    },
    {
      link: '/invite',
      label: "Invite"
    },
    {
      link: '/contact',
      label: "Contact"
    },
    {
      link: '/login',
      label: 'Login'
    },
    {
      link: '/logout',
      label: "Logout"
    }
  ]

const DemoGender = {
  label: "Gender",
  placeholder: "Select gender",
  data: ['Men', 'Women', 'Unisex']
}

const DemoLocation = {
  label: "Location",
  placeholder: "Select Locations",
  data: ['Lahore', 'Karachi', 'Peshawar','Lahore', 'Karachi', 'Peshawar','Lahore', 'Karachi', 'Peshawar','Lahore', 'Karachi', 'Peshawar','Lahore', 'Karachi', 'Peshawar','Lahore', 'Karachi', 'Peshawar','Lahore', 'Karachi', 'Peshawar','Lahore', 'Karachi', 'Peshawar','Lahore', 'Karachi', 'Peshawar','Lahore', 'Karachi', 'Peshawar']
}

const tableData={
  tableHead:[
    'Image', 'Name', 'Description', 'Gender', 'MatchPercentage'
  ]
}

  export {
      links,
      DemoGender,
      tableData,
      DemoLocation
  }