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
    'Name', 'Location', 'Gender', 'Status', 'Places To Visit'
  ]
}

  export {
      links,
      DemoGender,
      tableData,
      DemoLocation
  }