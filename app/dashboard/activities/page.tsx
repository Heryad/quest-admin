"use client";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CalendarIcon,
  Delete,
  DeleteIcon,
  Download,
  Eye,
  LucideAArrowDown,
  LucideDelete,
  Pen,
  Plus,
  Search,
  Star,
  User2,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {};
type Payment = {
  city: string;
  title: string;
  desc: string;
  price: string;
  date: string;
  feedback: string;
  banner: boolean;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "city",
    header: "City Group",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({row}) => {
      return(
        <div className="bg-teal-400 p-4 rounded-lg">
          <text>{row.getValue('price')}</text>
        </div>
      )
    }
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "feedback",
    header: "Feedbacks",
  },
  {
    accessorKey: "function",
    header: "Functions",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <div className="bg-teal-700 w-10 h-10 flex items-center justify-center mr-2 rounded-md p-2 cursor-pointer">
            <Eye color="white" />
          </div>
          <div className="bg-green-700 w-10 h-10 flex items-center justify-center mr-2 rounded-md p-2 cursor-pointer">
            <Pen color="white" />
          </div>
          <div className="bg-red-700 w-10 h-10 flex items-center justify-center mr-2 rounded-md p-2 cursor-pointer">
            <X color="white" />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "banner",
    header: "Banner",
    cell: ({ row }) => {
      return <Switch checked={row.getValue("banner")} disabled={false} />;
    },
  },
];

const data: Payment[] = [
  {
    city: "Las Vegas",
    title: "Grand Casino Experience",
    desc: "Indulge in a 3-day casino extravaganza with luxury accommodations and fine dining.",
    price: "250$",
    date: "22-10-2024 - 25-10-2024",
    feedback: "30",
    banner: false,
  },
  {
    city: "Paris",
    title: "Romantic Seine River Cruise",
    desc: "Embark on a romantic cruise along the Seine River with gourmet meals and champagne.",
    price: "300$",
    date: "12-09-2024 - 15-09-2024",
    feedback: "28",
    banner: true,
  },
  {
    city: "Tokyo",
    title: "Sushi and Sumo Wrestling Tour",
    desc: "Experience Tokyo's culinary delights and traditional sumo wrestling over 5 exciting days.",
    price: "180$",
    date: "05-12-2024 - 09-12-2024",
    feedback: "35",
    banner: false,
  },
  {
    city: "London",
    title: "Historical Landmarks Discovery",
    desc: "Explore London's iconic landmarks and hidden gems with knowledgeable guides.",
    price: "200$",
    date: "18-10-2024 - 21-10-2024",
    feedback: "22",
    banner: true,
  },
  {
    city: "Sydney",
    title: "Surfing Adventure",
    desc: "Learn to surf on Sydney's famous beaches and enjoy beachfront accommodations.",
    price: "220$",
    date: "08-11-2024 - 10-11-2024",
    feedback: "20",
    banner: false,
  },
  {
    city: "Rome",
    title: "Ancient Rome Exploration",
    desc: "Immerse yourself in the history of ancient Rome with guided tours and museum visits.",
    price: "270$",
    date: "25-09-2024 - 28-09-2024",
    feedback: "26",
    banner: true,
  },
  {
    city: "Dubai",
    title: "Luxury Desert Safari",
    desc: "Experience the thrill of a desert safari with luxurious accommodations and camel rides.",
    price: "350$",
    date: "15-10-2024 - 18-10-2024",
    feedback: "32",
    banner: false,
  },
  {
    city: "Cape Town",
    title: "Wildlife Safari Adventure",
    desc: "Embark on a safari adventure in Cape Town's wildlife reserves and stay in eco-friendly lodges.",
    price: "300$",
    date: "20-11-2024 - 23-11-2024",
    feedback: "24",
    banner: true,
  },
  {
    city: "Barcelona",
    title: "Tapas Tasting Tour",
    desc: "Enjoy a gastronomic journey through Barcelona's best tapas bars and local cuisine.",
    price: "180$",
    date: "10-12-2024 - 12-12-2024",
    feedback: "29",
    banner: false,
  },
  {
    city: "Vienna",
    title: "Classical Music and Culture",
    desc: "Immerse yourself in Vienna's classical music scene and cultural heritage over a 4-day tour.",
    price: "240$",
    date: "03-11-2024 - 06-11-2024",
    feedback: "27",
    banner: true,
  },
  {
    city: "Venice",
    title: "Venetian Gondola Experience",
    desc: "Sail through Venice's picturesque canals on a traditional gondola with romantic dinner included.",
    price: "280$",
    date: "28-09-2024 - 01-10-2024",
    feedback: "23",
    banner: false,
  },
  {
    city: "Amsterdam",
    title: "Bike Tour and Canal Cruise",
    desc: "Explore Amsterdam by bike and cruise its charming canals with local guides.",
    price: "190$",
    date: "07-10-2024 - 09-10-2024",
    feedback: "31",
    banner: true,
  },
];

export default function ActivityPage() {
  const [searchData, setSearchData] = useState<any>([]);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

  function handleSearch(term: string) {
    let mData = data;
    mData = data.filter((data) =>
      data.city.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
    setSearchData(mData);
  }

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Activities" />
      <div className="flex row-auto">
        <Input
          placeholder="Search ..."
          className="w-52 mr-2"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
        <Button className="w-40 ml-5" size="icon">
          Export Data
          <Download className="h-4 w-4 ml-2" />
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-40 ml-5 bg-teal-600" size="icon">
              Add
              <Plus className="h-4 w-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[1200px]">
            <DialogHeader>
              <DialogTitle>Add Activity</DialogTitle>
              <DialogDescription>
                enter activity details then press save.
              </DialogDescription>
            </DialogHeader>
            <div className="flex row-auto">
              <div className="mr-5 sm:max-w-[550px]">
                <div className="grid gap-4 py-4">

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right">
                    Vendor
                  </Label>
                  <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Vendor</SelectLabel>
                      <SelectItem value="apple">Moonline Travel</SelectItem>
                      <SelectItem value="banana">Tche Tche</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Title
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Description
                    </Label>
                    <Input id="username" className="col-span-3 h-52" />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">
                      City
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Cities</SelectLabel>
                          <SelectItem value="apple">Las Vegas</SelectItem>
                          <SelectItem value="banana">Erbil</SelectItem>
                          <SelectItem value="blueberry">Grenada</SelectItem>
                          <SelectItem value="grapes">Paris</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input id="price" className="col-span-3" placeholder="$" />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input id="quantity" className="col-span-3" />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Date
                    </Label>

                    <div className="grid gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} -{" "}
                                  {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode='range'
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">
                      Full Year
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="apple">Fixed Date</SelectItem>
                          <SelectItem value="banana">Flexible Date</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">
                      Holiday
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Holiday Availability</SelectLabel>
                          <SelectItem value="apple">Yes</SelectItem>
                          <SelectItem value="banana">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="mr-5">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem value="apple">Cinema</SelectItem>
                          <SelectItem value="banana">Fun & Sports</SelectItem>
                          <SelectItem value="blueberry">Food</SelectItem>
                          <SelectItem value="grapes">Culture</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Highlights
                    </Label>
                    <Input id="username" className="col-span-3 h-52" />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="picture" className="text-right">
                      Images
                    </Label>
                    <Input id="picture" type="file" className="col-span-3" />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Meeting Point
                    </Label>
                    <Input id="price" className="col-span-3" placeholder="Location" />
                    <div className="col-span-3"><iframe className="col-span-3 ml-48" src="https://maps.google.com/maps?width=525&amp;height=300&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">
                      Confirmation
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Ticket Confirmation Type</SelectLabel>
                          <SelectItem value="apple">Manual Confirmation</SelectItem>
                          <SelectItem value="banana">Automatic Confirmation</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns}
        data={searchData.length >= 1 ? searchData : data}
      />
    </div>
  );
}
