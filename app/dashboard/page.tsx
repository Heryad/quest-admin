/** @format */
'use client'
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity, List, Pin, Map, LogOut } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const cardData: CardProps[] = [
  {
    label: "Total Revenue",
    amount: "0 IQD",
    discription: "00% from last month",
    icon: DollarSign
  },
  {
    label: "Total Users",
    amount: "0",
    discription: "00% from last month",
    icon: Users
  },
  {
    label: "Pending Bookings",
    amount: "0",
    discription: "00% from last month",
    icon: List
  },
  {
    label: "Active Users",
    amount: "0",
    discription: "00 since last hour",
    icon: Activity
  },
  {
    label: "Total Activites",
    amount: "0",
    discription: "00 since last hour",
    icon: Activity
  },
  {
    label: "Total Cities",
    amount: "0",
    discription: "00 since last hour",
    icon: Map
  }
];

const uesrSalesData: SalesProps[] = [
  
];

export default async function Home() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <Button className="max-w-40 self-end">
        <LogOut className="mr-2"/>
        <text>Log out</text>
      </Button>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Sales Overview</p>

          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Bookings</p>
            <p className="text-sm text-gray-400">
              You Have 0 Pending Bookings.
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}
