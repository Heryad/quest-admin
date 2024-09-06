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
type DataKey = {
  city: string;
  title: string;
  desc: string;
  price: string;
  date: string;
  feedback: string;
  banner: boolean;
};

const columns: ColumnDef<DataKey>[] = [
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



export default function ActivityPage({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [searchData, setSearchData] = useState<any>([]);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

  const [data, setData] = useState<DataKey | any>([]);

  function handleSearch(term: string) {
    let mData = data;
    mData = data.filter((data: { firstName: string; }) =>
      data.firstName.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    )
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

                    <div className={cn("grid gap-2", className)}>
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
