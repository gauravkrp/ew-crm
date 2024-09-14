"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/common/loader";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/common/inputs";
import { EmailRegex } from "@/lib/constants";

function Signup() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSignup = async () => {
		if (!email || !password || !confirmPassword) {
			toast("Please fill all the fields");
			return;
		}
		if (!EmailRegex.test(email)) {
			toast("Invalid email format");
		}
		if (password != confirmPassword) {
			toast("Password and confirm password are not same");
			return;
		}
		setIsLoading(true);
		try {
			const { data } = await axios.post("/api/auth/signup", {
				email,
				password,
			});
			localStorage.setItem("TOKEN", data?.sessionToken);
			toast(`Successfully singed up!`);
			router.push("/login");
		} catch (err: any) {
			toast(err?.response?.data?.error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full min-h-[100dvh] flex items-center justify-center">
			<Card className="w-[650px]">
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
					<CardDescription>{`Welcome to Edugyanam CRM!👋🏻`}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								onChange={(e) => {
									setEmail(e?.target?.value);
								}}
								type="email"
								id="email"
								placeholder="Enter email..."
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<PasswordInput
									id={"password"}
									value={password}
									setvalue={setPassword}
									placeholder={"Enter password..."}
								/>
							</div>
						</div>
						<div className="flex flex-col space-y-2">
							<Label htmlFor="password">Confirm Password</Label>
							<PasswordInput
								id={"confirm-password"}
								value={confirmPassword}
								setvalue={setConfirmPassword}
								placeholder={"Enter confirm password..."}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex items-center justify-between">
					<div className="text-sm">
						Already have an account?{" "}
						<Link className="text-blue-800 font-semibold" href={routes.AUTH.LOGIN}>
							Login
						</Link>
					</div>
					<Button onClick={handleSignup}>
						{isLoading ? <Loader color="#fff" size="16px" borderWidth="2px" /> : "Sign up"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default Signup;
