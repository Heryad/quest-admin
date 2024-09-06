/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";

type Props = {};
type Payment = {
  order: string;
  status: string;
  lastOrder: string;
  method: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "order",
    header: "Order"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("status") === "Pending",
            "bg-orange-200": row.getValue("status") === "Processing",
            "bg-green-200": row.getValue("status") === "Completed"
          })}
        >
          {row.getValue("status")}
        </div>
      );
    }
  },
  {
    accessorKey: "lastOrder",
    header: "Last Order"
  },
  {
    accessorKey: "method",
    header: "Method"
  }
];

const data: Payment[] = [
  
];

export default function OrdersPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Orders" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
