"use client";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Download,
  Eye,
  Pen,
  Plus,
  Search,
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


type Props = {};
type DataKey = {
  ID: string;
  actCity: string;
  actTitle: string;
  actDesc: string;
  actPrice: string;
  startDate: string;
  feedback: string;
  banner: boolean;
};

const columns: ColumnDef<DataKey>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "actCity",
    header: "City Group",
  },
  {
    accessorKey: "actTitle",
    header: "Title",
  },
  {
    accessorKey: "actDesc",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="ml-1 inline-block w-[250px]">
          <span className="font-semibold line-clamp-1">
          {row.getValue('actDesc')}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "actPrice",
    header: "Price",
    cell: ({ row }) => {
      return (
        <div className="bg-teal-400 pl-4 pr-4 pt-2 pb-2 max-w-12 justify-center items-center flex rounded-lg">
          <text>{row.getValue('actPrice')}</text>
        </div>
      )
    }
  },
  {
    accessorKey: "startDate",
    header: "Date",
  },
  {
    accessorKey: "feedback",
    header: "Feedbacks",
    cell: ({ row }) => {
      return (
        <text>0</text>
      )
    }
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
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="bg-red-700 w-10 h-10 flex items-center justify-center mr-2 rounded-md p-2 cursor-pointer"><X color="white" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {row.getValue('actTitle')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  fetch('https://pear-trusting-femur.glitch.me/v2/delete', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                      'tbl': 'activities',
                      'id': row.getValue('ID'),
                    })
                  }).then(response => response.json())
                    .then(data => {
                     window.location.reload();
                  });
                }}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

export default function ActivityPage() {
  const [searchData, setSearchData] = useState<any>([]);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

  const [data, setData] = useState<DataKey | any>([]);

  function handleSearch(term: string) {
    let mData = data;
    mData = data.filter((data: { ctTitle: string; }) =>
      data.ctTitle.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    )
    setSearchData(mData);
  }

  const fetchData = () => {
    setData([]);
    fetch('https://pear-trusting-femur.glitch.me/v2/vwactivity', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data.data);
        setData(
          data.data
        );
      });
  }

  useEffect(() => {
    fetchData();
    fetchSelectData();
  }, [])

  const [vendorName, setVendorName] = useState('')
  const [actTitle, setActTitle] = useState('')
  const [actDesc, setActDesc] = useState('')
  const [actCity, setActCity] = useState('')
  const [actPrice, setActPrice] = useState('')
  const [actQuantity, setActQuantity] = useState('')
  const [isFullYear, setIsFullYear] = useState('')
  const [isHoliday, setIsHoliday] = useState('')
  const [actCategory, setActCategory] = useState('')
  const [actHighlights, setActHighlights] = useState('')
  const [actMeetingPoint, setMeetingPoint] = useState('')
  const [actLat, setActLat] = useState('')
  const [actLong, setActLong] = useState('')
  const [actConfirmation, setActConfirmation] = useState('')

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const addNewActivity = () => {
    setIsLoading(true);
    fetch('https://pear-trusting-femur.glitch.me/v2/newactivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'vendorName': vendorName,
        'actTitle': actTitle,
        'actDesc': actDesc,
        'actCity': actCity,
        'actPrice': actPrice,
        'actQuantity': actQuantity,
        'startDate': getFormattedDate(date?.from),
        'endDate': getFormattedDate(date?.to),
        'isFullYear': isFullYear,
        'isHoliday': isHoliday,
        'actCategory': actCategory,
        'actHighlights': actHighlights,
        'meetingPoint': actMeetingPoint,
        'actLat': actLat,
        'actLong': actLong,
        'isConfirmation': actConfirmation,
        'img1': '',
        'img2': '',
        'img3': '',
        'img4': '',
        'img5': '',
      })
    }).then(response => response.json())
      .then(data => {
        setIsLoading(false);
        if (data.message == 'ok' && data.status == 200) {
          setOpen(false);
          fetchData();
        } else {
          console.log(data);
        }
      });
  }

  const getFormattedDate = (mDate: any) => {
    let year = mDate.getFullYear();
    let month = (1 + mDate.getMonth()).toString().padStart(2, '0');
    let day = mDate.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
  }

  const [vendorSelectData, setVendorSelectData] = useState([{ vendorName: '1' }]);
  const [citySelectData, setCitySelectData] = useState([{ cityName: '1' }]);
  const [categorySelectData, setCategorySelectData] = useState([{ ctTitle: '1' }]);

  const fetchSelectData = () => {
    fetch('https://pear-trusting-femur.glitch.me/v2/vwvendor', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setVendorSelectData(data.data);
      });

    fetch('https://pear-trusting-femur.glitch.me/v2/vwCity', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setCitySelectData(data.data);
      });

    fetch('https://pear-trusting-femur.glitch.me/v2/vwcategory', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setCategorySelectData(data.data);
      });
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

        <Dialog open={open} onOpenChange={setOpen}>
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
                    <Select onValueChange={(value) => { setVendorName(value) }}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Vendors</SelectLabel>
                          {vendorSelectData.map((type) => (
                            <SelectItem key={type.vendorName} value={type.vendorName.toString()}>
                              {type.vendorName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Title
                    </Label>
                    <Input id="name" className="col-span-3" value={actTitle} onChange={e => { setActTitle(e.currentTarget.value) }} />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Description
                    </Label>
                    <Input id="username" className="col-span-3 h-52" value={actDesc} onChange={e => { setActDesc(e.currentTarget.value) }} />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">
                      City
                    </Label>
                    <Select onValueChange={(value) => { setActCity(value) }}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Cities</SelectLabel>
                          {citySelectData.map((type) => (
                            <SelectItem key={type.cityName} value={type.cityName.toString()}>
                              {type.cityName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input id="price" className="col-span-3" placeholder="$" value={actPrice} onChange={e => { setActPrice(e.currentTarget.value) }} />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input id="quantity" className="col-span-3" value={actQuantity} onChange={e => { setActQuantity(e.currentTarget.value) }} />
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
                    <Select onValueChange={(value) => { setIsFullYear(value) }}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="fixed">Fixed Date</SelectItem>
                          <SelectItem value="flexible">Flexible Date</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">
                      Holiday
                    </Label>
                    <Select onValueChange={(value) => { setIsHoliday(value) }}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Holiday Availability</SelectLabel>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
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
                    <Select onValueChange={(value) => { setActCategory(value) }}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categorySelectData.map((type) => (
                            <SelectItem key={type.ctTitle} value={type.ctTitle.toString()}>
                              {type.ctTitle}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Highlights
                    </Label>
                    <Input id="username" className="col-span-3 h-52" value={actHighlights} onChange={e => { setActHighlights(e.currentTarget.value) }} />
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
                    <Input id="price" className="col-span-3" placeholder="Location" value={actMeetingPoint} onChange={e => { setMeetingPoint(e.currentTarget.value) }} />
                    <div className="col-span-3"><iframe className="col-span-3 ml-48" src="https://maps.google.com/maps?width=525&amp;height=300&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">
                      Confirmation
                    </Label>
                    <Select onValueChange={(value) => { setActConfirmation(value) }}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Ticket Confirmation Type</SelectLabel>
                          <SelectItem value="manual">Manual Confirmation</SelectItem>
                          <SelectItem value="automatic">Automatic Confirmation</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => { addNewActivity() }} disabled={isLoading}>{isLoading ? 'Please Wait ...' : 'Save changes'}</Button>
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
