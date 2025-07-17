import React from "react"
import "./DashboardAfiliado.css"
import ProximoTurno from "./components/ProximoTurno"
import TratamientosRecientes from "./components/TratamientosRecientes"
import InformacionContacto from "./components/InformacionContacto"
import PagosFacturacion from "./components/PagosFacturacion"
import SolicitarTurno from "./components/SolicitarTurno"

export default function DashboardAfiliado() {
  return (
    <div className="dashboard-afiliado">
      <h2 className="titulo">Panel del Paciente</h2>
      <p className="subtitulo">Bienvenido a tu portal personal.</p>

      <ProximoTurno />
      <TratamientosRecientes />
      <SolicitarTurno />
      <InformacionContacto />
      <PagosFacturacion />
    </div>
  )
}