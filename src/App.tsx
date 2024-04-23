import React from "react";
import { Route, Routes } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";
import Signupform from "./_auth/forms/Signupform";

const App = () => {
  return (
    <main>
      <Routes>
        {/*  public Routes */}
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-in" element={<Signupform />} />
        {/* private routes */}
        <Route path="/sign-in" element={<Home />} />
      </Routes>
    </main>
  );
};

export default App;
