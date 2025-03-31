import './App.scss'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import Footer from '../components/Footer/Footer'

import order from "../data/order.json"
import menuBase from "../data/menu.json"

import { useState } from 'react'

export default function App(){

  const [cart, setCart] = useState(order);
  const [menu, setMenu] = useState(menuBase);
  const [selected, setSelected] = useState(menuBase[0].name);

  const stateCart = {cart, setCart};
  const stateMenu = {menu, setMenu};
  const stateSelected = {selected, setSelected};

  return(
    <>
      <Header/>
      <Main stateCart={stateCart} stateMenu={stateMenu} stateSelected={stateSelected}/>
      <Footer/>
    </>
  )
}
