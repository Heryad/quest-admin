/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Bell,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

type Props = {};
type Payment = {
  title: string;
  api: string;
  icon: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img src={row.getValue("icon")} className="w-24 h-14 rounded-lg" />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "api",
    header: "API KEY",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <text className="pt-2 pr-5" id="apiKey">{row.getValue("api")}</text>
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
          <div className="bg-red-700 w-10 h-10 flex items-center justify-center mr-2 rounded-md p-2 cursor-pointer">
            <X color="white" />
          </div>
        </div>
      );
    },
  },
];

const data: Payment[] = [
  {
    title: "Fastpay",
    api: "ZL****************",
    icon: "https://seeklogo.com/images/F/fastpay-logo-6D9A1A77C4-seeklogo.com.png",
  },
];

export default function UsersPage({}: Props) {
  const [searchData, setSearchData] = useState<any>([]);

  function handleSearch(term: string) {
    let mData = data;
    mData = data.filter((data) =>
      data.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
    setSearchData(mData);
  }

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
        <Dialog>
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
                  <Input id="name" className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api" className="text-right">
                    API KEY
                  </Label>
                  <Input id="api" className="col-span-3" />
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
