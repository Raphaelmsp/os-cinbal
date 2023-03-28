/* eslint-disable quotes */
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { useDrawerContext } from "../shared/contexts";
import { Visualizar } from "../pages/pessoas/Visualizar";
import {
  Dashboard,
  DetalheDePessoas,
  ListagemDePessoas,
  // DetalheDeCidades,
  // ListagemDeCidades,
} from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/pagina-inicial",
        label: "Dashboard",
      },
      // {
      //   icon: "location_city",
      //   path: "/cidades",
      //   label: "Cidades",
      // },
      {
        icon: "people",
        path: "/pessoas",
        label: "Ordem de Serviço",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
      <Route path="/pessoas/visualizar/:id" element={<Visualizar />} />

      {/* <Route path="/cidades" element={<ListagemDeCidades />} />
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} /> */}

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
