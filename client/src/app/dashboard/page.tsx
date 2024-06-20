import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import clsx from "clsx"

export const metadata: Metadata = {
    title: "Dashboard",
    ...NO_INDEX_PAGE,
    description: "Dashboard",
  };

  export default function DashboardPage(){
    return<div >
         Dashboard
    </div>
  }