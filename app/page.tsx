"use client"; // this is a client component 👈🏽

import { useState } from 'react';
import MainList from './main/page';
import MainLayout from './main/layout';


export default function Main() {
  return (
    <MainLayout>
      <MainList />
    </MainLayout>
  );
}