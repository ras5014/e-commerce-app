import { getProfile } from "@/api/auth.api";
import type { RootState } from "@/state/store";
import { setUser } from "@/state/user/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn: getProfile,
        onSuccess: (data) => {
            dispatch(setUser({
                firstName: data?.firstName ?? "",
                lastName: data?.lastName ?? "",
                email: data?.email ?? "",
                role: data?.role ?? "customer",
                cartItems: data?.cartItems ?? [],
                _id: data?._id ?? ""
            }));
        },
        onError: (error) => {
            console.error("Error fetching profile:", error);
        }
    });

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        mutation.mutate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (mutation.isPending) {
        return <div>Loading...</div>;
    }

    if (mutation.isError) {
        return navigate("/login");
    }

    if (user._id && mutation.isSuccess) {
        console.log(mutation.data?._id);
        return <Outlet />
    }

    return null;
}
