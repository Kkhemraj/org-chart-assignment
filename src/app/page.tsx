"use client";

import * as Tabs from "@radix-ui/react-tabs";
import {
  EllipsisVertical,
  Mail,
  MapPin,
  Pencil,
  Phone,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loadOrgChart, setSelected } from "@/store/orgSlice";
import { Employee } from "./lib/api";

export default function OrgChartPage() {
  const dispatch = useAppDispatch();

  const { root, selected: selectedEmployee, loading } = useAppSelector(
    (state) => state.org
  );

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(loadOrgChart(21));
  }, [dispatch]);

  const handleSelect = (emp: Employee) => {
    dispatch(setSelected(emp));
    setOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">Loading organization chart...</p>
      </div>
    );
  }

  if (!root) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 xl:p-10">
      <div className="pb-4 max-w-xl">
        <h1 className="text-2xl font-bold text-black mb-4 sm:text-xl md:text-2xl">Org Chart</h1>
        <p className="text-sm font-medium text-[#444444] opacity-75 sm:text-xs md:text-sm">
          This is a collection of all hierarchy in the system, you can view,
          modify existing datasets or create new ones based on your preferences.
        </p>
      </div>

      <div className="w-[100%] ">
        <Tabs.Root defaultValue="people">
          <div className="md:overflow-auto overflow-x-scroll w-full">
            <Tabs.List
              aria-label="Org chart tabs "
              className="flex gap-8 border-b border-gray-200 sm:gap-4 md:gap-6"
            >
              {["people", "position", "organization", "other"].map((tab) => (
                <Tabs.Trigger
                  key={tab}
                  value={tab}
                  className={`
                  relative px-1 pb-4 md:text-xl text-sm font-medium transition-all duration-200
                  text-[#444444] text-opacity-50
                  data-[state=active]:text-[#5658D1] data-[state=active]:text-opacity-100
                  hover:text-[#5658D1] hover:text-opacity-80
                  after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5
                  after:bg-[#5658D1] after:scale-x-0 after:origin-center
                  data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300
                  sm:text-base md:text-lg
                `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>


          <div className="p-6 sm:p-4 md:p-6">
            <Tabs.Content value="people">
              <div className="max-w-[100%] overflow-x-auto">
                <div className="flex justify-start py-8 sm:py-4 md:py-6">
                  <OrgTree root={root} onSelect={handleSelect} />
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="position">
              <div className="min-h-96 text-sm text-[#6B6B6B] flex items-center justify-center sm:text-xs">
                Position tab — in progress.
              </div>
            </Tabs.Content>

            <Tabs.Content value="organization">
              <div className="min-h-96 text-sm text-[#6B6B6B] flex items-center justify-center sm:text-xs">
                Organization tab — in progress.
              </div>
            </Tabs.Content>

            <Tabs.Content value="other">
              <div className="min-h-96 text-sm text-[#6B6B6B] flex items-center justify-center sm:text-xs">
                Other tab — in progress.
              </div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 mb-0 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`
          fixed inset-y-0 right-0 z-50 w-[450px] bg-white shadow-2xl
          flex flex-col overflow-hidden
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
          sm:w-[90vw] md:w-[400px] lg:w-[450px]
        `}
      >
        <div className="relative h-52 flex items-start justify-end p-4 z-2">
          <button
            onClick={() => setOpen(false)}
            className="relative z-10 bg-gray-50/90 p-2 rounded-sm hover:bg-gray-200 transition"
          >
            <X size={22} />
          </button>
          <Image
            src="/images/galaxy_bg.png"
            alt="background"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-6 relative z-4">
          {selectedEmployee && (
            <>
              <div className="size-[100px] rounded-full overflow-hidden border border-[#f2f2f2] absolute left-6 top-[-50px] sm:size-[80px] sm:left-4 sm:top-[-40px]">
                <Image
                  src={selectedEmployee.profile_pic}
                  alt={selectedEmployee.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover sm:w-[80px] sm:h-[80px]"
                />
              </div>

              <div className="flex pt-[70px] border-b border-black/20 p-6 mb-0 sm:pt-[50px] sm:p-4">
                <div className="flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-[#000] sm:text-lg">{selectedEmployee.name}</h3>
                  <p className="text-sm text-[#8897AE] mb-1 sm:text-xs">{selectedEmployee.title}</p>
                  <p className="text-sm text-black sm:text-xs">4 / 1013</p>
                </div>
                <div className="flex gap-1 items-start">
                  <button
                    className="text-2xl bg-[#6366F1] relative p-2 rounded-sm cursor-pointer"
                    aria-label="Edit"
                  >
                    <Pencil color="white" size={18} />
                  </button>
                  <button
                    className="p-2 cursor-pointer"
                    aria-label="More"
                  >
                    <EllipsisVertical color="black" size={22} />
                  </button>
                </div>
              </div>

              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1" className="border-black/20 px-5">
                  <AccordionTrigger className="text-md cursor-pointer hover:no-underline py-6 sm:text-sm">Basic Details</AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <ul className="space-y-4 text-sm sm:text-xs">
                      <li className="flex items-center gap-3">
                        <Phone size={18} className="text-gray-500 " />
                        <span>(+63) 27001244</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Mail size={18} className="text-gray-500 " />
                        <span>david.thompson@gmail.com</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Mail size={18} className="text-gray-500 " />
                        <span>david.thompson@gmail.com</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-black/20 px-5">
                  <AccordionTrigger className="text-md cursor-pointer hover:no-underline py-6 sm:text-sm">History</AccordionTrigger>
                  <AccordionContent>History data coming soon...</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-black/20 px-5">
                  <AccordionTrigger className="text-md cursor-pointer hover:no-underline py-6 sm:text-sm">Parents</AccordionTrigger>
                  <AccordionContent>Parents data coming soon...</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-black/20 px-5">
                  <AccordionTrigger className="text-md cursor-pointer hover:no-underline py-6 sm:text-sm">Hierarchy</AccordionTrigger>
                  <AccordionContent>Full hierarchy view...</AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function OrgTree({
  root,
  onSelect,
}: {
  root: Employee;
  onSelect: (emp: Employee) => void;
}) {
  const renderNode = (emp: Employee): React.ReactNode => {
    const reports = emp.reports || [];

    return (
      <div key={emp.id} className="flex flex-col items-center">
        <EmployeeCard emp={emp} onClick={onSelect} />

        {reports.length > 0 && (
          <div className="">
            {reports.length === 1 ? (
              <>
                <div className="w-0.5 h-20 bg-[#AFBACA] mx-auto relative sm:h-16">
                  <div className="absolute bottom-0 left-[-3px] w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-[#AFBACA]" />
                </div>
                {renderNode(reports[0])}
              </>
            ) : (
              <>
                <div className="w-0.5 h-10 bg-[#AFBACA] mx-auto relative sm:h-8">
                  <div className="absolute bottom-0 left-[-3px] w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-[#AFBACA]" />
                </div>

                <div className="relative flex justify-center  multi-child">
                  {reports.map((child) => (
                    <div key={child.id} className="flex flex-col items-center px-4">
                      <div className="w-0.5 h-12 bg-[#AFBACA] relative sm:h-8">
                        <div className="absolute bottom-0 left-[-3px] w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-[#AFBACA]" />
                      </div>
                      {renderNode(child)}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return <div className="py-8 sm:min-w-[300px] md:min-w-[600px]">{renderNode(root)}</div>;
}

function EmployeeCard({
  emp,
  onClick,
}: {
  emp: Employee;
  onClick: (emp: Employee) => void;
}) {
  return (
    <div
      onClick={() => onClick(emp)}
      className="relative bg-white rounded-lg border border-[#DBDBDB] w-80 p-5 flex gap-5 items-center cursor-pointer hover:shadow-lg transition-shadow sm:w-64 md:w-72"
    >
      <div className="size-16 rounded-full overflow-hidden flex-shrink-0 sm:size-12">
        <Image
          src={emp.profile_pic}
          alt={emp.name}
          width={64}
          height={64}
          className="object-cover sm:w-12 sm:h-12"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg truncate sm:text-base">{emp.name}</h3>
        <p className="text-sm text-[#8897AE] truncate sm:text-xs">{emp.title}</p>
        <p className="text-xs text-gray-600 mt-1 sm:text-[10px]">4 / 1013</p>
      </div>

      <div className="absolute right-3 top-3">
        <Image
          src="/images/svg/IdentificationBadge.svg"
          alt="badge"
          width={24}
          height={24}
          className="sm:w-5 sm:h-5"
        />
      </div>
    </div>
  );
}