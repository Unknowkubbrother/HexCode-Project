"use client"
import { useState, useEffect } from 'react'
import { getAccounts } from '@/actions/accountAction';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { IAccount } from "@/interface/accounts"
import { Users, Pen, Save } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateAccount } from '@/actions/accountAction';
import { toast } from 'react-toastify';


export default function ManageUsers() {
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [editUser, setEditUser] = useState<IAccount | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            const users = await getAccounts();
            if (users) {
                setAccounts(users.accounts);
            }
            setLoading(false);
        }
        setLoading(true);
        fetchAccounts();
    }, []);

    useEffect(() => {
        console.log(editUser);
    }, [editUser]);

    const handleUpdateUser = async () => {
        if (editUser) {
            const response = await updateAccount(editUser);

            if (!response) {
                toast.error("update account failed", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }

            setAccounts((prev) => prev.map((user) => {
                if (user.clerkId === editUser.clerkId) {
                    return { ...user, ...editUser };
                }
                return user;
            }));
            setEditUser(null);

            toast.success("update account successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const SkeletonLoading = () => {
        return (
            <TableRow>
                <TableCell className='flex items-center gap-2'>
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-24" />
                </TableCell>
            </TableRow>
        )
    }

    return (
        <main className='w-full'>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Users</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Manage</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        accounts.length === 0 ? (
                            <SkeletonLoading />
                        ) : (accounts.map((user: IAccount) => (

                            (editUser && editUser.clerkId === user.clerkId) ?
                                <TableRow key={user.clerkId}>
                                    <TableCell className='flex items-center gap-2'>
                                        <Avatar>
                                            <AvatarImage src={user.avatar} alt="Avatar" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        {user.username}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.role == 'admin' ? 'admin' :

                                            <Select defaultValue={editUser.role} onValueChange={(value) => {
                                                setEditUser((prev) => {
                                                    if (prev) {
                                                        return { ...prev, role: value }
                                                    }
                                                    return prev;
                                                })
                                            }}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select a Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="member">member</SelectItem>
                                                        <SelectItem value="premium">premium</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>}
                                    </TableCell>
                                    <TableCell>
                                        <Select defaultValue={editUser.status} onValueChange={(value) => {
                                            setEditUser((prev) => {
                                                if (prev) {
                                                    return { ...prev, status: value }
                                                }
                                                return prev;
                                            })
                                        }}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="active">active</SelectItem>
                                                    <SelectItem value="banned">banned</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className='flex items-center'>
                                        <Button variant="ghost" className="flex items-center justify-center text-primary hover:scale-110 transition-all duration-200 ease-in-out"
                                            onClick={() => setEditUser(null)}
                                        >
                                            <Pen size={20} />
                                        </Button>
                                        {!loading && <Button variant="ghost" className="flex items-center justify-center text-green-400 hover:scale-110 transition-all duration-200 ease-in-out"
                                            onClick={handleUpdateUser}
                                        >
                                            <Save size={20} />
                                        </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                                :

                                <TableRow key={user.clerkId}>
                                    <TableCell className='flex items-center gap-2'>
                                        <Avatar>
                                            <AvatarImage src={user.avatar} alt="Avatar" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        {user.username}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.status}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" className="flex items-center justify-center text-primary hover:scale-110 transition-all duration-200 ease-in-out"
                                            onClick={() => {
                                                setEditUser(user);
                                            }
                                            }
                                        >
                                            <Pen size={20} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                        )))
                    }

                </TableBody>
                <TableFooter>
                    <TableRow className='px-10'>
                        <TableCell colSpan={4}>Total Users</TableCell>
                        <TableCell className="flex justify-end items-center">
                            <span className='flex items-center justify-center gap-2'>
                                <Users size={20} />
                                {accounts.length}
                            </span>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </main>
    )
}
