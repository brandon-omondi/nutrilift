"use client";

import {
  BarChart3Icon,
  ChevronDownIcon,
  CookingPotIcon,
  FilterIcon,
  GridIcon,
  HeartIcon,
  ListIcon,
  ListOrderedIcon,
  MoreVerticalIcon,
  SearchIcon,
  SlidersIcon,
  StarIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function MealPlanSection() {
  // Data for the next meal
  const nextMeal = {
    title: "Grilled Turkey Breast with Steamed Asparagus and Brown Rice",
    type: "Lunch",
    rating: "4.8/5 (125 reviews)",
    difficulty: "Medium",
    healthScore: "85/100",
    cookDuration: "10 minutes",
    totalSteps: "4 steps",
    image: "/place-image-here.png",
  };

  // Data for menu items
  const menuItems = [
    {
      title: "Avocado Toast with Poached Egg",
      type: "Breakfast",
      typeColor: "bg-purple-600",
      calories: "320 kcal",
      carbs: "30g carbs",
      protein: "14g protein",
      fats: "18g fats",
      image: "/place-image-here-1.png",
    },
    {
      title: "Grilled Shrimp Tacos with Mango Salsa",
      type: "Lunch",
      typeColor: "bg-saffron",
      calories: "400 kcal",
      carbs: "45g carbs",
      protein: "28g protein",
      fats: "12g fats",
      image: "/place-image-here-2.png",
    },
    {
      title: "Baked Chicken Breast with Quinoa and Kale",
      type: "Dinner",
      typeColor: "bg-orange",
      calories: "480 kcal",
      carbs: "50g carbs",
      protein: "40g protein",
      fats: "15g fats",
      image: "/place-image-here-3.png",
    },
  ];

  // Meal type filters
  const mealTypes = ["All", "Breakfast", "Lunch", "Snack", "Dinner"];

  return (
    <section className="flex flex-col items-start gap-7 p-4 md:p-7 relative flex-1 grow bg-white border-t md:border-t-0 md:border-l border-[#e1e1e2]">
      {/* Header */}
      <header className="flex flex-col sm:flex-row h-auto sm:h-[50px] justify-between gap-4 sm:gap-0 pl-1 pr-0 py-0 items-start sm:items-center w-full">
        <div className="flex flex-col w-full sm:w-[200px] items-start gap-1.5">
          <h1 className="font-h5-22px-semibold text-gray-400 text-2xl tracking-normal leading-6">
            Meal Plan
          </h1>
        </div>

        <div className="w-full sm:w-[380px] flex gap-3 rounded-[28px] items-center">
          <div className="flex items-center gap-1.5 px-[13px] py-[9px] flex-1 bg-gray-100 rounded-xl">
            <div className="inline-flex items-center gap-2.5">
              <SearchIcon className="w-[18px] h-[18px] text-gray-400" />
            </div>
            <div className="flex flex-1 items-center gap-2.5">
              <Input
                className="flex-1 border-0 bg-transparent shadow-none focus:outline-none text-gray-400"
                placeholder="Search menu"
              />
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="p-[9px] bg-gray-100 rounded-xl"
          >
            <SlidersIcon className="w-[22px] h-[22px] text-gray-400" />
          </Button>

          <Button className="items-center justify-center px-4 py-2.5 bg-purple-600 rounded-xl">
            <span className="inline-flex items-center gap-2.5 text-white font-medium">
              Add Menu
            </span>
          </Button>
        </div>
      </header>

      <main className="flex flex-col items-start gap-5 w-full">
        {/* Next Meal Section */}
        <section className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="inline-flex items-baseline gap-1">
              <h2 className="font-title-14px-semibold text-gray-400 text-lg whitespace-nowrap">
                Your next meal
              </h2>
            </div>

            <Button variant="ghost" size="icon" className="p-[3px] rounded">
              <MoreVerticalIcon className="w-6 h-6 text-gray-400" />
            </Button>
          </div>

          <Card className="flex flex-col md:flex-row items-start gap-3 w-full bg-white rounded-2xl overflow-hidden">
            <CardContent className="flex flex-col md:flex-row items-center gap-5 p-5 bg-gray-50 rounded-2xl">
              <div className="w-full md:w-[298px] h-[200px] md:h-[298px] bg-gray-200 rounded-[14px] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Grilled Turkey Breast meal"
                  src={nextMeal.image}
                />
              </div>

              <div className="flex flex-col items-start gap-6 pt-1 flex-1">
                <h3 className="font-title-14px-semibold text-gray-400 text-xl whitespace-nowrap">
                  {nextMeal.title}
                </h3>

                <div className="flex flex-wrap gap-4 w-full">
                  <Badge className="inline-flex items-center gap-2.5 px-2.5 py-1 bg-gray-200 rounded-lg">
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {nextMeal.type}
                    </span>
                  </Badge>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-3.5 h-3.5 text-yellow-500" />
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {nextMeal.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="flex items-center gap-2.5 flex-1 min-w-[150px]">
                    <div className="inline-flex items-center p-2 bg-gray-100 rounded-lg">
                      <BarChart3Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        Difficulty
                      </span>
                      <span className="font-title-14px-semibold text-gray-400 whitespace-nowrap">
                        {nextMeal.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-1 min-w-[150px]">
                    <div className="inline-flex items-center p-2 bg-gray-100 rounded-lg">
                      <HeartIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        Health Score
                      </span>
                      <span className="font-title-14px-semibold text-gray-400 whitespace-nowrap">
                        {nextMeal.healthScore}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full md:w-auto flex items-center justify-center px-4 py-2.5 bg-purple-600 rounded-xl">
                  <span className="inline-flex items-center gap-2.5 text-white font-medium">
                    View Recipe
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* All Menu Section */}
        <section className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="inline-flex items-baseline gap-1">
              <h2 className="font-title-14px-semibold text-gray-400 text-lg whitespace-nowrap">
                All Menu
              </h2>
            </div>

            <div className="inline-flex items-center gap-2.5">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 rounded-lg"
              >
                <FilterIcon className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  Filter
                </span>
                <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400" />
              </Button>

              <ToggleGroup
                type="single"
                defaultValue="All"
                className="flex flex-wrap items-center gap-1 bg-gray-100 rounded-lg p-1"
              >
                <ToggleGroupItem
                  value="All"
                  className="flex items-center justify-center gap-0.5 px-4 py-1.5 rounded-lg whitespace-nowrap text-gray-400 data-[state=on]:bg-purple-600 data-[state=on]:text-white"
                >
                  All
                </ToggleGroupItem>
                {mealTypes.slice(1).map((type) => (
                  <ToggleGroupItem
                    key={type}
                    value={type}
                    className="flex items-center justify-center gap-0.5 px-4 py-1.5 rounded-lg whitespace-nowrap text-gray-400 data-[state=on]:bg-purple-600 data-[state=on]:text-white"
                  >
                    {type}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {menuItems.map((item, index) => (
              <Card
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center gap-5 p-4 w-full bg-gray-50 rounded-2xl border-0"
              >
                <div className="w-full md:w-[152px] h-[120px] md:h-[104px] bg-gray-200 rounded-2xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt={item.title}
                    src={item.image}
                  />
                </div>

                <CardContent className="flex flex-col items-start justify-between p-0 flex-1 gap-4">
                  <div className="flex items-center gap-3 w-full">
                    <Badge className={`px-2.5 py-1 ${item.typeColor} rounded-md`}>
                      <span className="text-xs text-white whitespace-nowrap">
                        {item.type}
                      </span>
                    </Badge>
                  </div>

                  <h3 className="font-title-16px-semibold text-gray-400 text-xl whitespace-nowrap">
                    {item.title}
                  </h3>

                  <div className="flex items-end gap-8 w-full overflow-x-auto">
                    <div className="inline-flex items-center gap-4 px-3 py-2 bg-white rounded-md whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <img
                          className="w-3 h-3"
                          alt="Calories"
                          src="/icon-special-fire.svg"
                        />
                        <span className="text-xs text-gray-400">
                          {item.calories.split(" ")[0]}
                        </span>
                        <span className="text-xs text-gray-400">
                          {item.calories.split(" ")[1]}
                        </span>
                      </div>

                      <Separator orientation="vertical" className="h-full" />

                      <div className="inline-flex items-center gap-1">
                        <img
                          className="w-3 h-3"
                          alt="Carbs"
                          src="/icon-special-bread.svg"
                        />
                        <span className="text-xs text-gray-400">
                          {item.carbs.split(" ")[0]}
                        </span>
                        <span className="text-xs text-gray-400">
                          {item.carbs.split(" ")[1]}
                        </span>
                      </div>

                      <Separator orientation="vertical" className="h-full" />

                      <div className="inline-flex items-center gap-1">
                        <img
                          className="w-3 h-3"
                          alt="Protein"
                          src="/icon-special-fish.svg"
                        />
                        <span className="text-xs text-gray-400">
                          {item.protein.split(" ")[0]}
                        </span>
                        <span className="text-xs text-gray-400">
                          {item.protein.split(" ")[1]}
                        </span>
                      </div>

                      <Separator orientation="vertical" className="h-full" />

                      <div className="inline-flex items-center gap-1">
                        <img
                          className="w-3 h-3"
                          alt="Fats"
                          src="/icon-special-drop.svg"
                        />
                        <span className="text-xs text-gray-400">
                          {item.fats.split(" ")[0]}
                        </span>
                        <span className="text-xs text-gray-400">
                          {item.fats.split(" ")[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="flex h-5 items-center gap-3 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
          <span className="font-title-12px-semibold text-gray-400 text-xs whitespace-nowrap">
            Copyright © 2025 Nutrilift
          </span>

          <div className="inline-flex items-start gap-4">
            <Button variant="link" className="p-0 h-auto">
              <span className="font-title-12px-regular text-gray-400 text-xs whitespace-nowrap">
                Term and conditions
              </span>
            </Button>

            <Button variant="link" className="p-0 h-auto">
              <span className="font-title-12px-regular text-gray-400 text-xs whitespace-nowrap">
                Contact
              </span>
            </Button>
          </div>
        </div>
      </footer>
    </section>
  );
}