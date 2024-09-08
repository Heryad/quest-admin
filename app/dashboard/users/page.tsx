"use client";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Bell, Download, Eye, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  firstName: string;
  email: string;
  gender: string;
  deviceType: string;
  country: string;
};

const columns: ColumnDef<DataKey>[] = [
  {
    accessorKey: "ID",
    header: "ID"
  },
  {
    accessorKey: "firstName",
    header: "User Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "firstName"
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("firstName")} </p>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "gender",
    header: "Gender"
  },
  {
    accessorKey: "deviceType",
    header: "Device Type"
  },
  {
    accessorKey: "country",
    header: "City"
  },
  {
    accessorKey: 'function',
    header: 'Functions',
    cell: ({ row }) => {
      return (
        <div className="flex">
          <Button className="bg-teal-700 w-10 h-10 flex items-center justify-center mr-2 rounded-md p-2 cursor-pointer"><Eye color="white" /></Button>
          <Button className="bg-purple-700 w-10 h-10 flex items-center justify-center mr-2 rounded-md p-2 cursor-pointer"><Bell color="white" /></Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="bg-red-700 w-10 h-10 flex items-center justify-center mr-2 rounded-md p-2 cursor-pointer"><X color="white" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {row.getValue('firstName')}'s account
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
                      'tbl': 'users',
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
      )
    }
  }
];

export default function UsersPage({ }: Props) {
  const [searchData, setSearchData] = useState<any>([]);

  const [data, setData] = useState<DataKey | any>([]);

  function handleSearch(term: string) {
    let mData = data;
    mData = data.filter((data: { firstName: string; }) =>
      data.firstName.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    )
    setSearchData(mData);
  }

  useEffect(() => {
    fetch('https://pear-trusting-femur.glitch.me/v2/vwusers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data.data);
    });
  }, [])

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Users" />
      <div className="flex row-auto">
        <Input placeholder="Search ..." className="w-52 mr-2" onChange={(e) => { handleSearch(e.target.value) }} />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
        <Button className="w-40 ml-5" size="icon">
          Export Data
          <Download className="h-4 w-4 ml-2" />
        </Button>
      </div>
      <DataTable columns={columns} data={searchData.length >= 1 ? searchData : data} />
    </div>
  );
}
