"use client";

import React from "react";
import { MealPlanSection } from "@/components/sections/MealPlanSection";
import { NavigationBarSection } from "@/components/sections/NavigationBarSection";

export default function DashboardPage() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <aside className="w-full md:w-1/6 min-h-screen md:sticky top-0 bg-white shadow-md">
        <NavigationBarSection />
      </aside>
      <section className="flex-1 bg-white p-4">
        <MealPlanSection />
      </section>
    </main>
  );
}