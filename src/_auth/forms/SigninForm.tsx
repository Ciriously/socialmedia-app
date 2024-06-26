import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { toast, useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutatuions";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const navigate = useNavigate();

  // 1. Define Your form
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount } = useSignInAccount();

  // 2.Define a submit handler.

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    console.log(session);
    if (!session) {
      toast({ title: "Sign in failed. Please try again" });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      return toast({
        title: "Sign up Failed. Please try again",
      });
    }
  }
  // with the exception of one of Identity, Email, or FBID
  // each of the following fields is optional

  // clevertap.onUserLogin.push({
  //   "Site": {
  //     "Name": "Jack Montana",            // String
  //     "Identity": 61026032,              // String or number
  //     "Email": "jack@gmail.com",         // Email address of the user
  //     "Phone": "+14155551234",           // Phone (with the country code)
  //     "Gender": "M",                     // Can be either M or F
  //     "DOB": new Date(),                 // Date of Birth. Date object
  //     "MSG-email": false,                // Disable email notifications
  //     "MSG-push": true,                  // Enable push notifications
  //     "MSG-sms": true,                   // Enable sms notifications
  //     "MSG-whatsapp": true,              // Enable WhatsApp notifications
  //   }
  //  })

  return (
    <div>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />
          <h2 className="h3-bold md:h2-bold pt-5 sm:py-12">
            Log in to Your Account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2 ">
            Welcome Back ! Please Enter your details to log in
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
              {isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader />
                  Loading...
                </div>
              ) : (
                "Log in"
              )}
            </Button>
            <p className="text-small-regular text-light-2 text-center mt-2">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-primary-500 text-small-semibold ml-1"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};
export default SigninForm;
