import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Customers from "../pages/Customers"
import Stocks from "../pages/Stocks"
import Layout from "../components/Layout"
import React from "react"
import { ROUTES } from "../utils/costants"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.customers} element={<Customers />} />
          <Route path={ROUTES.stocks} element={<Stocks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
