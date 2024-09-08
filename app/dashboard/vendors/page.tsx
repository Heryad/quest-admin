/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Download,
  Pen,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  vendorLogo: string;
  vendorName: string;
  vendorCategory: string;
  vendorCity: string;
  activity: string;
};

const columns: ColumnDef<DataKey>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "vendorLogo",
    header: "Icon",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img src={row.getValue("vendorLogo")} className="w-22 h-14 rounded-lg" />
        </div>
      );
    },
  },
  {
    accessorKey: "vendorName",
    header: "Title",
  },
  {
    accessorKey: 'vendorCategory',
    header: 'Category'
  },
  {
    accessorKey: 'vendorCity',
    header: 'City'
  },
  {
    accessorKey: 'activity',
    header: 'Activites',
    cell: ({ row }) => {
      return (
        <div className="flex">
          <text className="mr-2 pt-1">{0}</text>
          <Activity color="teal" />
        </div>
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
                  This action cannot be undone. This will permanently delete {row.getValue('vendorName')}'s store
                  and remove their data from the servers.
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
                      'tbl': 'vendors',
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
];

export default function UsersPage({ }: Props) {
  const [searchData, setSearchData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<DataKey | any>([]);

  function handleSearch(term: string) {
    let mData = data;
    mData = data.filter((data: { firstName: string; }) =>
      data.firstName.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    )
    setSearchData(mData);
  }

  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');
  const [vendorCategory, setVendorCategory] = useState('');
  const [vendorCity, setVendorCity] = useState('');

  const [open, setOpen] = useState(false);
  const addVendor = () => {
    setIsLoading(true);
    fetch('https://pear-trusting-femur.glitch.me/v2/newVendor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'vendorName': vendorName,
        'vendorEmail': vendorEmail,
        'vendorPassword': vendorPassword,
        'vendorLogo': '',
        'vendorCity': vendorCity,
        'vendorCategory': vendorCategory
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

  useEffect(() => {
    fetchData();
    fetchSelectData();
  }, [])

  const fetchData = () => {
    fetch('https://pear-trusting-femur.glitch.me/v2/vwvendor', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data.data);
      });
  }

  const [citySelectData, setCitySelectData] = useState([{cityName: ''}]);
  const [categorySelectData, setCategorySelectData] = useState([{ctTitle: ''}]);

  const fetchSelectData = () => {
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
  }

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Vendors" />
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
              <DialogTitle>Add Vendor</DialogTitle>
              <DialogDescription>
                enter vendor details then press save.
              </DialogDescription>
            </DialogHeader>
            <div className="flex row-auto">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" value={vendorName} onChange={e => { setVendorName(e.currentTarget.value) }} />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api" className="text-right">
                    Email
                  </Label>
                  <Input id="api" className="col-span-3" value={vendorEmail} onChange={e => { setVendorEmail(e.currentTarget.value) }} />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api" className="text-right">
                    Password
                  </Label>
                  <Input id="api" className="col-span-3" value={vendorPassword} onChange={e => { setVendorPassword(e.currentTarget.value) }} />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right">
                    Icon
                  </Label>
                  <Input id="icon" className="col-span-3" type="file" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right">
                    Category
                  </Label>
                  <Select value={vendorCategory} onValueChange={(value) => {setVendorCategory(value)}}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
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
                  <Label htmlFor="icon" className="text-right">
                    City
                  </Label>
                  <Select value={vendorCity} onValueChange={(value) => {setVendorCity(value)}}>
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
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => { addVendor() }} disabled={isLoading}>{isLoading ? 'Please Wait ...' : 'Save changes'}</Button>
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
