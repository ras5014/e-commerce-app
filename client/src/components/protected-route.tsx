import { getProfile } from "@/api/auth.api";
import type { RootState } from "@/state/store";
import { setUser } from "@/state/user/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn: getProfile,
        onSuccess: (data) => {
            dispatch(setUser(data));
            toast("Welcome back " + data.firstName);
        },
        onError: (error) => {
            console.error("Error fetching profile:", error);
            toast("Something went wrong");
        }
    });

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        mutation.mutate();
    }, [mutation, user]);

    if (mutation.isPending) {
        return <div>Loading...</div>;
    }

    if (mutation.isError) {
        return navigate("/login");
    }

    if (user._id && mutation.isSuccess && mutation.data._id) {
        return <Outlet />
    }

    return null;
}
