import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div>
      <img width={width} src='/solidLogo.png' alt="logo"/>
    </div>
  )
}

export default Logo