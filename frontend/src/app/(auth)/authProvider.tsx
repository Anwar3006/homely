import React from "react";
import { Amplify } from "aws-amplify";

import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const formFields = {
  signIn: {
    username: {
      placeholder: "Enter Your email here",
      isRequired: true,
      label: "Email",
    },
    password: {
      placeholder: "Enter Your password here",
      isRequired: true,
      label: "Password",
    },
  },
  signUp: {
    username: {
      placeholder: "Choose a username",
      isRequired: true,
      label: "Username",
      order: 1,
    },
    email: {
      placeholder: "Enter your email address",
      isRequired: true,
      label: "Email",
      order: 2,
    },
    password: {
      placeholder: "Enter Your password here",
      isRequired: true,
      label: "Password",
      order: 3,
    },
    confirm_password: {
      placeholder: "Confirm your password",
      isRequired: true,
      label: "Confirm Password",
      order: 4,
    },
  },
};

const components = {
  Header() {
    return (
      <View className="mt-4 mb-7">
        <Heading level={3} className="text-2xl! font-bold!">
          Home
          <span>ly</span>
        </Heading>

        <p className="text-muted-foreground mt-2">
          <span className="font-bold">Welcome! 🤗</span>
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={toSignUp}
              className="text-primary hover:underline bg-transparent border-none cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role"
            errorMessage={validationErrors?.["custom:role"]}
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={toSignIn}
              className="text-primary hover:underline bg-transparent border-none cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </View>
      );
    },
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div className="h-screen w-screen">
      <Authenticator formFields={formFields} components={components}>
        {() => <>{children}</>}
      </Authenticator>
    </div>
  );
};

export default Auth;
