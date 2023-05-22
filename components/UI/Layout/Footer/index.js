import {Footer} from "@mantine/core";
import Link from "next/link";


export function AppFooter(){

    return (
        <Footer height={60} p="md">
            All rights reserved (c) 2023 |
            <Link
                href={"https://sokaris.com"}
                target={"_blank"}
            >
                &nbsp;Sokaris Studio
            </Link>
        </Footer>
    )
}