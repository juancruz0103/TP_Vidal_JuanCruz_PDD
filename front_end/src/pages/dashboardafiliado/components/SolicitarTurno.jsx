import React, { useEffect, useState } from "react"

const API = import.meta.env.VITE_API_URL

export default function SolicitarTurno() {
  const [tratamientos, setTratamientos] = useState([])
  const [odontologos, setOdontologos] = useState([])
  const [consultorios, setConsultorios] = useState([])
  const [formData, setFormData] = useState({
    id_tratamiento: "",
    id_odontologo: "",
    id_consultorio: "",
    fecha: "",
    hora: "",
  })
  const [mensaje, setMensaje] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/tratamientos`).then(res => res.json()).then(setTratamientos)
    fetch(`${API}/api/odontologos`).then(res => res.json()).then(setOdontologos)
    fetch(`${API}/api/consultorios`).then(res => res.json()).then(setConsultorios)
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setMensaje("")
    const token = localStorage.getItem("token")
    fetch(`${API}/api/turnos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al solicitar turno")
        return res.json()
      })
      .then(() => {
        setMensaje("¡Turno solicitado con éxito!")
        setFormData({
          id_tratamiento: "",
          id_odontologo: "",
          id_consultorio: "",
          fecha: "",
          hora: "",
        })
      })
      .catch(() => setMensaje("Hubo un error al solicitar el turno."))
      .finally(() => setLoading(false))
  }

  return (
    <form className="card-af" onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "32px auto" }}>
      <h3 style={{ color: "#1d4ed8" }}>Solicitar Turno</h3>
      <select name="id_tratamiento" value={formData.id_tratamiento} onChange={handleChange} required>
        <option value="">Seleccionar tratamiento</option>
        {tratamientos.map(t => (
          <option key={t.id_tratamiento} value={t.id_tratamiento}>{t.nombre}</option>
        ))}
      </select>
      <select name="id_odontologo" value={formData.id_odontologo} onChange={handleChange} required>
        <option value="">Seleccionar odontólogo</option>
        {odontologos.map(o => (
          <option key={o.id_odontologo} value={o.id_odontologo}>{o.nombre} {o.apellido}</option>
        ))}
      </select>
      <select name="id_consultorio" value={formData.id_consultorio} onChange={handleChange} required>
        <option value="">Seleccionar consultorio</option>
        {consultorios.map(c => (
          <option key={c.id_consultorio} value={c.id_consultorio}>Consultorio #{c.numero}</option>
        ))}
      </select>
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
      <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Solicitando..." : "Solicitar Turno"}
        </button>
      </div>
      {mensaje && <p style={{ marginTop: 10, color: mensaje.startsWith("¡") ? "#16a34a" : "#dc2626" }}>{mensaje}</p>}
    </form>
  )
}