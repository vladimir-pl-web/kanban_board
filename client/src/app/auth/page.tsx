import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import styles from './auth.module.scss'
import clsx from "clsx"
import AuthScreen from "@/screens/auth/authScreen";

export const metadata: Metadata = {
    title: "Auth",
    ...NO_INDEX_PAGE,
    description: "Authorization",
  };

  export default function AuthPage(){
    return<div className={clsx(styles.auth)}>
         <AuthScreen />
    </div>
  }