import './App.css'
import React from 'react'
import MainComponent from './components/MainComponent/MainComponent'
import TitleComponent from './components/TitleComponent/TitleComponent'

function App() {
  return (
    <React.Fragment>
      <TitleComponent />
      <MainComponent />
    </React.Fragment>
  )
}

export default App
