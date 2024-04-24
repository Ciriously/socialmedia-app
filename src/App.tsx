import { Route, Routes } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm";
import {
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import Signupform from "./_auth/forms/Signupform";
import AuthLayout from "./_auth/forms/AuthLayout";
import RootLayout from "./_root/RootLayout";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import CreatePost from "./_root/pages/CreatePost";
import EditPost from "./_root/pages/EditPost";
import AllUsers from "./_root/pages/AllUsers";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/*  public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<Signupform />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
