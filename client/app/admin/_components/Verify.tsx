import React from 'react'
import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

export default function VerifyList() {
    return (
        <main className='w-[80%] m-auto flex flex-col gap-3'>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">User</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>problem</TableCell>
                <TableCell>Card problem</TableCell>
                <TableCell>pending</TableCell>
                <TableCell className="text-right">lnwzainthailand</TableCell>
                <TableCell className="text-right text-primary"><Button variant="link">view Card problem</Button></TableCell>
                </TableRow>
            </TableBody>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">2</TableCell>
                <TableCell>problem</TableCell>
                <TableCell>Card problem</TableCell>
                <TableCell>pending</TableCell>
                <TableCell className="text-right">lnwzainthailand</TableCell>
                <TableCell className="text-right text-primary"><Button variant="link">view Card problem</Button></TableCell>
                </TableRow>
            </TableBody>
            </Table>

        </main>
    )
}