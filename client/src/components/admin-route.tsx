import type { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminRoute() {
    const user = useSelector((state: RootState) => state.user);

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return (
        <SidebarProvider>
            <AdminSidebar />
            <main>
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}
