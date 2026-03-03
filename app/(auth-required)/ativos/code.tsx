"use client";

import { useEffect, useState } from "react";

export default function CoffeeLoop() {
  const [status, setStatus] = useState<string>("...Dormindo");

  useEffect(() => {
    const startDay = async () => {
      await fetch("/api/v1/brain/wake-up");
      setStatus("☕ Café & Código");
    };
    startDay();
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-4xl font-bold">{status}</h1>
    </div>
  );
}