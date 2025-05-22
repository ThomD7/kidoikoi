import Add from "../components/add";
import List from "../components/list";
import Layout from "../components/ui/layout";
import React from "react";

export default function Home() {
    return (
        <Layout>
            <div className="w-full h-screen flex flex-col items-center mt-10">
                <Add />
                <List />
            </div>
        </Layout>
    )
}