"use client";

import {
  BellIcon,
  BookOpenIcon,
  ChevronDownIcon,
  LayoutGridIcon,
  LineChartIcon,
  LogOutIcon,
  MenuIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  SearchIcon,
  UtensilsCrossedIcon,
  UploadIcon,
} from "lucide-react";
import React, { useState, useRef, JSX } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/progress-avatar";
import { Badge } from "../../components/ui/progress-badge";
import { Button } from "../../components/ui/progress-button";
import { Card, CardContent } from "../../components/ui/progress-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/progress-dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// Import the sidebar component
import { NavigationBarSection } from "@/components/sections/NavigationBarSection";
// Import the local body image from the same folder (adjust the relative path as needed)
import body from "./body.png";
import { StaticImageData } from "next/image";

export const ElementProgressDesktop = (): JSX.Element => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Weight tracking data
  const weightData = [
    { label: "Start Weight", value: 85 },
    { label: "Current Weight", value: 78 },
    { label: "Weight Goal", value: 65 },
  ];

  // Chart data points
  const chartData = [
    { month: "Apr", weight: 85 },
    { month: "May", weight: 83 },
    { month: "Jun", weight: 80 },
    { month: "Jul", weight: 73 },
    { month: "Aug", weight: 80 },
    { month: "Sep", weight: 78 },
  ];

  // Progress photos data – all images now set to the imported body
  // Dates are between November 2024 and April 2025.
  const progressPhotos: { date: string; weight: number; image: string | StaticImageData }[] = [
    { date: "Nov 2024", weight: 82, image: body },
    { date: "Dec 2024", weight: 82, image: body },
    { date: "Jan 2025", weight: 82, image: body },
    { date: "Feb 2025", weight: 81, image: body },
    { date: "Mar 2025", weight: 80, image: body },
    { date: "Apr 2025", weight: 79, image: body },
  ];

  // Footer links
  const footerLinks = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Term and conditions", path: "/terms" },
    { label: "Contact", path: "/contact" },
  ];

  const loadMore = () => {
    setVisiblePhotos((prev) => Math.min(prev + 6, progressPhotos.length));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newPhoto = {
        date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        weight: weightData[1].value,
        image: imageUrl,
      };
      progressPhotos.unshift(newPhoto);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white w-full">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <MenuIcon className="w-6 h-6" />
          </Button>
          <span className="font-semibold text-xl">Nutrilift</span>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/place-image-here.png" alt="User avatar" />
            <AvatarFallback className="bg-saffron">AV</AvatarFallback>
          </Avatar>
        </div>
        <div className={`${isMobileMenuOpen ? "flex" : "hidden"} overflow-x-auto pb-2 px-4 gap-2`}>
          {/* Optionally keep mobile nav buttons here */}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block md:w-1/6">
        <NavigationBarSection />
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1 gap-7 p-4 lg:p-7 bg-white overflow-x-hidden mt-[80px] lg:mt-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-[50px] justify-between w-full items-center">
          <div className="flex flex-col w-[340px] items-start gap-1.5">
            <h1 className="text-[length:var(--h5-22px-semibold-font-size)] font-h5-22px-semibold text-black">
              Progress
            </h1>
          </div>
          <div className="flex gap-3 items-center">
            <Button variant="outline" size="icon" className="bg-white rounded-xl p-[9px]">
              <SearchIcon className="w-[22px] h-[22px]" />
            </Button>
            <div className="relative">
              <Button variant="outline" size="icon" className="bg-white rounded-xl p-[9px]">
                <BellIcon className="w-[22px] h-[22px]" />
              </Button>
              <div className="absolute w-2 h-2 bg-orange rounded-full top-1 left-4" />
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 rounded-xl">
                <AvatarImage src="/place-image-here.png" alt="User avatar" />
                <AvatarFallback className="bg-saffron">AV</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="font-title-16px-semibold text-black">Adam Vasylenko</span>
                <span className="font-title-11px-regular text-[#8a8c90]">Member</span>
              </div>
              <Button variant="outline" size="icon" className="bg-white rounded-xl p-[5px]">
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile Title */}
        <h1 className="lg:hidden text-2xl font-semibold mb-4">Progress</h1>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row min-h-[842px] gap-5">
          <Card className="flex-col w-full lg:w-[60%] gap-5 p-4 bg-white rounded-2xl overflow-hidden">
            <CardContent className="flex flex-col gap-5">
              {/* Weight Tracking Section */}
              <div className="flex flex-col gap-5">
                <Card className="flex flex-col gap-5 p-4 bg-white rounded-2xl">
                  <CardContent className="flex justify-between items-center">
                    <h3 className="font-title-14px-semibold text-black">Weight Tracking</h3>
                    <Button variant="ghost" size="icon" className="p-[3px] rounded-[5px]">
                      <MoreHorizontalIcon className="w-6 h-6" />
                    </Button>
                  </CardContent>
                  <div className="flex flex-col gap-5">
                    {weightData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between rounded-xl">
                        <span className="font-title-11px-regular text-[#8a8c90]">{item.label}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-h5-22px-semibold text-black">{item.value}</span>
                          <span className="font-title-14px-regular text-[#8a8c90]">Kg</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-[181px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="weight"
                          stroke="#FFA257"
                          strokeWidth={2}
                          dot={{ fill: "#FFA257", stroke: "#FFFFFF", strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* Progress Photos Section */}
          <div className="flex flex-col w-full lg:w-[40%] gap-5">
            <div className="flex justify-between items-center">
              <h3 className="font-title-14px-semibold text-black">Progress Photos</h3>
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="border-green text-green hover:bg-green/10">
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green rounded-lg px-3 py-1.5 text-black" size="sm">
                      <span className="font-btn-11px-medium text-[length:var(--btn-11px-medium-font-size)]">View All</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] max-w-6xl max-h-[90vh] overflow-y-auto p-6 bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold mb-6">Progress Photos Gallery</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {progressPhotos.slice(0, visiblePhotos).map((photo, index) => (
                        <Card key={index} className="bg-white rounded-2xl overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex justify-between items-baseline p-3">
                              <span className="font-title-11px-regular text-[#8a8c90]">{photo.date}</span>
                              <div className="flex items-baseline gap-1">
                                <span className="font-title-14px-semibold text-black">{photo.weight}</span>
                                <span className="font-title-12px-regular text-[#8a8c90]">Kg</span>
                              </div>
                            </div>
                            <div className="relative w-full aspect-square bg-white">
                              <img className="w-full h-full object-cover" alt="Progress photo" src={typeof photo.image === "string" ? photo.image : photo.image.src} />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {visiblePhotos < progressPhotos.length && (
                      <div className="flex justify-center mt-6">
                        <Button onClick={loadMore} className="bg-green text-black px-6 py-2 rounded-lg">
                          Load More
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="w-full">
              <Swiper
                spaceBetween={16}
                slidesPerView={1.2}
                breakpoints={{
                  640: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 1.2 },
                  1280: { slidesPerView: 2.2 },
                }}
                onSlideChange={(swiper: { activeIndex: React.SetStateAction<number> }) =>
                  setCurrentSlide(swiper.activeIndex)
                }
              >
                {progressPhotos.slice(0, 5).map((photo, index) => (
                  <SwiperSlide key={index}>
                    <Card className="bg-white rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex justify-between items-baseline p-3">
                          <span className="font-title-11px-regular text-[#8a8c90]">{photo.date}</span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-title-14px-semibold text-black">{photo.weight}</span>
                            <span className="font-title-12px-regular text-[#8a8c90]">Kg</span>
                          </div>
                        </div>
                        <div className="relative w-full aspect-square bg-white">
                          <img className="w-full h-full object-cover" alt="Progress photo" src={typeof photo.image === "string" ? photo.image : photo.image.src} />
                        </div>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="flex items-center gap-3 w-full mt-auto">
          <div className="flex items-start gap-6 flex-1">
            <span className="font-title-12px-semibold text-gray-30 text-[length:var(--title-12px-semibold-font-size)]">
              Copyright © 2025 Nutrilift
            </span>
            <div className="hidden md:flex items-start gap-4">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  className="font-title-12px-regular text-[#8a8c90] text-[length:var(--title-12px-regular-font-size)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ElementProgressDesktop;