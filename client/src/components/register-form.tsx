import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RegisterFormSchema, type RegisterUserInput } from "@/types/auth.type";

export default function SignUpForm() {

    const form = useForm<RegisterUserInput>({
        resolver: zodResolver(RegisterFormSchema),
    });

    function onSubmit(values: RegisterUserInput) {
        console.log(values);
    }

    function onReset() {
        form.reset();
        form.clearErrors();
    }

    return (
        <Card className="w-full mx-auto max-w-sm">
            <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                    Please fill in the information below to create your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        onReset={onReset}
                        className="space-y-8 @container"
                    >
                        <div className="grid grid-cols-12 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="col-span-6 @5xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 @5xl:flex-col @5xl:gap-2 @5xl:space-y-0 items-start @5xl:items-start">
                                        <FormLabel className="flex shrink-0">First Name</FormLabel>

                                        <div className="w-full">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        key="text-input-0"
                                                        placeholder="Enter your first name"
                                                        type="text"
                                                        id=""
                                                        className=" "
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="col-span-6 @5xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                        <FormLabel className="flex shrink-0">Last Name</FormLabel>

                                        <div className="w-full">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        key="text-input-1"
                                                        placeholder="Enter your last name"
                                                        type="text"
                                                        id=""
                                                        className=" "
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 @5xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start @5xl:items-start">
                                        <FormLabel className="flex shrink-0">Email</FormLabel>

                                        <div className="w-full">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        key="email-input-0"
                                                        placeholder="Enter your email"
                                                        type="email"
                                                        id=""
                                                        className=" "
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 @5xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                        <FormLabel className="flex shrink-0">Password</FormLabel>

                                        <div className="w-full">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        key="password-input-0"
                                                        placeholder=""
                                                        type="password"
                                                        id=""
                                                        className=" "
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 @5xl:col-span-6 col-start-auto @5xl:block flex self-end flex-col gap-2 space-y-0 items-start">
                                        <FormLabel className="flex shrink-0">
                                            Confirm Password
                                        </FormLabel>

                                        <div className="w-full">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        key="password-input-1"
                                                        placeholder=""
                                                        type="password"
                                                        id=""
                                                        className=" "
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="col-span-12 col-start-auto flex items-center gap-2"
                            >
                                Sign Up
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>

    );
}
