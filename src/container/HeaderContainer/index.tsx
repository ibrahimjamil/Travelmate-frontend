import React from 'react'
import { GenericHeader } from '../../components';
import { links } from '../../utils/data';

const HeaderComponent = () => {
  return (
    <div>
      <GenericHeader links={links}/>
    </div>
  )
}

export default HeaderComponent;
