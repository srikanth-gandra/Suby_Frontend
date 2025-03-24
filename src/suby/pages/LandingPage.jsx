import React from 'react'
import Topbar from '../components/TopBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import FirmCollections from '../components/FirmCollections'

const LandingPage = () => {
  return (
    <div>
        <Topbar />
        <ItemsDisplay />
        <Chains />
        <FirmCollections />
    </div>
  )
}

export default LandingPage