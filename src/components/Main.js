import React from 'react'
import { Switch, Route } from 'react-router-dom'

import View from './View'
import Board from './Board'

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={View} />
        <Route exact path="/board" component={Board} />
      </Switch>
    </main>
  )
}

export default Main
