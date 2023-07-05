const links = [
    {
      link: '/',
      label: "Home"
    },
    {
      link: '/invite',
      label: "Invite"
    },
    {
      link: '/matched-builder',
      label: "Matched Builder"
    },
    {
      link: '/matched-travelers',
      label: "Matched Travelers"
    },
    {
      link: '/vendors',
      label: "Vendors"
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
    },
    {
      link: '/',
      label: 'notification'
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
    'Name','Age', 'Location', 'OwnGender', 'GenderPreference' , 'RidePreference', 'Religion', 'Status', 'PlacesToVisit', 'MateAge'
  ]
}

  export {
      links,
      DemoGender,
      tableData,
      DemoLocation
  }