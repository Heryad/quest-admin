"use client";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Download,
  Eye,
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
  providerName: string;
  providerKey: string;
  providerLogo: string;
};

const columns: ColumnDef<DataKey>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "providerLogo",
    header: "Icon",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img src={row.getValue("providerLogo")} className="w-24 h-14 rounded-lg" />
        </div>
      );
    },
  },
  {
    accessorKey: "providerName",
    header: "Title",
  },
  {
    accessorKey: "providerKey",
    header: "API KEY",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <text className="pt-2 pr-5" id="apiKey">{row.getValue("providerKey")}</text>
          <div className="bg-purple-700 w-10 h-10 flex items-center justify-center mr-2 rounded-md p-2 cursor-pointer" onClick={() => {}}>
            <Eye color="white" />
          </div>
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
                  This action cannot be undone. This will permanently delete {row.getValue('providerName')}'s payment gateway
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
                      'tbl': 'payments',
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

export default function UsersPage({}: Props) {
  const [searchData, setSearchData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<DataKey | any>([]);

  function handleSearch(term: string) {
    let mData = data;
    mData = data.filter((data: { providerName: string; }) =>
      data.providerName.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    )
    setSearchData(mData);
  }

  const fetchData = () => {
    setData([]);
    fetch('https://pear-trusting-femur.glitch.me/v2/vwpayment', {
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

  const [providerName, setProviderName] = useState('');
  const [providerKey, setProviderKey] = useState('');
  const [providerLogo, setProviderLogo] = useState('');
  const [open, setOpen] = useState(false);

  const addProvider = () => {
    setIsLoading(true);
    fetch('https://pear-trusting-femur.glitch.me/v2/newpayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'providerName': providerName,
        'providerKey': providerKey,
        'providerLogo': providerLogo
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

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Payment Types" />
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
              <DialogTitle>Add Payment</DialogTitle>
              <DialogDescription>
                enter payment details then press save.
              </DialogDescription>
            </DialogHeader>
            <div className="flex row-auto">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input id="name" className="col-span-3" value={providerName} onChange={e => {setProviderName(e.currentTarget.value)}}/>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api" className="text-right">
                    API KEY
                  </Label>
                  <Input id="api" className="col-span-3" value={providerKey} onChange={e => {setProviderKey(e.currentTarget.value)}}/>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right">
                    Icon
                  </Label>
                  <Input id="icon" className="col-span-3" type="file" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {addProvider()}} disabled={isLoading}>{isLoading ? 'Please Wait ...' : 'Save changes'}</Button>
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
