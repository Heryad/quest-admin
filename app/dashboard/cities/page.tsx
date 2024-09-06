"use client";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Download,
  Eye,
  Plus,
  Search,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
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


type Props = {};
type DataKey = {
  cityName: string;
  cityDesc: string;
  activity: string;
};

const columns: ColumnDef<DataKey>[] = [
  {
    accessorKey: "cityName",
    header: "City",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <p>{row.getValue("cityName")} </p>
        </div>
      );
    },
  },
  {
    accessorKey: "cityDesc",
    header: "Desc",
  },
  {
    accessorKey: "activity",
    header: "Activities",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <p>0</p>
        </div>
      );
    },
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
          <div className="bg-red-700 w-10 h-10 flex items-center justify-center mr-2 rounded-md p-2 cursor-pointer">
            <X color="white" />
          </div>
        </div>
      );
    },
  },
];


export default function UsersPage({}: Props) {
  const [searchData, setSearchData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<DataKey | any>([]);

  function handleSearch(term: string) {
    let mData = data;
    mData = data.filter((data: { ctTitle: string; }) =>
      data.ctTitle.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    )
    setSearchData(mData);
  }

  const [cityName, setCityName] = useState('');
  const [cityDesc, setCityDesc] = useState('');
  const [open, setOpen] = useState(false);

  const addCity = () => {
    setIsLoading(true);
    fetch('https://pear-trusting-femur.glitch.me/v2/newCity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'cityName': cityName,
        'cityDesc': cityDesc,
        'cityImage': 'google.com'
      })
    }).then(response => response.json())
      .then(data => {
        setIsLoading(false);
        if(data.message == 'ok' && data.status == 200){
          setOpen(false);
          fetchData();
        }else{
          console.log(data);
        }
    });
  }

  const fetchData = () => {
    setData([]);
    fetch('https://pear-trusting-femur.glitch.me/v2/vwcity', {
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
  }, [])

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Cities" />
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
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add City</DialogTitle>
              <DialogDescription>
                enter city details then press save.
              </DialogDescription>
            </DialogHeader>
            <div className="flex row-auto">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    City Name
                  </Label>
                  <Input id="name" className="col-span-3" value={cityName} onChange={e => {setCityName(e.currentTarget.value)}}/>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Description
                  </Label>
                  <Input id="username" className="col-span-3 h-52" value={cityDesc} onChange={e => {setCityDesc(e.currentTarget.value)}}/>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Image Cover
                  </Label>
                  <Input id="price" className="col-span-3" type="file" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {addCity()}} disabled={isLoading}>{isLoading ? 'Please Wait ...' : 'Save changes'}</Button>
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
