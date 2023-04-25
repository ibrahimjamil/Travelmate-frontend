const links = [
    {
      link: '/',
      label: "Home"
    },
    {
      link: '/matched-travelers',
      label: "Matched Travelers"
    },
    {
      link: '/payments',
      label: "Payment"
    },
    {
      link: '/chats',
      label: "Chat"
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
  data: ['Male', 'Female']
}

const DemoLocation = {
  label: "Location",
  placeholder: "Select Locations",
  data: ['Lahore', 'Las-Vegas', 'London']
}

const tableData={
  tableHead:[
    'Name','Age', 'Location', 'OwnGender', 'GenderPreference' , 'Status', 'PlacesToVisit', 'MateAge'
  ]
}

  export {
      links,
      DemoGender,
      tableData,
      DemoLocation
  }